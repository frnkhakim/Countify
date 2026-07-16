import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import { getDaysRemaining } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";
import { useEvents } from "../context/EventsContext";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { events } = useEvents();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const nextEvent = upcomingEvents[0];

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

  const renderEvent = ({ item }) => (
    <EventCard
      title={item.title}
      emoji={item.emoji}
      date={item.date}
      createdAt={item.createdAt}
      daysLeft={getDaysRemaining(new Date(item.date))}
      onPress={() =>
        navigation.navigate("Details", { eventId: item.id })
      }
    />
  );

  const listFooter = expiredEvents.length > 0 ? (
    <>
      <Text style={styles.sectionTitle}>Past Events</Text>

      {expiredEvents.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          emoji={event.emoji}
          date={event.date}
          createdAt={event.createdAt}
          daysLeft={0}
          onPress={() =>
            navigation.navigate("Details", { eventId: event.id })
          }
        />
      ))}
    </>
  ) : null;

  const emptyComponent = events.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={80} color={theme.subtext} />
      <Text style={styles.emptyText}>No Events Yet</Text>
      <Text style={styles.emptySubText}>Create your next important memory.</Text>
    </View>
  ) : null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.greeting}>Hello 👋</Text>
      <Text style={styles.heading}>Countify</Text>
      <Text style={styles.counter}>{upcomingEvents.length} Upcoming Events</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        placeholderTextColor={theme.subtext}
        value={searchText}
        onChangeText={setSearchText}
      />

      {nextEvent && (
        <View style={styles.nextEventCard}>
          <Text style={styles.nextEventLabel}>Next Event</Text>
          <Text style={styles.nextEventTitle}>
            {nextEvent.emoji} {nextEvent.title}
          </Text>
          <Text style={styles.nextEventDays}>
            {getDaysRemaining(new Date(nextEvent.date))} Days Left
          </Text>
        </View>
      )}

      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvent}
        ListFooterComponent={listFooter}
        ListEmptyComponent={emptyComponent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEvent")}
      >
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },

    greeting: {
      fontSize: 18,
      color: theme.subtext,
      marginTop: 20,
    },

    heading: {
      fontSize: 34,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 5,
    },

    counter: {
      color: theme.subtext,
      marginBottom: 20,
      marginTop: 5,
    },

    searchInput: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 15,
      marginBottom: 20,
      color: theme.text,
    },

    nextEventCard: {
      backgroundColor: theme.primary,
      padding: 25,
      borderRadius: 25,
      marginBottom: 25,
    },

    nextEventLabel: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 14,
      marginBottom: 8,
    },

    nextEventTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },

    nextEventDays: {
      color: "rgba(255,255,255,0.85)",
      fontSize: 16,
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
      paddingTop: 60,
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
