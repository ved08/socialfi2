import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ProfileTabsProps {
  tabs: string[];
  selected: number;
  onSelect: (idx: number) => void;
}

export default function ProfileTabs({ tabs, selected, onSelect }: ProfileTabsProps) {
  return (
    <View style={styles.tabRow}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selected === idx && styles.tabActive]}
          onPress={() => onSelect(idx)}
        >
          <Text style={[styles.tabText, selected === idx && styles.tabTextActive]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    marginBottom: 2,
    backgroundColor: '#181A20',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#7FFF8E',
    backgroundColor: '#23242A',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabText: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
