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

export default function AddEventScreen({
  navigation,
  route,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🎂");
  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  const { addEvent } = route.params;

  const saveEvent = () => {
    if (!title.trim()) {
      Alert.alert(
        "Validation",
        "Please enter an event name."
      );

      return;
    }

    const event = {
      id: Date.now(),
      title,
      description,
      date,
      emoji,
    };

    addEvent(event);

    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <Text style={styles.label}>
          Event Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Birthday"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter event notes..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>
          Date
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Time
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Emoji
        </Text>

        <View style={styles.emojiContainer}>
          {["🎂", "🎉", "✈️", "📚", "❤️", "🏆"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.emojiButton,
                  emoji === item &&
                    styles.selectedEmoji,
                ]}
                onPress={() => setEmoji(item)}
              >
                <Text style={styles.emoji}>
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveEvent}
        >
          <Text style={styles.saveText}>
            Save Event
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              const newDate = new Date(date);

              newDate.setFullYear(
                selectedDate.getFullYear()
              );

              newDate.setMonth(
                selectedDate.getMonth()
              );

              newDate.setDate(
                selectedDate.getDate()
              );

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
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);

            if (selectedTime) {
              const newDate = new Date(date);

              newDate.setHours(
                selectedTime.getHours()
              );

              newDate.setMinutes(
                selectedTime.getMinutes()
              );

              setDate(newDate);
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 20,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },

  multiline: {
    height: 120,
    textAlignVertical: "top",
  },

  dateButton: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
  },

  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  emojiButton: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedEmoji: {
    borderWidth: 2,
    borderColor: "#4F46E5",
  },

  emoji: {
    fontSize: 28,
  },

  saveButton: {
    backgroundColor: "#4F46E5",
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
