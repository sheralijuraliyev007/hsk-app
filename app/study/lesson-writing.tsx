import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HanziWriter, useHanziWriter } from '@jamsch/react-native-hanzi-writer';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';

function CharacterPractice({ character, onDone }: { character: string; onDone: () => void }) {
  const insets = useSafeAreaInsets();
  const writer = useHanziWriter({
    character,
    loader(char) {
      return fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json` ).then(r => r.json());
    },
  });
  const quizActive = writer.quiz.useStore(s => s.active);
  const currentStroke = writer.quiz.useStore(s => s.index ?? 0);
  const [mistakes, setMistakes] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const startQuiz = () => {
    writer.quiz.start({
      leniency: 1.2,
      showHintAfterMisses: 1,
      onMistake() { setMistakes(m => m + 1); },
      onComplete({ totalMistakes }) { setQuizDone(true); setMistakes(totalMistakes); },
    });
  };

  return (
    <View style={styles.charPractice}>
      <GestureHandlerRootView>
        <View style={styles.canvasBox}>
          <HanziWriter writer={writer} style={styles.hanziWriter}>
            <HanziWriter.Svg>
              <HanziWriter.GridLines color="#c8b89a" />
              <HanziWriter.Outline color="#d4c5a9" />
              <HanziWriter.Character color="#2c2c2c" radicalColor="#c0392b" />
              <HanziWriter.QuizStrokes color="#27ae60" />
              <HanziWriter.QuizMistakeHighlighter color="#ff4757" strokeDuration={300} />
            </HanziWriter.Svg>
          </HanziWriter>
        </View>
      </GestureHandlerRootView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {!quizActive && !quizDone && (
          <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
            <Ionicons name="pencil" size={18} color="#fff" />
            <Text style={styles.startBtnText}>Start Writing</Text>
          </TouchableOpacity>
        )}
        {quizDone && (
          <View style={styles.charDone}>
            <Text style={styles.charDoneText}>✓ Done! {mistakes} mistake{mistakes !== 1 ? 's' : ''}</Text>
            <TouchableOpacity style={styles.nextCharBtn} onPress={onDone}>
              <Text style={styles.nextCharBtnText}>Next Character</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default function LessonWritingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const chars = lesson?.writingCharacters ?? [];
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  if (!lesson) return null;
  const handleComplete = async () => { await completeActivity(id, 'writing', level); router.back(); };

  const handleCharDone = () => {
    if (index + 1 < chars.length) setIndex(index + 1);
    else setDone(true);
  };

  if (done) return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Writing</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.doneBox}>
        <Text style={styles.doneEmoji}>✍️</Text>
        <Text style={styles.doneTitle}>Writing complete!</Text>
        <Text style={styles.doneSub}>{chars.length} characters practiced</Text>
        <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
          <Text style={styles.completeBtnText}>Mark Complete & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const char = chars[index];
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Writing — Lesson {id}</Text>
        <Text style={styles.counter}>{index + 1}/{chars.length}</Text>
      </View>
      <View style={styles.charInfo}>
        <Text style={styles.charMeaning}>{char.meaning}</Text>
        <Text style={styles.charPinyin}>{char.pinyin}</Text>
        <Text style={styles.charStrokes}>{char.strokes} strokes</Text>
      </View>
      <CharacterPractice key={char.character} character={char.character} onDone={handleCharDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  counter: { fontSize: 14, color: '#888' },
  charInfo: { alignItems: 'center', paddingVertical: 16 },
  charMeaning: { fontSize: 20, color: '#fff', fontWeight: '600' },
  charPinyin: { fontSize: 16, color: '#e94560', marginTop: 4 },
  charStrokes: { fontSize: 13, color: '#888', marginTop: 4 },
  charPractice: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  footer: { alignItems: 'center', width: '100%', paddingHorizontal: 16 },
  canvasBox: { borderRadius: 20, backgroundColor: '#f5f0e8', padding: 12, shadowColor: '#e94560', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 12, borderWidth: 1, borderColor: '#2a2a5a' },
  hanziWriter: { width: 300, height: 300 },
  startBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#27ae60', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  charDone: { alignItems: 'center', gap: 12 },
  charDoneText: { fontSize: 16, color: '#27ae60', fontWeight: '600' },
  nextCharBtn: { backgroundColor: '#2980b9', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  nextCharBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  doneBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  doneEmoji: { fontSize: 64 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  doneSub: { fontSize: 16, color: '#aaa', marginTop: 6, marginBottom: 32 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
