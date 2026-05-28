import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonsByLevel, SupportedHskLevel } from '@/src/data/lessons';
import { getAllLessonProgress, getUserStats } from '@/src/utils/database';

type LessonStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

interface LessonNode {
  id: number;
  title: string;
  titleChinese: string;
  status: LessonStatus;
  completedActivities: string[];
}

const LESSON_ICONS: Record<number, string> = {
  1:  'hand-left',
  2:  'heart',
  3:  'person',
  4:  'school',
  5:  'people',
  6:  'chatbubbles',
  7:  'calendar',
  8:  'cafe',
  9:  'briefcase',
  10: 'restaurant',
  11: 'time',
  12: 'partly-sunny',
  13: 'flame',
  14: 'bag',
  15: 'airplane',
};

const NODE_POSITIONS = [
  { left: '50%' }, { left: '70%' }, { left: '50%' }, { left: '30%' }, { left: '50%' },
  { left: '70%' }, { left: '50%' }, { left: '30%' }, { left: '50%' }, { left: '70%' },
  { left: '50%' }, { left: '30%' }, { left: '50%' }, { left: '70%' }, { left: '50%' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [lessons, setLessons] = useState<LessonNode[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<SupportedHskLevel>(1);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [toast, setToast] = useState('');

  const loadProgress = useCallback(async () => {
    const [progressRows, stats] = await Promise.all([
      getAllLessonProgress(selectedLevel),
      getUserStats(),
    ]);
    const progressMap = new Map(progressRows.map(r => [r.lesson_id, r]));
    const levelLessons = getLessonsByLevel(selectedLevel);
    const nodes: LessonNode[] = levelLessons.map(lesson => {
      const row = progressMap.get(lesson.id);
      return {
        id: lesson.id,
        title: lesson.titleEnglish,
        titleChinese: lesson.titleChinese,
        status: (row?.status as LessonStatus) ?? 'locked',
        completedActivities: row ? JSON.parse(row.completed_activities) : [],
      };
    });
    setLessons(nodes);
    setCoins(stats?.total_coins ?? 0);
    setStreak(stats?.current_streak ?? 0);
  }, [selectedLevel]);

  useFocusEffect(useCallback(() => { loadProgress(); }, [loadProgress]));

  const handleNodePress = (lesson: LessonNode) => {
    if (lesson.status === 'locked') {
      setToast('Complete the previous lesson first!');
      setTimeout(() => setToast(''), 2500);
      return;
    }
    router.push({ pathname: '/study/lesson', params: { lessonId: lesson.id, hskLevel: selectedLevel } });
  };

  const getNodeColor = (status: LessonStatus) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in_progress': return '#e94560';
      case 'unlocked': return '#2980b9';
      default: return '#2a2a4a';
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Standard Course</Text>
          <Text style={styles.headerTitle}>HSK {selectedLevel}</Text>
        </View>
        <View style={styles.headerStats}>
          <View style={styles.statChip}>
            <Text style={styles.statEmoji}>🪙</Text>
            <Text style={styles.statText}>{coins}</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statText}>{streak}</Text>
          </View>
        </View>
      </View>

      <View style={styles.levelTabs}>
        <TouchableOpacity style={[styles.levelTab, selectedLevel === 1 && styles.levelTabActive]} onPress={() => setSelectedLevel(1)}>
          <Text style={[styles.levelTabText, selectedLevel === 1 && styles.levelTabTextActive]}>HSK 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.levelTab, selectedLevel === 2 && styles.levelTabActive]} onPress={() => setSelectedLevel(2)}>
          <Text style={[styles.levelTabText, selectedLevel === 2 && styles.levelTabTextActive]}>HSK 2</Text>
        </TouchableOpacity>
      </View>

      {/* Lesson Path */}
      <ScrollView contentContainerStyle={styles.pathContainer} showsVerticalScrollIndicator={false}>
        {lessons.map((lesson, index) => {
          const pos = NODE_POSITIONS[index] ?? { left: '50%' };
          const color = getNodeColor(lesson.status);
          const isActive = lesson.status !== 'locked';
          return (
            <View key={lesson.id} style={[styles.nodeWrapper, { alignItems: pos.left === '30%' ? 'flex-start' : pos.left === '70%' ? 'flex-end' : 'center' }]}>
              <TouchableOpacity
                style={[styles.node, { backgroundColor: color, opacity: lesson.status === 'locked' ? 0.4 : 1 }]}
                onPress={() => handleNodePress(lesson)}
                activeOpacity={0.8}
              >
                {lesson.status === 'completed' ? (
                  <Ionicons name="checkmark" size={32} color="#fff" />
                ) : (
                  <Ionicons name={(LESSON_ICONS[lesson.id] ?? 'book') as any} size={28} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={[styles.nodeLabel, { color: isActive ? '#fff' : '#555' }]} numberOfLines={1}>
                {lesson.id}. {lesson.titleChinese}
              </Text>
              {lesson.status === 'in_progress' && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(lesson.completedActivities.length / 8) * 100}%` }]} />
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Toast */}
      {toast !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerSub: { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  levelTabs: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, paddingBottom: 10 },
  levelTab: { flex: 1, backgroundColor: '#16213e', borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  levelTabActive: { borderWidth: 1, borderColor: '#e94560' },
  levelTabText: { color: '#888', fontWeight: '600' },
  levelTabTextActive: { color: '#fff' },
  headerStats: { flexDirection: 'row', gap: 10 },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#16213e', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  statEmoji: { fontSize: 16 },
  statText: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  pathContainer: { paddingVertical: 20, paddingHorizontal: 20 },
  nodeWrapper: { width: '100%', marginBottom: 24, paddingHorizontal: 10 },
  node: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  nodeLabel: { fontSize: 12, marginTop: 6, maxWidth: 100, textAlign: 'center' },
  progressBar: { width: 72, height: 4, backgroundColor: '#1a1a3a', borderRadius: 2, marginTop: 4 },
  progressFill: { height: 4, backgroundColor: '#e94560', borderRadius: 2 },
  toast: { position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#333', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
  toastText: { color: '#fff', fontSize: 14 },
});
