import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDatabase } from '@/src/utils/database';

interface Question {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  choices: string[];
  correctIndex: number;
  type: 'ch_to_en' | 'en_to_ch';
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function buildExam(): Promise<Question[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{ id: number; chinese: string; pinyin: string; english: string }>(
    'SELECT id, chinese, pinyin, english FROM vocab ORDER BY RANDOM() LIMIT 40'
  );
  if (rows.length < 4) return [];

  const questions: Question[] = [];
  const pool = rows.slice(0, 20);

  for (let i = 0; i < pool.length; i++) {
    const word = pool[i];
    const others = rows.filter(r => r.id !== word.id);
    const distractors = shuffle(others).slice(0, 3);

    if (i % 2 === 0) {
      // Chinese → English
      const choices = shuffle([word.english, ...distractors.map(d => d.english)]);
      questions.push({
        id: word.id,
        chinese: word.chinese,
        pinyin: word.pinyin,
        english: word.english,
        choices,
        correctIndex: choices.indexOf(word.english),
        type: 'ch_to_en',
      });
    } else {
      // English → Chinese
      const choices = shuffle([word.chinese, ...distractors.map(d => d.chinese)]);
      questions.push({
        id: word.id,
        chinese: word.chinese,
        pinyin: word.pinyin,
        english: word.english,
        choices,
        correctIndex: choices.indexOf(word.chinese),
        type: 'en_to_ch',
      });
    }
  }
  return questions;
}

const TOTAL_SECONDS = 20 * 60; // 20 minutes

export default function ExamScreen() {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<'intro' | 'exam' | 'result'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [timeTaken, setTimeTaken] = useState(0);
  const [loading, setLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'exam') return;
    if (secondsLeft <= 0) {
      finishExam();
      return;
    }
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, secondsLeft]);

  const startExam = async () => {
    setLoading(true);
    const qs = await buildExam();
    if (qs.length === 0) {
      Alert.alert('Not enough words', 'Please study some cards first.');
      setLoading(false);
      return;
    }
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setSecondsLeft(TOTAL_SECONDS);
    setLoading(false);
    setPhase('exam');
  };

  const finishExam = useCallback(() => {
    setTimeTaken(TOTAL_SECONDS - secondsLeft);
    setPhase('result');
  }, [secondsLeft]);

  const handleAnswer = (choiceIndex: number) => {
    const updated = [...answers];
    updated[current] = choiceIndex;
    setAnswers(updated);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
      } else {
        finishExam();
      }
    }, 300);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const score = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 60;

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <Ionicons name="document-text" size={64} color="#e94560" />
        <Text style={styles.introTitle}>Mock HSK 1 Exam</Text>
        <Text style={styles.introSub}>Test your readiness for the real HSK 1</Text>

        <View style={styles.infoBox}>
          {[
            { icon: 'help-circle', text: '20 multiple choice questions' },
            { icon: 'time', text: '20-minute time limit' },
            { icon: 'checkmark-done', text: 'Pass score: 60% (12/20)' },
            { icon: 'close-circle', text: 'Cannot change answers' },
          ].map(item => (
            <View key={item.text} style={styles.infoRow}>
              <Ionicons name={item.icon as any} size={20} color="#e94560" />
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={startExam} disabled={loading}>
          <Text style={styles.startBtnText}>{loading ? 'Loading…' : 'Start Exam'}</Text>
        </TouchableOpacity>
        <View style={{ height: insets.bottom + 20 }} />
      </View>
    );
  }

  // ── RESULT ──
  if (phase === 'result') {
    const mins = Math.floor(timeTaken / 60);
    const secs = timeTaken % 60;
    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.resultContent, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.resultEmoji}>{passed ? '🎉' : '📚'}</Text>
        <Text style={styles.resultTitle}>{passed ? 'Passed!' : 'Keep Studying'}</Text>
        <Text style={[styles.resultPct, { color: passed ? '#27ae60' : '#e94560' }]}>{pct}%</Text>

        <View style={styles.resultGrid}>
          <View style={styles.resultCard}>
            <Text style={styles.resultCardNum}>{score}</Text>
            <Text style={styles.resultCardLabel}>Correct</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultCardNum}>{questions.length - score}</Text>
            <Text style={styles.resultCardLabel}>Wrong</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultCardNum}>{`${mins}:${secs.toString().padStart(2, '0')}`}</Text>
            <Text style={styles.resultCardLabel}>Time</Text>
          </View>
        </View>

        <Text style={styles.reviewTitle}>Review Answers</Text>
        {questions.map((q, i) => {
          const correct = answers[i] === q.correctIndex;
          return (
            <View key={i} style={[styles.reviewRow, { borderLeftColor: correct ? '#27ae60' : '#e94560' }]}>
              <Text style={styles.reviewQ}>{q.type === 'ch_to_en' ? q.chinese : q.english}</Text>
              <Text style={[styles.reviewA, { color: correct ? '#27ae60' : '#e94560' }]}>
                {correct ? '✓' : '✗'} {q.type === 'ch_to_en' ? q.english : q.chinese}
              </Text>
              {!correct && (
                <Text style={styles.reviewYours}>Your answer: {answers[i] !== null ? q.choices[answers[i]!] : 'Skipped'}</Text>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.startBtn} onPress={() => setPhase('intro')}>
          <Text style={styles.startBtnText}>Try Again</Text>
        </TouchableOpacity>
        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    );
  }

  // ── EXAM ──
  const q = questions[current];
  const timerColor = secondsLeft < 60 ? '#e94560' : secondsLeft < 300 ? '#f39c12' : '#27ae60';

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Header */}
      <View style={styles.examHeader}>
        <Text style={styles.progress}>{current + 1} / {questions.length}</Text>
        <Text style={[styles.timer, { color: timerColor }]}>⏱ {formatTime(secondsLeft)}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((current + 1) / questions.length) * 100}%` }]} />
      </View>

      {/* Question */}
      <View style={styles.questionBox}>
        {q.type === 'ch_to_en' ? (
          <>
            <Text style={styles.questionLabel}>What does this mean?</Text>
            <Text style={styles.questionChinese}>{q.chinese}</Text>
            <Text style={styles.questionPinyin}>{q.pinyin}</Text>
          </>
        ) : (
          <>
            <Text style={styles.questionLabel}>How do you say this in Chinese?</Text>
            <Text style={styles.questionEnglish}>{q.english}</Text>
          </>
        )}
      </View>

      {/* Choices */}
      <View style={styles.choices}>
        {q.choices.map((choice, idx) => (
          <TouchableOpacity key={idx} style={styles.choiceBtn} onPress={() => handleAnswer(idx)}>
            <Text style={styles.choiceLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: insets.bottom + 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  // Intro
  introTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 16, textAlign: 'center' },
  introSub: { fontSize: 15, color: '#888', marginTop: 8, textAlign: 'center', marginBottom: 24 },
  infoBox: { backgroundColor: '#16213e', borderRadius: 16, padding: 20, width: '100%', gap: 14, marginBottom: 32 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { fontSize: 15, color: '#ccc' },
  startBtn: { backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 40, alignItems: 'center', width: '100%' },
  startBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  // Exam
  examHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progress: { fontSize: 16, color: '#aaa', fontWeight: '600' },
  timer: { fontSize: 18, fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: '#16213e', borderRadius: 3, marginBottom: 24 },
  progressFill: { height: 6, backgroundColor: '#e94560', borderRadius: 3 },
  questionBox: { backgroundColor: '#16213e', borderRadius: 20, padding: 28, alignItems: 'center', marginBottom: 24, minHeight: 160, justifyContent: 'center' },
  questionLabel: { fontSize: 13, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  questionChinese: { fontSize: 52, color: '#fff', fontWeight: 'bold' },
  questionPinyin: { fontSize: 18, color: '#e94560', marginTop: 8 },
  questionEnglish: { fontSize: 26, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  choices: { gap: 12 },
  choiceBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 14, padding: 16, gap: 14 },
  choiceLetter: { fontSize: 16, fontWeight: 'bold', color: '#e94560', width: 24 },
  choiceText: { fontSize: 16, color: '#fff', flex: 1 },
  // Result
  resultContent: { padding: 24, alignItems: 'center' },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  resultPct: { fontSize: 56, fontWeight: 'bold', marginVertical: 12 },
  resultGrid: { flexDirection: 'row', gap: 12, marginBottom: 28, width: '100%' },
  resultCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 14, padding: 16, alignItems: 'center' },
  resultCardNum: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  resultCardLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  reviewTitle: { fontSize: 18, fontWeight: 'bold', color: '#aaa', alignSelf: 'flex-start', marginBottom: 12 },
  reviewRow: { backgroundColor: '#16213e', borderRadius: 12, padding: 14, marginBottom: 8, width: '100%', borderLeftWidth: 4 },
  reviewQ: { fontSize: 16, color: '#fff', fontWeight: '600' },
  reviewA: { fontSize: 14, marginTop: 4 },
  reviewYours: { fontSize: 13, color: '#888', marginTop: 2 },
});
