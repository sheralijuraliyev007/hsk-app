import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { speakChinese } from '@/src/utils/audio';

interface ScrambleQuestion {
  chinese: string;
  pinyin: string;
  english: string;
  words: string[];
  answer: string[];
}

function buildScrambles(lesson: any): ScrambleQuestion[] {
  const questions: ScrambleQuestion[] = [];
  for (const situation of lesson.dialogues ?? []) {
    for (const line of situation.lines ?? []) {
      if (line.speaker === 'narrator') continue;
      const clean = line.chinese.replace(/[！？。，、！]/g, '').trim();
      const chars = clean.split('');
      if (chars.length < 2) continue;
      const shuffled = [...chars].sort(() => Math.random() - 0.5);
      // Make sure shuffled is different from original
      let attempts = 0;
      while (shuffled.join('') === clean && attempts < 10) {
        shuffled.sort(() => Math.random() - 0.5);
        attempts++;
      }
      questions.push({
        chinese: line.chinese,
        pinyin: line.pinyin,
        english: line.english,
        words: shuffled,
        answer: chars,
      });
    }
  }
  // Also add vocab-based scrambles for longer words
  for (const word of lesson.vocabulary ?? []) {
    if (word.chinese.length >= 3) {
      const chars = word.chinese.split('');
      const shuffled = [...chars].sort(() => Math.random() - 0.5);
      let attempts = 0;
      while (shuffled.join('') === word.chinese && attempts < 10) {
        shuffled.sort(() => Math.random() - 0.5);
        attempts++;
      }
      questions.push({
        chinese: word.chinese,
        pinyin: word.pinyin,
        english: word.english,
        words: shuffled,
        answer: chars,
      });
    }
  }
  return questions.slice(0, 8);
}

