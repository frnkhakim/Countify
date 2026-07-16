import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { saveEvents, loadEvents } from "../storage/eventStorage";
import { Ionicons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import { getDaysRemaining } from "../utils/dateUtils";

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  const loadSavedEvents = async () => {
    const storedEvents = await loadEvents();
    setEvents(storedEvents);
  };

  useEffect(() => {
    loadSavedEvents();
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Countify
      </Text>

      <Text style={styles.subHeading}>
        Upcoming Events
      </Text>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="calendar-outline"
            size={80}
            color="gray"
          />

          <Text style={styles.emptyText}>
            No Events Yet
          </Text>

          <Text style={styles.emptySubText}>
            Tap + to create your first countdown.
          </Text>
        </View>
      ) : (
        <ScrollView>
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              emoji={event.emoji}
              daysLeft={
                getDaysRemaining(
                  new Date(event.date)
                )
              }
              onPress={() =>
                navigation.navigate(
                  "Details",
                  {
                    event,
                  }
                )
              }
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddEvent", {
            addEvent: (event) => {
              setEvents((previous) => [
                ...previous,
                event,
              ]);
            },
          })
        }
      >
        <Ionicons
          name="add"
          size={35}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6FA",
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },

  subHeading: {
    fontSize: 18,
    color: "gray",
    marginBottom: 25,
    marginTop: 10,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    elevation: 6,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  emptySubText: {
    color: "gray",
    marginTop: 10,
  },
});
