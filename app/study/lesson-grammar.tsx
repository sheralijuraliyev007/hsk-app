import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { completeActivity } from '@/src/utils/database';

export default function LessonGrammarScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const points = lesson?.grammarPoints ?? [];
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  if (!lesson) return null;

  const handleComplete = async () => { await completeActivity(id, 'grammar', level); router.back(); };

  if (done) return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Grammar</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.doneBox}>
        <Text style={styles.doneEmoji}>📚</Text>
        <Text style={styles.doneTitle}>Grammar complete!</Text>
        <Text style={styles.doneSub}>{points.length} grammar point{points.length !== 1 ? 's' : ''} studied</Text>
        <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
          <Text style={styles.completeBtnText}>Mark Complete & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const point = points[index];
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Grammar — Lesson {id}</Text>
        <Text style={styles.counter}>{index + 1}/{points.length}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleBox}>
          <Text style={styles.pointTitle}>{point.titleChinese}</Text>
          <Text style={styles.pointTitleEn}>{point.titleEnglish}</Text>
        </View>
        <View style={styles.structureBox}>
          <Text style={styles.structureLabel}>STRUCTURE</Text>
          <Text style={styles.structureText}>{point.structure}</Text>
        </View>
        <Text style={styles.explanation}>{point.explanation}</Text>
        <Text style={styles.examplesLabel}>EXAMPLES</Text>
        {point.examples.map((ex, i) => (
          <View key={i} style={styles.exampleCard}>
            <Text style={styles.exChinese}>{ex.chinese}</Text>
            <Text style={styles.exPinyin}>{ex.pinyin}</Text>
            <Text style={styles.exEnglish}>{ex.english}</Text>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {index + 1 < points.length ? (
          <TouchableOpacity style={styles.nextBtn} onPress={() => setIndex(index + 1)}>
            <Text style={styles.nextBtnText}>Next Point</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={() => setDone(true)}>
            <Text style={styles.nextBtnText}>Finish Grammar</Text>
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
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  counter: { fontSize: 14, color: '#888' },
  content: { padding: 20 },
  titleBox: { marginBottom: 20 },
  pointTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  pointTitleEn: { fontSize: 16, color: '#aaa', marginTop: 4 },
  structureBox: { backgroundColor: '#8e44ad22', borderLeftWidth: 4, borderLeftColor: '#8e44ad', borderRadius: 10, padding: 16, marginBottom: 20 },
  structureLabel: { fontSize: 11, color: '#8e44ad', letterSpacing: 1, marginBottom: 6 },
  structureText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  explanation: { fontSize: 15, color: '#ccc', lineHeight: 24, marginBottom: 24 },
  examplesLabel: { fontSize: 11, color: '#888', letterSpacing: 1, marginBottom: 12 },
  exampleCard: { backgroundColor: '#16213e', borderRadius: 14, padding: 16, marginBottom: 12 },
  exChinese: { fontSize: 20, color: '#fff', fontWeight: '600' },
  exPinyin: { fontSize: 14, color: '#e94560', marginTop: 4 },
  exEnglish: { fontSize: 14, color: '#aaa', marginTop: 4 },
  footer: { padding: 16 },
  nextBtn: { backgroundColor: '#8e44ad', borderRadius: 14, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  doneBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  doneEmoji: { fontSize: 64 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  doneSub: { fontSize: 16, color: '#aaa', marginTop: 6, marginBottom: 32 },
  completeBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center' },
  completeBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