export default function LessonScrambleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const questions = lesson ? buildScrambles(lesson) : [];

  const [index, setIndex] = useState(0);
  const [available, setAvailable] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const shakeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (questions[index]) {
      setAvailable([...questions[index].words]);
      setSelected([]);
      setResult(null);
    }
  }, [index]);

  if (!lesson || questions.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Scramble</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.center}>
          <Text style={styles.emptyText}>No scramble exercises for this lesson yet.</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={() => router.back()}>
            <Text style={styles.nextBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const q = questions[index];

  const tapAvailable = (char: string, i: number) => {
    if (result) return;
    const newAvail = [...available];
    newAvail.splice(i, 1);
    setAvailable(newAvail);
    setSelected([...selected, char]);
  };

  const tapSelected = (char: string, i: number) => {
    if (result) return;
    const newSel = [...selected];
    newSel.splice(i, 1);
    setSelected(newSel);
    setAvailable([...available, char]);
  };

  const checkAnswer = () => {
    const isCorrect = selected.join('') === q.answer.join('');
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setScore(s => s + 1);
      speakChinese(q.chinese);
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  const handleComplete = async () => {
    await completeActivity(id, 'scramble', level);
    router.back();
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Scramble Results</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.center}>
          <Text style={styles.doneEmoji}>{pct >= 70 ? '🎉' : '💪'}</Text>
          <Text style={styles.doneTitle}>{pct >= 70 ? 'Great job!' : 'Keep practicing!'}</Text>
          <Text style={[styles.donePct, { color: pct >= 70 ? '#27ae60' : '#e94560' }]}>{pct}%</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}><Text style={styles.statNum}>{score}</Text><Text style={styles.statLabel}>Correct</Text></View>
            <View style={styles.statBox}><Text style={styles.statNum}>{questions.length - score}</Text><Text style={styles.statLabel}>Wrong</Text></View>
          </View>
          <TouchableOpacity style={[styles.nextBtn, { width: '100%' }]} onPress={handleComplete}>
            <Text style={styles.nextBtnText}>Complete ✓</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Scramble — Lesson {id}</Text>
        <Text style={styles.counter}>{index + 1}/{questions.length}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(index / questions.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.promptBox}>
          <Text style={styles.promptLabel}>ARRANGE THE CHARACTERS</Text>
          <Text style={styles.promptEnglish}>{q.english}</Text>
          <Text style={styles.promptPinyin}>{q.pinyin}</Text>
        </View>

        {/* Answer slots */}
        <Animated.View style={[styles.answerRow, { transform: [{ translateX: shakeAnim }] }]}>
          {selected.length === 0 ? (
            <View style={styles.answerPlaceholder}>
              <Text style={styles.answerPlaceholderText}>Tap characters below to arrange</Text>
            </View>
          ) : (
            selected.map((char, i) => (
              <TouchableOpacity key={i} style={[styles.charBtn, styles.charBtnSelected,
                result === 'correct' ? styles.charBtnCorrect : result === 'wrong' ? styles.charBtnWrong : null
              ]} onPress={() => tapSelected(char, i)}>
                <Text style={styles.charText}>{char}</Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        {/* Result feedback */}
        {result && (
          <View style={[styles.feedbackBox, result === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Ionicons name={result === 'correct' ? 'checkmark-circle' : 'close-circle'} size={22} color={result === 'correct' ? '#27ae60' : '#e94560'} />
            <Text style={[styles.feedbackText, { color: result === 'correct' ? '#27ae60' : '#e94560' }]}>
              {result === 'correct' ? 'Correct! 🎉' : `Correct answer: ${q.answer.join('')}`}
            </Text>
          </View>
        )}

        {/* Available characters */}
        <View style={styles.availableRow}>
          {available.map((char, i) => (
            <TouchableOpacity key={i} style={styles.charBtn} onPress={() => tapAvailable(char, i)}>
              <Text style={styles.charText}>{char}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action buttons */}
        <View style={styles.btnRow}>
          {!result ? (
            <TouchableOpacity
              style={[styles.checkBtn, selected.length === 0 && styles.checkBtnDisabled]}
              onPress={checkAnswer}
              disabled={selected.length === 0}
            >
              <Text style={styles.checkBtnText}>Check ✓</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
              <Text style={styles.nextBtnText}>{index + 1 < questions.length ? 'Next →' : 'See Results'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  counter: { fontSize: 14, color: '#888' },
  progressBar: { height: 4, backgroundColor: '#1a1a3a' },
  progressFill: { height: 4, backgroundColor: '#8e44ad', borderRadius: 2 },
  content: { padding: 20, gap: 20 },
  promptBox: { backgroundColor: '#16213e', borderRadius: 20, padding: 24, alignItems: 'center', gap: 8 },
  promptLabel: { fontSize: 11, color: '#888', letterSpacing: 1 },
  promptEnglish: { fontSize: 22, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  promptPinyin: { fontSize: 16, color: '#e94560' },
  answerRow: { flexDirection: 'row', flexWrap: 'wrap', minHeight: 64, backgroundColor: '#16213e', borderRadius: 16, padding: 12, gap: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#2a2a4a' },
  answerPlaceholder: { flex: 1, alignItems: 'center' },
  answerPlaceholderText: { color: '#555', fontSize: 14 },
  charBtn: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#2a2a4a', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3a3a5a' },
  charBtnSelected: { backgroundColor: '#1a3a5a', borderColor: '#2980b9' },
  charBtnCorrect: { backgroundColor: '#1a4a2a', borderColor: '#27ae60' },
  charBtnWrong: { backgroundColor: '#4a1a1a', borderColor: '#e94560' },
  charText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  feedbackBox: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, padding: 14 },
  feedbackCorrect: { backgroundColor: '#0d2a1a' },
  feedbackWrong: { backgroundColor: '#2a0d0d' },
  feedbackText: { fontSize: 15, fontWeight: '600', flex: 1 },
  availableRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', minHeight: 64 },
  btnRow: { alignItems: 'center' },
  checkBtn: { backgroundColor: '#8e44ad', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 48 },
  checkBtnDisabled: { backgroundColor: '#2a2a4a' },
  checkBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  nextBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 48, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 16 },
  emptyText: { color: '#888', fontSize: 15, textAlign: 'center' },
  doneEmoji: { fontSize: 64 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  donePct: { fontSize: 48, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', gap: 16, marginVertical: 8 },
  statBox: { backgroundColor: '#16213e', borderRadius: 14, padding: 20, alignItems: 'center', minWidth: 100 },
  statNum: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 13, color: '#888', marginTop: 4 },
});
