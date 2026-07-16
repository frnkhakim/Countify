import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function EventCard({ title, daysLeft, emoji, onPress }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

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

function makeStyles(theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.card,
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
      color: theme.text,
    },

    days: {
      color: theme.subtext,
      marginTop: 5,
    },
  });
}
