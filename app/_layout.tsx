import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { openDatabase, seedVocab } from '@/src/utils/database';
import { HSK1_VOCAB } from '@/src/data/hsk1';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await openDatabase();
        await seedVocab(HSK1_VOCAB);
      } catch (e) {
        console.warn('DB init error:', e);
      } finally {
        setReady(true);
      }
    }
    init();
  }, []);

  if (!ready) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#e94560" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="study/session" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="study/listening" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="study/writing" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-vocab" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-grammar" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-dialogue" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-speaking" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-writing" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-test" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-scramble" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/lesson-listening" options={{ presentation: 'fullScreenModal', headerShown: false }} />
        <Stack.Screen name="study/result" />
      </Stack>
    </GestureHandlerRootView>
  );
}
