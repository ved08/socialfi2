import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TABS = ['Tokens', 'Activity', 'Orders'];

export default function WalletTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <View style={styles.tabRow}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}>
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#181A20',
    borderRadius: 14,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#23242A',
  },
  tabText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeTabText: {
    color: '#7FFF8E',
  },
});
