"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
/* import { CalendarGrid } from "@/components/calendar-grid";
import { EventCard } from "@/components/event-card";
import { EventModal } from "@/components/event-modal";
import { AddEventForm } from "@/components/add-event-form"; */
import { EVENTS, createEventsByDate } from "@/data/events";
import type { Event, CalendarView } from "@/types/event";
import { CalendarGrid } from "@/components/calendar-grid";
import { EventCard } from "@/components/event-card";
import { EventModal } from "@/components/event-modal";
import { AddEventForm } from "@/components/add-event-form";

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [today] = useState(new Date());

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  // Filter events for the current year
  const yearEvents = events.filter(
    (event) => event.date.getFullYear() === currentDate.getFullYear()
  );

  // Create the mapping of events by date
  const eventsByDate = createEventsByDate(
    calendarView === "year"
      ? yearEvents
      : events.filter(
          (event) =>
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear()
        )
  );

  // Filter events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleRegister = (eventId: string) => {
    // Implement registration logic here
    console.log(`Registered for event: ${eventId}`);
  };

  const handleUnregister = (eventId: string) => {
    // Implement unregistration logic here
    console.log(`Unregistered from event: ${eventId}`);
  };

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const displayEvents = showAllEvents ? yearEvents : selectedDateEvents;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Agenda annuel ICC Bruxelles
          </h1>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <Button
                variant={calendarView === "week" ? "default" : "outline"}
                onClick={() => setCalendarView("week")}
                className="mr-2"
              >
                Week
              </Button>
              <Button
                variant={calendarView === "month" ? "default" : "outline"}
                onClick={() => setCalendarView("month")}
                className="mr-2"
              >
                Month
              </Button>
              <Button
                variant={calendarView === "semester" ? "default" : "outline"}
                onClick={() => setCalendarView("semester")}
                className="mr-2"
              >
                Semester
              </Button>
              <Button
                variant={calendarView === "year" ? "default" : "outline"}
                onClick={() => setCalendarView("year")}
              >
                Year
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          </div>
          <CalendarGrid
            currentDate={currentDate}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
            events={eventsByDate}
            view={calendarView}
            onChangeDate={setCurrentDate}
            today={today}
            yearEvents={yearEvents}
          />
        </div>
        <div className="relative mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {showAllEvents ? "All Events This Year" : "Events"}
            </h2>
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={() => setShowAllEvents(!showAllEvents)}
            >
              {showAllEvents ? "Hide All" : "View All"}
            </Button>
          </div>

          {displayEvents.length > 0 ? (
            displayEvents.map((event) => (
              <div key={event.id} onClick={() => handleEventClick(event)}>
                <EventCard {...event} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              {showAllEvents
                ? "No events for this year"
                : "No events for this date"}
            </p>
          )}

          <Button
            size="icon"
            className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg"
            onClick={() => setShowAddEventForm(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      )}

      <AddEventForm
        isOpen={showAddEventForm}
        onClose={() => setShowAddEventForm(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
