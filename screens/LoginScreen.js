import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { auth } from '../config/firebase'; // Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistence
import { FontAwesome } from '@expo/vector-icons'; // Social icons
import AuthContext from '../context/AuthContext'; // Authentication context
import LoadingScreen from './LoadingScreen'; // Import the loading screen component

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);  // Get the login function from AuthContext
  const [email, setEmail] = useState('');  // State to hold email input
  const [password, setPassword] = useState('');  // State to hold password input
  const [error, setError] = useState({ email: '', password: '', general: '' });  // State to hold validation and auth errors
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = () => {
    // Reset previous errors
    setError({ email: '', password: '', general: '' });

    // Validate input fields
    let valid = true;
    if (!email) {
      setError(prevState => ({ ...prevState, email: 'Please enter your email.' }));
      valid = false;
    }
    if (!password) {
      setError(prevState => ({ ...prevState, password: 'Please enter your password.' }));
      valid = false;
    }

    if (!valid) return;  // If validation fails, don't proceed

    // Set loading to true
    setLoading(true);

    // Sign in with Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Get the user object and ID token from Firebase
        const user = userCredential.user;
        const token = await user.getIdToken();  // Fetch the ID token

        // Store the token in AsyncStorage for persistence
        await AsyncStorage.setItem('authToken', token);
        login(token);  // Update authentication state in the context

        // Navigate to the Home screen
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Handle Firebase authentication errors
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'The email address is invalid.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'The password is incorrect.';
            break;
          default:
            errorMessage = 'Login failed. Please try again.';
        }
        setError(prevState => ({ ...prevState, general: errorMessage }));
      })
      .finally(() => {
        // Set loading to false when login is done
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingScreen />; // Show the loading screen if the login is in progress
  }

  return (
    <View style={styles.container}>
      {/* Display a bus image */}
      <Image 
        source={require('../assets/bus-image.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      
      {/* Display general error if exists */}
      {error.general ? <Text style={styles.errorText}>{error.general}</Text> : null}

      {/* Email Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        placeholderTextColor="#8E8E8F"
      />
      {/* Display email error */}
      {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

      {/* Password Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        placeholderTextColor="#8E8E8F"
      />
      
      {/* Display password error */}
      {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <Text style={styles.forgotPassword}>
        Forgot password? <Text style={styles.resetLink}>Reset now</Text>
      </Text>

      {/* Social Login Options */}
      <Text style={styles.orText}>Or continue with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Navigate to Signup */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text 
          style={styles.signupLink} 
          onPress={() => navigation.navigate('Signup')}  // Navigate to SignupScreen
        >
          Signup
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#7A5EFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#333',
    fontSize: 14,
  },
  resetLink: {
    color: '#7A5EFF',
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    color: '#8E8E8F',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8E8E8F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#7A5EFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
