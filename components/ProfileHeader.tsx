import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProfileHeaderProps {
  avatar: string;
  username: string;
  following: number;
  followers: number;
  onEditProfile?: () => void;
  isSelf?: boolean;
}

export default function ProfileHeader({ avatar, username, following, followers, onEditProfile, isSelf }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>{following} Following</Text>
            <Text style={styles.stats}>{followers} Followers</Text>
          </View>
        </View>
        {isSelf && (
          <TouchableOpacity style={styles.editBtn} onPress={onEditProfile}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A20',
    padding: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#23242A',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#7FFF8E',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stats: {
    color: '#aaa',
    fontSize: 14,
    marginRight: 12,
  },
  editBtn: {
    backgroundColor: '#23242A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginLeft: 10,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
