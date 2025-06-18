import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileDrawerProps {
  visible: boolean;
  onClose: () => void;
  following: number;
  followers: number;
  username: string;
  avatar: string;
  twitterUrl: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

export default function ProfileDrawer({ visible, onClose, following, followers, username, avatar, twitterUrl }: ProfileDrawerProps) {
  const translateX = useSharedValue(-DRAWER_WIDTH);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300 });
    } else {
      translateX.value = withTiming(-DRAWER_WIDTH, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Smooth gesture handler for dragging drawer
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = Math.max(-DRAWER_WIDTH, Math.min(0, ctx.startX + event.translationX));
    },
    onEnd: (event) => {
      if (event.translationX < -DRAWER_WIDTH / 3) {
        translateX.value = withTiming(-DRAWER_WIDTH, { duration: 200 });
        runOnJS(onClose)();
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    },
  });

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Tap outside to close */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.drawer, animatedStyle]}>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 32 }} showsVerticalScrollIndicator={false}>
              <View style={styles.profileInfo}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarBorder}>
                    <Ionicons name="person-circle" size={70} color="#7FFF8E" style={{position: 'absolute', zIndex: -1}} />
                    <View style={styles.avatarImg} />
                  </View>
                </View>
                <Text style={styles.username}>{username}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL(twitterUrl)}>
                <Ionicons name="logo-twitter" size={22} color="#1DA1F2" style={{marginRight: 8}} />
                <Text style={styles.linkText}>View on X (Twitter)</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#181A20',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 2,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  avatarWrapper: {
    marginBottom: 8,
  },
  avatarBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#7FFF8E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#333',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 24,
  },
  statNumber: {
    color: '#7FFF8E',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23242A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
  },
});
