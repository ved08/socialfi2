import { postService, tokenService } from '@/services/api';
import { useEmbeddedSolanaWallet, usePrivy } from '@privy-io/expo';
import { Connection, Transaction, VersionedMessage, VersionedTransaction } from '@solana/web3.js';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  decimals: number;
  daily_volume: number;
}

type RouteParams = {
  id: string;
  name?: string;
  symbol?: string;
  price?: string;
  decimals?: string;
  daily_volume?: string;
};

export default function TokenDetailScreen() {
  const { id, name, symbol, price, decimals, daily_volume } = useLocalSearchParams<RouteParams>();
  const [token, setToken] = useState<TokenData | null>(null);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [walletAddress, setWalletAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const router = useRouter();
  const { wallets } = useEmbeddedSolanaWallet()
  const { user } = usePrivy()

  // Parse the price from the route params
  const tokenPrice = price ? parseFloat(price) : 0;

  useEffect(() => {
    setWalletAddress(wallets?.[0].address || "")
    if (id) {
      const mockToken: TokenData = {
        id,
        name: name || 'Ethereum',
        symbol: symbol || 'ETH',
        image: `https://cryptoicons.org/api/icon/${symbol?.toLowerCase() || 'eth'}/200`,
        current_price: parseFloat(price || '0'),
        price_change_percentage_24h: 0,
        market_cap: 0,
        total_volume: 0,
        decimals: Number(decimals || '6'),
        daily_volume: Number(daily_volume || '0'),
      };
      setToken(mockToken);
    }
  }, [id, name, symbol, price]);

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleBuySellPress = async () => {
    console.log("handleBuySellPress");

    if (!token) {
      Alert.alert('Error', 'No token selected');
      return;
    }

    if (!wallets?.[0]) {
      Alert.alert('Error', 'No wallet connected');
      return;
    }

    const wallet = wallets[0];
    const action = activeTab === 'buy' ? 'buying' : 'selling';

    // Set loading state
    setIsLoading(true);
    setLoadingText(`Preparing ${action} transaction...`);

    try {
      const provider = await wallet.getProvider();
      const connection = new Connection(process.env.RPC_URL || "https://mainnet.helius-rpc.com/?api-key=53da17ee-6973-4f78-ab61-fd7a59f1cc80");
      const actualAmount = Number(amount) * (10 ** token.decimals);

      // Update loading text
      setLoadingText(`Creating ${action} transaction...`);

      // Get transaction data based on buy/sell
      const data = activeTab === 'buy'
        ? await tokenService.buyToken(token.id, actualAmount.toString(), walletAddress)
        : await tokenService.sellToken(token.id, actualAmount.toString(), walletAddress);

      if (data.error) {
        throw new Error(data.error);
      }

      // Update loading text
      setLoadingText('Sending transaction...');

      // Deserialize and send the transaction
      const buffer = Buffer.from(data.transaction, 'base64');
      const transaction = VersionedTransaction.deserialize(buffer);

      const { signature } = await provider.request({
        method: "signAndSendTransaction",
        params: {
          transaction,
          connection
        }
      });
      console.log(`${action} Tx sent:`, signature);

      // Update loading text
      setLoadingText('Waiting for confirmation...');


      // Reset loading state
      setIsLoading(false);

      // Show success message with transaction hash
      Alert.alert(
        'Transaction Successful',
        `Successfully completed ${action} ${amount} ${token.symbol}\n\nTransaction Hash:\n${signature}`,
        [
          {
            text: 'View in Wallet',
            onPress: () => {
              // You can also add a link to a block explorer here if needed
              // e.g., Linking.openURL(`https://explorer.solana.com/tx/${signature}`);
              router.push('/(tabs)/wallet');
            }
          }
        ]
      );

      postService.createPost({
        userName: user?.id || "",
        mint: token.id,
        boughtAmt: amount,
        holding: true,
        soldAmt: "0"
      })

    } catch (error) {
      console.error(`Error ${action}:`, error);
      setIsLoading(false);

      // Show error message
      Alert.alert(
        'Transaction Failed',
        `Failed to complete ${action}. ${error instanceof Error ? error.message : 'Please try again.'}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => { }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{token.name}</Text>
              <Text style={styles.contractAddress}>
                {`${token.id.slice(0, 2)}...${token.id.slice(-4)}`}
              </Text>
            </View>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.tokenInfo}>
            {token.image ? (
              <Image
                source={typeof token.image === 'string' ? { uri: token.image } : token.image}
                style={styles.tokenImage}
                onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
              />
            ) : (
              <View style={[styles.tokenImage, { backgroundColor: '#23242A', justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  {token.symbol.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.tokenNameContainer}>
              <Text style={styles.tokenName}>{token.name}</Text>
              <Text style={styles.tokenSymbol}>{token.symbol.toUpperCase()}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatCurrency(token.current_price)}</Text>
              <Text
                style={[
                  styles.priceChange,
                  token.price_change_percentage_24h >= 0 ? styles.positive : styles.negative
                ]}
              >
                {token.price_change_percentage_24h >= 0 ? '+' : ''}
                {token.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
          </View>

          {/* Chart Placeholder */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartPlaceholder}>Chart Coming Soon</Text>
          </View>

          {/* Market Data */}
          <View style={styles.marketData}>
            <View style={styles.marketDataRow}>
              <Text style={styles.marketDataLabel}>Market Cap</Text>
              <Text style={styles.marketDataValue}>{formatCurrency(token.market_cap)}</Text>
            </View>
            <View style={styles.marketDataRow}>
              <Text style={styles.marketDataLabel}>24h Trading Volume</Text>
              <Text style={styles.marketDataValue}>{formatCurrency(token.daily_volume)}</Text>
            </View>
          </View>

          {/* Buy/Sell Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'buy' && styles.activeTab]}
              onPress={() => setActiveTab('buy')}
            >
              <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
              onPress={() => setActiveTab('sell')}
            >
              <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>Sell</Text>
            </TouchableOpacity>
          </View>

          {/* Buy/Sell Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount ({token.symbol.toUpperCase()})</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder={`0.00 ${token.symbol.toUpperCase()}`}
                placeholderTextColor="#666"
              />
              <View style={styles.amountFiat}>
                <Text style={styles.amountFiatText}>
                  {amount ? `~ $${(parseFloat(amount) * token.current_price).toFixed(2)}` : ''}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.actionButton,
                activeTab === 'buy' ? styles.buyButton : styles.sellButton
              ]}
              onPress={handleBuySellPress}
            >
              <Text style={styles.actionButtonText}>
                {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Loading Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: '70%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 30, // Add some padding at the bottom to ensure content is not hidden
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  contractAddress: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  headerRight: {
    width: 40,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tokenImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tokenNameContainer: {
    flex: 1,
  },
  tokenName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tokenSymbol: {
    color: '#888',
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  priceChange: {
    fontSize: 14,
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    margin: 16,
    borderRadius: 12,
  },
  chartPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  marketData: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  marketDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  marketDataLabel: {
    color: '#888',
    fontSize: 14,
  },
  marketDataValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 16,
  },
  amountFiat: {
    marginTop: 8,
  },
  amountFiatText: {
    color: '#666',
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
  },
  sellButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

});
