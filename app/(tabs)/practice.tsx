import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllLessons } from '@/src/data/lessons';
import { speakChinese } from '@/src/utils/audio';
import { addCoins } from '@/src/utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SRSCard = {
  id: string;
  chinese: string;
  pinyin: string;
  english: string;
  hskLevel: number;
  lessonId: number;
  dueDate: number; // timestamp
  interval: number; // days
  easeFactor: number; // 1.3 - 2.5
  repetitions: number;
};

type ReviewMode = 'menu' | 'review' | 'result';
type CardFace = 'front' | 'back';

const SRS_KEY = 'srs_cards_v1';

// SM-2 algorithm
function sm2(card: SRSCard, quality: 0 | 1 | 2 | 3 | 4 | 5): SRSCard {
  let { interval, easeFactor, repetitions } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    dueDate: Date.now() + interval * 24 * 60 * 60 * 1000,
  };
}

async function loadCards(): Promise<SRSCard[]> {
  const raw = await AsyncStorage.getItem(SRS_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as Array<Partial<SRSCard>>;
  return parsed.map((card) => {
    const parts = String(card.id ?? '').split('-');
    const guessedLevel = Number(parts[0]) === 2 ? 2 : 1;
    return {
      id: String(card.id ?? ''),
      chinese: String(card.chinese ?? ''),
      pinyin: String(card.pinyin ?? ''),
      english: String(card.english ?? ''),
      lessonId: Number(card.lessonId ?? 1),
      hskLevel: Number(card.hskLevel ?? guessedLevel),
      dueDate: Number(card.dueDate ?? Date.now()),
      interval: Number(card.interval ?? 1),
      easeFactor: Number(card.easeFactor ?? 2.5),
      repetitions: Number(card.repetitions ?? 0),
    };
  });
}

async function saveCards(cards: SRSCard[]): Promise<void> {
  await AsyncStorage.setItem(SRS_KEY, JSON.stringify(cards));
}

async function syncNewWords(existingCards: SRSCard[]): Promise<SRSCard[]> {
  const lessons = getAllLessons();
  const existingIds = new Set(existingCards.map(c => c.id));
  const newCards: SRSCard[] = [];
  for (const lesson of lessons) {
    for (const word of lesson.vocabulary ?? []) {
      const id = `${lesson.hskLevel}-${lesson.id}-${word.chinese}`;
      if (!existingIds.has(id)) {
        newCards.push({
          id,
          chinese: word.chinese,
          pinyin: word.pinyin,
          english: word.english,
          hskLevel: lesson.hskLevel,
          lessonId: lesson.id,
          dueDate: Date.now(),
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0,
        });
      }
    }
  }
  return [...existingCards, ...newCards];
}

function getDueCards(cards: SRSCard[], limit = 20): SRSCard[] {
  const now = Date.now();
  return cards
    .filter(c => c.dueDate <= now)
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, limit);
}

