import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AddAlarm = ({ modalVisible, setModalVisible, onAddAlarm }) => {
  const [stopName, setStopName] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleAddAlarm = () => {
    if (stopName && frequency) {
      onAddAlarm(stopName, frequency); // Passes new alarm data to parent component
      setStopName(''); // Clears the input fields
      setFrequency('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Alarm</Text>

          {/* Input fields for alarm details */}
          <TextInput
            style={styles.input}
            placeholder="Stop Name"
            value={stopName}
            onChangeText={setStopName}
          />
          <TextInput
            style={styles.input}
            placeholder="Frequency"
            value={frequency}
            onChangeText={setFrequency}
          />

          {/* Add button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAlarm} // Trigger addNewAlarm when clicked
          >
            <Text style={styles.buttonText}>Add Alarm</Text>
          </TouchableOpacity>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="times" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background with transparency
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#00A859',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default AddAlarm;
