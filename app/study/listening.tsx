import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HSK1_VOCAB, VocabWord } from '@/src/data/hsk1';
import { speakChinese } from '@/src/utils/audio';

interface ListeningQuestion {
  word: VocabWord;
  choices: string[]; // English options
  correctIndex: number;
}

function buildQuestions(): ListeningQuestion[] {
  const shuffled = [...HSK1_VOCAB].sort(() => Math.random() - 0.5);
  const pool = shuffled.slice(0, 10);
  return pool.map(word => {
    const others = HSK1_VOCAB.filter(w => w.id !== word.id);
    const distractors = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [word.english, ...distractors.map(d => d.english)].sort(() => Math.random() - 0.5);
    return {
      word,
      choices,
      correctIndex: choices.indexOf(word.english),
    };
  });
}

export default function ListeningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [questions] = useState<ListeningQuestion[]>(buildQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'question' | 'result'>('question');
  const [isPlaying, setIsPlaying] = useState(false);

  const q = questions[current];

  const playAudio = useCallback(async () => {
    setIsPlaying(true);
    await speakChinese(q.word.chinese);
    setTimeout(() => setIsPlaying(false), 1500);
  }, [q]);

  // Auto-play when question loads
  useEffect(() => {
    const timer = setTimeout(() => playAudio(), 400);
    return () => clearTimeout(timer);
  }, [current]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setPhase('result');
      }
    }, 1200);
  };

  const pct = Math.round((score / questions.length) * 100);

  if (phase === 'result') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.resultEmoji}>{pct >= 80 ? '🎧' : pct >= 60 ? '👂' : '📚'}</Text>
        <Text style={styles.resultTitle}>{pct >= 80 ? 'Great Listening!' : pct >= 60 ? 'Good Effort!' : 'Keep Practicing!'}</Text>
        <View style={styles.resultCard}>
          <Text style={styles.resultPct}>{pct}%</Text>
          <Text style={styles.resultSub}>{score} / {questions.length} correct</Text>
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.back()}>
          <Text style={styles.primaryBtnText}>Back to Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/study/listening')}>
          <Text style={styles.secondaryBtnText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="#aaa" />
        </TouchableOpacity>
        <Text style={styles.progress}>{current + 1} / {questions.length}</Text>
        <Text style={styles.scoreText}>✓ {score}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((current + 1) / questions.length) * 100}%` }]} />
      </View>

      {/* Speaker area */}
      <View style={styles.speakerArea}>
        <Text style={styles.instruction}>What do you hear?</Text>
        <TouchableOpacity
          style={[styles.speakerBtn, isPlaying && styles.speakerBtnActive]}
          onPress={playAudio}
          activeOpacity={0.7}
        >
          <Ionicons name={isPlaying ? 'volume-high' : 'headset'} size={56} color={isPlaying ? '#fff' : '#e94560'} />
        </TouchableOpacity>
        <Text style={styles.tapHint}>Tap to replay</Text>
      </View>

      {/* Answer choices */}
      <View style={styles.choices}>
        {q.choices.map((choice, idx) => {
          let bgColor = '#16213e';
          let textColor = '#fff';
          if (selected !== null) {
            if (idx === q.correctIndex) { bgColor = '#27ae60'; textColor = '#fff'; }
            else if (idx === selected) { bgColor = '#e94560'; textColor = '#fff'; }
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.choiceBtn, { backgroundColor: bgColor }]}
              onPress={() => handleAnswer(idx)}
              disabled={selected !== null}
            >
              <Text style={styles.choiceLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
              <Text style={[styles.choiceText, { color: textColor }]}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ height: insets.bottom + 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  progress: { fontSize: 16, color: '#aaa', fontWeight: '600' },
  scoreText: { fontSize: 16, color: '#27ae60', fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: '#16213e', borderRadius: 3, marginBottom: 28 },
  progressFill: { height: 6, backgroundColor: '#e94560', borderRadius: 3 },
  speakerArea: { alignItems: 'center', flex: 1, justifyContent: 'center', gap: 16 },
  instruction: { fontSize: 18, color: '#aaa', fontWeight: '600', letterSpacing: 0.5 },
  speakerBtn: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#16213e', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#e94560' },
  speakerBtnActive: { backgroundColor: '#e94560', borderColor: '#e94560' },
  tapHint: { fontSize: 13, color: '#555' },
  choices: { gap: 12 },
  choiceBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 16, gap: 14 },
  choiceLetter: { fontSize: 16, fontWeight: 'bold', color: '#e94560', width: 24 },
  choiceText: { fontSize: 16, flex: 1 },
  resultEmoji: { fontSize: 72, textAlign: 'center', marginBottom: 12 },
  resultTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  resultCard: { backgroundColor: '#16213e', borderRadius: 20, padding: 32, alignItems: 'center', width: '100%', marginBottom: 28 },
  resultPct: { fontSize: 56, fontWeight: 'bold', color: '#e94560' },
  resultSub: { fontSize: 16, color: '#aaa', marginTop: 8 },
  primaryBtn: { backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 16, alignItems: 'center', width: '100%', marginBottom: 12 },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  secondaryBtn: { borderWidth: 2, borderColor: '#e94560', borderRadius: 14, paddingVertical: 14, alignItems: 'center', width: '100%' },
  secondaryBtnText: { color: '#e94560', fontSize: 17, fontWeight: '600' },
});
