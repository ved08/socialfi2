import ExploreFilters from '@/components/ExploreFilters';
import ExploreSearchBar from '@/components/ExploreSearchBar';
import ExploreTokenList, { ExploreTokenData } from '@/components/ExploreTokenList';
import ProfileBar from '@/components/ProfileBar';
import ProfileDrawer from '@/components/ProfileDrawer';
import api from '@/services/api';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokenService } from "@/services/api";
import { useRouter } from 'expo-router';

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
    id: '1', symbol: 'ART', name: 'ART', mc: '$356.18K', price: '$0.03562', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '2', symbol: 'aura', name: 'aura', mc: '$119.77M', price: '$0.1243', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '3', symbol: 'crapto', name: 'crapto', mc: '$107.85K', price: '$0.031078', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '4', symbol: 'PI', name: 'PI', mc: '$803.15K', price: '$0.03832', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '5', symbol: 'ppp', name: 'ppp', mc: '$221.99K', price: '$0.032220', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '6', symbol: 'lmeow', name: 'lmeow', mc: '$558.70K', price: '$0.035594', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '7', symbol: 'CRYPTO', name: 'CRYPTO', mc: '$23.86K', price: '$0.042386', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '8', symbol: 'USDP', name: 'USDP', mc: '$18.00M', price: '$0.01800', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
  {
    id: '9', symbol: 'moonpig', name: 'moonpig', mc: '$?', price: '$0.01082', icon: require('@/assets/images/react-logo.png'), decimals: 6,
  },
];

export default function ExploreScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [tokens, setTokens] = useState<ExploreTokenData[]>(mockTokens);
  const router = useRouter();

  const handleTabPress = (idx: number) => setSelectedTab(idx);

  const handleTokenPress = (token: ExploreTokenData) => {
    router.push({
      pathname: '/token/[id]',
      params: {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        price: token.price,
        decimals: token.decimals,
        daily_volume: token.mc
      }
    });
  };
  const handleFilterPress = (idx: number) => {
    setFilters(filters.map((f, i) => ({ ...f, active: i === idx })));
  };

  useEffect(() => {
    (async () => {
      const tokenList = ["JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4", "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", "Dz9mQ9NzkBcCsuGPFJ3r1bS4wgqKMHBPiVuniW8Mbonk", "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump"]
      let data: ExploreTokenData[] = []
      for (let i = 0; i < tokenList.length; i++) {
        const { address, symbol, name, logoURI, daily_volume, decimals } = await tokenService.getTokenData(tokenList[i])
        data.push({
          id: address,
          symbol: symbol,
          name: name,
          mc: daily_volume,
          price: "1",
          icon: logoURI, // This will be a string URL from the API
          decimals,
        })
      }
      console.log(data)
      setTokens(data)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top bar */}
        {/* ProfileBar (common top bar with drawer) */}
        <ProfileBar
          avatar={mockUser.avatar}
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
          onTokenPress={handleTokenPress}
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
