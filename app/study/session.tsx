import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getDueCards, updateCardProgress, saveSession } from '@/src/utils/database';
import { calculateNextReview, Rating, CardProgress } from '@/src/utils/sm2';
import { VocabWord } from '@/src/data/hsk1';
import { speakChinese } from '@/src/utils/audio';

type Card = VocabWord & CardProgress;

export default function StudySession() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDueCards().then(due => {
      setCards(due.length > 0 ? due : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && cards.length > 0) {
      const card = cards[currentIndex];
      if (card) speakChinese(card.chinese);
    }
  }, [currentIndex, cards, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Loading cards...</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 48 }}>🎉</Text>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>All done for today!</Text>
        <Text style={{ color: '#888', fontSize: 16, marginTop: 8, textAlign: 'center' }}>No cards due. Come back tomorrow!</Text>
        <TouchableOpacity
          style={{ marginTop: 30, backgroundColor: '#e94560', borderRadius: 16, padding: 16, paddingHorizontal: 40 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentWord = cards[currentIndex];

  async function handleRating(rating: Rating) {
    const progress: CardProgress = {
      wordId: currentWord.id,
      repetitions: currentWord.repetitions,
      easeFactor: currentWord.easeFactor,
      interval: currentWord.interval,
      nextReviewDate: currentWord.nextReviewDate,
    };
    const updated = calculateNextReview(progress, rating);
    await updateCardProgress(updated);

    const newCorrect = correct + (rating >= 2 ? 1 : 0);
    const newTotal = total + 1;

    if (currentIndex + 1 >= cards.length) {
      await saveSession(cards.length, newCorrect);
      router.replace({
        pathname: '/study/result',
        params: { correct: newCorrect, total: newTotal },
      });
    } else {
      if (rating >= 2) setCorrect(c => c + 1);
      setTotal(t => t + 1);
      setCurrentIndex(i => i + 1);
      setRevealed(false);
    }
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backBtn}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.progress}>{currentIndex + 1} / {cards.length}</Text>
          <Text style={styles.score}>✓ {correct}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${(currentIndex / cards.length) * 100}%` }]} />
        </View>

        <View style={styles.card}>
          <Text style={styles.chineseText}>{currentWord?.chinese}</Text>
          <Text style={styles.pinyinText}>{currentWord?.pinyin}</Text>
          <TouchableOpacity
            style={styles.speakBtn}
            onPress={() => currentWord && speakChinese(currentWord.chinese)}
          >
            <Ionicons name="volume-high" size={28} color="#e94560" />
            <Text style={styles.speakBtnText}>Tap to hear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.writeBtn}
            onPress={() => router.push({
              pathname: '/study/writing',
              params: {
                chinese: currentWord.chinese,
                pinyin: currentWord.pinyin,
                english: currentWord.english,
              },
            })}
          >
            <Ionicons name="pencil" size={20} color="#2980b9" />
            <Text style={styles.writeBtnText}>Write</Text>
          </TouchableOpacity>
          {revealed ? (
            <Text style={styles.englishText}>{currentWord?.english}</Text>
          ) : (
            <TouchableOpacity style={styles.revealButton} onPress={() => setRevealed(true)}>
              <Text style={styles.revealButtonText}>Tap to reveal</Text>
            </TouchableOpacity>
          )}
        </View>

        {revealed && (
          <View style={[styles.ratingContainer, { paddingBottom: insets.bottom + 12 }]}>
            <Text style={styles.ratingLabel}>How well did you know this?</Text>
            <View style={styles.ratingRow}>
              <TouchableOpacity style={[styles.ratingBtn, styles.btnAgain]} onPress={() => handleRating(0)}>
                <Text style={styles.ratingBtnText}>Again</Text>
                <Text style={styles.ratingBtnSub}>Forgot</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ratingBtn, styles.btnHard]} onPress={() => handleRating(1)}>
                <Text style={styles.ratingBtnText}>Hard</Text>
                <Text style={styles.ratingBtnSub}>Difficult</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ratingBtn, styles.btnGood]} onPress={() => handleRating(2)}>
                <Text style={styles.ratingBtnText}>Good</Text>
                <Text style={styles.ratingBtnSub}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ratingBtn, styles.btnEasy]} onPress={() => handleRating(3)}>
                <Text style={styles.ratingBtnText}>Easy</Text>
                <Text style={styles.ratingBtnSub}>Perfect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backBtn: { fontSize: 20, color: '#888' },
  progress: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  score: { fontSize: 16, color: '#4caf50' },
  progressBarBg: { height: 4, backgroundColor: '#16213e', marginHorizontal: 20 },
  progressBarFill: { height: 4, backgroundColor: '#e94560', borderRadius: 2 },
  card: { flex: 1, margin: 20, backgroundColor: '#16213e', borderRadius: 24, alignItems: 'center', justifyContent: 'center', padding: 30 },
  chineseText: { fontSize: 72, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  pinyinText: { fontSize: 24, color: '#e94560', marginTop: 12, textAlign: 'center' },
  englishText: { fontSize: 28, color: '#aaa', textAlign: 'center', marginTop: 30 },
  speakBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, padding: 10, borderRadius: 10, backgroundColor: '#1a1a2e' },
  speakBtnText: { color: '#e94560', fontSize: 14, fontWeight: '600' },
  writeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, padding: 10, borderRadius: 10, backgroundColor: '#1a1a2e' },
  writeBtnText: { color: '#2980b9', fontSize: 14, fontWeight: '600' },
  revealButton: { marginTop: 40, backgroundColor: '#e94560', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30 },
  revealButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  ratingContainer: { paddingHorizontal: 20, paddingTop: 8 },
  ratingLabel: { color: '#888', textAlign: 'center', marginBottom: 12, fontSize: 14 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  ratingBtn: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  btnAgain: { backgroundColor: '#c0392b' },
  btnHard: { backgroundColor: '#e67e22' },
  btnGood: { backgroundColor: '#27ae60' },
  btnEasy: { backgroundColor: '#2980b9' },
  ratingBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  ratingBtnSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 },
});
