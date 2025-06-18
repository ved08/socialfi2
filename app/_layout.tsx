import { PrivyProvider } from "@privy-io/expo";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import Constants from "expo-constants";

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { PrivyElements } from "@privy-io/expo/ui";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { useRouter, usePathname } from 'expo-router';
import AuthGate from './_auth-gate';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PrivyProvider
      appId="cmbj8sxm0004qi90md9agy81k"
      clientId="client-WY6MAr84ud81KZf6GJUmBo65Dh4NgBKMGGFpJPPocsg8J"
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
      <PrivyElements />
    </PrivyProvider>
  );

}
