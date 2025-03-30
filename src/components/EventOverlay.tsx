import { useEffect, useState } from "react";
import { HistoricalEvent } from "../services/geminiAPI";
import "./EventOverlay.css"; // We'll create this file

interface EventOverlayProps {
  event: HistoricalEvent | null;
  isTimePaused?: boolean;
  currentAge?: number;
  onRestart?: () => void;
}

export const EventOverlay = ({
  event,
  isTimePaused = false,
  currentAge = 0,
  onRestart,
}: EventOverlayProps) => {
  const [pastEvents, setPastEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null
  );
  const [showEndGame, setShowEndGame] = useState(false);

  // Check for end game condition
  useEffect(() => {
    if (currentAge >= 90) {
      setShowEndGame(true);
    }
  }, [currentAge]);

  // Generate personal impact text based on age
  const getPersonalContext = (event: HistoricalEvent) => {
    const age = event.age;
    if (age < 5) {
      return "Too young to understand, but this moment shapes the world you'll grow up in.";
    } else if (age < 10) {
      return "Through your innocent eyes, you witness history unfold.";
    } else if (age < 15) {
      return "As you begin to understand the world, this moment leaves a lasting impression.";
    } else if (age < 20) {
      return "In your formative years, this event helps shape your worldview.";
    } else if (age < 30) {
      return "Young and full of dreams, you see how this changes everything.";
    } else if (age < 40) {
      return "With growing wisdom, you deeply understand the significance.";
    } else if (age < 50) {
      return "Your life experience gives you unique perspective on this moment.";
    } else if (age < 60) {
      return "You've seen enough to recognize how this will change the future.";
    } else {
      return "Your wisdom allows you to see the deeper meaning in this moment.";
    }
  };

  // Handle adding new events
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

      setSelectedEvent(event);
      if (!isTimePaused) {
        const timer = setTimeout(() => {
          setSelectedEvent(null);
        }, 8000);
        return () => clearTimeout(timer);
      }
    }
  }, [event, isTimePaused]);

  const handleRestart = () => {
    setShowEndGame(false);
    setPastEvents([]);
    setSelectedEvent(null);
    if (onRestart) {
      onRestart();
    }
  };

  return (
    <>
      {/* Event text display for all devices */}
      {selectedEvent && !showEndGame && (
        <div className="mobile-event-text">
          <div className="event-year">Age {selectedEvent.age}</div>
          <div className="event-title">{selectedEvent.event}</div>
          <div className="event-significance">
            {getPersonalContext(selectedEvent)}
            <br />
            <br />
            {selectedEvent.significance}
          </div>
        </div>
      )}

      {/* Events sidebar */}
      {!showEndGame && (
        <div className="events-sidebar">
          {pastEvents.map((evt) => (
            <div
              key={`${evt.year}-${evt.event}`}
              className={`sidebar-event ${
                selectedEvent?.year === evt.year ? "selected" : ""
              }`}
              onClick={() => setSelectedEvent(evt)}
            >
              <div className="sidebar-year">
                {evt.year} <span>You were {evt.age} years old</span>
              </div>
              <div className="sidebar-title">{evt.event}</div>
            </div>
          ))}
        </div>
      )}

      {/* Pause overlay */}
      {isTimePaused && !showEndGame && (
        <div className="pause-overlay">
          <div className="pause-message">Time Stands Still</div>
        </div>
      )}

      {/* End game overlay */}
      {showEndGame && (
        <div className="end-game-overlay">
          <div className="end-game-content">
            <h1 className="end-game-title">Your Journey Has Ended</h1>
            <p className="end-game-message">
              You've witnessed {pastEvents.length} historical events across your
              lifetime. Would you like to experience another life and see how
              different events might shape your perspective?
            </p>
            <button className="restart-button" onClick={handleRestart}>
              Begin a New Life
            </button>
          </div>
        </div>
      )}
    </>
  );
};
