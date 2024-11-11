import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { db } from '../config/firebase'; // Adjust the path as per your project structure
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import ConfettiCannon from 'react-native-confetti-cannon'; // Import Confetti Cannon

const RateExperienceComponent = ({ onClose }) => {
  const [rating, setRating] = useState(0); // State for storing the star rating
  const [comment, setComment] = useState(''); // State for storing the comment
  const [showThankYouModal, setShowThankYouModal] = useState(false); // State to control the thank-you modal
  const [showConfetti, setShowConfetti] = useState(false); // State to control the confetti effect
  const { isAuthenticated } = useContext(AuthContext); // Get auth status from AuthContext

  const confettiRef = useRef(null); // Ref to trigger confetti

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      console.log('User must be authenticated to submit a rating.');
      return;
    }

    try {
      await addDoc(collection(db, 'ratings'), {
        rating,
        comment,
        timestamp: Timestamp.now()
      });

      setShowConfetti(true); // Trigger confetti
      confettiRef.current.start(); // Start confetti animation

      setShowThankYouModal(true);
      setTimeout(() => {
        setShowThankYouModal(false);
        onClose();
      }, 3000); // Delay for the thank-you modal (3 seconds)
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate your experience!</Text>
      <Text style={styles.subheader}>
        We love to hear from you! How's your experience with the RMDEC Bus Tracker?
      </Text>

      <Text style={styles.ratingPrompt}>Please rate your experience on a 5-star scale</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star ? styles.selectedStar : null]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentBox}
        placeholder="Any comment for us?"
        placeholderTextColor="#aaa"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Confetti Effect */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
          explosionSpeed={200}
          fallSpeed={3000}
          ref={confettiRef}
        />
      )}

      <Modal
        transparent={true}
        visible={showThankYouModal}
        animationType="fade"
        onRequestClose={() => setShowThankYouModal(false)}
      >
        <View style={styles.thankYouModalOverlay}>
          <View style={styles.thankYouModalContent}>
            <Text style={styles.thankYouText}>🎉 Thank you for your feedback! 🎉</Text>
            <Text style={styles.thankYouSubText}>Your opinion matters to us!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowThankYouModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    width: '90%', // Adjust container width to make it wider
    maxWidth: 400, // Limit maximum width for larger screens
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingPrompt: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: '#ccc',
    marginHorizontal: 5,
  },
  selectedStar: {
    color: '#FFD700', // Gold color for selected stars
  },
  commentBox: {
    width: '100%', // Full width of the container
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 16,
    minHeight: 80, // Increase the height of the comment box for better visibility
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  thankYouModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  thankYouModalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%', // Make it slightly smaller for a nice effect
  },
  thankYouText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28A745', // A green color to represent positivity
    marginBottom: 10,
  },
  thankYouSubText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RateExperienceComponent;
