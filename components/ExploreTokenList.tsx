import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

export interface ExploreTokenData {
  id: string;
  symbol: string;
  name: string;
  mc: string;
  price: string;
  percent: string;
  icon: any;
  trending?: boolean;
  verified?: boolean;
}

interface ExploreTokenListProps {
  data: ExploreTokenData[];
  renderRight?: (token: ExploreTokenData) => React.ReactNode;
}

export default function ExploreTokenList({ data, renderRight }: ExploreTokenListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      style={styles.list}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Image source={item.icon} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.symbol}>{item.symbol} {item.verified && '\u2714\ufe0f'}</Text>
            <Text style={styles.mc}>{item.mc}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={[styles.percent, parseFloat(item.percent) < 0 ? styles.percentNeg : styles.percentPos]}>{item.percent}</Text>
          </View>
          {renderRight && (
            <View style={{ marginLeft: 10 }}>{renderRight(item)}</View>
          )}
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
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  percent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  percentNeg: {
    color: '#F44',
  },
  percentPos: {
    color: '#7FFF8E',
  },
});
