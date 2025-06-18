import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TradeFeedItem = {
  id: string;
  user: {
    name: string;
    avatar: string;
    time: string;
  };
  asset: string;
  marketCap: string;
  bought: number;
  description: string;
  chart: any[];
  pnl: number;
  pnlPercent: number;
  totalBought: number;
  totalSold: number;
  holding: number;
  userMC: number;
  apedIn: number;
};

export default function TradeFeedCard({ item }: { item: TradeFeedItem }) {
  return (
    <View style={styles.card}>
      {/* Asset and MC */}
      <View style={styles.assetRow}>
        <Text style={styles.assetName}>{item.asset}</Text>
        <Text style={styles.marketCap}>{item.marketCap}</Text>
        <View style={styles.apedInBadge}>
          <Text style={styles.apedInText}>{item.apedIn} aped in</Text>
        </View>
      </View>
      {/* Trade Action */}
      <Text style={styles.boughtText}>Bought ${item.bought.toFixed(2)}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Chart Placeholder */}
      <View style={styles.chartPlaceholder}>
        <Ionicons name="stats-chart" size={32} color="#888" />
        <Text style={styles.chartText}>Chart Coming Soon</Text>
      </View>
      {/* P&L and Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>P&amp;L</Text>
          <Text style={styles.pnlText}>↑ ${item.pnl.toFixed(2)} <Text style={styles.pnlPercent}>+{item.pnlPercent}%</Text></Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total bought</Text>
          <Text style={styles.statValue}>${item.totalBought.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total sold</Text>
          <Text style={styles.statValue}>${item.totalSold.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Holding</Text>
          <Text style={styles.statValue}>${item.holding.toFixed(2)}</Text>
        </View>
      </View>
      {/* Ape In Button */}
      <TouchableOpacity style={styles.apeInButton}>
        <Text style={styles.apeInButtonText}>Ape In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#181A20',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  assetName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  marketCap: {
    color: '#aaa',
    fontSize: 13,
    marginLeft: 8,
  },
  apedInBadge: {
    backgroundColor: '#1E2D3D',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  apedInText: {
    color: '#7FFF8E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  boughtText: {
    color: '#7FFF8E',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
  },
  chartPlaceholder: {
    backgroundColor: '#23242A',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
  },
  chartText: {
    color: '#888',
    fontSize: 13,
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
  },
  statValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  pnlText: {
    color: '#7FFF8E',
    fontWeight: 'bold',
    fontSize: 13,
  },
  pnlPercent: {
    color: '#7FFF8E',
    fontWeight: 'bold',
    fontSize: 11,
  },
  apeInButton: {
    backgroundColor: '#7FFF8E',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  apeInButtonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
