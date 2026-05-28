import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getDailyFeed, FeedItem } from '@/src/utils/rss';

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const feed = await getDailyFeed();
      if (feed.length === 0) setError('Could not load feed. Check your connection.');
      setItems(feed);
    } catch {
      setError('Could not load feed. Check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const openArticle = (url: string) => Linking.openURL(url);

  const renderItem = ({ item, index }: { item: FeedItem; index: number }) => (
    <TouchableOpacity style={styles.card} onPress={() => openArticle(item.link)} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={[styles.sourceBadge, { backgroundColor: item.sourceColor + '22' }]}>
          <Text style={styles.sourceIcon}>{item.sourceIcon}</Text>
          <Text style={[styles.sourceName, { color: item.sourceColor }]}>{item.source}</Text>
        </View>
        <Text style={styles.timeAgo}>{timeAgo(item.pubDate)}</Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      {item.excerpt ? <Text style={styles.cardExcerpt} numberOfLines={3}>{item.excerpt}</Text> : null}
      <View style={styles.cardFooter}>
        <Text style={styles.readMore}>Read article →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Daily Feed</Text>
          <Text style={styles.headerSub}>10 fresh articles · updated daily</Text>
        </View>
        <TouchableOpacity onPress={() => load(true)} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={22} color="#e94560" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e94560" />
          <Text style={styles.loadingText}>Fetching today's articles…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorEmoji}>📡</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => load()}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor="#e94560" />}
          ListEmptyComponent={<Text style={styles.emptyText}>No articles found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a3a' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  refreshBtn: { padding: 8 },
  list: { padding: 16, gap: 14 },
  card: { backgroundColor: '#16213e', borderRadius: 18, padding: 18, gap: 10 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sourceBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  sourceIcon: { fontSize: 14 },
  sourceName: { fontSize: 12, fontWeight: '600' },
  timeAgo: { fontSize: 12, color: '#555' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', lineHeight: 22 },
  cardExcerpt: { fontSize: 13, color: '#aaa', lineHeight: 19 },
  cardFooter: { alignItems: 'flex-end' },
  readMore: { fontSize: 13, color: '#e94560', fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 32 },
  loadingText: { color: '#888', fontSize: 14 },
  errorEmoji: { fontSize: 48 },
  errorText: { color: '#aaa', fontSize: 15, textAlign: 'center' },
  retryBtn: { backgroundColor: '#e94560', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 28, marginTop: 8 },
  retryBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 40 },
});
