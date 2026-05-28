import { useState, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Modal } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, SupportedHskLevel } from '@/src/data/lessons';
import { getLessonProgress } from '@/src/utils/database';

const ACTIVITIES = [
  { id: 'vocab',     label: 'Vocabulary',  icon: 'book-outline',         color: '#2980b9', desc: 'Learn new words' },
  { id: 'grammar',   label: 'Grammar',     icon: 'school-outline',       color: '#8e44ad', desc: 'Study grammar points' },
  { id: 'dialogue',  label: 'Dialogue',    icon: 'chatbubbles-outline',  color: '#16a085', desc: 'Read & listen to dialogues' },
  { id: 'speaking',  label: 'Speaking',    icon: 'mic-outline',          color: '#e67e22', desc: 'Practice speaking aloud' },
  { id: 'listening', label: 'Listening',   icon: 'headset-outline',      color: '#c0392b', desc: 'Train your ear' },
  { id: 'writing',   label: 'Writing',     icon: 'pencil-outline',       color: '#27ae60', desc: 'Stroke order & tracing' },
  { id: 'scramble',  label: 'Scramble',    icon: 'shuffle-outline',      color: '#8e44ad', desc: 'Arrange the characters' },
  { id: 'test',      label: 'Lesson Test', icon: 'trophy-outline',       color: '#f39c12', desc: 'Test what you learned' },
];

const ALL_ACTIVITIES = ACTIVITIES.map(a => a.id);

// Floating coin component for celebration
function FloatingCoin({ delay, x }: { delay: number; x: `${number}%` }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(anim, { toValue: 1, duration: 1200, useNativeDriver: true }),
    ]).start();
  }, []);
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -300] });
  const opacity = anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] });
  return (
    <Animated.Text style={[styles.floatingCoin, { left: x, transform: [{ translateY }], opacity }]}>
      🪙
    </Animated.Text>
  );
}

