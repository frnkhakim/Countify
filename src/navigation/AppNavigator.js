import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddEventScreen from "../screens/AddEventScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{ title: "Add Event" }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}