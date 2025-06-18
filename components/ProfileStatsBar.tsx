import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatsBarProps {
  volume: string;
  pnl: string;
  maxTrade: string;
  todaySelected?: boolean;
  weekSelected?: boolean;
  onSelectTab?: (tab: 'today' | 'week') => void;
  bestWeek?: string;
  bestPnl?: string;
}

export default function ProfileStatsBar({ volume, pnl, maxTrade, todaySelected, weekSelected, onSelectTab, bestWeek, bestPnl }: ProfileStatsBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>{volume}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>P&L</Text>
          <Text style={[styles.statValue, parseFloat(pnl) < 0 ? styles.loss : styles.profit]}>{pnl}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Max Trade Size</Text>
          <Text style={styles.statValue}>{maxTrade}</Text>
        </View>
      </View>
      <View style={styles.tabRow}>
        <Text
          style={[styles.tab, todaySelected && styles.tabActive]}
          onPress={() => onSelectTab && onSelectTab('today')}
        >Today</Text>
        <Text
          style={[styles.tab, weekSelected && styles.tabActive]}
          onPress={() => onSelectTab && onSelectTab('week')}
        >This Week</Text>
      </View>
      {(bestWeek && bestPnl) && (
        <View style={styles.bestRow}>
          <Text style={styles.bestLabel}>{bestWeek}  </Text>
          <Text style={styles.bestValue}>{bestPnl}</Text>
          <Text style={styles.bestLabel}>Best Week P&L</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23242A',
    borderRadius: 14,
    margin: 16,
    marginTop: 10,
    padding: 14,
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  loss: {
    color: '#FF4C4C',
  },
  profit: {
    color: '#7FFF8E',
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  tab: {
    color: '#aaa',
    fontSize: 13,
    marginHorizontal: 16,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 7,
    overflow: 'hidden',
  },
  tabActive: {
    color: '#fff',
    backgroundColor: '#181A20',
    fontWeight: 'bold',
  },
  bestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bestLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  bestValue: {
    color: '#FF4C4C',
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 4,
  },
});
