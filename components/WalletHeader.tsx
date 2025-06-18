import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WalletHeaderProps {
  balance: string;
  pnl: string;
  pnlChange: string;
  onSend: () => void;
  onReceive: () => void;
  onBuy: () => void;
}

export default function WalletHeader({ balance, pnl, pnlChange, onSend, onReceive, onBuy }: WalletHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.balance}>{balance}</Text>
        <TouchableOpacity style={styles.earnNow}>
          <Ionicons name="cash-outline" size={18} color="#111" />
          <Text style={styles.earnNowText}>Earn Now</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.pnl}>{pnl} <Text style={styles.pnlChange}>{pnlChange}</Text></Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onSend}>
          <Ionicons name="arrow-up-outline" size={20} color="#7FFF8E" />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onReceive}>
          <Ionicons name="arrow-down-outline" size={20} color="#7FFF8E" />
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onBuy}>
          <Ionicons name="add-circle-outline" size={20} color="#7FFF8E" />
          <Text style={styles.actionText}>Buy $</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  balance: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  earnNow: {
    backgroundColor: '#7FFF8E',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  earnNowText: {
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 4,
  },
  pnl: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  pnlChange: {
    color: '#F44',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: '#181A20',
    borderRadius: 14,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionText: {
    color: '#7FFF8E',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
