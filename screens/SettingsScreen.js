import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../context/AuthContext';  // Assuming you have this file setup

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);  // Use context to update the auth state

  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Firebase sign out
      await AsyncStorage.removeItem('authToken');  // Remove token from AsyncStorage
      setIsAuthenticated(false);  // Update auth state
      
      // Reset navigation to login screen after successful sign out
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (error) {
      // Handle sign-out error (optional)
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-circle-outline" size={30} color="black" />
        <Text style={styles.optionText}>Update your profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FavoriteRoute')}>
        <Ionicons name="location-outline" size={30} color="black" />
        <Text style={styles.optionText}>Add your Favourite Route</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeLanguage')}>
        <Ionicons name="language-outline" size={30} color="black" />
        <Text style={styles.optionText}>Change language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={30} color="black" />
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('InviteFriends')}>
        <Ionicons name="people-outline" size={30} color="black" />
        <Text style={styles.optionText}>Invite friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Support')}>
        <Ionicons name="help-circle-outline" size={30} color="black" />
        <Text style={styles.optionText}>Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AboutUs')}>
        <Ionicons name="information-circle-outline" size={30} color="black" />
        <Text style={styles.optionText}>About us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={30} color="red" />
        <Text style={styles.optionText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
    backgroundColor: '#fff',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default SettingsScreen;
