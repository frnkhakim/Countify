import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "countify_theme";

export const saveTheme = async (isDark) => {
  await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDark));
};

export const loadTheme = async () => {
  const value = await AsyncStorage.getItem(THEME_KEY);

  if (value !== null) {
    return JSON.parse(value);
  }

  return false;
};
