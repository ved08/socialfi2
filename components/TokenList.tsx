import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface TokenData {
  id: string;
  symbol: string;
  name: string;
  mc: string;
  position: string;
  pnl: string;
  pnlPercent: string;
  icon: any;
}

interface TokenListProps {
  tokens: TokenData[];
}

export default function TokenList({ tokens }: TokenListProps) {
  return (
    <FlatList
      data={tokens}
      keyExtractor={item => item.id}
      style={styles.list}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Image source={item.icon} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.mc}>{item.mc}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.position}>{item.position}</Text>
            <Text style={[styles.pnl, parseFloat(item.pnl) < 0 ? styles.pnlNeg : styles.pnlPos]}>{item.pnl}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 14,
    backgroundColor: '#23242A',
  },
  symbol: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  mc: {
    color: '#aaa',
    fontSize: 13,
  },
  position: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pnl: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pnlNeg: {
    color: '#F44',
  },
  pnlPos: {
    color: '#7FFF8E',
  },
});
