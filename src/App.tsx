import { useState } from "react";
import "./App.css";
import { Journey3D } from "./components/Journey3D";

interface BirthYearInputProps {
  onBirthYearSubmit: (birthYear: number) => void;
}

const BirthYearInput = ({ onBirthYearSubmit }: BirthYearInputProps) => {
  const [birthYear, setBirthYear] = useState<string>("");
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedYear = parseInt(birthYear);
    if (!isNaN(parsedYear) && parsedYear >= 1950 && parsedYear <= 2020) {
      onBirthYearSubmit(parsedYear);
    }
  };

  return (
    <div className="age-input-container">
      <h1>Life Journey Visualization</h1>
      <p>Enter your birth year to begin your journey through time</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1950"
          max="2020"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="Enter your birth year (1950-2020)"
          required
        />
        <button type="submit">Begin Journey</button>
      </form>
    </div>
  );
};

function App() {
  const [birthYear, setBirthYear] = useState<number | null>(null);

  const handleBirthYearSubmit = (year: number) => {
    setBirthYear(year);
  };

  return (
    <div className="app">
      {birthYear === null ? (
        <BirthYearInput onBirthYearSubmit={handleBirthYearSubmit} />
      ) : (
        <Journey3D birthYear={birthYear} />
      )}
    </div>
  );
}

export default App;
