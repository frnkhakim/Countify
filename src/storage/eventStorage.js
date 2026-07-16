import AsyncStorage from "@react-native-async-storage/async-storage";

const EVENTS_KEY = "countify_events";

export const saveEvents = async (events) => {
  try {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.log(error);
  }
};

export const loadEvents = async () => {
  try {
    const data = await AsyncStorage.getItem(EVENTS_KEY);

    if (data !== null) {
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
