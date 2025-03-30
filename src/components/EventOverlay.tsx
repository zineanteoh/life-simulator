import { useEffect, useState } from "react";
import { HistoricalEvent } from "../services/geminiAPI";
import "./EventOverlay.css"; // We'll create this file

interface EventOverlayProps {
  event: HistoricalEvent | null;
  phaseMessage: string;
  isTimePaused?: boolean;
}

export const EventOverlay = ({
  event,
  phaseMessage,
  isTimePaused = false,
}: EventOverlayProps) => {
  const [pastEvents, setPastEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null
  );
  const [personalImpact, setPersonalImpact] = useState<string>("");

  // Generate a personal impact message based on the event and current phase
  const generatePersonalImpact = (event: HistoricalEvent, phase: string) => {
    const age = event.age;
    let impact = "";

    if (age < 10) {
      impact = `At just ${age} years old, you experience this moment through a child's eyes. While adults around you discuss ${event.event.toLowerCase()}, you're absorbing these changes in ways that will shape your entire worldview. ${
        event.significance
      } These early memories will stay with you forever, influencing how you see similar events throughout your life.`;
    } else if (age < 20) {
      impact = `As a ${age}-year-old teenager, you're old enough to understand the significance of ${event.event.toLowerCase()}, but young enough to be profoundly shaped by it. ${
        event.significance
      } This event coincides with your formative years, becoming part of your generational identity and influencing your future perspectives.`;
    } else if (age < 30) {
      impact = `At ${age}, you're a young adult witnessing ${event.event.toLowerCase()} as you build your own path in life. ${
        event.significance
      } You discuss this event with peers, forming strong opinions and perhaps even getting involved in related movements or changes.`;
    } else if (age < 50) {
      impact = `Being ${age} years old, you're in your prime years when ${event.event.toLowerCase()} occurs. With life experience and established views, you understand the deep implications. ${
        event.significance
      } You might find yourself explaining this event to younger generations, sharing your firsthand perspective.`;
    } else if (age < 70) {
      impact = `At age ${age}, you've seen enough of history to put ${event.event.toLowerCase()} into broader context. ${
        event.significance
      } Your mature perspective allows you to see patterns and connections that younger generations might miss, giving you unique insights into this moment.`;
    } else {
      impact = `With ${age} years of wisdom, you witness ${event.event.toLowerCase()} with the perspective of someone who has seen the world change many times over. ${
        event.significance
      } Your long life experience gives you a rare ability to connect this event to historical patterns spanning multiple generations.`;
    }

    return impact;
  };

  // Handle adding new events to the sidebar
  useEffect(() => {
    if (event) {
      // Add to pastEvents if not already included
      setPastEvents((prev) => {
        if (
          !prev.some((e) => e.year === event.year && e.event === event.event)
        ) {
          return [event, ...prev];
        }
        return prev;
      });

      // Generate personal impact message for the new event
      setPersonalImpact(generatePersonalImpact(event, phaseMessage));

      // Auto-select new events as they come in
      setSelectedEvent(event);

      // If not paused, clear selection after a delay
      if (!isTimePaused) {
        const timer = setTimeout(() => {
          setSelectedEvent(null);
        }, 8000); // Reduced to 8 seconds since it's less intrusive on the side
        return () => clearTimeout(timer);
      }
    }
  }, [event, isTimePaused, phaseMessage]);

  // Handle clicking on a sidebar event
  const handleEventClick = (evt: HistoricalEvent) => {
    if (selectedEvent?.year === evt.year) {
      setSelectedEvent(null); // Toggle off if clicking the same event
    } else {
      setSelectedEvent(evt);
      setPersonalImpact(generatePersonalImpact(evt, phaseMessage));
    }
  };

  return (
    <>
      {/* Left-side event display */}
      {selectedEvent && (
        <div
          className={`event-overlay center-overlay ${
            isTimePaused ? "paused" : ""
          }`}
        >
          <div className="event-year">
            {selectedEvent.year}{" "}
            <span>You are {selectedEvent.age} years old</span>
          </div>
          <h2 className="event-title">{selectedEvent.event}</h2>
          <div className="event-significance">{selectedEvent.significance}</div>
          <div className="event-personal-impact">{personalImpact}</div>
          <div className="event-phase-message">{phaseMessage}</div>
          {!isTimePaused && (
            <button
              className="close-button"
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Events sidebar */}
      <div className="events-sidebar">
        {pastEvents.map((evt) => (
          <div
            key={`${evt.year}-${evt.event}`}
            className={`sidebar-event ${
              selectedEvent?.year === evt.year ? "selected" : ""
            }`}
            onClick={() => handleEventClick(evt)}
          >
            <div className="sidebar-year">
              {evt.year} <span>You were {evt.age} years old</span>
            </div>
            <div className="sidebar-title">{evt.event}</div>
          </div>
        ))}
      </div>

      {/* Pause overlay */}
      {isTimePaused && (
        <div className="pause-overlay">
          <div className="pause-message">
            YOUR LIFE IS PAUSED
            <div className="pause-instruction">
              (press spacebar to continue your journey)
            </div>
          </div>
        </div>
      )}
    </>
  );
};
