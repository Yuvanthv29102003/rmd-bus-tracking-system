import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import AddAlarm from './AddAlarm';

const SetAlarm = ({ navigation }) => {
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Padi', frequency: 'Once', enabled: false },
    { id: 2, name: 'Senthil Nagar', frequency: 'Mon to Fri', enabled: false },
    { id: 3, name: 'Kolathur', frequency: 'Once', enabled: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Store references to each Swipeable component
  const swipeableRefs = useRef(new Map());

  // Function to toggle switch
  const toggleSwitch = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  // Function to add a new alarm
  const addNewAlarm = (name, frequency) => {
    const newAlarm = {
      id: reminders.length + 1,
      name,
      frequency,
      enabled: false,
    };
    setReminders([...reminders, newAlarm]);
    setModalVisible(false);
  };

  // Function to delete an alarm
  const deleteAlarm = (id) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
  };

  // Toggle edit mode and open swipe for each reminder when entering edit mode
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => {
      const newEditMode = !prevEditMode;

      if (newEditMode) {
        // Open swipe for each item in edit mode
        reminders.forEach((reminder) => {
          const swipeable = swipeableRefs.current.get(reminder.id);
          if (swipeable) {
            swipeable.openRight();
          }
        });
      } else {
        // Close all swipeable items when exiting edit mode
        reminders.forEach((reminder) => {
          const swipeable = swipeableRefs.current.get(reminder.id);
          if (swipeable) {
            swipeable.close();
          }
        });
      }

      return newEditMode;
    });
  };

  // Render the delete icon only, no text
  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlarm(id)}>
      <FontAwesome name="trash" size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <Text style={styles.editButtonText}>{editMode ? "Done" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Set a reminder to alert you before the bus reaches your stop</Text>
        {reminders.map((reminder) => (
          <Swipeable
            key={reminder.id}
            ref={(ref) => swipeableRefs.current.set(reminder.id, ref)}
            renderRightActions={() => renderRightActions(reminder.id)}
            enabled={editMode}
          >
            <View style={styles.reminderBox}>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderName}>{reminder.name}</Text>
                <Text style={styles.reminderFrequency}>{reminder.frequency}</Text>
              </View>
              <Switch
                value={reminder.enabled}
                onValueChange={() => toggleSwitch(reminder.id)}
                thumbColor={reminder.enabled ? '#4CAF50' : '#ddd'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
              />
            </View>
          </Swipeable>
        ))}
      </ScrollView>

      {/* Add alarm button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={30} color="black" />
      </TouchableOpacity>

      {/* AddAlarm component with addNewAlarm function */}
      <AddAlarm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddAlarm={addNewAlarm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  backButton: {
    marginRight: 15,
  },
  editButton: {
    paddingHorizontal: 10,
  },
  editButtonText: {
    fontSize: 18,
    color: '#000',
  },
  scrollContainer: {
    marginTop: 120,
    paddingBottom: 90,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reminderBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  reminderContent: {
    flexDirection: 'column',
  },
  reminderName: {
    color: '#fff',
    fontSize: 18,
  },
  reminderFrequency: {
    color: '#aaa',
    fontSize: 14,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Reduced width for a more compact delete button
    height: 80, // Adjust height to match the reminderBox
    backgroundColor: '#ff4d4d',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 80,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default SetAlarm;
