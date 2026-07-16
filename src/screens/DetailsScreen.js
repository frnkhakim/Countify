import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useEvents } from "../context/EventsContext";
import useCountdown from "../hooks/useCountdown";

export default function DetailsScreen({ route, navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { events, deleteEvent, updateEvent } = useEvents();

  const { eventId } = route.params;
  const event = events.find((e) => e.id === eventId);

  const timeLeft = useCountdown(event?.date);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.text }}>Event not found.</Text>
      </View>
    );
  }

  const removeEvent = () => {
    Alert.alert("Delete Event", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteEvent(event.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>{event.emoji}</Text>
      <Text style={styles.title}>{event.title}</Text>

      {timeLeft.expired ? (
        <Text style={styles.expired}>Event Completed 🎉</Text>
      ) : (
        <View style={styles.countdown}>
          <View style={styles.timeCard}>
            <Text style={styles.number}>{timeLeft.days}</Text>
            <Text style={styles.timeLabel}>Days</Text>
          </View>

          <View style={styles.timeCard}>
            <Text style={styles.number}>{timeLeft.hours}</Text>
            <Text style={styles.timeLabel}>Hours</Text>
          </View>

          <View style={styles.timeCard}>
            <Text style={styles.number}>{timeLeft.minutes}</Text>
            <Text style={styles.timeLabel}>Minutes</Text>
          </View>

          <View style={styles.timeCard}>
            <Text style={styles.number}>{timeLeft.seconds}</Text>
            <Text style={styles.timeLabel}>Seconds</Text>
          </View>
        </View>
      )}

      <Text style={styles.section}>Description</Text>
      <Text style={styles.description}>
        {event.description || "No Description"}
      </Text>

      <Text style={styles.section}>Event Date</Text>
      <Text style={styles.description}>
        {new Date(event.date).toLocaleString()}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("AddEvent", {
              eventId: event.id,
              isEditing: true,
            })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={removeEvent}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 40,
      backgroundColor: theme.background,
      alignItems: "center",
    },

    emoji: {
      fontSize: 80,
      marginTop: 40,
    },

    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      color: theme.text,
    },

    expired: {
      color: "#10B981",
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 30,
    },

    countdown: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 40,
    },

    timeCard: {
      backgroundColor: theme.card,
      width: 90,
      height: 90,
      margin: 8,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
    },

    number: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.primary,
    },

    timeLabel: {
      color: theme.subtext,
    },

    section: {
      alignSelf: "flex-start",
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 40,
      color: theme.text,
    },

    description: {
      alignSelf: "flex-start",
      color: theme.subtext,
      marginTop: 10,
      fontSize: 16,
    },

    buttonRow: {
      flexDirection: "row",
      marginTop: 50,
    },

    editButton: {
      backgroundColor: theme.primary,
      padding: 18,
      borderRadius: 15,
      marginRight: 15,
    },

    deleteButton: {
      backgroundColor: theme.danger,
      padding: 18,
      borderRadius: 15,
    },

    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
}
