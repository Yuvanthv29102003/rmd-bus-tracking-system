import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const PhoneAuthScreen = () => {
  const navigation = useNavigation();  // Initialize navigation
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Placeholder functions for OTP handling
  const sendVerification = () => {
    // Handle sending OTP (Placeholder logic)
    console.log('Sending OTP to:', phoneNumber);
    setModalVisible(true); // Show OTP input modal
  };

  const confirmCode = () => {
    // Handle confirming OTP (Placeholder logic)
    console.log('Confirming OTP:', verificationCode);
    Alert.alert('Success', 'OTP verified successfully!');
    setModalVisible(false); // Hide OTP input modal
    navigation.navigate('Home'); // Navigate to Bus Tracker Screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your mobile number to get OTP</Text>

      <View style={styles.phoneContainer}>
        <TextInput
          style={styles.phoneInput}
          placeholder="+91"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendVerification}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>

      {/* OTP Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            
            <TextInput
              placeholder="Enter OTP"
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              style={styles.inputOTP}
            />

            <TouchableOpacity style={styles.buttonOTP} onPress={confirmCode}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.denyText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  phoneInput: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputOTP: {
    width: '100%',
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7F56D9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
    buttonOTP: {
      backgroundColor: '#7F56D9',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%', // Adjust width as needed
    maxWidth: 400, // Optional: Set a maximum width for larger screens
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  denyText: {
    color: '#FF6347',
    fontSize: 16,
    marginTop: 10,
  },
});

export default PhoneAuthScreen;
