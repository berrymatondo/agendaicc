import type { Event, EventsByDate } from "@/types/event";

export const EVENTS: Event[] = [
  {
    id: "1",
    title: "Attend AGM Meeting",
    date: new Date(2025, 1, 7),
    color: "#2196F3",
    time: "02:00",
    progress: 30,
    location: "Conference Room A",
    description: "Annual General Meeting for all stakeholders",
    participants: ["John Doe", "Jane Smith", "Bob Johnson"],
    attachments: [
      { name: "Meeting Agenda", url: "/documents/agm-agenda.pdf" },
      { name: "Financial Report", url: "/documents/financial-report.pdf" },
    ],
    requiresRegistration: true,
  },
  {
    id: "2",
    title: "Presentation for Project Analysis",
    date: new Date(2025, 1, 7),
    color: "#E91E63",
    time: "02:00",
    progress: 60,
    location: "Meeting Room B",
    description:
      "Presentation of the project analysis results to the management",
    requiresRegistration: false,
  },
  {
    id: "3",
    title: "Gather data for future sales",
    date: new Date(2025, 1, 7),
    color: "#FFC107",
    description: "Raw data to be collected for sale team...",
    time: "02:00",
    progress: 20,
    location: "Sales Department",
    requiresRegistration: false,
  },
  {
    id: "4",
    title: "Team Meeting",
    date: new Date(2025, 3, 10),
    color: "#E91E63",
    time: "14:00",
    progress: 0,
    location: "Conference Room C",
    requiresRegistration: true,
  },
  {
    id: "5",
    title: "Project Review",
    date: new Date(2025, 5, 10),
    color: "#2196F3",
    time: "16:00",
    progress: 0,
    location: "Project Room",
    requiresRegistration: false,
  },
  {
    id: "6",
    title: "Client Call",
    date: new Date(2025, 2, 3),
    color: "#E91E63",
    time: "11:00",
    progress: 0,
    location: "Phone Conference Room",
    requiresRegistration: false,
  },
];

// Fonction utilitaire pour créer le mapping des événements par date
export function createEventsByDate(events: Event[]): EventsByDate {
  return events.reduce((acc, event) => {
    const dateKey = `${event.date.getFullYear()}-${
      event.date.getMonth() + 1
    }-${event.date.getDate()}`;
    const calendarEvent = {
      color: event.color,
      eventId: event.id,
    };

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(calendarEvent);
    return acc;
  }, {} as EventsByDate);
}
