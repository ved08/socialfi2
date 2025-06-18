import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { useRouter, usePathname } from 'expo-router';
import LoginScreen from './login';

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const { isReady, user } = usePrivy();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (isReady && !user && pathname !== '/login') {
            router.replace('/login');
        }
        if (isReady && user && pathname === '/login') {
            router.replace('/');
        }
    }, [isReady, user, pathname]);

    if (!isReady) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    // If not authenticated and on /login, show login screen
    if (!user && pathname === '/login') {
        return <LoginScreen />;
    }

    // If not authenticated and not on /login, redirect (handled in useEffect)
    if (!user) {
        return null;
    }

    // If authenticated, render children
    return <>{children}</>;
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
    },
});
