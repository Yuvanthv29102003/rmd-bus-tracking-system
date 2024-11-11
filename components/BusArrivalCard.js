import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusArrivalCard = ({ eta, isDelayed, isPrimary, route }) => (
  <View style={styles.card}>
    {/* Status Background behind the card */}
    <View style={[styles.statusBackground, isDelayed ? styles.delayedBackground : styles.onTimeBackground]} />
    
    {/* Top Left Status (On Time / Delayed) */}
    <View style={styles.statusTextContainer}>
      <Text style={styles.statusText}>
        {isDelayed ? "Delayed" : "On Time"}
      </Text>
    </View>

    {/* Central ETA Text */}
    <View style={styles.etaContainer}>
      <Text style={styles.routeText}>
        {route}
      </Text>
      <Text style={styles.etaText}>
        {eta}
      </Text>
    </View>

    {/* Bottom Right Background behind the label */}
    <View style={[styles.labelBackground, isPrimary ? styles.primaryBackground : styles.secondaryBackground]} />

    {/* Bottom Right Label (Primary Bus / Secondary Bus) */}
    <View style={styles.bottomRight}>
      <Text style={isPrimary ? styles.primaryLabel : styles.secondaryLabel}>
        {isPrimary ? 'Primary Bus' : 'Secondary Bus'}
      </Text>
    </View>
  </View>
);

const BusArrivalCardContainer = () => (
  <View style={styles.container}>
    {/* First Card: On Time, Primary Bus */}
    <BusArrivalCard
      route="Bus 221"
      eta="5 min"
      isDelayed={false}
      isPrimary={true}
    />

    {/* Second Card: Delayed, Secondary Bus */}
    <BusArrivalCard
      route="Bus 211"
      eta="10 min"
      isDelayed={true}
      isPrimary={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'flex-start', // Ensure alignment starts at the left
    alignItems: 'flex-start', // Align items to the top
    // paddingLeft: 10, // Padding for spacing between cards
    // flexWrap: 'wrap', // Allow wrapping if cards overflow
    // width: '100%', // Ensure the container takes the full width
  },
  card: {
    width: '48%',        // Increased width of each card for more horizontal space
    height: 90,          // Reduced height for a more compact design
    marginBottom: 10,    // Spacing between cards
    padding: 10,         // Reduced padding inside the card to save space
    borderRadius: 10,    // Rounded corners
    backgroundColor: '#fff',  // Card background color
    borderColor: '#DDD', // Light border
    borderWidth: 1,
    position: 'relative', // For positioning the status and label
    overflow: 'hidden',   // To ensure the status background doesn't overflow
    marginHorizontal: 5,      // Space between cards (adds space horizontally)
  },
  statusBackground: {
    position: 'absolute',
    top: 0,               // Align to the top
    left: 0,              // Align to the left
    height: 20,         // Reduced height for the label background
    width: 80,          // Reduced width for the label background
    zIndex: -1,           // Send the background behind the card content
    borderTopLeftRadius: 15,  // Rounded corners for the colored part
    borderBottomRightRadius: 15,
  },
  onTimeBackground: {
    backgroundColor: '#66BB6A',  // Green background for "On Time"
  },
  delayedBackground: {
    backgroundColor: '#FFA000',  // Orange background for "Delayed"
  },
  statusTextContainer: {
    position: 'absolute',
    top: 5,   // Reduced top margin for the status text
    left: 5,  // Reduced left margin for status text
  },
  statusText: {
    fontSize: 14,  // Reduced font size to fit within the smaller card
    fontWeight: 'bold',
    color: '#fff',  // White text color for both statuses
  },

  /* Central ETA Text */
  etaContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the left
    alignItems: 'flex-start',     // Align items to the start
    marginTop: 15,                // Reduced top margin for compact design
  },
  routeText: {
    fontSize: 16,  // Reduced font size for route text
    fontWeight: 'bold',
    color: '#000',  // Black text for Route
  },
  etaText: {
    fontSize: 20,  // Reduced font size for ETA text
    fontWeight: 'bold',
    color: '#000',  // Black text for ETA
    textAlign: 'left', // Align text to the left
  },

  /* Bottom Right Background for Primary/Secondary label */
  labelBackground: {
    position: 'absolute',
    bottom: 0,          // Align to the bottom
    right: 0,           // Align to the right
    height: 20,         // Reduced height for the label background
    width: 80,          // Reduced width for the label background
    zIndex: -1,         // Send the background behind the label text
    borderTopLeftRadius: 15,  // Rounded corners for the colored part
    borderBottomRightRadius: 15,
  },
  primaryBackground: {
    backgroundColor: '#388E3C',  // Green background for "Primary Bus"
  },
  secondaryBackground: {
    backgroundColor: '#FFA000',  // Orange background for "Secondary Bus"
  },
  bottomRight: {
    position: 'absolute',
    bottom: -5,         // Align to the bottom
    right: -6,          // Align to the right
    justifyContent: 'center', // Center the label text
    alignItems: 'center',     // Center the label text
    height: 30,         // Match the reduced height of the background
    width: 90,          // Adjusted width for smaller label area
  },
  primaryLabel: {
    fontSize: 11,  // Reduced font size for Primary Bus label
    fontWeight: 'bold',
    color: '#fff',  // White text for Primary Bus
  },
  secondaryLabel: {
    fontSize: 10,  // Reduced font size for Secondary Bus label
    fontWeight: 'bold',
    color: '#fff',  // White text for Secondary Bus
  },
});

export default BusArrivalCardContainer;
