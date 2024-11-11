import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import BusArrivalCard from '../components/BusArrivalCard';
import NearbyStop from '../components/NearbyStop';
import RecentRoute from '../components/RecentRoute';
import AllNearbyStops from '../components/AllNearbyStops';
import CustomComponent from '../components/CustomComponent';
import ServicesComponent from '../components/ServicesComponent';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const busArrivals = [
    { busNumber: '221', eta: '3 mins', isDelayed: false, isPrimary: true },
  ];

  const filteredBuses = busArrivals.filter((bus) =>
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <Header navigation={navigation} />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search buses"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E8F"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome name="search" size={24} color="#8E8E8F" />
        </TouchableOpacity>
      </View>

      {/* Bus Arrival Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bus Arrival ETA</Text>
      </View>

      <View style={styles.cardContainer}>
        {filteredBuses.map((bus, index) => (
          <BusArrivalCard
            key={index}
            busNumber={bus.busNumber}
            eta={bus.eta}
            isDelayed={bus.isDelayed}
            isPrimary={bus.isPrimary}
          />
        ))}
      </View>

      {/* Nearby Bus Stops Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Nearby Bus Stops</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllNearbyStops')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NearbyStop />

      {/* Recent Routes Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Routes</Text>
      </View>
      <RecentRoute route="Route 3" nextStop="Next stop: Ambattur" time="ETA: 3 mins" />
      <RecentRoute route="Route 4" nextStop="Next stop: Delayed Arrival" time="ETA: 15 mins" />

      {/* Custom Component Displayed in Home Screen */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Planner Tools</Text>
      </View>
      <CustomComponent />

      <ServicesComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    paddingBottom: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007BFF',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
