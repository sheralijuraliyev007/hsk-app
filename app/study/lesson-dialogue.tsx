import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';
import { playAudioFile } from '@/src/utils/audio';
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

  if (!lesson) return null;
  const handleComplete = async () => { await completeActivity(id, 'dialogue', level); router.back(); };

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
        await playAudioFile(audioFile);
      } catch (e) {
        console.error('Error playing dialogue audio:', e);
      }
    } else {
      console.warn(`Audio file not found for HSK${level}-TB-${dialogue.trackNumber}`);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{dialogue.titleEnglish}</Text>
        <Text style={styles.counter}>{dialogueIndex + 1}/{dialogues.length}</Text>
      </View>
      <TouchableOpacity style={styles.trackBadge} onPress={playDialogueTrack}>
        <Ionicons name="musical-note" size={14} color="#16a085" />
        <Text style={styles.trackText}>Track {dialogue.trackNumber}</Text>
        <Ionicons name="play-circle-outline" size={18} color="#16a085" />
      </TouchableOpacity>
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
  trackBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 8 },
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
