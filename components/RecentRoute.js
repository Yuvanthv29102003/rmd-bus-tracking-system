import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecentRoute = ({ route, nextStop, time }) => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <Icon name="bus" size={30} color="#757575" style={styles.icon} />
      <View>
        <Text style={styles.routeText}>{route}</Text>
        <Text style={styles.nextStopText}>{nextStop}</Text>
      </View>
    </View>
    <Text style={styles.timeText}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Makes time appear on the right
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns the icon and route text
  },
  icon: {
    marginRight: 10,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextStopText: {
    fontSize: 14,
    color: '#757575', // Grey text color
    marginTop: 2, // Adds space between routeText and nextStopText
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#757575',
  },
});

export default RecentRoute;
