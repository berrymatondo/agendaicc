import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventsByDate, CalendarView, Event } from "@/types/event";

interface CalendarGridProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  events: EventsByDate;
  view: CalendarView;
  onChangeDate: (date: Date) => void;
  today: Date;
  yearEvents: Event[];
}

export function CalendarGrid({
  currentDate,
  onDateSelect,
  selectedDate,
  events,
  view,
  onChangeDate,
  today,
  yearEvents,
}: CalendarGridProps) {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const renderMonthView = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-1">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="h-12" />
          ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() =>
              onDateSelect(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              )
            }
            className={`h-12 relative flex items-center justify-center rounded-lg transition-colors
              ${
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentDate.getMonth() &&
                selectedDate?.getFullYear() === currentDate.getFullYear()
                  ? "bg-blue-950 text-white"
                  : day === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear()
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
              }`}
          >
            {day}
            {events[
              `${currentDate.getFullYear()}-${
                currentDate.getMonth() + 1
              }-${day}`
            ] && (
              <div className="absolute bottom-2 flex gap-0.5">
                {events[
                  `${currentDate.getFullYear()}-${
                    currentDate.getMonth() + 1
                  }-${day}`
                ].map((event, index) => (
                  <div
                    key={index}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDates.map((date, index) => (
          <div key={index} className="h-24 border p-1">
            <div className="text-sm font-semibold mb-1">{weekDays[index]}</div>
            <div className="text-lg">{date.getDate()}</div>
            {events[
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            ]?.map((event, eventIndex) => (
              <div
                key={eventIndex}
                className="text-xs truncate"
                style={{ color: event.color }}
              >
                {event.eventId}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderSemesterView = () => {
    // This is a simplified semester view showing 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() + i);
      return date;
    });

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map((date, index) => (
          <div key={index} className="border p-2">
            <div className="font-semibold mb-2">
              {date.toLocaleString("default", { month: "long" })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {Array.from(
                {
                  length: new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  ).getDate(),
                },
                (_, i) => i + 1
              ).map((day) => (
                <div key={day} className="h-6 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), i, 1);
      return date;
    });

    return (
      <div className="grid grid-cols-4 gap-4">
        {months.map((date, index) => (
          <div key={index} className="border p-2">
            <div className="font-semibold mb-2">
              {date.toLocaleString("default", { month: "long" })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {Array.from(
                {
                  length: new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                  ).getDate(),
                },
                (_, i) => i + 1
              ).map((day) => (
                <div
                  key={day}
                  className={`h-4 flex items-center justify-center ${
                    yearEvents.some(
                      (event) =>
                        event.date.getFullYear() === date.getFullYear() &&
                        event.date.getMonth() === date.getMonth() &&
                        event.date.getDate() === day
                    )
                      ? "bg-blue-200"
                      : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const changeDate = (amount: number) => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "week":
        newDate.setDate(newDate.getDate() + amount * 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      case "semester":
        newDate.setMonth(newDate.getMonth() + amount * 6);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + amount);
        break;
    }
    onChangeDate(newDate);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => changeDate(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-700">
          {view === "week"
            ? `Week of ${currentDate.toLocaleDateString()}`
            : view === "month"
            ? currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })
            : view === "semester"
            ? `Semester ${
                Math.floor(currentDate.getMonth() / 6) + 1
              } ${currentDate.getFullYear()}`
            : currentDate.getFullYear().toString()}
        </h2>
        <Button variant="ghost" size="icon" onClick={() => changeDate(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {view === "week" && renderWeekView()}
      {view === "month" && renderMonthView()}
      {view === "semester" && renderSemesterView()}
      {view === "year" && renderYearView()}
    </div>
  );
}
