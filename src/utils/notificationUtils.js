import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const CHANNEL_ID = "countify-events";

async function setupAndroidChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Event Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }
}

export async function requestNotificationPermission() {
  try {
    await setupAndroidChannel();
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch {
    return false;
  }
}

export async function scheduleEventNotification(event) {
  try {
    const eventDate = new Date(event.date);
    const now = new Date();

    // 1 day before reminder
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(reminderDate.getDate() - 1);

    if (reminderDate > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: event.emoji + " " + event.title,
          body: "Your event is tomorrow!",
          sound: "default",
          android: { channelId: CHANNEL_ID },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: reminderDate,
        },
      });
    }

    // At event time
    if (eventDate > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: event.emoji + " " + event.title,
          body: "🎉 It's time! Your event has started.",
          sound: "default",
          android: { channelId: CHANNEL_ID },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: eventDate,
        },
      });
    }
  } catch (error) {
    console.log("Notification error:", error);
  }
}

export async function scheduleOneHourReminder(event) {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const trigger = new Date(event.date);
    trigger.setHours(trigger.getHours() - 1);

    if (trigger <= new Date()) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: event.title,
        body: "Your event starts in 1 hour.",
        sound: "default",
        android: { channelId: CHANNEL_ID },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: trigger,
      },
    });
  } catch (error) {
    console.log("Notification error:", error);
  }
}
