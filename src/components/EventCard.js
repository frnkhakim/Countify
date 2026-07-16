import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EventCard({
  title,
  daysLeft,
  emoji,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
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
    </TouchableOpacity>
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