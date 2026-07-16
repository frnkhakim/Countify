import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function DetailsScreen({ route, navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { event, deleteEvent, updateEvent } = route.params;

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(event.date) - new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const removeEvent = () => {
    Alert.alert(
      "Delete Event",
      "Are you sure?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteEvent(event.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.emoji}>
        {event.emoji}
      </Text>

      <Text style={styles.title}>
        {event.title}
      </Text>

      <View style={styles.countdown}>
        <View style={styles.timeCard}>
          <Text style={styles.number}>
            {timeLeft.days}
          </Text>

          <Text style={styles.timeLabel}>Days</Text>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.number}>
            {timeLeft.hours}
          </Text>

          <Text style={styles.timeLabel}>Hours</Text>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.number}>
            {timeLeft.minutes}
          </Text>

          <Text style={styles.timeLabel}>Minutes</Text>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.number}>
            {timeLeft.seconds}
          </Text>

          <Text style={styles.timeLabel}>Seconds</Text>
        </View>
      </View>

      <Text style={styles.section}>
        Description
      </Text>

      <Text style={styles.description}>
        {event.description || "No Description"}
      </Text>

      <Text style={styles.section}>
        Event Date
      </Text>

      <Text style={styles.description}>
        {new Date(event.date).toLocaleString()}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("AddEvent", {
              event,
              isEditing: true,
              updateEvent,
            })
          }
        >
          <Text style={styles.buttonText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={removeEvent}
        >
          <Text style={styles.buttonText}>
            Delete
          </Text>
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
