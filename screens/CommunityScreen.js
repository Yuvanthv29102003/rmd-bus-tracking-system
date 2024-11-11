import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

// BusAnnouncement Component with logo
const BusAnnouncement = ({ type, description, time, logo }) => (
  <View style={styles.announcement}>
    <View style={styles.announcementHeader}>
      {/* College Logo */}
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.announcementType}>{type}</Text>
      {/* Notification Icon */}
      <Icon name="bell" size={20} color="red" />
    </View>
    <Text style={styles.announcementDescription}>{description}</Text>
    <Text style={styles.announcementTime}>{time}</Text>
  </View>
);

const CommunityScreen = () => {
  // College logo URL (replace with the actual image URL)
  const collegeLogo = 'https://rmd-ece.github.io/saankethika2022/img/logo1.png'; // Example placeholder URL

  const routeChangeAnnouncement = {
    id: '1',
    type: 'Route Change Notice',
    description: 'Starting tomorrow, Route A will have a new stop added.',
    time: '8:30 PM',
  };

  const busNotAvailableAnnouncement = {
    id: '2',
    type: '211 Bus Not Available Today',
    description: 'The 211 Bus will not be available today due to maintenance.',
    time: '6:00 AM',
  };

  const communityUpdates = [
    {
      id: '1',
      user: 'User123',
      userImage: require('../assets/user_image.jpg'), // Using local image from assets
      time: '2 hours ago - College Campus',
      eventTitle: 'Symposium RENDEZVOUS \'24',
      date: '5th Feb 2024',
      venue: 'CSE Seminar Hall',
      poster: require('../assets/symposium_poster.jpg'),
    },
  ];

  const renderCommunityUpdate = ({ item }) => (
    <View style={styles.communityPost}>
      <View style={styles.userInfo}>
        {/* User Image */}
        <Image source={item.userImage} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.eventTitle}>{item.eventTitle}</Text>
      <Text style={styles.eventDetails}>Date: {item.date}</Text>
      <Text style={styles.eventDetails}>Venue: {item.venue}</Text>

      {/* Full Poster Image */}
      <Image source={item.poster} style={styles.posterImage} resizeMode="contain" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Bus Service Announcements</Text>

      {/* Render route change announcement with logo */}
      <BusAnnouncement
        type={routeChangeAnnouncement.type}
        description={routeChangeAnnouncement.description}
        time={routeChangeAnnouncement.time}
        logo={collegeLogo} // Pass the logo URL as a prop
      />

      <Text style={styles.sectionTitle}>Bus Service Announcements</Text>

      {/* Render 211 Bus not available announcement with logo */}
      <BusAnnouncement
        type={busNotAvailableAnnouncement.type}
        description={busNotAvailableAnnouncement.description}
        time={busNotAvailableAnnouncement.time}
        logo={collegeLogo} // Pass the logo URL as a prop
      />

      <Text style={styles.sectionTitle}>Community Updates</Text>
      <FlatList
        data={communityUpdates}
        renderItem={renderCommunityUpdate}
        keyExtractor={(item) => item.id}
        style={styles.communityList}
      />

      {/* Buttons and Heart Icon */}
      <View style={styles.buttonContainer}>
        {/* Event Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Event</Text>
        </TouchableOpacity>

        {/* Excitement Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Excitement</Text>
        </TouchableOpacity>
      </View>

      {/* Heart Icon below the button container */}
      <View style={styles.iconContainer}>
        <Icon name="heart" size={30} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures the ScrollView expands with content
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60, // Added top padding for spacing
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  announcement: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  announcementType: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  announcementTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  communityPost: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
  posterImage: {
    width: '100%', // Take full width of the container
    height: 450, // Adjust the height to show the full poster
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligns buttons to the left
  },
  button: {
    backgroundColor: '#808080', // Set button background to grey
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10, // Adjust spacing between buttons to zero or very small
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default CommunityScreen;
