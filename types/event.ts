export interface Event {
  id: string;
  title: string;
  date: Date;
  color: string;
  time: string;
  description?: string;
  progress: number;
  location?: string;
  participants?: string[];
  attachments?: {
    name: string;
    url: string;
  }[];
  requiresRegistration: boolean;
}

export interface CalendarEvent {
  color: string;
  eventId: string;
}

export type EventsByDate = Record<string, CalendarEvent[]>;

export type CalendarView = "week" | "month" | "semester" | "year";
