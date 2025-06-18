import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ProfileBarProps {
  avatar: string;
  username: string;
  onPress: () => void;
}

export default function ProfileBar({ avatar, username, onPress }: ProfileBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#181A20',
    borderBottomWidth: 1,
    borderBottomColor: '#23242A',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#7FFF8E',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
