"use client";
import React, { useState } from "react";
import { Search, Calendar, Plus } from "lucide-react";
import { EventForm } from "@/components/eventForm";

const categories = [
  "All",
  "Culte",
  "Baptême",
  "Retraite",
  "Réunion",
  "Formation",
  "Autre",
];
const events = [
  {
    id: 1,
    title: "Culte du dimanche",
    time: "10:00-12:00",
    date: new Date(2024, 4, 21),
    description: "Culte dominical avec la participation de la chorale",
    color: "bg-blue-500",
    category: "Culte",
  },
  {
    id: 2,
    title: "Baptême",
    time: "14:00-16:00",
    date: new Date(2024, 4, 21),
    description: "Cérémonie de baptême",
    color: "bg-green-500",
    category: "Baptême",
  },
  {
    id: 3,
    title: "Retraite spirituelle",
    time: "09:00-17:00",
    date: new Date(2024, 4, 28),
    description: "Retraite spirituelle annuelle",
    color: "bg-purple-500",
    category: "Retraite",
  },
];

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [dateFilter, setDateFilter] = useState<
    "all" | "week" | "month" | "year"
  >("year");
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventsList, setEventsList] = useState(events);

  const now = new Date();

  const filterEvents = () => {
    return eventsList.filter((event) => {
      // Category filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }

      // Past events filter
      if (!showPastEvents && event.date < now) {
        return false;
      }

      // Date range filter
      if (dateFilter !== "all") {
        const eventDate = new Date(event.date);
        const filterDate = new Date();

        switch (dateFilter) {
          case "week":
            filterDate.setDate(filterDate.getDate() - 7);
            return eventDate >= filterDate;
          case "month":
            filterDate.setMonth(filterDate.getMonth() - 1);
            return eventDate >= filterDate;
          case "year":
            filterDate.setFullYear(filterDate.getFullYear() - 1);
            return eventDate >= filterDate;
        }
      }

      return true;
    });
  };

  const handleAddEvent = (newEvent: any) => {
    const eventWithId = {
      ...newEvent,
      id: eventsList.length + 1,
      time: `${newEvent.startTime}-${newEvent.endTime}`,
      color: getCategoryColor(newEvent.category),
    };
    setEventsList([...eventsList, eventWithId]);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Culte":
        return "bg-blue-500";
      case "Baptême":
        return "bg-green-500";
      case "Retraite":
        return "bg-purple-500";
      case "Réunion":
        return "bg-yellow-500";
      case "Formation":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEvents = filterEvents();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Événements</h1>
          <button
            onClick={() => setShowEventForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Ajouter un événement</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des événements..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                category === selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Filtres</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showPastEvents}
                  onChange={(e) => setShowPastEvents(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span>Afficher les événements passés</span>
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">Tout</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-2">
                <div
                  className={`w-16 h-16 ${event.color} rounded-lg flex items-center justify-center text-white font-bold`}
                >
                  {event.time.split("-")[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {event.date.toLocaleDateString()} {event.time}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {showEventForm && (
        <EventForm
          onClose={() => setShowEventForm(false)}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
