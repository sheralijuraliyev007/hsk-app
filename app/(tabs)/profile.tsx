import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserStats, getAllLessonProgress } from '@/src/utils/database';
import { getAllLessons } from '@/src/data/lessons';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [userStats, setUserStats] = useState({
    total_coins: 0,
    current_streak: 0,
    longest_streak: 0,
    current_hsk_level: 1,
    last_study_date: '',
  });
  const [lessonStats, setLessonStats] = useState({
    completed: 0,
    inProgress: 0,
    total: 30,
  });

  useFocusEffect(
    useCallback(() => {
      Promise.all([getUserStats(), getAllLessonProgress()]).then(([stats, progress]) => {
        if (stats) setUserStats(stats);
        if (progress) {
          const completed = progress.filter(p => p.status === 'completed').length;
          const inProgress = progress.filter(p => p.status === 'in_progress').length;
          const totalLessons = getAllLessons().length;
          setLessonStats({ completed, inProgress, total: totalLessons });
        }
      });
    }, [])
  );

  const lessonPercent = Math.round((lessonStats.completed / lessonStats.total) * 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
    >
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>学</Text>
        </View>
        <Text style={styles.username}>HSK Learner</Text>
        <Text style={styles.userSubtitle}>HSK {userStats.current_hsk_level} — Beginner</Text>
      </View>

      {/* Coins & Streak Hero Row */}
      <View style={styles.heroRow}>
        <View style={[styles.heroCard, { backgroundColor: '#1a1000' }]}>
          <Text style={styles.heroEmoji}>🪙</Text>
          <Text style={styles.heroNumber}>{userStats.total_coins}</Text>
          <Text style={styles.heroLabel}>Total Coins</Text>
        </View>
        <View style={[styles.heroCard, { backgroundColor: '#1a0800' }]}>
          <Text style={styles.heroEmoji}>🔥</Text>
          <Text style={styles.heroNumber}>{userStats.current_streak}</Text>
          <Text style={styles.heroLabel}>Day Streak</Text>
        </View>
        <View style={[styles.heroCard, { backgroundColor: '#001a10' }]}>
          <Text style={styles.heroEmoji}>🏆</Text>
          <Text style={styles.heroNumber}>{userStats.longest_streak}</Text>
          <Text style={styles.heroLabel}>Best Streak</Text>
        </View>
      </View>

      {/* Lesson Progress */}
      <Text style={styles.sectionTitle}>Lesson Progress</Text>
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>HSK 1-2 — Standard Course</Text>
          <Text style={styles.progressPercent}>{lessonPercent}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${lessonPercent}%` }]} />
        </View>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatNum}>{lessonStats.completed}</Text>
            <Text style={styles.progressStatLabel}>Completed</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatNum}>{lessonStats.inProgress}</Text>
            <Text style={styles.progressStatLabel}>In Progress</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatNum}>{lessonStats.total - lessonStats.completed - lessonStats.inProgress}</Text>
            <Text style={styles.progressStatLabel}>Locked</Text>
          </View>
        </View>
      </View>

      {/* HSK Journey */}
      <Text style={styles.sectionTitle}>HSK Journey</Text>
      {[
        { level: 'HSK 1', words: 150, color: '#27ae60', unlocked: true },
        { level: 'HSK 2', words: 150, color: '#2980b9', unlocked: true },
        { level: 'HSK 3', words: 300, color: '#8e44ad', unlocked: false },
        { level: 'HSK 4', words: 600, color: '#e67e22', unlocked: false },
        { level: 'HSK 5', words: 1300, color: '#e94560', unlocked: false },
        { level: 'HSK 6', words: 2500, color: '#f39c12', unlocked: false },
      ].map(item => (
        <View key={item.level} style={styles.levelRow}>
          <View style={[styles.levelDot, { backgroundColor: item.unlocked ? item.color : '#333' }]} />
          <View style={styles.levelInfo}>
            <Text style={[styles.levelName, { color: item.unlocked ? '#fff' : '#555' }]}>{item.level}</Text>
            <Text style={styles.levelWords}>{item.words} words</Text>
          </View>
          {item.unlocked
            ? <Ionicons name="checkmark-circle" size={22} color="#27ae60" />
            : <Ionicons name="lock-closed" size={18} color="#555" />
          }
        </View>
      ))}

      {/* Settings */}
      <Text style={styles.sectionTitle}>Settings</Text>
      {[
        { icon: 'notifications', label: 'Daily Reminder', sub: 'Coming soon' },
        { icon: 'moon', label: 'Dark Mode', sub: 'Always on' },
        { icon: 'information-circle', label: 'About HSK Master', sub: 'v1.0.0' },
      ].map(item => (
        <TouchableOpacity key={item.label} style={styles.settingRow}>
          <Ionicons name={item.icon as any} size={22} color="#e94560" style={styles.settingIcon} />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Text style={styles.settingSub}>{item.sub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#555" />
        </TouchableOpacity>
      ))}

      <View style={{ height: insets.bottom + 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 24 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#e94560', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  username: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  userSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  heroRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  heroCard: { flex: 1, borderRadius: 16, padding: 14, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#2a2a4a' },
  heroEmoji: { fontSize: 28 },
  heroNumber: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  heroLabel: { fontSize: 11, color: '#888', textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#aaa', marginBottom: 12, marginTop: 4, letterSpacing: 1 },
  progressCard: { backgroundColor: '#16213e', borderRadius: 16, padding: 18, marginBottom: 24, gap: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontSize: 15, color: '#fff', fontWeight: '600' },
  progressPercent: { fontSize: 18, fontWeight: 'bold', color: '#e94560' },
  progressBarBg: { height: 8, backgroundColor: '#0a0a1a', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#e94560', borderRadius: 4 },
  progressStats: { flexDirection: 'row', justifyContent: 'space-around' },
  progressStat: { alignItems: 'center' },
  progressStatNum: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  progressStatLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  levelRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 14, padding: 16, marginBottom: 10 },
  levelDot: { width: 14, height: 14, borderRadius: 7, marginRight: 14 },
  levelInfo: { flex: 1 },
  levelName: { fontSize: 16, fontWeight: 'bold' },
  levelWords: { fontSize: 13, color: '#888', marginTop: 2 },
  settingRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 14, padding: 16, marginBottom: 10 },
  settingIcon: { marginRight: 14 },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 16, color: '#fff', fontWeight: '500' },
  settingSub: { fontSize: 13, color: '#888', marginTop: 2 },
});