export default function PracticeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<1 | 2>(1);
  const [mode, setMode] = useState<ReviewMode>('menu');
  const [allCards, setAllCards] = useState<SRSCard[]>([]);
  const [dueCards, setDueCards] = useState<SRSCard[]>([]);
  const [reviewQueue, setReviewQueue] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [face, setFace] = useState<CardFace>('front');
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const flipAnim = useState(new Animated.Value(0))[0];
  const [isFlipped, setIsFlipped] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let cards = await loadCards();
        cards = await syncNewWords(cards);
        await saveCards(cards);
        setAllCards(cards);
        setDueCards(getDueCards(cards));
      })();
    }, [])
  );

  const startReview = () => {
    const due = getDueCards(allCards);
    if (due.length === 0) return;
    setReviewQueue([...due].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFace('front');
    setReviewed(0);
    setCorrect(0);
    setCoinsEarned(0);
    setIsFlipped(false);
    flipAnim.setValue(0);
    setMode('review');
  };

  const flipCard = () => {
    if (face === 'front') {
      setFace('back');
      setIsFlipped(true);
      Animated.spring(flipAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 10,
      }).start();

      try {
        speakChinese(reviewQueue[currentIndex].chinese);
      } catch (e) {
        console.log('Audio playback failed', e);
      }
    }
  };

  const rateCard = async (quality: 0 | 3 | 5) => {
    const card = reviewQueue[currentIndex];
    const updated = sm2(card, quality);
    const newAllCards = allCards.map(c => c.id === card.id ? updated : c);
    await saveCards(newAllCards);
    setAllCards(newAllCards);

    const wasCorrect = quality >= 3;
    if (wasCorrect) setCorrect(c => c + 1);

    const coins = quality === 5 ? 3 : quality === 3 ? 1 : 0;
    if (coins > 0) {
      await addCoins(coins);
      setCoinsEarned(prev => prev + coins);
    }

    setReviewed(r => r + 1);

    if (currentIndex + 1 >= reviewQueue.length) {
      setMode('result');
    } else {
      setCurrentIndex(i => i + 1);
      setFace('front');
      setIsFlipped(false);
      flipAnim.setValue(0);
    }
  };

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  // MENU
  if (mode === 'menu') {
    const totalCards = allCards.length;
    const dueCount = dueCards.length;
    const masteredCount = allCards.filter(c => c.repetitions >= 3).length;
    const streakPct = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Daily Review</Text>
        <Text style={styles.subtitle}>Spaced repetition — review at the right time</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{dueCount}</Text>
            <Text style={styles.statLabel}>Due Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalCards}</Text>
            <Text style={styles.statLabel}>Total Cards</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{masteredCount}</Text>
            <Text style={styles.statLabel}>Mastered</Text>
          </View>
        </View>

        {/* Mastery bar */}
        <View style={styles.masteryBar}>
          <View style={[styles.masteryFill, { width: `${streakPct}%` }]} />
        </View>
        <Text style={styles.masteryLabel}>{streakPct}% mastered</Text>

        {/* Start button */}
        <TouchableOpacity
          style={[styles.startBtn, dueCount === 0 && styles.startBtnDisabled]}
          onPress={startReview}
          disabled={dueCount === 0}
        >
          <Ionicons name="flash" size={22} color="#fff" />
          <Text style={styles.startBtnText}>
            {dueCount > 0 ? `Start Review (${dueCount} cards)` : 'All caught up! 🎉'}
          </Text>
        </TouchableOpacity>

        {dueCount === 0 && (
          <Text style={styles.caughtUpText}>Come back tomorrow for your next review session.</Text>
        )}

        <View style={styles.focusedSection}>
          <Text style={styles.focusedSectionTitle}>Focused Practice</Text>

          <View style={styles.levelToggleRow}>
            <TouchableOpacity
              style={[styles.levelToggle, selectedLevel === 1 && styles.levelToggleActive]}
              onPress={() => setSelectedLevel(1)}
            >
              <Text style={[styles.levelToggleText, selectedLevel === 1 && styles.levelToggleTextActive]}>HSK 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.levelToggle, selectedLevel === 2 && styles.levelToggleActive]}
              onPress={() => setSelectedLevel(2)}
            >
              <Text style={[styles.levelToggleText, selectedLevel === 2 && styles.levelToggleTextActive]}>HSK 2</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.focusedGrid}>
            <TouchableOpacity
              style={styles.focusedCard}
              onPress={() => router.push({ pathname: '/study/listening', params: { hskLevel: String(selectedLevel) } })}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#2980b9' }]}>
                <Ionicons name="headset" size={24} color="#fff" />
              </View>
              <Text style={styles.focusedCardTitle}>Listening</Text>
              <Text style={styles.focusedCardSub}>HSK {selectedLevel} Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.focusedCard}
              onPress={() => router.push({ pathname: '/study/session', params: { hskLevel: String(selectedLevel) } })}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#8e44ad' }]}>
                <Ionicons name="repeat" size={24} color="#fff" />
              </View>
              <Text style={styles.focusedCardTitle}>SRS Session</Text>
              <Text style={styles.focusedCardSub}>Database Mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How it works */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How SRS Works</Text>
          <Text style={styles.infoText}>Cards you know well appear less often. Cards you struggle with appear more frequently. Rate each card after flipping:</Text>
          <View style={styles.ratingGuide}>
            <View style={styles.ratingRow}><View style={[styles.ratingDot, { backgroundColor: '#e74c3c' }]} /><Text style={styles.ratingText}><Text style={{ color: '#e74c3c', fontWeight: 'bold' }}>Again</Text> — didn't know it (review again soon)</Text></View>
            <View style={styles.ratingRow}><View style={[styles.ratingDot, { backgroundColor: '#f39c12' }]} /><Text style={styles.ratingText}><Text style={{ color: '#f39c12', fontWeight: 'bold' }}>Hard</Text> — knew it with difficulty (+1 coin)</Text></View>
            <View style={styles.ratingRow}><View style={[styles.ratingDot, { backgroundColor: '#27ae60' }]} /><Text style={styles.ratingText}><Text style={{ color: '#27ae60', fontWeight: 'bold' }}>Easy</Text> — knew it well (+3 coins)</Text></View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // RESULT
  if (mode === 'result') {
    const pct = Math.round((correct / reviewed) * 100);
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 32 }]}>
        <Text style={{ fontSize: 64 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪'}</Text>
        <Text style={styles.resultTitle}>{pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : 'Keep going!'}</Text>
        <View style={styles.resultCard}>
          <Text style={styles.resultPct}>{pct}%</Text>
          <Text style={styles.resultPctLabel}>Accuracy</Text>
        </View>
        <View style={styles.resultStatsRow}>
          <View style={styles.resultStat}><Text style={styles.resultStatNum}>{correct}</Text><Text style={styles.resultStatLabel}>Correct</Text></View>
          <View style={styles.resultStat}><Text style={styles.resultStatNum}>{reviewed - correct}</Text><Text style={styles.resultStatLabel}>Again</Text></View>
          <View style={styles.resultStat}><Text style={[styles.resultStatNum, { color: '#f1c40f' }]}>+{coinsEarned}</Text><Text style={styles.resultStatLabel}>Coins 🪙</Text></View>
        </View>
        <Text style={styles.resultNext}>Next review scheduled based on your ratings.</Text>
        <TouchableOpacity style={styles.startBtn} onPress={() => setMode('menu')}>
          <Text style={styles.startBtnText}>Back to Practice</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // REVIEW
  const card = reviewQueue[currentIndex];
  const progress = (currentIndex / reviewQueue.length) * 100;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={[styles.reviewHeader, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => setMode('menu')}>
          <Ionicons name="close" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.reviewProgress}>{currentIndex + 1} / {reviewQueue.length}</Text>
        <Text style={styles.reviewCoins}>🪙 +{coinsEarned}</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      {/* Flip card */}
      <View style={styles.cardContainer}>
        {/* Front */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { perspective: 1000 },
                { rotateY: frontInterpolate },
              ],
              zIndex: face === 'front' ? 1 : 0,
            },
          ]}
        >
          <Text style={styles.cardLessonTag}>HSK {card.hskLevel} • L{card.lessonId}</Text>
          <Text style={styles.cardChinese}>{card.chinese}</Text>
          <Text style={styles.cardHint}>Tap to reveal</Text>
          <TouchableOpacity style={styles.flipBtn} onPress={flipCard}>
            <Ionicons name="eye-outline" size={20} color="#e94560" />
            <Text style={styles.flipBtnText}>Show Answer</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Back */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [
                { perspective: 1000 },
                { rotateY: backInterpolate },
              ],
              zIndex: face === 'back' ? 1 : 0,
            },
          ]}
        >
          <Text style={styles.cardChinese}>{card.chinese}</Text>
          <Text style={styles.cardPinyin}>{card.pinyin}</Text>
          <Text style={styles.cardEnglish}>{card.english}</Text>
          <TouchableOpacity style={styles.speakBtn} onPress={() => speakChinese(card.chinese)}>
            <Ionicons name="volume-high" size={18} color="#e94560" />
            <Text style={styles.speakBtnText}>Play Audio</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Rating buttons (only show after flip) */}
      {isFlipped && (
        <View style={styles.ratingBtns}>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnAgain]} onPress={() => rateCard(0)}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.rateBtnText}>Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnHard]} onPress={() => rateCard(3)}>
            <Ionicons name="thumbs-up-outline" size={20} color="#fff" />
            <Text style={styles.rateBtnText}>Hard</Text>
            <Text style={styles.rateBtnCoins}>+1🪙</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnEasy]} onPress={() => rateCard(5)}>
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.rateBtnText}>Easy</Text>
            <Text style={styles.rateBtnCoins}>+3🪙</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  content: { padding: 20, gap: 16 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 14, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 26, fontWeight: 'bold', color: '#e94560' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  masteryBar: { height: 8, backgroundColor: '#16213e', borderRadius: 4, overflow: 'hidden' },
  masteryFill: { height: 8, backgroundColor: '#27ae60', borderRadius: 4 },
  masteryLabel: { fontSize: 12, color: '#888', textAlign: 'right' },
  startBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  startBtnDisabled: { backgroundColor: '#2a2a4a' },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  caughtUpText: { color: '#888', fontSize: 13, textAlign: 'center' },
  focusedSection: { marginTop: 24, gap: 12 },
  focusedSectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  levelToggleRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  levelToggle: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  levelToggleActive: { borderColor: '#e94560', backgroundColor: '#1a1a3a' },
  levelToggleText: { color: '#888', fontWeight: '600', fontSize: 14 },
  levelToggleTextActive: { color: '#fff' },
  focusedGrid: { flexDirection: 'row', gap: 12 },
  focusedCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 16, padding: 16, alignItems: 'center', gap: 8 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  focusedCardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  focusedCardSub: { color: '#888', fontSize: 11 },
  infoBox: { backgroundColor: '#16213e', borderRadius: 16, padding: 18, gap: 10 },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  infoText: { fontSize: 13, color: '#aaa', lineHeight: 20 },
  ratingGuide: { gap: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ratingDot: { width: 10, height: 10, borderRadius: 5 },
  ratingText: { fontSize: 13, color: '#aaa', flex: 1 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 },
  reviewProgress: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  reviewCoins: { fontSize: 15, color: '#f1c40f' },
  progressBarBg: { height: 4, backgroundColor: '#16213e', marginHorizontal: 20 },
  progressBarFill: { height: 4, backgroundColor: '#e94560', borderRadius: 2 },
  cardContainer: { flex: 1, margin: 20 },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#16213e', borderRadius: 24, alignItems: 'center', justifyContent: 'center', padding: 30, gap: 12, backfaceVisibility: 'hidden' },
  cardBack: { backgroundColor: '#0d1f3c', backfaceVisibility: 'hidden' },
  cardLessonTag: { position: 'absolute', top: 16, left: 16, fontSize: 11, color: '#555', backgroundColor: '#1a1a3a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  cardChinese: { fontSize: 72, color: '#fff', fontWeight: 'bold' },
  cardHint: { fontSize: 13, color: '#555' },
  cardPinyin: { fontSize: 24, color: '#e94560' },
  cardEnglish: { fontSize: 22, color: '#fff', fontWeight: '600' },
  flipBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, padding: 12, borderRadius: 12, backgroundColor: '#1a1a3a' },
  flipBtnText: { color: '#e94560', fontSize: 15, fontWeight: '600' },
  speakBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 10, backgroundColor: '#1a1a3a' },
  speakBtnText: { color: '#e94560', fontSize: 13 },
  ratingBtns: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  rateBtn: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center', gap: 4 },
  rateBtnAgain: { backgroundColor: '#c0392b' },
  rateBtnHard: { backgroundColor: '#d35400' },
  rateBtnEasy: { backgroundColor: '#27ae60' },
  rateBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  rateBtnCoins: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  resultTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 12, marginBottom: 20 },
  resultCard: { backgroundColor: '#16213e', borderRadius: 20, padding: 28, alignItems: 'center', width: '100%', marginBottom: 16 },
  resultPct: { fontSize: 60, fontWeight: 'bold', color: '#e94560' },
  resultPctLabel: { fontSize: 14, color: '#888' },
  resultStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 16, width: '100%' },
  resultStat: { flex: 1, backgroundColor: '#16213e', borderRadius: 14, padding: 16, alignItems: 'center' },
  resultStatNum: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  resultStatLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  resultNext: { color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 20 },
});
