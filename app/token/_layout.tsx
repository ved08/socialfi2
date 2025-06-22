import { Stack } from 'expo-router';

export default function TokenLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: '',
        headerBackTitle: '',
      }}
    >
      <Stack.Screen 
        name="[id]" 
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
