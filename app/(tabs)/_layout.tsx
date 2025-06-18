import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy } from '@privy-io/expo';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const { isReady, user } = usePrivy()
  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [user, isReady])
  return (
    <>
      {
        isReady ?
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: 'absolute',
                },
                default: {},
              }),
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size ?? 28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
                tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size ?? 28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="wallet"
              options={{
                title: 'Wallet',
                tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size ?? 28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size ?? 28} color={color} />,
              }}
            />
          </Tabs> :
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#fff" />
          </SafeAreaView>
      }
    </>
  );
}
