import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HanziWriter, useHanziWriter } from '@jamsch/react-native-hanzi-writer';

type Mode = 'animate' | 'quiz';

function SingleCharDisplay({ character, mode, onQuizComplete }: {
  character: string;
  mode: Mode;
  onQuizComplete: (mistakes: number) => void;
}) {
  const writer = useHanziWriter({
    character,
    loader(char) {
      return fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json` )
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        });
    },
  });

  const animatorState = writer.animator.useStore(s => s.state);
  const quizActive = writer.quiz.useStore(s => s.active);
  const currentStroke = writer.quiz.useStore(s => s.index);
  const totalStrokes = writer.characterClass?.strokes.length ?? 0;
  const [lastCorrect, setLastCorrect] = useState(false);

  const startAnimation = () => {
    writer.animator.animateCharacter({ strokeDuration: 600, delayBetweenStrokes: 400 });
  };

  const startQuiz = () => {
    writer.quiz.start({
      leniency: 1.2,
      showHintAfterMisses: 1,
      onComplete({ totalMistakes }) {
        onQuizComplete(totalMistakes);
      },
      onCorrectStroke() {
        setLastCorrect(true);
        setTimeout(() => setLastCorrect(false), 600);
      },
    });
  };

  return (
    <View style={styles.writerContainer}>
      <View style={styles.canvasBox}>
        <HanziWriter
          writer={writer}
          style={styles.hanziWriter}
          loading={<Text style={styles.loadingText}>Loading...</Text>}
          error={<Text style={styles.errorText}>No data for "{character}"</Text>}
        >
          <HanziWriter.GridLines color="#c8b89a" />
          <HanziWriter.Svg>
            <HanziWriter.Outline color="#d4c5a9" />
            <HanziWriter.Character color="#2c2c2c" radicalColor="#c0392b" />
            <HanziWriter.QuizStrokes color="#27ae60" />
            <HanziWriter.QuizMistakeHighlighter color="#ff4757" strokeDuration={300} />
          </HanziWriter.Svg>
        </HanziWriter>
      </View>

      {mode === 'animate' && (
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={animatorState === 'playing' ? writer.animator.cancelAnimation : startAnimation}
        >
          <Ionicons name={animatorState === 'playing' ? 'stop-circle' : 'play-circle'} size={22} color="#fff" />
          <Text style={styles.actionBtnText}>{animatorState === 'playing' ? 'Stop' : 'Watch Strokes'}</Text>
        </TouchableOpacity>
      )}

      {mode === 'quiz' && !quizActive && (
        <TouchableOpacity style={styles.actionBtn} onPress={startQuiz}>
          <Ionicons name="pencil" size={22} color="#fff" />
          <Text style={styles.actionBtnText}>Start Writing</Text>
        </TouchableOpacity>
      )}

      {mode === 'quiz' && quizActive && (
        <View style={styles.hintBox}>
          <Text style={[styles.hintText, lastCorrect && styles.hintTextCorrect]}>
            {lastCorrect ? '✓ Correct!' : `Stroke ${currentStroke + 1} of ${totalStrokes || '?'}`}
          </Text>
          <Text style={styles.hintSub}>Hint appears after 1 mistake</Text>
        </View>
      )}
    </View>
  );
}

export default function WritingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { chinese, pinyin, english } = useLocalSearchParams<{
    chinese: string;
    pinyin: string;
    english: string;
  }>();

  // Split word into individual characters
  const chars = (chinese ?? '').split('').filter(c => c.trim());
  const [charIndex, setCharIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('animate');
  const [quizDone, setQuizDone] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const currentChar = chars[charIndex] ?? '';
  const isMultiChar = chars.length > 1;

  const handleQuizComplete = (totalMistakes: number) => {
    setMistakes(totalMistakes);
    setQuizDone(true);
  };

  const switchChar = (idx: number) => {
    setCharIndex(idx);
    setQuizDone(false);
    setMistakes(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={26} color="#aaa" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {mode === 'animate' ? 'Stroke Order' : 'Writing Practice'}
          </Text>
          <View style={{ width: 26 }} />
        </View>

        {/* Word info */}
        <View style={styles.wordInfo}>
          <Text style={styles.chineseText}>{chinese}</Text>
          <Text style={styles.pinyinText}>{pinyin}</Text>
          <Text style={styles.englishText}>{english}</Text>
        </View>

        {/* Character selector for multi-char words */}
        {isMultiChar && (
          <View style={styles.charSelector}>
            <Text style={styles.charSelectorLabel}>Select character:</Text>
            <View style={styles.charBtns}>
              {chars.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.charBtn, charIndex === i && styles.charBtnActive]}
                  onPress={() => switchChar(i)}
                >
                  <Text style={[styles.charBtnText, charIndex === i && styles.charBtnTextActive]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Mode toggle */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'animate' && styles.modeBtnActive]}
            onPress={() => { setMode('animate'); setQuizDone(false); }}
          >
            <Ionicons name="play-circle" size={18} color={mode === 'animate' ? '#fff' : '#888'} />
            <Text style={[styles.modeBtnText, mode === 'animate' && styles.modeBtnTextActive]}>Watch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'quiz' && styles.modeBtnActive]}
            onPress={() => { setMode('quiz'); setQuizDone(false); }}
          >
            <Ionicons name="pencil" size={18} color={mode === 'quiz' ? '#fff' : '#888'} />
            <Text style={[styles.modeBtnText, mode === 'quiz' && styles.modeBtnTextActive]}>Practice</Text>
          </TouchableOpacity>
        </View>

        {/* Character writer — key forces remount on char or mode change */}
        {!quizDone && (
          <SingleCharDisplay
            key={`${currentChar}-${mode}`}
            character={currentChar}
            mode={mode}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {/* Quiz result */}
        {quizDone && (
          <View style={styles.resultBox}>
            <Text style={styles.resultEmoji}>{mistakes === 0 ? '🏆' : mistakes <= 3 ? '👍' : '💪'}</Text>
            <Text style={styles.resultTitle}>
              {mistakes === 0 ? 'Perfect!' : mistakes <= 3 ? 'Well done!' : 'Keep practicing!'}
            </Text>
            <Text style={styles.resultSub}>{mistakes} mistake{mistakes !== 1 ? 's' : ''}</Text>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => { setQuizDone(false); setMistakes(0); }}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  wordInfo: { alignItems: 'center', marginBottom: 16 },
  chineseText: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
  pinyinText: { fontSize: 20, color: '#e94560', marginTop: 4 },
  englishText: { fontSize: 16, color: '#aaa', marginTop: 4 },
  charSelector: { marginBottom: 16, alignItems: 'center' },
  charSelectorLabel: { fontSize: 13, color: '#888', marginBottom: 8 },
  charBtns: { flexDirection: 'row', gap: 12 },
  charBtn: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#16213e', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  charBtnActive: { borderColor: '#e94560', backgroundColor: '#2a1a2e' },
  charBtnText: { fontSize: 26, color: '#aaa' },
  charBtnTextActive: { color: '#fff' },
  modeToggle: { flexDirection: 'row', backgroundColor: '#16213e', borderRadius: 12, padding: 4, marginBottom: 20, gap: 4 },
  modeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10 },
  modeBtnActive: { backgroundColor: '#e94560' },
  modeBtnText: { fontSize: 15, color: '#888', fontWeight: '600' },
  modeBtnTextActive: { color: '#fff' },
  writerContainer: { alignItems: 'center', gap: 16 },
  canvasBox: { borderRadius: 20, backgroundColor: '#f5f0e8', padding: 12, shadowColor: '#e94560', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 12, borderWidth: 1, borderColor: '#2a2a5a' },
  hanziWriter: { width: 320, height: 320 },
  loadingText: { color: '#aaa', fontSize: 16 },
  errorText: { color: '#e94560', fontSize: 14, textAlign: 'center', padding: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28 },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  hintBox: { borderRadius: 12, padding: 16, alignItems: 'center', gap: 4, minWidth: 200, backgroundColor: '#16213e' },
  hintTextCorrect: { color: '#27ae60', fontSize: 18, fontWeight: 'bold' },
  hintText: { fontSize: 15, color: '#fff', fontWeight: '600' },
  hintSub: { fontSize: 13, color: '#888' },
  resultBox: { alignItems: 'center', gap: 12, backgroundColor: '#16213e', borderRadius: 20, padding: 28 },
  resultEmoji: { fontSize: 56 },
  resultTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  resultSub: { fontSize: 16, color: '#aaa' },
});
