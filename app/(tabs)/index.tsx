import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import ProfileBar from '../../components/ProfileBar';
import ProfileDrawer from '../../components/ProfileDrawer';
import TradeFeedCard, { TradeFeedItem } from '../../components/TradeFeedCard';
import { usePrivy } from '@privy-io/expo';
import { useLogin } from '@privy-io/expo/ui';
import { useRouter } from 'expo-router';

const mockUser = {
  username: 'soldjer77',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  following: 123,
  followers: 456,
  twitterUrl: 'https://twitter.com/',
};

const mockFeed: TradeFeedItem[] = [
  {
    id: 'jup1',
    user: {
      name: 'solwhale',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      time: '15m',
    },
    asset: 'JUP',
    marketCap: '$1.8B MC',
    bought: parseFloat((Math.random() * 100).toFixed(2)),
    description: 'Jupiter aggregator is the future of Solana DeFi',
    chart: [],
    pnl: 375.00,
    pnlPercent: 25.0,
    totalBought: parseFloat((Math.random() * 100).toFixed(2)),
    totalSold: 0,
    holding: 0, // Will be set to match bought amount
    userMC: 1800.75,
    apedIn: 24,
    tokenMint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    timestamp: '2025-06-22T17:10:30Z'
  },
  {
    id: '3',
    user: {
      name: 'degenqueen',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      time: '3h',
    },
    asset: 'BONK',
    marketCap: '$1.2B MC',
    bought: parseFloat((Math.random() * 100).toFixed(2)),
    description: 'Meme coin with potential',
    chart: [],
    pnl: -250.00,
    pnlPercent: -25.0,
    totalBought: parseFloat((Math.random() * 100).toFixed(2)),
    totalSold: 0,
    holding: 0, // Will be set to match bought amount
    userMC: 750.25,
    apedIn: 8,
    tokenMint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    timestamp: '2025-06-22T13:20:45Z'
  },
  {
    id: '1',
    user: {
      name: 'soldjer77',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '26m',
    },
    asset: 'ARMY',
    marketCap: '$196.93K MC',
    bought: parseFloat((Math.random() * 100).toFixed(2)),
    description: 'top blast war theme',
    chart: [],
    pnl: 54.25,
    pnlPercent: 109.03,
    totalBought: parseFloat((Math.random() * 100).toFixed(2)),
    totalSold: 0,
    holding: 0, // Will be set to match bought amount
    userMC: 92.4,
    apedIn: 4,
    tokenMint: 'ARMY1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
    timestamp: '2025-06-22T16:35:12Z'
  },
  {
    id: '2',
    user: {
      name: 'cryptoking',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      time: '1h',
    },
    asset: 'SOL',
    marketCap: '$42.5B MC',
    bought: parseFloat((Math.random() * 100).toFixed(2)),
    description: 'Solana ecosystem growth',
    chart: [],
    pnl: 125.50,
    pnlPercent: 50.2,
    totalBought: parseFloat((Math.random() * 100).toFixed(2)),
    totalSold: 0,
    holding: 0, // Will be set to match bought amount
    userMC: 4250.75,
    apedIn: 12,
    tokenMint: 'So11111111111111111111111111111111111111112',
    timestamp: '2025-06-22T15:45:30Z'
  }
];


export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // Gesture handler for opening drawer with right swipe
  const openDrawerGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onEnd: (event) => {
      if (event.translationX > 50) {
        // Only open if not already open
        runOnJS(setDrawerVisible)(true)
      }
    },
  });

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={openDrawerGesture}>
        <Animated.View style={{ flex: 1 }}>
          <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
              <ProfileBar
                avatar={mockUser.avatar}
                onPress={() => setDrawerVisible(true)}
              />
            </SafeAreaView>
            <View style={styles.content}>
              <FlatList
                data={mockFeed}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TradeFeedCard item={item} />}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                bounces={true}
                alwaysBounceVertical={true}
              />
            </View>
            <ProfileDrawer
              visible={drawerVisible}
              onClose={() => setDrawerVisible(false)}
              following={mockUser.following}
              followers={mockUser.followers}
              username={mockUser.username}
              avatar={mockUser.avatar}
              twitterUrl={mockUser.twitterUrl}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  safeArea: {
    backgroundColor: '#181A20',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
});

