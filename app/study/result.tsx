import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ResultScreen() {
  const router = useRouter();
  const { correct, total } = useLocalSearchParams<{ correct: string; total: string }>();

  const score = Math.round((Number(correct) / Number(total)) * 100);

  function getEmoji() {
    if (score >= 90) return '🏆';
    if (score >= 70) return '🎉';
    if (score >= 50) return '💪';
    return '📚';
  }

  function getMessage() {
    if (score >= 90) return 'Outstanding!';
    if (score >= 70) return 'Great work!';
    if (score >= 50) return 'Keep going!';
    return 'Keep practicing!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{getEmoji()}</Text>
      <Text style={styles.message}>{getMessage()}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreNumber}>{score}%</Text>
        <Text style={styles.scoreLabel}>Accuracy</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{correct}</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{Number(total) - Number(correct)}</Text>
          <Text style={styles.statLabel}>Missed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOutline} onPress={() => router.replace('/study/session')}>
        <Text style={styles.buttonOutlineText}>Study Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 80, marginBottom: 16 },
  message: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  scoreCard: { backgroundColor: '#16213e', borderRadius: 20, padding: 30, alignItems: 'center', marginBottom: 24, width: '100%' },
  scoreNumber: { fontSize: 64, fontWeight: 'bold', color: '#e94560' },
  scoreLabel: { fontSize: 16, color: '#888', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  statBox: { flex: 1, backgroundColor: '#16213e', borderRadius: 16, padding: 16, alignItems: 'center', marginHorizontal: 4 },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  button: { backgroundColor: '#e94560', borderRadius: 16, padding: 16, alignItems: 'center', width: '100%', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonOutline: { borderWidth: 2, borderColor: '#e94560', borderRadius: 16, padding: 16, alignItems: 'center', width: '100%' },
  buttonOutlineText: { color: '#e94560', fontSize: 16, fontWeight: 'bold' },
});
