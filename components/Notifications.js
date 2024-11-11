import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back button

// Sample notifications data
const notificationsData = [
  {
    id: '1',
    title: 'Bus 211 Delayed',
    description: 'Bus 211 is delayed by 10 minutes due to traffic.',
    time: '2 mins ago',
  },
  {
    id: '2',
    title: 'Route 5 Change',
    description: 'Route 5 has been modified, skipping the "Senthil Nagar" stop.',
    time: '10 mins ago',
  },
  {
    id: '3',
    title: 'Bus 220 Arrival',
    description: 'Bus 220 has arrived at "Kolathur".',
    time: '15 mins ago',
  },
  {
    id: '4',
    title: 'Bus 301 Canceled',
    description: 'Bus 301 has been canceled due to a technical issue.',
    time: '30 mins ago',
  },
];

// Component for individual notification items
const NotificationItem = ({ title, description, time }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationTitle}>{title}</Text>
    <Text style={styles.notificationDescription}>{description}</Text>
    <Text style={styles.notificationTime}>{time}</Text>
  </View>
);

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>

      {/* List of notifications */}
      <FlatList
        data={notificationsData}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            description={item.description}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer} // Center the list vertically
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align items at the bottom
    marginBottom: 20,
    paddingTop: 40, // Add some top padding for the header
  },
  backButton: {
    marginRight: 10, // Add some space between the button and the title
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: '#757575',
    marginTop: 10,
  },
  listContainer: {
    flexGrow: 1, // Allows the FlatList to grow and center its content
    justifyContent: 'center', // Center items vertically
  },
});

export default NotificationsScreen;
