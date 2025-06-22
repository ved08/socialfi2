import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenList, { TokenData } from '../../components/TokenList';
import WalletHeader from '../../components/WalletHeader';
import WalletTabs from '../../components/WalletTabs';
import ProfileBar from '../../components/ProfileBar';
import ProfileDrawer from '../../components/ProfileDrawer';

const mockUser = {
    username: 'soldjer77',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    following: 123,
    followers: 456,
    twitterUrl: 'https://twitter.com/',
};

export default function WalletScreen() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Tokens');

    // Mock token data

    const tokens: TokenData[] = [
        {
            id: '1',
            symbol: 'SOL',
            name: 'Solana',
            mc: 'MC: $85.10B',
            position: '$1.20',
            pnl: '$0.00',
            pnlPercent: '0%',
            icon: require('../../assets/images/adaptive-icon.png'), // Replace with your token icons
        },
        {
            id: '2',
            symbol: 'SEND',
            name: 'Send Token',
            mc: 'MC: $15.57M',
            position: '$1.16',
            pnl: '-$3.79',
            pnlPercent: '-76.6%',
            icon: require('../../assets/images/adaptive-icon.png'),
        },
        {
            id: '3',
            symbol: 'VINE',
            name: 'Vine Token',
            mc: 'MC: $30.40M',
            position: '$0.20',
            pnl: '-$1.78',
            pnlPercent: '-90%',
            icon: require('../../assets/images/adaptive-icon.png'),
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
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
            <WalletHeader
                balance={"$2.56"}
                pnl={"\u2193 -$5.58"}
                pnlChange={"-68%"}
                onSend={() => { }}
                onReceive={() => { }}
                onBuy={() => { }}
            />
            <WalletTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'Tokens' && <TokenList tokens={tokens} />}
            {/* Add Activity and Orders tab content here as needed */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
});
