import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FilterChipsProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

export default function FilterChips({ filters, selected, onSelect }: FilterChipsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.chip, selected === filter && styles.chipSelected]}
          onPress={() => onSelect(filter)}
        >
          <Text style={[styles.chipText, selected === filter && styles.chipTextSelected]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#111',
  },
  chip: {
    backgroundColor: '#20222A',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#FFD600',
  },
  chipText: {
    color: '#fff',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#222',
  },
});
