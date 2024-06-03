import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
