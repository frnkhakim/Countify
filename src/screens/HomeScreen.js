import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Countify
      </Text>

      <Text style={styles.subHeading}>
        Upcoming Events
      </Text>

      <ScrollView>
        <EventCard
          title="Birthday"
          daysLeft={12}
          emoji="🎂"
        />

        <EventCard
          title="Vacation"
          daysLeft={125}
          emoji="✈️"
        />

        <EventCard
          title="Exam"
          daysLeft={30}
          emoji="📚"
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddEvent")
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6FA",
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },

  subHeading: {
    fontSize: 18,
    color: "gray",
    marginBottom: 25,
    marginTop: 10,
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
    backgroundColor: "#4F46E5",
    elevation: 6,
  },
});