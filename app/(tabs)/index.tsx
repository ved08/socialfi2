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
    id: '1',
    user: {
      name: 'soldjer77',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '26m',
    },
    asset: 'ARMY',
    marketCap: '$196.93K MC',
    bought: 49.76,
    description: 'top blast war theme',
    chart: [], // Placeholder for chart data
    pnl: 54.25,
    pnlPercent: 109.03,
    totalBought: 49.76,
    totalSold: 104.02,
    holding: 0.0,
    userMC: 92.4,
    apedIn: 4,
  },
  // Add more mock cards here if you want
];


export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [error, setError] = useState("");
  const { login } = useLogin()
  const { logout, isReady, user } = usePrivy()
  // Gesture handler for opening drawer with right swipe
  const openDrawerGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onEnd: (event) => {
      if (event.translationX > 50) {
        // Only open if not already open
        runOnJS(setDrawerVisible)(true);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={openDrawerGesture}>
      <Animated.View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <ProfileBar
            avatar={mockUser.avatar}
            username={mockUser.username}
            onPress={() => setDrawerVisible(true)}
          />
          <FlatList
            data={mockFeed}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TradeFeedCard item={item} />}
            contentContainerStyle={{ paddingVertical: 24 }}
          />
          <ProfileDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            following={mockUser.following}
            followers={mockUser.followers}
            username={mockUser.username}
            avatar={mockUser.avatar}
            twitterUrl={mockUser.twitterUrl}
          />
          <Button title='Login' onPress={() => {
            console.log("Clicked login.")
            login({ loginMethods: ["email"] })
              .then((session) => {
                console.log("User logged in", session.user);
              })
              .catch((err) => {
                setError(JSON.stringify(err.error) as string);
              });
          }} />
          <Button title="Logout" onPress={() => {
            console.log("Logged out")
            logout()
              .then(() => {
                console.log("User logged out");
              })
              .catch((err) => {
                setError(JSON.stringify(err.error) as string);
              });
          }} />
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 0,
  },


});

