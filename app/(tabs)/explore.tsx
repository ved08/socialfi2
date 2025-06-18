import ExploreFilters from '@/components/ExploreFilters';
import ExploreSearchBar from '@/components/ExploreSearchBar';
import ExploreTokenList, { ExploreTokenData } from '@/components/ExploreTokenList';
import ProfileBar from '@/components/ProfileBar';
import ProfileDrawer from '@/components/ProfileDrawer';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockUser = {
  username: 'soldjer77',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  following: 123,
  followers: 456,
  twitterUrl: 'https://twitter.com/',
};

const TABS = ['Tokens', 'Traders', 'Broadcasts'];

const initialFilters = [
  { label: 'Trending', active: true },
  { label: 'Solana', active: false },
  { label: '24h', active: false },
];

const mockTokens: ExploreTokenData[] = [
  {
    id: '1', symbol: 'ART', name: 'ART', mc: '$356.18K', price: '$0.03562', percent: '--%', icon: require('@/assets/images/react-logo.png'), trending: true, verified: false,
  },
  {
    id: '2', symbol: 'aura', name: 'aura', mc: '$119.77M', price: '$0.1243', percent: '-34.4%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: true,
  },
  {
    id: '3', symbol: 'crapto', name: 'crapto', mc: '$107.85K', price: '$0.031078', percent: '--%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '4', symbol: 'PI', name: 'PI', mc: '$803.15K', price: '$0.03832', percent: '--%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '5', symbol: 'ppp', name: 'ppp', mc: '$221.99K', price: '$0.032220', percent: '--%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '6', symbol: 'lmeow', name: 'lmeow', mc: '$558.70K', price: '$0.035594', percent: '+65.6%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '7', symbol: 'CRYPTO', name: 'CRYPTO', mc: '$23.86K', price: '$0.042386', percent: '-99.6%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '8', symbol: 'USDP', name: 'USDP', mc: '$18.00M', price: '$0.01800', percent: '-54.8%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: false,
  },
  {
    id: '9', symbol: 'moonpig', name: 'moonpig', mc: '$?', price: '$0.01082', percent: '-41.4%', icon: require('@/assets/images/react-logo.png'), trending: false, verified: true,
  },
];

export default function ExploreScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [tokens, setTokens] = useState(mockTokens);

  const handleTabPress = (idx: number) => setSelectedTab(idx);
  const handleFilterPress = (idx: number) => {
    setFilters(filters.map((f, i) => ({ ...f, active: i === idx })));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top bar */}
        {/* ProfileBar (common top bar with drawer) */}
        <ProfileBar
          avatar={mockUser.avatar}
          username={mockUser.username}
          onPress={() => setDrawerVisible(true)}
        />
        <ProfileDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          following={mockUser.following}
          followers={mockUser.followers}
          username={mockUser.username}
          avatar={mockUser.avatar}
          twitterUrl={mockUser.twitterUrl}
        />

        {/* Search */}
        <ExploreSearchBar value={search} onChange={setSearch} />

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === i && styles.tabSelected]}
              onPress={() => handleTabPress(i)}
            >
              <Text style={[styles.tabText, selectedTab === i && styles.tabTextSelected]}>{tab}</Text>
              {selectedTab === i && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Filters */}
        <ExploreFilters filters={filters} onFilterPress={handleFilterPress} />

        {/* Token List */}
        <ExploreTokenList
          data={tokens}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 8,
    marginBottom: 4,
    marginTop: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabSelected: {},
  tabText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabTextSelected: {
    color: '#fff',
  },
  tabUnderline: {
    marginTop: 3,
    height: 3,
    width: 32,
    borderRadius: 2,
    backgroundColor: '#FFD600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
  },
});
