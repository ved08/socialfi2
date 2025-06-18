import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SafeToggleProps {
  value: boolean;
  onToggle: () => void;
}

export default function SafeToggle({ value, onToggle }: SafeToggleProps) {
  return (
    <TouchableOpacity style={[styles.toggle, value ? styles.on : styles.off]} onPress={onToggle} activeOpacity={0.8}>
      <Text style={[styles.label, value ? styles.labelOn : styles.labelOff]}>{value ? 'safe' : 'demon'}</Text>
      <View style={[styles.switch, value ? styles.switchOn : styles.switchOff]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#FFD600',
    marginLeft: 8,
  },
  on: {
    backgroundColor: '#FFD600',
  },
  off: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#FFD600',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
    textTransform: 'lowercase',
  },
  labelOn: {
    color: '#222',
  },
  labelOff: {
    color: '#FFD600',
  },
  switch: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FFD600',
  },
  switchOn: {
    backgroundColor: '#fff',
  },
  switchOff: {
    backgroundColor: '#FFD600',
  },
});
