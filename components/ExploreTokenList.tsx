import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';

export interface ExploreTokenData {
  id: string;
  symbol: string;
  name: string;
  mc: string;
  price: string;
  icon: string | { uri: string } | number; // string for remote URLs, number for local assets, { uri: string } for remote objects
  decimals: number;
}

interface ExploreTokenListProps {
  data: ExploreTokenData[];
  renderRight?: (token: ExploreTokenData) => React.ReactNode;
  onTokenPress?: (token: ExploreTokenData) => void;
}

const ExploreTokenList = ({ data, renderRight, onTokenPress }: ExploreTokenListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      style={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }: { pressed: boolean }) => [
            styles.row,
            pressed && styles.pressedRow
          ]}
          onPress={() => onTokenPress?.(item)}
        >
          {typeof item.icon === 'string' ? (
            <Image 
              source={{ uri: item.icon }} 
              style={styles.icon} 
              onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)} 
            />
          ) : (
            <Image source={item.icon} style={styles.icon} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.mc}>{item.name}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.price}>{item.symbol}</Text>
          </View>
          {renderRight && (
            <View style={{ marginLeft: 10 }}>{renderRight(item)}</View>
          )}
        </Pressable>
      )}
    />
  );
};

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
  pressedRow: {
    opacity: 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default ExploreTokenList;
