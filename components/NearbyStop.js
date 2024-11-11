import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const NearbyStop = ({ stopNo, eta, stopName, imageSource }) => (
  <TouchableOpacity style={styles.nearbyStop}>
    <Image source={imageSource} style={styles.stopImage} />
    <View style={styles.textContainer}>
      <Text style={styles.stopNo}>{stopNo}</Text>
      <Text style={styles.stopDistance}>{eta}</Text>
      <Text style={styles.stopDistance}>{stopName}</Text>
    </View>
  </TouchableOpacity>
);

const NearbyStopList = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
    >
      <NearbyStop stopNo="Bus No 257" eta="ETA 3mins"  stopName="Maduravoyal" imageSource={require('../assets/bus.jpeg')} />
      <NearbyStop stopNo="Bus No 282" eta="ETA 5mins" stopName="Ponneri" imageSource={require('../assets/bus.jpeg')} />
      <NearbyStop stopNo="Bus No 266" eta="ETA 8mins" stopName="Retteri" imageSource={require('../assets/bus.jpeg')} />
      <NearbyStop stopNo="Bus No 283" eta="ETA 10mins" stopName="Amman Koil St" imageSource={require('../assets/bus.jpeg')} />
      <NearbyStop stopNo="Bus 253" eta="ETA 2mins" stopName="Mogappair East" imageSource={require('../assets/bus.jpeg')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  nearbyStop: {
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 15,
    marginRight: 15,
    width: screenWidth * 0.6, // Adjust width to fit the screen nicely
    alignItems: 'center',
    elevation: 5, // Add shadow for modern look
  },
  stopImage: {
    width: '85%',  // Set image width to fill the container
    height: 120,    // Set height of the image
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  stopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopDistance: {
    fontSize: 14,
    color: '#757575',
  },
});

export default NearbyStopList;
