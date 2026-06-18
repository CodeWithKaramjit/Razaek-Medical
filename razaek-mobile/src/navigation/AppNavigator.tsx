import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PackageDetailScreen } from '../screens/PackageDetailScreen';
import { colors } from '../theme/tokens';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const appNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.primary,
    text: colors.textPrimary,
    border: colors.border,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={appNavigationTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      >
        <Stack.Screen component={LoginScreen} name="Login" />
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={PackageDetailScreen} name="PackageDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
