import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../components/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();

// Custom icon component with notification dot
const CustomTabIcon = ({ iconName, hasNotification }) => (
  <View style={styles.iconContainer}>
    <Icon name={iconName} size={20} color="white" />
    {hasNotification && <View style={styles.notificationDot} />}
  </View>
);

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Community') {
            iconName = 'users';
            return <CustomTabIcon iconName={iconName} hasNotification={true} />; // Add notification dot for Community
          } else if (route.name === 'Map') {
            iconName = 'map';
          } 
          else if (route.name === 'Settings') {
            iconName = 'cog';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000', // Black background
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false, // Hide the header for all screens
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative', // To position the notification dot
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5, // Make it circular
    backgroundColor: 'red', // Dot color
  },
});

export default BottomNavigation;
