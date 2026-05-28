import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { speakChinese } from '@/src/utils/audio';

type MicState = 'idle' | 'recording' | 'recorded';

export default function LessonSpeakingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const prompts = lesson?.speakingPrompts ?? [];

  const [index, setIndex] = useState(0);
  const [played, setPlayed] = useState(false);
  const [micState, setMicState] = useState<MicState>('idle');
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const playbackRef = useRef<Audio.Sound | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const extractChinese = (prompt: string): string => {
    const match = prompt.match(/[\u4e00-\u9fff\uff01-\uff0f！？。，、]+/g);
    return match ? match.join('') : prompt;
  };

  const currentPrompt = prompts[index] ?? '';
  const targetChinese = extractChinese(currentPrompt);

  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => {});
        recordingRef.current = null;
      }
      if (playbackRef.current) {
        playbackRef.current.unloadAsync().catch(() => {});
        playbackRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setMicState('recording');
      setRecordingUri(null);

      // Start pulse animation
      pulseAnimRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      pulseAnimRef.current.start();
    } catch (e) {
      console.error('Failed to start recording:', e);
    }
  };

  const stopRecording = async () => {
    try {
      pulseAnimRef.current?.stop();
      pulseAnim.setValue(1);
      await recordingRef.current?.stopAndUnloadAsync();
      const uri = recordingRef.current?.getURI();
      setRecordingUri(uri ?? null);
      recordingRef.current = null;
      setMicState('recorded');
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
    } catch (e) {
      console.error('Failed to stop recording:', e);
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;
    try {
      if (playbackRef.current) {
        await playbackRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );
      playbackRef.current = sound;
      setIsPlayingBack(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlayingBack(false);
          sound.unloadAsync();
        }
      });
    } catch (e) {
      console.error('Failed to play recording:', e);
    }
  };

  const handlePlay = () => {
    speakChinese(targetChinese);
    setPlayed(true);
  };

  const handleNext = async () => {
    setPlayed(false);
    setMicState('idle');
    setRecordingUri(null);
    setIsPlayingBack(false);
    if (index + 1 < prompts.length) {
      setIndex(index + 1);
    } else {
      await completeActivity(id, 'speaking', level);
      router.back();
    }
  };

  if (!lesson) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Speaking — Lesson {id}</Text>
        <Text style={styles.counter}>{index + 1}/{prompts.length}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(index / prompts.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Step 1: Listen */}
        <View style={styles.stepCard}>
          <View style={styles.stepBadge}><Text style={styles.stepNum}>1</Text></View>
          <Text style={styles.stepTitle}>Listen to the pronunciation</Text>
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{currentPrompt}</Text>
          </View>
          <TouchableOpacity style={[styles.playBtn, played && styles.playBtnDone]} onPress={handlePlay}>
            <Ionicons name={played ? 'volume-high' : 'play-circle'} size={22} color="#fff" />
            <Text style={styles.playBtnText}>{played ? 'Play again' : 'Hear pronunciation'}</Text>
          </TouchableOpacity>
        </View>

        {/* Step 2: Record yourself */}
        {played && (
          <View style={[styles.stepCard, micState === 'recording' ? styles.stepCardRecording : micState === 'recorded' ? styles.stepCardDone : null]}>
            <View style={styles.stepBadge}><Text style={styles.stepNum}>2</Text></View>
            <Text style={styles.stepTitle}>
              {micState === 'idle' ? 'Now record yourself saying it' :
               micState === 'recording' ? 'Recording... tap to stop' :
               'Listen to yourself & compare!'}
            </Text>

            <View style={styles.micArea}>
              {micState !== 'recorded' ? (
                <TouchableOpacity onPress={micState === 'idle' ? startRecording : stopRecording}>
                  <Animated.View style={[
                    styles.micBtn,
                    micState === 'recording' && styles.micBtnActive,
                    { transform: [{ scale: pulseAnim }] }
                  ]}>
                    <Ionicons
                      name={micState === 'recording' ? 'stop' : 'mic'}
                      size={44}
                      color="#fff"
                    />
                  </Animated.View>
                </TouchableOpacity>
              ) : (
                <View style={styles.recordedActions}>
                  {/* Play back your recording */}
                  <TouchableOpacity style={styles.playbackBtn} onPress={playRecording} disabled={isPlayingBack}>
                    <Ionicons name={isPlayingBack ? 'volume-high' : 'play'} size={22} color="#fff" />
                    <Text style={styles.playbackBtnText}>{isPlayingBack ? 'Playing...' : 'Hear yourself'}</Text>
                  </TouchableOpacity>
                  {/* Re-record */}
                  <TouchableOpacity style={styles.rerecordBtn} onPress={() => { setMicState('idle'); setRecordingUri(null); }}>
                    <Ionicons name="refresh" size={18} color="#aaa" />
                    <Text style={styles.rerecordBtnText}>Record again</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.micHint}>
                {micState === 'idle' ? 'Tap mic to start' :
                 micState === 'recording' ? '🔴 Recording...' :
                 'How did you sound?'}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {micState === 'recorded' && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {index + 1 < prompts.length ? 'Next Prompt →' : 'Complete ✓'}
            </Text>
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
  progressFill: { height: 4, backgroundColor: '#e94560', borderRadius: 2 },
  content: { padding: 20, gap: 20 },
  stepCard: { backgroundColor: '#16213e', borderRadius: 20, padding: 20, gap: 14 },
  stepCardRecording: { backgroundColor: '#2d0a10' },
  stepCardDone: { backgroundColor: '#0d2416' },
  stepBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e94560', alignItems: 'center', justifyContent: 'center' },
  stepNum: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  stepTitle: { fontSize: 16, color: '#ccc', fontWeight: '600' },
  promptBox: { backgroundColor: '#0d1b2e', borderRadius: 14, padding: 20, alignItems: 'center' },
  promptText: { fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  playBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 14 },
  playBtnDone: { backgroundColor: '#2980b9' },
  playBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  micArea: { alignItems: 'center', gap: 14 },
  micBtn: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e94560', alignItems: 'center', justifyContent: 'center', shadowColor: '#e94560', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 },
  micBtnActive: { backgroundColor: '#c0392b' },
  micHint: { fontSize: 14, color: '#888', textAlign: 'center' },
  recordedActions: { gap: 10, width: '100%' },
  playbackBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#2980b9', borderRadius: 14, paddingVertical: 14 },
  playbackBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  rerecordBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  rerecordBtnText: { color: '#aaa', fontSize: 14 },
  footer: { paddingHorizontal: 16 },
  nextBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
