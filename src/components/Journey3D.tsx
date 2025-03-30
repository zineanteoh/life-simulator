import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { fetchHistoricalEvents, HistoricalEvent } from "../services/geminiAPI";
import { AudioPlayer } from "./AudioPlayer";
import { EventOverlay } from "./EventOverlay";
import { HUD } from "./HUD";
import { LifeObjects } from "./LifeObjects";
import { Sky } from "./Sky";

interface Journey3DProps {
  birthYear: number;
}

interface SceneProps {
  currentAge: number;
  setCurrentAge: (age: number) => void;
  birthYear: number;
  onEventChange: (event: HistoricalEvent | null) => void;
  isTimePaused: boolean;
  setIsTimePaused: (paused: boolean) => void;
}

// Start screen overlay component
const StartOverlay = ({ onStart }: { onStart: () => void }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Inter, sans-serif",
        zIndex: 100,
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem", color: "#E3F2FD" }}>
        Your Life Journey
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "2rem",
          maxWidth: "800px",
          lineHeight: "1.6",
        }}
      >
        Experience history through your own timeline. Watch as world-changing
        events unfold around you, and see how they would have impacted you at
        different stages of your life.
      </p>
      <div
        style={{
          fontSize: "1.2rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#90CAF9" }}>
          How to Experience:
        </h3>
        <ul
          style={{
            textAlign: "left",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>
            🎮 Press SPACEBAR to start/pause your journey
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            🎵 Control music with the volume slider
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            📜 Watch events appear in the timeline
          </li>
          <li>⏸️ Pause anytime to reflect on historical moments</li>
        </ul>
      </div>
      <div
        style={{
          animation: "pulse 2s infinite",
          fontSize: "1.2rem",
          opacity: 0.8,
        }}
      >
        Press SPACEBAR to Begin Your Journey
      </div>
    </div>
  );
};

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

