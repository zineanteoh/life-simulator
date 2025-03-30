interface HUDProps {
  age: number;
  birthYear: number;
  isTimePaused?: boolean;
}

export const HUD = ({ age, birthYear, isTimePaused = false }: HUDProps) => {
  const currentYear = birthYear + age;

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
