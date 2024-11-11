import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const validateInputs = () => {
    let valid = true;
    let newErrors = {};

    if (fullName.trim() === '') {
      newErrors.fullName = 'Full name is required.';
      valid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (email.trim() === '') {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(collection(db, 'users'), user.uid), {
        fullName,
        email,
        userDetailsCompleted: false,
      });

      console.log('User registered and details saved to Firestore:', user);
      navigation.navigate('UserDetails');
    } catch (error) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.';
          break;
        default:
          errorMessage = 'Failed to create account. Please try again.';
      }
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image source={require('../assets/bus-image.jpg')} style={styles.image} />
            <Text style={styles.title}>Create New Account</Text>

            {/* Input Fields */}
            <InputField
              placeholder="Enter Full Name"
              value={fullName}
              onChangeText={setFullName}
              icon="user"
              errorMessage={errors.fullName}
            />
            <InputField
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              icon="envelope"
              keyboardType="email-address"
              errorMessage={errors.email}
            />
            <InputField
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry
              errorMessage={errors.password}
            />
            <InputField
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon="lock"
              secureTextEntry
              errorMessage={errors.confirmPassword}
            />

            {errors.general ? <Text style={styles.errorText}>{errors.general}</Text> : null}

            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Already have an account? */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                <Text style={styles.accountText}>Already have an account? </Text>
                <Text style={styles.loginLink}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Separate Input Field Component for reusability
const InputField = ({ placeholder, value, onChangeText, icon, errorMessage, secureTextEntry, keyboardType }) => (
  <View style={{ marginBottom: 15 }}>
    <View style={styles.inputContainer}>
      <FontAwesome name={icon} size={20} color="#7C7C7C" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#7F56D9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  accountText: {
    color: 'black',
  },
  loginLink: {
    color: '#7A5EFF',
  },
});

export default SignupScreen;
