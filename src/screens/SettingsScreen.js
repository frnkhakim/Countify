import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>
          Dark Mode
        </Text>

        <Switch
          value={theme.isDark}
          onValueChange={theme.toggleTheme}
        />
      </View>

      <View style={[styles.row, { marginTop: 15 }]}>
        <Text style={styles.label}>
          Notifications
        </Text>

        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

    
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

    row: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    label: {
      fontSize: 18,
      color: theme.text,
    },

    about: {
      marginTop: 40,
      alignItems: "center",
    },

    aboutTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },

    aboutText: {
      fontSize: 15,
      color: theme.subtext,
      marginTop: 4,
    },
  });
}
