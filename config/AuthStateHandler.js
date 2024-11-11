import React, { useContext } from 'react';
import { View } from 'react-native';
import AuthContext from '../context/AuthContext'; // Import the AuthContext
import MainNavigator from '../navigation/MainNavigator'; // Your main navigator
import AuthNavigator from '../navigation/AuthNavigator'; // Your auth screens
import LoadingScreen from '../screens/LoadingScreen'; // Loading screen

const AuthStateHandler = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />; // Display loading while authentication state is being determined
  }

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </View>
  );
};

export default AuthStateHandler;
