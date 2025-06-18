import React, { useState } from 'react';
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
        userMC: 3550000,
        apedIn: 2,
    },
    // Add more mock broadcasts here
];

const TABS = ['Broadcasts', 'Holdings', 'Tips'];

import { usePrivy } from '@privy-io/expo';

export default function ProfileScreen() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedStatsTab, setSelectedStatsTab] = useState<'today' | 'week'>('today');

    const { logout } = usePrivy();
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <ProfileBanner
                    banner={require('@/assets/images/banner-default.jpeg')}
                    avatar={mockUser.avatar}
                    username={mockUser.username}
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
                <View style={{ flex: 1 }}>
                    {selectedTab === 0 && (
                        <FlatList
                            data={mockBroadcasts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TradeFeedCard item={item} />}
                            contentContainerStyle={{ padding: 16, paddingTop: 8 }}
                            showsVerticalScrollIndicator={false}
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
                    <Text style={styles.logoutLabel}>Temporary Logout</Text>
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
        marginVertical: 24,
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
