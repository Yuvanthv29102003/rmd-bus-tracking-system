import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import RateExperienceComponent from './RateExperienceComponent'; // Import the new component

const ServicesComponent = () => {
  const [showRateExperience, setShowRateExperience] = useState(false); // State to toggle modal visibility

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Student,</Text>
          <Text style={styles.subtitle}>Plan your community efficiently</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.rateButton} 
          onPress={() => setShowRateExperience(true)} // Show modal on press
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Rate Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Provide Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for the RateExperienceComponent */}
      <Modal
        transparent={true}
        visible={showRateExperience}
        animationType="slide" // Slide up effect
        onRequestClose={() => setShowRateExperience(false)} // Handle back press to close modal
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomModalContent}>
            {/* Close button */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowRateExperience(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Render RateExperienceComponent inside the modal with onClose prop */}
            <RateExperienceComponent onClose={() => setShowRateExperience(false)} />

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  rateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  feedbackButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ServicesComponent;
