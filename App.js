import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed
import MainNavigator from './navigation/MainNavigator'; // Your main navigator for authenticated users
import AuthNavigator from './navigation/AuthNavigator'; // Your auth screens for non-authenticated users
import LoadingScreen from './screens/LoadingScreen'; // Loading screen
import AuthStateHandler from './config/AuthStateHandler'; // A component to handle navigation based on auth state

// App component that wraps the entire app with AuthProvider
export default () => (
  <AuthProvider>
    <NavigationContainer>
      <AuthStateHandler />
    </NavigationContainer>
  </AuthProvider>
);
