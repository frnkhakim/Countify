import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { saveEvents, loadEvents } from "../storage/eventStorage";
import { Ionicons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import { getDaysRemaining } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) > new Date()
  );

  const expiredEvents = filteredEvents.filter(
    (event) => new Date(event.date) <= new Date()
  );

  const deleteEvent = (id) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  const updateEvent = (updatedEvent) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="settings-outline"
            size={28}
            color={theme.text}
          />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: theme.card },
      headerTintColor: theme.text,
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Countify
      </Text>

      <Text style={styles.subHeading}>
        Upcoming Events
      </Text>

      <Text style={styles.counter}>
        {upcomingEvents.length} Upcoming Events
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        placeholderTextColor={theme.subtext}
        value={searchText}
        onChangeText={setSearchText}
      />

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="calendar-outline"
            size={80}
            color={theme.subtext}
          />

          <Text style={styles.emptyText}>
            No Events Yet
          </Text>

          <Text style={styles.emptySubText}>
            Tap + to create your first countdown.
          </Text>
        </View>
      ) : filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search"
            size={70}
            color={theme.subtext}
          />

          <Text style={styles.emptyText}>
            No Matching Events
          </Text>
        </View>
      ) : (
        <ScrollView>
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              emoji={event.emoji}
              daysLeft={getDaysRemaining(new Date(event.date))}
              onPress={() =>
                navigation.navigate("Details", {
                  event,
                  deleteEvent,
                  updateEvent,
                })
              }
            />
          ))}

          {expiredEvents.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                Past Events
              </Text>

              {expiredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  emoji={event.emoji}
                  daysLeft={0}
                  onPress={() =>
                    navigation.navigate("Details", {
                      event,
                      deleteEvent,
                      updateEvent,
                    })
                  }
                />
              ))}
            </>
          )}
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

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },

    heading: {
      fontSize: 34,
      fontWeight: "bold",
      marginTop: 20,
      color: theme.text,
    },

    subHeading: {
      fontSize: 18,
      color: theme.subtext,
      marginBottom: 25,
      marginTop: 10,
    },

    counter: {
      color: theme.subtext,
      marginBottom: 20,
    },

    searchInput: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 15,
      marginBottom: 20,
      color: theme.text,
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
      backgroundColor: theme.primary,
      elevation: 6,
    },

    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 15,
      color: theme.text,
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
      color: theme.text,
    },

    emptySubText: {
      color: theme.subtext,
      marginTop: 10,
    },
  });
}
