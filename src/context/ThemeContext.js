import React, { createContext, useContext, useState, useEffect } from "react";
import { loadTheme, saveTheme } from "../storage/themeStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const loadSavedTheme = async () => {
    const value = await loadTheme();
    setIsDark(value);
  };

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const toggleTheme = () => {
    const value = !isDark;
    setIsDark(value);
    saveTheme(value);
  };

  const theme = {
    isDark,
    toggleTheme,
    background: isDark ? "#121212" : "#F4F6FA",
    card: isDark ? "#1E1E1E" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    subtext: isDark ? "#aaaaaa" : "gray",
    primary: "#4F46E5",
    danger: "#EF4444",
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
