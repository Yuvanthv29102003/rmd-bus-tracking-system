import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();

  // Define routes with waypoints for each bus
  const busRoutes = {
    'Bus 211': [
      { latitude: 13.084624, longitude: 80.248357 },
      { latitude: 13.089624, longitude: 80.252357 },
      { latitude: 13.094624, longitude: 80.256357 },
      { latitude: 13.100622, longitude: 80.265357 }, // Route from Maduravoyal to Kavaraipettai
    ],
    'Bus 221': [
      { latitude: 13.095622, longitude: 80.256357 },
      { latitude: 13.098622, longitude: 80.260357 },
      { latitude: 13.102622, longitude: 80.266357 },
      { latitude: 13.106622, longitude: 80.275357 },
    ],
    // Add more bus routes as needed
  };

  // Initialize state for bus positions
  const [busPositions, setBusPositions] = useState(
    Object.keys(busRoutes).map((bus) => ({
      id: bus,
      title: bus,
      coordinateIndex: 0,
      coordinate: busRoutes[bus][0],
    }))
  );

  // Function to move each bus to the next waypoint
  const moveBuses = () => {
    setBusPositions((currentPositions) =>
      currentPositions.map((bus) => {
        const route = busRoutes[bus.title];
        let nextIndex = bus.coordinateIndex + 1;

        // Loop to start again from the beginning
        if (nextIndex >= route.length) nextIndex = 0;

        return {
          ...bus,
          coordinateIndex: nextIndex,
          coordinate: route[nextIndex],
        };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(moveBuses, 2000); // Move every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Buses around you</Text>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.084622,
          longitude: 80.248357,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Render each bus route as a polyline with lighter color */}
        {Object.keys(busRoutes).map((busKey) => (
          <Polyline
            key={busKey}
            coordinates={busRoutes[busKey]}
            strokeColor="#ADD8E6" // Light blue color for a softer line
            strokeWidth={2} // Thinner line for a lighter look
            lineDashPattern={[4, 4]} // Optional: dashed line pattern
          />
        ))}

        {/* Render each bus marker */}
        {busPositions.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={bus.coordinate}
            title={bus.title}
          >
            <Ionicons name="bus" size={30} color="#1E90FF" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
