import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { calculateProgress } from "../utils/dateUtils";

function EventCard({ title, daysLeft, emoji, onPress, date, createdAt }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const progress = calculateProgress(date, createdAt);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <View style={styles.info}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.days}>
          {daysLeft} Days Left
        </Text>

        {createdAt && (
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(EventCard);

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

    info: {
      flex: 1,
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

    progressBar: {
      height: 6,
      backgroundColor: theme.background,
      borderRadius: 3,
      marginTop: 10,
      overflow: "hidden",
    },

    progressFill: {
      height: 6,
      backgroundColor: theme.primary,
      borderRadius: 3,
    },
  });
}
