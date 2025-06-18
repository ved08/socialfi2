import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExploreSearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export default function ExploreSearchBar({ value, onChange, placeholder }: ExploreSearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color="#aaa" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || 'Search tokens or traders'}
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
  },
});
