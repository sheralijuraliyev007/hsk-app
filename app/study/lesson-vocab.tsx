import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { getAudioForWord } from '@/src/utils/audio';

type Phase = 'learn' | 'review' | 'done';

export default function LessonVocabScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const vocab = lesson?.vocabulary ?? [];

  const [phase, setPhase] = useState<Phase>('learn');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  const playAudio = async (word: string) => {
    console.log('[AUDIO] playAudio called with:', word);
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });
      const audioFile = getAudioForWord(word);
      console.log('[AUDIO] audioFile found:', audioFile != null, 'for word:', word);
      if (!audioFile) {
        console.log('[AUDIO] No file, using TTS for:', word);
        Speech.speak(word, { language: 'zh-CN' });
        return;
      }
      const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (e) {
      Speech.speak(word, { language: 'zh-CN' });
    }
  };

  const list = phase === 'review' ? vocab.filter(w => unknown.includes(w.id)) : vocab;
  const currentWord = list[index];

  const flip = () => {
    if (flipped) return;
    Animated.spring(flipAnim, { toValue: 1, useNativeDriver: true }).start();
    setFlipped(true);
  };

  const handleKnow = () => {
    setKnown(prev => [...prev, currentWord.id]);
    nextCard();
  };

  const handleDontKnow = () => {
    setUnknown(prev => [...prev, currentWord.id]);
    nextCard();
  };

  const nextCard = () => {
    flipAnim.setValue(0);
    setFlipped(false);
    if (index + 1 < list.length) {
      setIndex(index + 1);
    } else if (phase === 'learn') {
      if (unknown.length > 0) {
        setPhase('review');
        setIndex(0);
        setUnknown([]);
      } else {
        setPhase('done');
      }
    } else {
      setPhase('done');
    }
  };

  const handleComplete = async () => {
    await completeActivity(id, 'vocab', level);
    router.back();
  };

  const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  if (!lesson) return null;

  if (phase === 'done') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vocabulary</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.doneContainer}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneTitle}>All words learned!</Text>
          <Text style={styles.doneSub}>{vocab.length} words from Lesson {id}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{known.length}</Text>
              <Text style={styles.statLabel}>Known</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{unknown.length}</Text>
              <Text style={styles.statLabel}>Reviewed</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
            <Text style={styles.completeBtnText}>Mark Complete & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const progress = (index / list.length) * 100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{phase === 'review' ? 'Review' : 'Vocabulary'} — Lesson {id}</Text>
        <Text style={styles.counter}>{index + 1}/{list.length}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {phase === 'review' && (
        <View style={styles.reviewBanner}>
          <Ionicons name="refresh" size={14} color="#f39c12" />
          <Text style={styles.reviewBannerText}>Reviewing words you missed</Text>
        </View>
      )}

      <View style={styles.cardArea}>
        {/* Card stack — fixed height so touches register correctly */}
        <View style={styles.cardStack}>
          {/* FRONT */}
          <Animated.View style={[styles.card, styles.cardFront, { transform: [{ rotateY: frontRotate }] }]}>
            <Text style={styles.partOfSpeech}>{currentWord?.partOfSpeech?.toUpperCase()}</Text>
            <Text style={styles.chineseText}>{currentWord?.chinese}</Text>
            <Text style={styles.pinyinText}>{currentWord?.pinyin}</Text>
          </Animated.View>

          {/* BACK */}
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backRotate }] }]}>
            <Text style={styles.englishText}>{currentWord?.english}</Text>
            <Text style={styles.pinyinSmall}>{currentWord?.pinyin}</Text>
          </Animated.View>
        </View>

        {/* Speaker button — outside card stack so touches always register */}
        <TouchableOpacity
          style={styles.speakBtn}
          onPress={() => playAudio(currentWord.chinese)}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <Ionicons name="volume-high" size={28} color="#e94560" />
        </TouchableOpacity>

        {/* Tap-to-flip area — below the card, clearly separate from speaker */}
        {!flipped && (
          <TouchableOpacity style={styles.flipBtn} onPress={flip} activeOpacity={0.7}>
            <Ionicons name="eye-outline" size={18} color="#888" />
            <Text style={styles.flipBtnText}>Tap to reveal meaning</Text>
          </TouchableOpacity>
        )}
      </View>

      {flipped && (
        <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={[styles.actionBtn, styles.dontKnowBtn]} onPress={handleDontKnow}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Review Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.knowBtn]} onPress={handleKnow}>
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Got It!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  counter: { fontSize: 14, color: '#888' },
  progressBar: { height: 4, backgroundColor: '#1a1a3a', marginHorizontal: 16 },
  progressFill: { height: 4, backgroundColor: '#2980b9', borderRadius: 2 },
  reviewBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#2a1f00', paddingHorizontal: 16, paddingVertical: 8, marginTop: 8, marginHorizontal: 16, borderRadius: 10 },
  reviewBannerText: { color: '#f39c12', fontSize: 13 },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, gap: 20 },
  cardStack: { width: '100%', height: 320 },
  card: { width: '100%', height: 320, borderRadius: 24, justifyContent: 'center', alignItems: 'center', padding: 24, backfaceVisibility: 'hidden', position: 'absolute' },
  cardFront: { backgroundColor: '#16213e' },
  cardBack: { backgroundColor: '#1a1a3a' },
  partOfSpeech: { fontSize: 11, color: '#888', letterSpacing: 1.5, marginBottom: 8 },
  chineseText: { fontSize: 72, color: '#fff', fontWeight: 'bold' },
  pinyinText: { fontSize: 22, color: '#e94560', marginTop: 8 },
  speakBtn: { marginTop: 20, padding: 12, backgroundColor: '#1e2d50', borderRadius: 50 },
  englishText: { fontSize: 32, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  pinyinSmall: { fontSize: 18, color: '#e94560', marginTop: 12 },
  flipBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#16213e', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 50, borderWidth: 1, borderColor: '#2a2a4a' },
  flipBtnText: { color: '#888', fontSize: 15 },
  actions: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingBottom: 32 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 16 },
  dontKnowBtn: { backgroundColor: '#2a2a4a' },
  knowBtn: { backgroundColor: '#27ae60' },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  doneContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  doneEmoji: { fontSize: 64 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  doneSub: { fontSize: 16, color: '#aaa', marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 16, marginTop: 28, marginBottom: 32 },
  statBox: { backgroundColor: '#16213e', borderRadius: 16, padding: 20, alignItems: 'center', minWidth: 100 },
  statNum: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 13, color: '#888', marginTop: 4 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});