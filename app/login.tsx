import React, { useState, useEffect, use } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEmbeddedSolanaWallet, usePrivy } from '@privy-io/expo';
import { useLogin } from '@privy-io/expo/ui';
import { userService } from '../services/api';

export default function LoginScreen() {
    const { login } = useLogin();
    const { isReady, user } = usePrivy();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { create, wallets } = useEmbeddedSolanaWallet()

    React.useEffect(() => {
        const handleUserCheck = async () => {
            try {
                setIsLoading(true);
                if (user?.created_at) {
                    // Check if user exists
                    const userExists = await userService.checkUser(user.id);
                    console.log(userExists, "HElllloooo")
                    if (!userExists) {
                        // Create new user profile
                        if (create) {
                            await create()
                        }
                        await userService.createUser({
                            name: user.id,
                            avatar: '@/assets/images/default-avatar.png'
                        });
                    }

                    // // Navigate to home after user check/creation
                    router.replace('/');
                }
            } catch (error) {
                console.error('Error during user check:', error);
                setError('Failed to check user profile');
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            handleUserCheck();
        }
    }, [user]);

    if (!isReady) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in to SocialFi</Text>
            <Button
                title="Login with Email"
                onPress={() => {
                    login({ loginMethods: ['email', 'twitter'] })
                        .catch((err) => setError(JSON.stringify(err.error)));
                }}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {isLoading && <Text style={styles.loading}>Checking profile...</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 32,
    },
    error: {
        color: 'red',
        marginTop: 16,
    },
    loading: {
        color: '#fff',
        marginTop: 16,
    },
});
