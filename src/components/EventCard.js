import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EventCard({
  title,
  daysLeft,
  emoji,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <View>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.days}>
          {daysLeft} Days Left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  emoji: {
    fontSize: 30,
    marginRight: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  days: {
    color: "gray",
    marginTop: 5,
  },
});