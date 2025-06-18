import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';

interface ProfileBannerProps {
  banner: any; // require or uri
  avatar: string;
  username: string;
  verified?: boolean;
  following?: number;
  followers?: number;
  onEditProfile?: () => void;
  isSelf?: boolean;
}

export default function ProfileBanner({ banner, avatar, username, verified, following, followers, onEditProfile, isSelf }: ProfileBannerProps) {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.bannerContainer}>
      <Image source={banner} style={[styles.bannerImg, { width: screenWidth }]} resizeMode="cover" />
      <View style={styles.avatarRow}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.username}>{username}</Text>
            {verified && <Text style={styles.verified}>✔️</Text>}
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>{following} Following</Text>
            <Text style={styles.stats}>{followers} Followers</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const AVATAR_SIZE = 78;
const AVATAR_BORDER = 4;
const BANNER_HEIGHT = 140;

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    marginBottom: AVATAR_SIZE / 2,
    backgroundColor: '#23242A',
  },
  bannerImg: {
    width: '100%',
    height: BANNER_HEIGHT,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#23242A',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    left: 18,
    bottom: -AVATAR_SIZE / 2,
    width: '100%',
    paddingRight: 18,
  },
  avatarWrapper: {
    borderRadius: AVATAR_SIZE / 2 + AVATAR_BORDER,
    borderWidth: AVATAR_BORDER,
    borderColor: '#111',
    backgroundColor: '#fff',
    width: AVATAR_SIZE + AVATAR_BORDER * 2,
    height: AVATAR_SIZE + AVATAR_BORDER * 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 18,
    marginBottom: 18,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 8,
  },
  verified: {
    fontSize: 16,
    color: '#7FFF8E',
    marginLeft: 2,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  stats: {
    color: '#aaa',
    fontSize: 13,
    marginRight: 10,
  },
  editBtn: {
    marginLeft: 'auto',
    marginBottom: 18,
    backgroundColor: '#23242A',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
