import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/ThemeContext";
import { useEvents } from "../context/EventsContext";
import { scheduleEventNotification } from "../utils/notificationUtils";

export default function AddEventScreen({ navigation, route }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { events, addEvent, updateEvent } = useEvents();

  const { eventId, isEditing } = route.params ?? {};
  const event = isEditing ? events.find((e) => e.id === eventId) : null;

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [emoji, setEmoji] = useState(event?.emoji ?? "🎂");
  const [date, setDate] = useState(event ? new Date(event.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const saveEvent = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter an event name.");
      return;
    }

    const newEvent = {
      id: event?.id ?? Date.now(),
      title,
      description,
      date,
      emoji,
      createdAt: event?.createdAt ?? new Date(),
    };

    if (isEditing) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
      await scheduleEventNotification(newEvent);
    }

    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          placeholderTextColor={theme.subtext}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter event notes..."
          placeholderTextColor={theme.subtext}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateText}>
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Emoji</Text>
        <View style={styles.emojiContainer}>
          {["🎂", "🎉", "✈️", "📚", "❤️", "🏆"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.emojiButton,
                emoji === item && styles.selectedEmoji,
              ]}
              onPress={() => setEmoji(item)}
            >
              <Text style={styles.emoji}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveEvent}>
          <Text style={styles.saveText}>Save Event</Text>
        </TouchableOpacity>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const newDate = new Date(date);
              newDate.setFullYear(selectedDate.getFullYear());
              newDate.setMonth(selectedDate.getMonth());
              newDate.setDate(selectedDate.getDate());
              setDate(newDate);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const newDate = new Date(date);
              newDate.setHours(selectedTime.getHours());
              newDate.setMinutes(selectedTime.getMinutes());
              setDate(newDate);
            }
          }}
        />
      )}
    </>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },

    label: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      marginTop: 20,
      color: theme.text,
    },

    input: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 15,
      fontSize: 16,
      color: theme.text,
    },

    multiline: {
      height: 120,
      textAlignVertical: "top",
    },

    dateButton: {
      backgroundColor: theme.card,
      padding: 18,
      borderRadius: 15,
    },

    dateText: {
      color: theme.text,
    },

    emojiContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 10,
    },

    emojiButton: {
      width: 60,
      height: 60,
      backgroundColor: theme.card,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10,
    },

    selectedEmoji: {
      borderWidth: 2,
      borderColor: theme.primary,
    },

    emoji: {
      fontSize: 28,
    },

    saveButton: {
      backgroundColor: theme.primary,
      padding: 18,
      borderRadius: 15,
      marginTop: 40,
      alignItems: "center",
    },

    saveText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
  });
}
