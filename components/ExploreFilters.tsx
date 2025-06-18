import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

interface ExploreFiltersProps {
  filters: { label: string; active: boolean }[];
  onFilterPress: (index: number) => void;
}

export default function ExploreFilters({ filters, onFilterPress }: ExploreFiltersProps) {
  return (
    <View style={styles.row}>
      {filters.map((f, i) => (
        <FilterChip key={f.label} label={f.label} active={f.active} onPress={() => onFilterPress(i)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#23242A',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#7FFF8E',
  },
  chipText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  chipTextActive: {
    color: '#181A20',
    fontWeight: 'bold',
  },
});
