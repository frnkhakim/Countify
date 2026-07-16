import React, { createContext, useContext, useState, useEffect } from "react";
import { loadEvents, saveEvents } from "../storage/eventStorage";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents().then(setEvents);
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const addEvent = (event) => {
    setEvents((previous) => [...previous, event]);
  };

  const deleteEvent = (id) => {
    setEvents((previous) => previous.filter((event) => event.id !== id));
  };

  const updateEvent = (updatedEvent) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
