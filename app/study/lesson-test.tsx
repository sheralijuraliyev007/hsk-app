import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { speakChinese } from '@/src/utils/audio';

type QuestionType = 'ch_to_en' | 'en_to_ch' | 'listening' | 'tone' | 'fill_blank';

interface Question {
  type: QuestionType;
  chinese: string;
  pinyin: string;
  english: string;
  correct: string;
  choices: string[];
  correctIndex: number;
  sentence?: string;       // for fill_blank
  blankWord?: string;      // for fill_blank
}

const TONE_NAMES = ['1st tone (flat)', '2nd tone (rising)', '3rd tone (dip)', '4th tone (falling)'];
const TONE_MARKS = ['ā', 'á', 'ǎ', 'à'];

function getTone(pinyin: string): number {
  if (/[āēīōūǖ]/.test(pinyin)) return 0;
  if (/[áéíóúǘ]/.test(pinyin)) return 1;
  if (/[ǎěǐǒǔǚ]/.test(pinyin)) return 2;
  if (/[àèìòùǜ]/.test(pinyin)) return 3;
  return -1; // neutral / no tone
}

function buildQuestions(vocab: any[], dialogues: any[]): Question[] {
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  const pool = shuffled.slice(0, Math.min(12, shuffled.length));
  const questions: Question[] = [];

  pool.forEach((word, i) => {
    const others = vocab.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5);
    const type: QuestionType =
      i % 5 === 0 ? 'listening' :
      i % 5 === 1 ? 'tone' :
      i % 5 === 2 ? 'fill_blank' :
      i % 5 === 3 ? 'en_to_ch' : 'ch_to_en';

    if (type === 'tone') {
      const tone = getTone(word.pinyin);
      if (tone === -1) {
        // fallback to ch_to_en for neutral tone words
        const choices = [word.english, ...others.slice(0,3).map((o:any)=>o.english)].sort(()=>Math.random()-0.5);
        questions.push({ type: 'ch_to_en', chinese: word.chinese, pinyin: word.pinyin, english: word.english, correct: word.english, choices, correctIndex: choices.indexOf(word.english) });
        return;
      }
      const choices = [...TONE_NAMES];
      questions.push({ type: 'tone', chinese: word.chinese, pinyin: word.pinyin, english: word.english, correct: TONE_NAMES[tone], choices, correctIndex: tone });
      return;
    }

    if (type === 'fill_blank') {
      // Find a dialogue line that contains this word
      const line = dialogues?.find((d: any) => d.chinese?.includes(word.chinese));
      if (line && line.chinese.length > word.chinese.length) {
        const sentence = line.chinese.replace(word.chinese, '____');
        const choices = [word.chinese, ...others.slice(0,3).map((o:any)=>o.chinese)].sort(()=>Math.random()-0.5);
        questions.push({ type: 'fill_blank', chinese: word.chinese, pinyin: word.pinyin, english: word.english, correct: word.chinese, choices, correctIndex: choices.indexOf(word.chinese), sentence, blankWord: word.chinese });
        return;
      }
      // fallback to en_to_ch
      const choices = [word.chinese, ...others.slice(0,3).map((o:any)=>o.chinese)].sort(()=>Math.random()-0.5);
      questions.push({ type: 'en_to_ch', chinese: word.chinese, pinyin: word.pinyin, english: word.english, correct: word.chinese, choices, correctIndex: choices.indexOf(word.chinese) });
      return;
    }

    const choices = type === 'en_to_ch'
      ? [word.chinese, ...others.slice(0,3).map((o:any)=>o.chinese)].sort(()=>Math.random()-0.5)
      : [word.english, ...others.slice(0,3).map((o:any)=>o.english)].sort(()=>Math.random()-0.5);
    questions.push({ type, chinese: word.chinese, pinyin: word.pinyin, english: word.english, correct: type==='en_to_ch'?word.chinese:word.english, choices, correctIndex: choices.indexOf(type==='en_to_ch'?word.chinese:word.english) });
  });

  return questions;
}

