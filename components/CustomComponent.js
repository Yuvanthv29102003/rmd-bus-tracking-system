import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

const CustomComponent = () => {
  const navigation = useNavigation();  // Hook to access navigation

  return (
    <View style={styles.parentContainer}>
      {/* First Container: View Map */}
      <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('MapScreen')}>
        <View style={styles.iconContainer}>
          <FontAwesome name="map" size={24} color="#4CAF50" />
          <Text style={styles.iconText}>View Map</Text>
        </View>
      </TouchableOpacity>

      {/* Second Container: Set Alarm */}
      <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('SetAlarm')}>
        <View style={styles.iconContainer}>
          <FontAwesome name="clock-o" size={24} color="#FF5722" />
          <Text style={styles.iconText}>Set Alarm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',          // To display containers side by side
    justifyContent: 'space-between', // Space between containers
    padding: 10,                   // Adjusted padding around the parent container
  },
  containerBox: {
    flex: 1,                       // Makes both containers take equal space
    flexDirection: 'row',
    justifyContent: 'center',      // Centers the content inside each box
    alignItems: 'center',
    padding: 20,                   // Reduced padding inside each box
    backgroundColor: '#f9f9f9',
    borderRadius: 8,               // Slightly smaller border radius
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 3,           // Reduced space between the two boxes
  },
  iconContainer: {
    flexDirection: 'row',          // Icon and text side by side
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,                  // Reduced font size
    marginLeft: 8,                 // Reduced margin
    color: '#333',
    fontWeight: '500',
  },
});

export default CustomComponent;