export default function LessonScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId, hskLevel } = useLocalSearchParams<{ lessonId: string; hskLevel?: string }>();
  const id = Number(lessonId);
  const level: SupportedHskLevel = hskLevel === '2' ? 2 : 1;
  const lesson = getLessonById(level, id);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  // celebrationShown is now persisted in AsyncStorage
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    const checkAndShow = async () => {
      const row = await getLessonProgress(id, level);
      if (!row) return;
      const acts: string[] = JSON.parse(row.completed_activities);
      setCompletedActivities(acts);
      const isComplete = ALL_ACTIVITIES.every(a => acts.includes(a));
      if (isComplete) {
        const key = `celebration_shown_lesson_${level}_${id}`;
        const alreadyShown = await AsyncStorage.getItem(key);
        if (!alreadyShown) {
          await AsyncStorage.setItem(key, '1');
          setTimeout(() => {
            setShowCelebration(true);
            Animated.parallel([
              Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
              Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            ]).start();
          }, 400);
        }
      }
    };
    checkAndShow();
  }, [id, level]));

  if (!lesson) return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>Lesson not found</Text>
    </View>
  );

  const handleActivityPress = (activityId: string) => {
    const params = { lessonId: String(id), hskLevel: String(level) };
    switch (activityId) {
      case 'vocab':     router.push({ pathname: '/study/lesson-vocab',     params }); break;
      case 'grammar':   router.push({ pathname: '/study/lesson-grammar',   params }); break;
      case 'dialogue':  router.push({ pathname: '/study/lesson-dialogue',  params }); break;
      case 'speaking':  router.push({ pathname: '/study/lesson-speaking',  params }); break;
      case 'listening': router.push({ pathname: '/study/lesson-listening', params }); break;
      case 'writing':   router.push({ pathname: '/study/lesson-writing',   params }); break;
      case 'scramble':  router.push({ pathname: '/study/lesson-scramble', params }); break;
      case 'test':      router.push({ pathname: '/study/lesson-test',      params }); break;
    }
  };

  const completedCount = completedActivities.length;
  const totalCount = ACTIVITIES.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const COIN_POSITIONS: `${number}%`[] = ['10%', '25%', '40%', '55%', '70%', '85%', '15%', '60%', '30%', '75%'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.lessonNum}>HSK {level} • Lesson {lesson.id}</Text>
          <Text style={styles.lessonTitle}>{lesson.titleChinese}</Text>
          <Text style={styles.lessonSub}>{lesson.titleEnglish}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{completedCount}/{totalCount} activities</Text>
          <Text style={styles.progressPct}>{progressPct}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {/* Activity Cards */}
      <ScrollView contentContainerStyle={styles.activitiesList} showsVerticalScrollIndicator={false}>
        {ACTIVITIES.map((activity, index) => {
          const isDone = completedActivities.includes(activity.id);
          const isLocked = index > 0 && !completedActivities.includes(ACTIVITIES[index - 1].id) && !isDone;
          return (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityCard, isDone && styles.activityCardDone, isLocked && styles.activityCardLocked]}
              onPress={() => !isLocked && handleActivityPress(activity.id)}
              activeOpacity={isLocked ? 1 : 0.8}
            >
              <View style={[styles.activityIcon, { backgroundColor: isDone ? '#27ae60' : isLocked ? '#2a2a4a' : activity.color }]}>
                <Ionicons name={isDone ? 'checkmark' : isLocked ? 'lock-closed' : activity.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={[styles.activityLabel, isLocked && styles.textMuted]}>{activity.label}</Text>
                <Text style={[styles.activityDesc, isLocked && styles.textMuted]}>{activity.desc}</Text>
              </View>
              {!isLocked && !isDone && <Ionicons name="chevron-forward" size={20} color="#555" />}
              {isDone && <Text style={styles.doneText}>Done ✓</Text>}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Celebration Modal */}
      <Modal visible={showCelebration} transparent animationType="none">
        <Animated.View style={[styles.celebrationBg, { opacity: fadeAnim }]}>
          {/* Floating coins */}
          {COIN_POSITIONS.map((x, i) => (
            <FloatingCoin key={i} delay={i * 80} x={x} />
          ))}
          {/* Card */}
          <Animated.View style={[styles.celebrationCard, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.celebTrophy}>🏆</Text>
            <Text style={styles.celebTitle}>Lesson {id} Complete!</Text>
            <Text style={styles.celebSubtitle}>{lesson.titleChinese} — {lesson.titleEnglish}</Text>
            <View style={styles.celebStatsRow}>
              <View style={styles.celebStat}>
                <Text style={styles.celebStatNum}>{totalCount}/{totalCount}</Text>
                <Text style={styles.celebStatLabel}>Activities</Text>
              </View>
              <View style={styles.celebStat}>
                <Text style={styles.celebStatNum}>+{totalCount * 10 + 50}</Text>
                <Text style={styles.celebStatLabel}>Coins 🪙</Text>
              </View>
              <View style={styles.celebStat}>
                <Text style={styles.celebStatNum}>🔥</Text>
                <Text style={styles.celebStatLabel}>Streak!</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.celebBtn}
              onPress={() => { setShowCelebration(false); router.back(); }}
            >
              <Text style={styles.celebBtnText}>Continue →</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  lessonNum: { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 },
  lessonTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 2 },
  lessonSub: { fontSize: 14, color: '#aaa' },
  progressSection: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 13, color: '#888' },
  progressPct: { fontSize: 13, color: '#e94560', fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: '#1a1a3a', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#e94560', borderRadius: 3 },
  activitiesList: { padding: 16, gap: 12 },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 16, padding: 16, gap: 14 },
  activityCardDone: { borderWidth: 1, borderColor: '#27ae60' },
  activityCardLocked: { opacity: 0.5 },
  activityIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  activityInfo: { flex: 1 },
  activityLabel: { fontSize: 16, fontWeight: '600', color: '#fff' },
  activityDesc: { fontSize: 13, color: '#888', marginTop: 2 },
  textMuted: { color: '#555' },
  doneText: { fontSize: 13, color: '#27ae60', fontWeight: '600' },
  // Celebration
  celebrationBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  floatingCoin: { position: 'absolute', bottom: 80, fontSize: 32 },
  celebrationCard: { backgroundColor: '#16213e', borderRadius: 28, padding: 32, alignItems: 'center', width: '85%', borderWidth: 2, borderColor: '#f39c12' },
  celebTrophy: { fontSize: 72 },
  celebTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 12, textAlign: 'center' },
  celebSubtitle: { fontSize: 14, color: '#aaa', marginTop: 6, textAlign: 'center' },
  celebStatsRow: { flexDirection: 'row', gap: 16, marginTop: 24, marginBottom: 28 },
  celebStat: { alignItems: 'center', backgroundColor: '#0a0a1a', borderRadius: 14, padding: 16, minWidth: 80 },
  celebStatNum: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  celebStatLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  celebBtn: { backgroundColor: '#e94560', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 40 },
  celebBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
