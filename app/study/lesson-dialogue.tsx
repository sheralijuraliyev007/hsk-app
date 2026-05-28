import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, GestureResponderEvent } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { playAudioFile, stopCurrentSound } from '@/src/utils/audio';
import { getTextbookTrack } from '@/src/utils/lessonAudio';
import { Audio } from 'expo-av';

export default function LessonDialogueScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const dialogues = lesson?.dialogues ?? [];
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  if (!lesson) return null;
  const handleComplete = async () => { await completeActivity(id, 'dialogue', level); router.back(); };
  const formatTime = (millis: number) => {
    const totalSeconds = Math.max(0, Math.floor(millis / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis ?? 0);
    setDuration(status.durationMillis ?? 0);
    setIsPlaying(Boolean(status.isPlaying));
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  useEffect(() => {
    return () => {
      void stopCurrentSound();
      soundRef.current = null;
    };
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
    void stopCurrentSound();
    soundRef.current = null;
  }, [dialogueIndex]);

  if (done) return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Dialogue</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.doneBox}>
        <Text style={styles.doneEmoji}>💬</Text>
        <Text style={styles.doneTitle}>Dialogues complete!</Text>
        <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
          <Text style={styles.completeBtnText}>Mark Complete & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const dialogue = dialogues[dialogueIndex];

  const playDialogueTrack = async () => {
    if (!lesson || !dialogue) return;
    await stopCurrentSound();
    const [lessonNumStr, trackNumStr] = dialogue.trackNumber.split('-');
    const lessonNum = parseInt(lessonNumStr, 10);
    const trackNum = parseInt(trackNumStr, 10);

    const audioFile = getTextbookTrack(level, lessonNum, trackNum);
    if (audioFile) {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
        });
        const sound = await playAudioFile(audioFile, onPlaybackStatusUpdate, false);
        soundRef.current = sound;
        setIsPlaying(true);
      } catch (e) {
        console.error('Error playing dialogue audio:', e);
      }
    } else {
      console.warn(`Audio file not found for HSK${level}-TB-${dialogue.trackNumber}`);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) {
      await playDialogueTrack();
      return;
    }
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) {
      soundRef.current = null;
      await playDialogueTrack();
      return;
    }
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleSeek = async (value: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(value);
    setPosition(value);
  };

  const handleSeekPress = async (event: GestureResponderEvent) => {
    if (!duration || !progressBarWidth) return;
    const ratio = Math.min(1, Math.max(0, event.nativeEvent.locationX / progressBarWidth));
    const seekTo = Math.floor(duration * ratio);
    await handleSeek(seekTo);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{dialogue.titleEnglish}</Text>
        <Text style={styles.counter}>{dialogueIndex + 1}/{dialogues.length}</Text>
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={48} color="#16a085" />
        </TouchableOpacity>
        <View style={styles.sliderWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.progressBarBg}
            onLayout={(event) => setProgressBarWidth(event.nativeEvent.layout.width)}
            onPress={handleSeekPress}
          >
            <View style={[styles.progressBarFill, { width: `${duration > 0 ? (position / duration) * 100 : 0}%` }]} />
          </TouchableOpacity>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.trackText}>Track {dialogue.trackNumber}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {dialogue.lines.map((line, i) => (
          <View key={i} style={[styles.lineRow, line.speaker === 'B' && styles.lineRowB]}>
            <View style={[styles.speakerBubble, line.speaker === 'B' && styles.speakerBubbleB]}>
              <Text style={styles.speakerLabel}>{line.speaker}</Text>
            </View>
            <View style={[styles.bubble, line.speaker === 'B' && styles.bubbleB]}>
              <Text style={styles.bubbleChinese}>{line.chinese}</Text>
              <Text style={styles.bubblePinyin}>{line.pinyin}</Text>
              {showTranslation && <Text style={styles.bubbleEnglish}>{line.english}</Text>}
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.translateBtn} onPress={() => setShowTranslation(!showTranslation)}>
          <Ionicons name={showTranslation ? 'eye-off' : 'eye'} size={18} color="#16a085" />
          <Text style={styles.translateBtnText}>{showTranslation ? 'Hide' : 'Show'} Translation</Text>
        </TouchableOpacity>
        {dialogueIndex + 1 < dialogues.length ? (
          <TouchableOpacity style={styles.nextBtn} onPress={() => { setDialogueIndex(dialogueIndex + 1); setShowTranslation(false); }}>
            <Text style={styles.nextBtnText}>Next Dialogue</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={() => setDone(true)}>
            <Text style={styles.nextBtnText}>Finish Dialogues</Text>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff', flex: 1, textAlign: 'center' },
  counter: { fontSize: 14, color: '#888' },
  controllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#16213e',
    marginHorizontal: 16,
    borderRadius: 12,
    gap: 12,
  },
  sliderWrapper: { flex: 1, gap: 8 },
  progressBarBg: { height: 6, backgroundColor: '#1a1a3a', borderRadius: 3, justifyContent: 'center' },
  progressBarFill: { height: 6, backgroundColor: '#16a085', borderRadius: 3 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeText: { color: '#888', fontSize: 10 },
  trackText: { fontSize: 13, color: '#16a085' },
  content: { padding: 16, gap: 12 },
  lineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  lineRowB: { flexDirection: 'row-reverse' },
  speakerBubble: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2980b9', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  speakerBubbleB: { backgroundColor: '#16a085' },
  speakerLabel: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  bubble: { flex: 1, backgroundColor: '#16213e', borderRadius: 16, borderTopLeftRadius: 4, padding: 14 },
  bubbleB: { backgroundColor: '#0d2a22', borderTopLeftRadius: 16, borderTopRightRadius: 4 },
  bubbleChinese: { fontSize: 18, color: '#fff', fontWeight: '600' },
  bubblePinyin: { fontSize: 13, color: '#e94560', marginTop: 4 },
  bubbleEnglish: { fontSize: 13, color: '#aaa', marginTop: 6, fontStyle: 'italic' },
  footer: { padding: 16, gap: 10 },
  translateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  translateBtnText: { color: '#16a085', fontSize: 14, fontWeight: '600' },
  nextBtn: { backgroundColor: '#16a085', borderRadius: 14, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  doneBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  doneEmoji: { fontSize: 64 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 12, marginBottom: 32 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
