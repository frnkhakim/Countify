import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { EventsProvider } from "./src/context/EventsContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { requestNotificationPermission } from "./src/utils/notificationUtils";

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <ThemeProvider>
      <EventsProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </EventsProvider>
    </ThemeProvider>
  );
}
