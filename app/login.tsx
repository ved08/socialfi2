import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { usePrivy } from '@privy-io/expo';
import { useLogin } from '@privy-io/expo/ui';

export default function LoginScreen() {
    const { login } = useLogin();
    const { isReady, user } = usePrivy();
    const [error, setError] = useState('');
    const router = useRouter();

    React.useEffect(() => {
        if (user) {
            router.replace('/');
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
                    login({ loginMethods: ['email'] })
                        .catch((err) => setError(JSON.stringify(err.error)));
                }}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
});