export default function LessonTestScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lesson) {
      const lines = lesson.dialogues.flatMap(d => d.lines);
      setQuestions(buildQuestions(lesson.vocabulary, lines));
    }
  }, [lesson]);

  useEffect(() => {
    const q = questions[index];
    if (q?.type === 'listening') speakChinese(q.chinese);
  }, [index, questions]);

  if (!lesson || questions.length === 0) return null;

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[index].correctIndex) setScore(s => s + 1);
    setTimeout(() => {
      if (index + 1 < questions.length) { setIndex(index + 1); setSelected(null); }
      else setDone(true);
    }, 1000);
  };

  const handleComplete = async () => {
    await completeActivity(id, 'test', level);
    router.back();
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Test Results</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContent}>
          <Text style={styles.resultEmoji}>{passed ? '🏆' : '📖'}</Text>
          <Text style={styles.resultTitle}>{passed ? 'Excellent!' : 'Keep Practicing!'}</Text>
          <Text style={[styles.resultPct, { color: passed ? '#27ae60' : '#e94560' }]}>{pct}%</Text>
          <View style={styles.resultGrid}>
            <View style={styles.resultCard}><Text style={styles.resultCardNum}>{score}</Text><Text style={styles.resultCardLabel}>Correct</Text></View>
            <View style={styles.resultCard}><Text style={styles.resultCardNum}>{questions.length - score}</Text><Text style={styles.resultCardLabel}>Wrong</Text></View>
            <View style={styles.resultCard}><Text style={styles.resultCardNum}>+{passed ? 50 : 20}</Text><Text style={styles.resultCardLabel}>Coins 🪙</Text></View>
          </View>
          <View style={styles.questionTypeRow}>
            <Text style={styles.questionTypeSub}>Question types practiced:</Text>
            <View style={styles.typePills}>
              {['Meaning', 'Tone', 'Fill blank', 'Listening', 'Chinese'].map(t => (
                <View key={t} style={styles.typePill}><Text style={styles.typePillText}>{t}</Text></View>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
            <Text style={styles.completeBtnText}>{passed ? 'Complete Lesson! ✓' : 'Mark Done & Continue'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const q = questions[index];
  const LETTERS = ['A', 'B', 'C', 'D'];

  const renderQuestion = () => {
    switch (q.type) {
      case 'listening':
        return (
          <>
            <Text style={styles.questionLabel}>🎧  LISTENING — What do you hear?</Text>
            <TouchableOpacity style={styles.speakBigBtn} onPress={() => speakChinese(q.chinese)}>
              <Ionicons name="volume-high" size={48} color="#e94560" />
              <Text style={styles.speakBigText}>Tap to hear again</Text>
            </TouchableOpacity>
          </>
        );
      case 'tone':
        return (
          <>
            <Text style={styles.questionLabel}>🎵  TONE — What tone is this word?</Text>
            <Text style={styles.questionChinese}>{q.chinese}</Text>
            <Text style={styles.questionPinyin}>{q.pinyin}</Text>
            <TouchableOpacity onPress={() => speakChinese(q.chinese)} style={styles.speakSmallBtn}>
              <Ionicons name="volume-high" size={20} color="#e94560" />
            </TouchableOpacity>
            <Text style={styles.toneHint}>Listen carefully to the tone</Text>
          </>
        );
      case 'fill_blank':
        return (
          <>
            <Text style={styles.questionLabel}>✏️  FILL IN THE BLANK</Text>
            <Text style={styles.sentenceText}>{q.sentence}</Text>
            <Text style={styles.fillHint}>{q.english} — choose the missing word</Text>
          </>
        );
      case 'ch_to_en':
        return (
          <>
            <Text style={styles.questionLabel}>📖  What does this mean?</Text>
            <Text style={styles.questionChinese}>{q.chinese}</Text>
            <Text style={styles.questionPinyin}>{q.pinyin}</Text>
            <TouchableOpacity onPress={() => speakChinese(q.chinese)} style={styles.speakSmallBtn}>
              <Ionicons name="volume-high" size={20} color="#e94560" />
            </TouchableOpacity>
          </>
        );
      case 'en_to_ch':
        return (
          <>
            <Text style={styles.questionLabel}>🇨🇳  How do you say this in Chinese?</Text>
            <Text style={styles.questionEnglish}>{q.english}</Text>
          </>
        );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson {id} Test</Text>
        <Text style={styles.counter}>{index + 1}/{questions.length}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(index / questions.length) * 100}%` }]} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.questionBox}>{renderQuestion()}</View>
        <View style={styles.choices}>
          {q.choices.map((choice, i) => {
            let bg = '#16213e';
            if (selected !== null) {
              if (i === q.correctIndex) bg = '#27ae60';
              else if (i === selected) bg = '#c0392b';
            }
            return (
              <TouchableOpacity key={i} style={[styles.choiceBtn, { backgroundColor: bg }]} onPress={() => handleAnswer(i)} activeOpacity={selected !== null ? 1 : 0.8}>
                <Text style={styles.choiceLetter}>{LETTERS[i]}</Text>
                <Text style={styles.choiceText}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
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
  progressFill: { height: 4, backgroundColor: '#f39c12', borderRadius: 2 },
  content: { padding: 20, gap: 16 },
  questionBox: { backgroundColor: '#16213e', borderRadius: 20, padding: 24, alignItems: 'center', minHeight: 180, justifyContent: 'center', gap: 8 },
  questionLabel: { fontSize: 12, color: '#888', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' },
  questionChinese: { fontSize: 56, color: '#fff', fontWeight: 'bold' },
  questionPinyin: { fontSize: 20, color: '#e94560' },
  questionEnglish: { fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  speakBigBtn: { alignItems: 'center', gap: 8 },
  speakBigText: { color: '#e94560', fontSize: 14 },
  speakSmallBtn: { padding: 8 },
  toneHint: { fontSize: 13, color: '#888', fontStyle: 'italic' },
  sentenceText: { fontSize: 26, color: '#fff', fontWeight: 'bold', textAlign: 'center', lineHeight: 38 },
  fillHint: { fontSize: 14, color: '#aaa', textAlign: 'center' },
  choices: { gap: 12 },
  choiceBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 16, gap: 14 },
  choiceLetter: { fontSize: 16, fontWeight: 'bold', color: '#e94560', width: 24 },
  choiceText: { fontSize: 16, color: '#fff', flex: 1 },
  resultContent: { padding: 24, alignItems: 'center', gap: 8 },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  resultPct: { fontSize: 56, fontWeight: 'bold' },
  resultGrid: { flexDirection: 'row', gap: 12, marginVertical: 8, width: '100%' },
  resultCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 14, padding: 16, alignItems: 'center' },
  resultCardNum: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  resultCardLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  questionTypeRow: { width: '100%', marginBottom: 8 },
  questionTypeSub: { fontSize: 13, color: '#888', marginBottom: 8 },
  typePills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typePill: { backgroundColor: '#16213e', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  typePillText: { color: '#aaa', fontSize: 12 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, alignItems: 'center', width: '100%', marginTop: 8 },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
