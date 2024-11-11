import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import CountryPicker from 'react-native-country-picker-modal';
import AuthContext from '../context/AuthContext';

const UserDetailsScreen = () => {
  const { completeUserDetails } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [boardingPoint, setBoardingPoint] = useState('');
  const [primaryBusNo, setPrimaryBusNo] = useState('');
  const [secondaryBusNo, setSecondaryBusNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [callingCode, setCallingCode] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const handleCompleteDetails = () => {
    if (!fullName || !boardingPoint || !primaryBusNo || !secondaryBusNo || !phoneNumber || !countryCode) {
      Alert.alert('Error', 'Please fill out all fields and select a country.');
      return;
    }
    setModalVisible(true);
  };

  const handleGetOtp = () => {
    Alert.alert('OTP Sent', 'An OTP has been sent to your phone number.');
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') { // Replace with actual OTP logic
      Alert.alert('Verification Successful', 'Your phone number has been verified.');
    } else {
      Alert.alert('Verification Failed', 'The OTP entered is incorrect.');
    }
  };

  const handleAllow = async () => {
    await updateUserDetails();
    completeUserDetails();
    navigation.navigate('Main');
  };

  const updateUserDetails = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No authenticated user found. Redirecting to Login.');
        navigation.navigate('Auth');
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        fullName,
        boardingPoint,
        primaryBusNo,
        secondaryBusNo,
        phoneNumber: `${callingCode} ${phoneNumber}`,
        userDetailsCompleted: true,
      });
    } catch (error) {
      console.error("Error updating user details:", error.message);
      Alert.alert('Error', 'Failed to update user details. Please try again.');
    }
  };

  const handleContinue = () => {
    setLocationModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>User Details</Text>
        
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Boarding Point"
          value={boardingPoint}
          onChangeText={setBoardingPoint}
          style={styles.input}
        />
        <TextInput
          placeholder="Primary Bus Number"
          value={primaryBusNo}
          onChangeText={setPrimaryBusNo}
          style={styles.input}
        />
        <TextInput
          placeholder="Secondary Bus Number"
          value={secondaryBusNo}
          onChangeText={setSecondaryBusNo}
          style={styles.input}
        />
        
        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryPicker} onPress={() => setShowPicker(true)}>
            <Text>{callingCode ? `+${callingCode}` : 'Select Country'}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.phoneInput}
          />
          <TouchableOpacity style={styles.otpButton} onPress={handleGetOtp}>
            <Text style={styles.otpButtonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.otpContainer}>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={styles.otpInput}
          />
          {otp.length > 0 && (
            <TouchableOpacity style={styles.otpButton} onPress={handleVerifyOtp}>
              <Text style={styles.otpButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        {showPicker && (
          <CountryPicker
            withCallingCode
            withFilter
            visible={showPicker}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
              setShowPicker(false);
            }}
            onClose={() => setShowPicker(false)}
          />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Permission Required</Text>
              <Text style={styles.modalMessage}>This app requires permission to proceed. Would you like to allow it?</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleAllow}>
                <Text style={styles.buttonText}>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={locationModalVisible}
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Location Permission Required</Text>
              <Text style={styles.modalMessage}>This app requires location access to provide better services. Please allow it in your settings.</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setLocationModalVisible(false)}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.continueButton} onPress={handleCompleteDetails}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    width: '100%',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8, // Reduced padding for smaller size
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFDDDD', // Changed button color
    flex: 1,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flex: 2,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flex: 2,
  },
  otpButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  otpButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default UserDetailsScreen;
