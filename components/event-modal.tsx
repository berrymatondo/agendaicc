"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
}

export function EventModal({
  event,
  isOpen,
  onClose,
  onRegister,
  onUnregister,
}: EventModalProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen) return null;

  const handleRegister = () => {
    onRegister(event.id);
    setIsRegistered(true);
  };

  const handleUnregister = () => {
    onUnregister(event.id);
    setIsRegistered(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Date:</strong> {event.date.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          {event.location && (
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          )}
          {event.description && (
            <p>
              <strong>Description:</strong> {event.description}
            </p>
          )}

          {event.participants && (
            <div>
              <strong>Participants:</strong>
              <ul className="list-disc list-inside">
                {event.participants.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))}
              </ul>
            </div>
          )}

          {event.attachments && event.attachments.length > 0 && (
            <div>
              <strong>Attachments:</strong>
              <ul className="list-disc list-inside">
                {event.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.requiresRegistration && (
            <Button
              onClick={isRegistered ? handleUnregister : handleRegister}
              className={
                isRegistered
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
