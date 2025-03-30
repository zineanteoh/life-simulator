import { useEffect, useState } from "react";

interface HUDProps {
  age: number;
  birthYear: number;
  isTimePaused?: boolean;
}

export const HUD = ({ age, birthYear, isTimePaused = false }: HUDProps) => {
  const [phase, setPhase] = useState("");
  const [phaseColor, setPhaseColor] = useState("");
  const [phaseDescription, setPhaseDescription] = useState("");
  const currentYear = birthYear + age;

  useEffect(() => {
    if (age <= 30) {
      setPhase("The Normal World");
      setPhaseColor(isTimePaused ? "#b0c4de" : "#64B5F6");
      setPhaseDescription("Everything that happened is normal to you");
    } else if (age <= 60) {
      setPhase("Career Peak");
      setPhaseColor(isTimePaused ? "#b0c4de" : "#81C784");
      setPhaseDescription(
        "You're at the peak of your career during these events"
      );
    } else {
      setPhase("Against Nature");
      setPhaseColor(isTimePaused ? "#b0c4de" : "#FFB74D");
      setPhaseDescription(
        "Everything that happened goes against human nature for you"
      );
    }
  }, [age, isTimePaused]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px",
        color: isTimePaused ? "#e0e0e0" : "white",
        fontFamily: "Inter, sans-serif",
        background: `linear-gradient(180deg, rgba(0,0,0,${
          isTimePaused ? "0.85" : "0.7"
        }) 0%, rgba(0,0,0,0) 100%)`,
        pointerEvents: "none",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 5px 0",
              fontSize: "2rem",
              filter: isTimePaused ? "grayscale(1)" : "none",
            }}
          >
            Age: {age}
          </h2>
          <p
            style={{
              margin: "0",
              opacity: isTimePaused ? 0.7 : 0.8,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Year: {currentYear}
          </p>
        </div>
      </div>
    </div>
  );
};
