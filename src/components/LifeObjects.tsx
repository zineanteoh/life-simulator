import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface AgeObject {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

interface LifeObjectProps {
  currentAge: number;
  isTimePaused: boolean;
}

// Objects definitions by age groups
const defineAgeObjects = (): { [key: number]: AgeObject[] } => {
  return {
    // Early childhood (0-5)
    0: [
      { type: "teddy", position: [3, 0, -44], color: "#B76E79" },
      { type: "blocks", position: [-3, 0, -42], color: "#FF9E80" },
      { type: "ball", position: [2, 0, -40], color: "#B39DDB" },
    ],
    // Elementary school years (6-12)
    6: [
      { type: "book", position: [3, 0, -38], color: "#81C784" },
      { type: "schoolBus", position: [-3, 0, -36], color: "#FFEB3B" },
      { type: "pencil", position: [2, 0, -34], color: "#FFA726" },
    ],
    // Teen years (13-19)
    13: [
      { type: "bicycle", position: [3, 0, -32], color: "#4FC3F7" },
      { type: "gameController", position: [-3, 0, -30], color: "#7E57C2" },
      { type: "phone", position: [2, 0, -28], color: "#E57373" },
    ],
    // Young adult (20-29)
    20: [
      { type: "graduationCap", position: [3, 0, -26], color: "#000000" },
      { type: "computer", position: [-3, 0, -24], color: "#78909C" },
      { type: "car", position: [2, 0, -22], color: "#F44336" },
    ],
    // Early career (30-39)
    30: [
      { type: "briefcase", position: [3, 0, -14], color: "#795548" },
      { type: "house", position: [-3, 0, -12], color: "#8D6E63" },
      { type: "ring", position: [2, 0, -10], color: "#FFD700" },
    ],
    // Mid-life (40-49)
    40: [
      { type: "familyTree", position: [3, 0, -5], color: "#66BB6A" },
      { type: "desk", position: [-3, 0, -3], color: "#A1887F" },
      { type: "moneyBag", position: [2, 0, -1], color: "#4CAF50" },
    ],
    // Later career (50-59)
    50: [
      { type: "award", position: [3, 0, 5], color: "#FFC107" },
      { type: "healthIcon", position: [-3, 0, 7], color: "#EF5350" },
      { type: "travelSuitcase", position: [2, 0, 9], color: "#90A4AE" },
    ],
    // Retirement preparation (60-69)
    60: [
      { type: "clock", position: [3, 0, 15], color: "#9E9E9E" },
      { type: "gardenTools", position: [-3, 0, 17], color: "#8BC34A" },
      { type: "readingGlasses", position: [2, 0, 19], color: "#3F51B5" },
    ],
    // Golden years (70+)
    70: [
      { type: "photoAlbum", position: [3, 0, 25], color: "#FFCCBC" },
      { type: "recliner", position: [-3, 0, 27], color: "#5D4037" },
      { type: "legacy", position: [2, 0, 29], color: "#9C27B0" },
    ],
  };
};

// Render a basic shape based on object type
const ObjectShape: React.FC<{ object: AgeObject; isTimePaused: boolean }> = ({
  object,
  isTimePaused,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current && !isTimePaused) {
      // Gentle floating/rotating animation when time is not paused
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y =
        object.position[1] + Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  const getGeometry = (type: string) => {
    switch (type) {
      case "teddy":
        return <sphereGeometry args={[0.5, 16, 16]} />; // Teddy bear head
      case "blocks":
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case "ball":
        return <sphereGeometry args={[0.4, 16, 16]} />;
      case "book":
        return <boxGeometry args={[0.8, 0.1, 0.6]} />;
      case "schoolBus":
        return <boxGeometry args={[1.2, 0.6, 0.6]} />;
      case "pencil":
        return <cylinderGeometry args={[0.1, 0.1, 1, 16]} />;
      case "bicycle":
        return <torusGeometry args={[0.5, 0.1, 16, 32]} />; // Bicycle wheel
      case "gameController":
        return <boxGeometry args={[0.8, 0.3, 0.2]} />;
      case "phone":
        return <boxGeometry args={[0.3, 0.6, 0.05]} />;
      case "graduationCap":
        return <cylinderGeometry args={[0.5, 0.5, 0.1, 4]} />; // Graduation cap
      case "computer":
        return <boxGeometry args={[0.8, 0.5, 0.1]} />;
      case "car":
        return <boxGeometry args={[1, 0.5, 0.5]} />;
      case "briefcase":
        return <boxGeometry args={[0.8, 0.6, 0.3]} />;
      case "house":
        return <coneGeometry args={[0.7, 1, 4]} />; // Simplified house
      case "ring":
        return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
      case "familyTree":
        return <coneGeometry args={[0.6, 1.2, 16]} />; // Tree shape
      case "desk":
        return <boxGeometry args={[1, 0.1, 0.6]} />;
      case "moneyBag":
        return <sphereGeometry args={[0.4, 16, 16]} />;
      case "award":
        return <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />;
      case "healthIcon":
        return <boxGeometry args={[0.6, 0.6, 0.1]} />;
      case "travelSuitcase":
        return <boxGeometry args={[0.7, 0.5, 0.3]} />;
      case "clock":
        return <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />;
      case "gardenTools":
        return <cylinderGeometry args={[0.1, 0.1, 1, 16]} />;
      case "readingGlasses":
        return <torusGeometry args={[0.3, 0.05, 16, 32]} />;
      case "photoAlbum":
        return <boxGeometry args={[0.7, 0.1, 0.5]} />;
      case "recliner":
        return <boxGeometry args={[0.7, 0.7, 0.7]} />;
      case "legacy":
        return <dodecahedronGeometry args={[0.5, 0]} />;
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={new THREE.Vector3(...object.position)}
      rotation={
        object.rotation ? new THREE.Euler(...object.rotation) : undefined
      }
      scale={
        object.scale
          ? new THREE.Vector3(...object.scale)
          : new THREE.Vector3(1, 1, 1)
      }
      castShadow
    >
      {getGeometry(object.type)}
      <meshStandardMaterial
        color={object.color || "#ffffff"}
        roughness={0.5}
        metalness={0.5}
        opacity={isTimePaused ? 0.5 : 1}
        transparent={true}
      />
    </mesh>
  );
};

export const LifeObjects: React.FC<LifeObjectProps> = ({
  currentAge,
  isTimePaused,
}) => {
  const ageObjects = useMemo(() => defineAgeObjects(), []);

  // Determine which objects should be visible based on current age
  const visibleObjects: AgeObject[] = [];

  // Show objects from the current age group and the previous one
  Object.keys(ageObjects)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((ageGroup) => {
      if (ageGroup <= currentAge) {
        // Get objects for this age group
        ageObjects[ageGroup].forEach((obj) => {
          visibleObjects.push(obj);
        });
      }
    });

  return (
    <group>
      {visibleObjects.map((object, index) => (
        <ObjectShape
          key={`${object.type}-${index}`}
          object={object}
          isTimePaused={isTimePaused}
        />
      ))}
    </group>
  );
};
