import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileBanner from '../../components/ProfileBanner';
import ProfileStatsBar from '../../components/ProfileStatsBar';
import ProfileTabs from '../../components/ProfileTabs';
import TradeFeedCard, { TradeFeedItem } from '../../components/TradeFeedCard';


const mockUser = {
    username: 'ved0811',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    following: 25,
    followers: 16,
    twitterUrl: 'https://twitter.com/',
};

const mockStats = {
    volume: '$0.00',
    pnl: '-$0.18',
    maxTrade: '$0.00',
    bestWeek: '3528',
    bestPnl: '-$1.52',
};

const mockBroadcasts: TradeFeedItem[] = [
    {
        id: '1',
        user: { name: 'ved0811', avatar: mockUser.avatar, time: '5mo' },
        asset: 'ALR',
        marketCap: '$33.89K MC',
        bought: 25.87,
        description: 'Oof',
        chart: [],
        pnl: -1.52,
        pnlPercent: -5.8,
        totalBought: 25.87,
        totalSold: 0,
        holding: 0,
        userMC: 3550.00,
        apedIn: 2,
        tokenMint: 'ALR1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: '2025-01-22T10:15:30Z'
    },
    {
        id: '2',
        user: { name: 'ved0811', avatar: mockUser.avatar, time: '2w' },
        asset: 'SOL',
        marketCap: '$42.5B MC',
        bought: 150.00,
        description: 'Accumulating more',
        chart: [],
        pnl: 25.50,
        pnlPercent: 17.0,
        totalBought: 300.00,
        totalSold: 150.00,
        holding: 150.00,
        userMC: 4250.75,
        apedIn: 5,
        tokenMint: 'SOL1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: '2025-06-08T14:30:45Z'
    },
    {
        id: '3',
        user: { name: 'ved0811', avatar: mockUser.avatar, time: '1d' },
        asset: 'BONK',
        marketCap: '$1.2B MC',
        bought: 500.00,
        description: 'Meme coin gamble',
        chart: [],
        pnl: -125.00,
        pnlPercent: -25.0,
        totalBought: 1000.00,
        totalSold: 500.00,
        holding: 500.00,
        userMC: 1200.25,
        apedIn: 8,
        tokenMint: 'BONK1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: '2025-06-21T09:45:15Z'
    }
];

const TABS = ['Broadcasts', 'Holdings', 'Tips'];

import { useEmbeddedSolanaWallet, usePrivy } from '@privy-io/expo';

export default function ProfileScreen() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedStatsTab, setSelectedStatsTab] = useState<'today' | 'week'>('today');
    const { wallets } = useEmbeddedSolanaWallet()
    const [walletAddress, setWalletAddress] = useState('')
    const { logout } = usePrivy();
    useEffect(() => {
        setWalletAddress(wallets?.[0].address || "")
    }, [])
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <ProfileBanner
                    banner={require('@/assets/images/banner-default.jpeg')}
                    avatar={mockUser.avatar}
                    username={`${walletAddress.slice(0, 2)}...${walletAddress.slice(-3)}`}
                    verified={true}
                    following={mockUser.following}
                    followers={mockUser.followers}
                    isSelf
                    onEditProfile={() => { }}
                />
                <ProfileStatsBar
                    volume={mockStats.volume}
                    pnl={mockStats.pnl}
                    maxTrade={mockStats.maxTrade}
                    todaySelected={selectedStatsTab === 'today'}
                    weekSelected={selectedStatsTab === 'week'}
                    onSelectTab={tab => setSelectedStatsTab(tab)}
                    bestWeek={mockStats.bestWeek}
                    bestPnl={mockStats.bestPnl}
                />
                <ProfileTabs
                    tabs={TABS}
                    selected={selectedTab}
                    onSelect={setSelectedTab}
                />
                {/* Tab content */}
                <View style={styles.content}>
                    {selectedTab === 0 && (
                        <FlatList
                            data={mockBroadcasts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TradeFeedCard item={item} />}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            alwaysBounceVertical={true}
                        />
                    )}
                    {selectedTab === 1 && (
                        <View style={styles.placeholder}><Text style={styles.placeholderText}>No Holdings Yet</Text></View>
                    )}
                    {selectedTab === 2 && (
                        <View style={styles.placeholder}><Text style={styles.placeholderText}>No Tips Yet</Text></View>
                    )}
                </View>
                {/* Temporary Logout Button */}
                <View style={styles.logoutContainer}>
                    <Text style={styles.logoutButton} onPress={() => logout()}>Logout</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#111',
    },
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        padding: 16,
        paddingTop: 12,
        paddingBottom: 24,
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: '#aaa',
        fontSize: 18,
        marginTop: 40,
    },
    logoutContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logoutLabel: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 8,
    },
    logoutButton: {
        color: '#ff5252',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#222',
        overflow: 'hidden',
    },
});
