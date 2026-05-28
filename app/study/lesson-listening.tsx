import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { getTextbookTracksForLesson, getWorkbookTracksForLesson } from '@/src/utils/lessonAudio';

type Tab = 'textbook' | 'workbook';

export default function LessonListeningScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const [tab, setTab] = useState<Tab>('textbook');
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const textbookTracks = getTextbookTracksForLesson(level, id);
  const workbookTracks = getWorkbookTracksForLesson(level, id);
  const tracks = tab === 'textbook' ? textbookTracks : workbookTracks;

  useEffect(() => {
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  useEffect(() => {
    soundRef.current?.unloadAsync();
    soundRef.current = null;
    setPlayingIndex(null);
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
  }, [tab]);

  const playTrack = async (index: number, file: any) => {
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
      const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
      soundRef.current = sound;
      setPlayingIndex(index);
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis ?? 0);
        setDuration(status.durationMillis ?? 0);
        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlayingIndex(null);
        }
      });
    } catch (e) {
      console.warn('Playback error:', e);
    }
  };

  const togglePlay = async (index: number, file: any) => {
    if (playingIndex === index) {
      if (isPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current?.playAsync();
        setIsPlaying(true);
      }
    } else {
      await playTrack(index, file);
    }
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    await soundRef.current?.unloadAsync();
    await completeActivity(id, 'listening', level);
    router.back();
  };

  if (!lesson) return null;

  const trackLabels: Record<string, string[]> = {
    textbook: ['Warm-up', 'Dialogue 1', 'Dialogue 2', 'Pronunciation', 'Application', 'Review', 'Extra 1', 'Extra 2', 'Extra 3', 'Extra 4'],
    workbook: ['Listening Exercise 1', 'Listening Exercise 2', 'Listening Exercise 3', 'Listening Exercise 4', 'Listening Exercise 5'],
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { soundRef.current?.unloadAsync(); router.back(); }}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Listening — Lesson {id}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'textbook' && styles.tabActive]} onPress={() => setTab('textbook')}>
          <Text style={[styles.tabText, tab === 'textbook' && styles.tabTextActive]}>📖 Textbook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'workbook' && styles.tabActive]} onPress={() => setTab('workbook')}>
          <Text style={[styles.tabText, tab === 'workbook' && styles.tabTextActive]}>📝 Workbook</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tracks.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="musical-notes-outline" size={48} color="#555" />
            <Text style={styles.emptyText}>No audio tracks for this lesson</Text>
          </View>
        ) : (
          tracks.map((file, i) => {
            const isActive = playingIndex === i;
            const label = trackLabels[tab][i] ?? `Track ${i + 1}`;
            return (
              <View key={i} style={[styles.trackCard, isActive && styles.trackCardActive]}>
                <TouchableOpacity style={styles.playBtn} onPress={() => togglePlay(i, file)}>
                  <Ionicons name={isActive && isPlaying ? 'pause-circle' : 'play-circle'} size={52} color={isActive ? '#e94560' : '#2980b9'} />
                </TouchableOpacity>
                <View style={styles.trackInfo}>
                  <Text style={styles.trackLabel}>{label}</Text>
                  <Text style={styles.trackSub}>Track {i + 1} of {tracks.length}</Text>
                  {isActive && duration > 0 && (
                    <View style={styles.progressRow}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(position / duration) * 100}%` }]} />
                      </View>
                      <Text style={styles.timeText}>{formatTime(position)} / {formatTime(duration)}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
          <Text style={styles.completeBtnText}>Mark Complete & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#e94560' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '600' },
  tabTextActive: { color: '#e94560' },
  content: { padding: 16, gap: 12 },
  emptyBox: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { color: '#555', fontSize: 15 },
  trackCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 16, padding: 16, gap: 14 },
  trackCardActive: { borderWidth: 1, borderColor: '#e94560' },
  playBtn: { },
  trackInfo: { flex: 1 },
  trackLabel: { fontSize: 16, color: '#fff', fontWeight: '600' },
  trackSub: { fontSize: 13, color: '#888', marginTop: 2 },
  progressRow: { marginTop: 8, gap: 4 },
  progressBar: { height: 4, backgroundColor: '#2a2a4a', borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: '#e94560', borderRadius: 2 },
  timeText: { fontSize: 12, color: '#888' },
  footer: { padding: 16 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