const Path = () => {
  // Define life stages with their colors and meanings
  const lifeStages = [
    {
      start: 0,
      end: 12,
      colors: ["#FFB5E8", "#FF9CEE"], // Childhood: Playful pink
      name: "Childhood",
    },
    {
      start: 12,
      end: 20,
      colors: ["#FF9CEE", "#B28DFF"], // Adolescence: Transitioning to purple
      name: "Adolescence",
    },
    {
      start: 20,
      end: 30,
      colors: ["#B28DFF", "#6EB5FF"], // Young Adult: Purple to blue
      name: "Young Adult",
    },
    {
      start: 30,
      end: 45,
      colors: ["#6EB5FF", "#81C784"], // Early Career: Blue to green
      name: "Early Career",
    },
    {
      start: 45,
      end: 60,
      colors: ["#81C784", "#FFD700"], // Mid Life: Green to gold
      name: "Mid Life",
    },
    {
      start: 60,
      end: 75,
      colors: ["#FFD700", "#FFA726"], // Golden Years: Gold to orange
      name: "Golden Years",
    },
    {
      start: 75,
      end: 90,
      colors: ["#FFA726", "#FF7043"], // Wisdom: Orange to deep orange
      name: "Wisdom",
    },
  ];

  return (
    <group>
      {/* Main path with gradients */}
      {lifeStages.map((stage, index) => {
        const length = stage.end - stage.start;
        const zPosition = stage.start + length / 2 - 45; // Center position

        return (
          <group key={index}>
            {/* Main path segment */}
            <mesh position={[0, 0.01, zPosition]}>
              <boxGeometry args={[3, 0.1, length]} />
              <meshStandardMaterial
                color={stage.colors[1]}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>

            {/* Glowing edges */}
            <mesh position={[-1.6, 0.02, zPosition]}>
              <boxGeometry args={[0.2, 0.05, length - 0.1]} />
              <meshStandardMaterial
                color={stage.colors[0]}
                emissive={stage.colors[0]}
                emissiveIntensity={0.5}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>

            <mesh position={[1.6, 0.02, zPosition]}>
              <boxGeometry args={[0.2, 0.05, length - 0.1]} />
              <meshStandardMaterial
                color={stage.colors[1]}
                emissive={stage.colors[1]}
                emissiveIntensity={0.5}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>

            {/* Decorative elements */}
            {Array.from({ length: Math.floor(length) }).map((_, i) => (
              <group
                key={`decor-${i}`}
                position={[0, 0, stage.start - 45 + i + 0.5]}
              >
                {/* Small connecting lines */}
                <mesh position={[-1.4, 0.02, 0]}>
                  <boxGeometry args={[0.4, 0.03, 0.05]} />
                  <meshStandardMaterial
                    color={stage.colors[0]}
                    emissive={stage.colors[0]}
                    emissiveIntensity={0.3}
                  />
                </mesh>
                <mesh position={[1.4, 0.02, 0]}>
                  <boxGeometry args={[0.4, 0.03, 0.05]} />
                  <meshStandardMaterial
                    color={stage.colors[1]}
                    emissive={stage.colors[1]}
                    emissiveIntensity={0.3}
                  />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}
    </group>
  );
};

const Character = ({
  position,
  isTimePaused,
}: {
  position: THREE.Vector3;
  isTimePaused: boolean;
}) => {
  const characterRef = useRef<THREE.Group>(null);

  // Add bounce animation
  useFrame(({ clock }) => {
    if (characterRef.current && !isTimePaused) {
      // Add small bouncing motion
      const bounce = Math.sin(clock.getElapsedTime() * 5) * 0.05;
      characterRef.current.position.y = bounce;
    }
  });

  return (
    <group position={position} ref={characterRef}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial
          color="#E1F5FE"
          metalness={isTimePaused ? 0.8 : 0}
          roughness={0.2}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial
          color="#E1F5FE"
          metalness={isTimePaused ? 0.8 : 0}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const Scene = ({
  currentAge,
  setCurrentAge,
  birthYear,
  onEventChange,
  isTimePaused,
  setIsTimePaused,
}: SceneProps) => {
  const characterRef = useRef<THREE.Group>(null);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const movementSpeed = 1 / 3; // Changed from 2 to 1/3 (3 seconds per year)
  const cameraHeight = 2;
  const cameraDistance = 4;

  // Load historical events data
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchHistoricalEvents(birthYear, 90); // Fetch all potential events up to age 90
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to load historical events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [birthYear]);

  // Check for events at the current age - modified to show all events by year
  useEffect(() => {
    if (events.length > 0 && !isLoading && hasStarted) {
      // Instead of finding the next event, find an event for the current year
      const currentYear = birthYear + Math.floor(currentAge);

      // Find an event for the current year
      const yearEvent = events.find((event) => event.year === currentYear);

      if (yearEvent) {
        onEventChange(yearEvent);
      } else if (!isTimePaused) {
        // Clear event when moving and no event for this year
        onEventChange(null);
      }
    }
  }, [
    currentAge,
    events,
    birthYear,
    hasStarted,
    isTimePaused,
    isLoading,
    onEventChange,
  ]);

  // Add keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!hasStarted && currentAge === 0) {
          setHasStarted(true); // Only set hasStarted to true at the beginning
        } else {
          setIsTimePaused(!isTimePaused); // Otherwise just toggle pause state
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasStarted, isTimePaused, setIsTimePaused, currentAge]);

  useFrame((state, delta) => {
    if (hasStarted && !isTimePaused && currentAge < 90) {
      // Move forward in time
      const newAge = Math.min(90, currentAge + delta * movementSpeed);
      setCurrentAge(newAge);

      // Update character position
      const z = newAge - 45;
      if (characterRef.current) {
        characterRef.current.position.z = z;

        // Fixed camera position above and behind player
        state.camera.position.set(
          0, // Directly behind
          cameraHeight, // Fixed height above ground
          z - cameraDistance // Fixed distance behind player
        );

        // Look at a point slightly above the player
        state.camera.lookAt(0, 1, z);
      }
    }
  });

  return (
    <>
      <color
        attach="background"
        args={[isTimePaused ? "#444444" : "#87CEEB"]}
      />
      <fog attach="fog" args={[isTimePaused ? "#444444" : "#87CEEB", 10, 50]} />
      <Sky isTimePaused={isTimePaused} />
      <ambientLight intensity={isTimePaused ? 0.3 : 0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isTimePaused ? 0.5 : 1}
        castShadow
      />
      <group ref={characterRef} position={[0, 0, currentAge - 45]}>
        <Character
          position={new THREE.Vector3(0, 0, 0)}
          isTimePaused={isTimePaused}
        />
      </group>
      <Ground />
      <Path />
      <LifeObjects
        birthYear={birthYear}
        currentAge={currentAge}
        isTimePaused={isTimePaused}
      />
      {!hasStarted && (
        <mesh position={[0, 1, -40]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </>
  );
};

export const Journey3D = ({ birthYear }: Journey3DProps) => {
  const [currentAge, setCurrentAge] = useState(0);
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const controlsRef = useRef<any>(null);
  const initialZ = 0 - 45;
  const [currentEvent, setCurrentEvent] = useState<HistoricalEvent | null>(
    null
  );
  const [phaseMessage, setPhaseMessage] = useState("");

  // Update phase message based on current age
  useEffect(() => {
    if (currentAge <= 30) {
      setPhaseMessage("Everything that happened is normal to you");
    } else if (currentAge <= 60) {
      setPhaseMessage("You're at the peak of your career during these events");
    } else {
      setPhaseMessage(
        "Everything that happened goes against human nature for you"
      );
    }
  }, [currentAge]);

  // Set hasStarted to true when the age increases above 0
  useEffect(() => {
    if (currentAge > 0 && !hasStarted) {
      setHasStarted(true);
    }
  }, [currentAge, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        shadows
        camera={{
          fov: 60,
          position: [0, 2, initialZ - 4],
          near: 0.1,
          far: 1000,
        }}
      >
        <Scene
          currentAge={currentAge}
          setCurrentAge={setCurrentAge}
          birthYear={birthYear}
          onEventChange={setCurrentEvent}
          isTimePaused={isTimePaused}
          setIsTimePaused={setIsTimePaused}
        />
      </Canvas>
      <HUD
        age={Math.floor(currentAge)}
        birthYear={birthYear}
        isTimePaused={isTimePaused}
      />
      <EventOverlay
        event={currentEvent}
        phaseMessage={phaseMessage}
        isTimePaused={isTimePaused}
      />
      <AudioPlayer />
      {/* Only show start overlay at the very beginning */}
      {!hasStarted && currentAge === 0 && (
        <StartOverlay onStart={handleStart} />
      )}
    </div>
  );
};
