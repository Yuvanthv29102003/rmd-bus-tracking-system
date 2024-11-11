import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const busStops = [
  { id: 1, busNumber: 'Bus No 257', eta: 'ETA 3 mins', destination: 'Maduravoyal', imageSource: require('../assets/bus.jpeg') },
  { id: 2, busNumber: 'Bus No 120', eta: 'ETA 5 mins', destination: 'Anna Nagar', imageSource: require('../assets/bus.jpeg') },
  { id: 3, busNumber: 'Bus No 333', eta: 'ETA 7 mins', destination: 'Tambaram', imageSource: require('../assets/bus.jpeg') },
  { id: 4, busNumber: 'Bus No 450', eta: 'ETA 9 mins', destination: 'T Nagar', imageSource: require('../assets/bus.jpeg') },
  { id: 5, busNumber: 'Bus No 500', eta: 'ETA 12 mins', destination: 'Porur', imageSource: require('../assets/bus.jpeg') },
];

const AllNearbyStops = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* ScrollView with horizontal scrolling */}
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
        {busStops.map((stop) => (
          <View key={stop.id} style={styles.stopCard}>
            <Image source={stop.imageSource} style={styles.busImage} />
            <Text style={styles.busNumber}>{stop.busNumber}</Text>
            <Text style={styles.busETA}>{stop.eta}</Text>
            <Text style={styles.busDestination}>{stop.destination}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
    paddingTop: 40,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  scrollContainer: {
    flexDirection: 'row', // Display children in a horizontal row
    justifyContent: 'center', // Center cards horizontally
    alignItems: 'center', // Center cards vertically
  },
  stopCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginRight: 20, // Add spacing between cards
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 220, // Set fixed width for cards
  },
  busImage: {
    width: 200, // Adjust width
    height: 120, // Adjust height
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover', // Scale the image
  },
  busNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  busETA: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  busDestination: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllNearbyStops;
