import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function DetailsScreen({
  route,
}) {
  const { event } =
    route.params;

    const [timeLeft,
setTimeLeft] =
useState(calculateTimeLeft());

function calculateTimeLeft() {
  const difference =
    new Date(event.date)
    - new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days:
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      ),

    hours:
      Math.floor(
        (difference /
          (1000 * 60 * 60))
          % 24
      ),

    minutes:
      Math.floor(
        (difference /
          (1000 * 60))
          % 60
      ),

    seconds:
      Math.floor(
        (difference /
          1000)
          % 60
      ),
  };
}

useEffect(() => {
  const timer =
    setInterval(() => {
      setTimeLeft(
        calculateTimeLeft()
      );
    }, 1000);

  return () =>
    clearInterval(timer);

}, []);

  return (
  <View style={styles.container}>
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

        <Text>Days</Text>
      </View>

      <View style={styles.timeCard}>
        <Text style={styles.number}>
          {timeLeft.hours}
        </Text>

        <Text>Hours</Text>
      </View>

      <View style={styles.timeCard}>
        <Text style={styles.number}>
          {timeLeft.minutes}
        </Text>

        <Text>Minutes</Text>
      </View>

      <View style={styles.timeCard}>
        <Text style={styles.number}>
          {timeLeft.seconds}
        </Text>

        <Text>Seconds</Text>
      </View>
    </View>

    <Text style={styles.section}>
      Description
    </Text>

    <Text style={styles.description}>
      {event.description ||
        "No Description"}
    </Text>

    <Text style={styles.section}>
      Event Date
    </Text>

    <Text style={styles.description}>
      {new Date(
        event.date
      ).toLocaleString()}
    </Text>
  </View>
);
}

const styles =
StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:
      "#F4F6FA",
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
  },

  countdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:
      "center",
    marginTop: 40,
  },

  timeCard: {
    backgroundColor:
      "white",
    width: 90,
    height: 90,
    margin: 8,
    borderRadius: 20,
    justifyContent:
      "center",
    alignItems: "center",
    elevation: 4,
  },

  number: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4F46E5",
  },

  section: {
    alignSelf:
      "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
  },

  description: {
    alignSelf:
      "flex-start",
    color: "gray",
    marginTop: 10,
    fontSize: 16,
  },
});
