import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

interface SkyProps {
  isTimePaused?: boolean;
}

// Create stars
const Stars = ({ count = 1000, isTimePaused = false }) => {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 30 + 15; // Higher in the sky
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current && isTimePaused) {
      // When paused, make stars twinkle more to highlight the pause effect
      const time = clock.getElapsedTime();
      const colors = starsRef.current.geometry.attributes
        .color as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Create a twinkling effect by making brightness fluctuate
        const brightness = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.1);
        colors.array[i3] = brightness;
        colors.array[i3 + 1] = brightness;
        colors.array[i3 + 2] = brightness;
      }

      colors.needsUpdate = true;
    }
  });

  // Create colors for the stars
  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const brightness = Math.random() * 0.5 + 0.5;
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = brightness;
    }
    return colors;
  }, [count]);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={isTimePaused ? 1 : 0.5}
      />
    </points>
  );
};

// Cloud component
const Cloud = ({
  position,
  scale,
  rotation,
  isTimePaused = false,
}: {
  position: THREE.Vector3;
  scale: THREE.Vector3;
  rotation: THREE.Euler;
  isTimePaused?: boolean;
}) => {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cloudRef.current && !isTimePaused) {
      // Move clouds slowly when not paused
      cloudRef.current.position.x += delta * 0.2;

      // Reset position when cloud moves out of view
      if (cloudRef.current.position.x > 50) {
        cloudRef.current.position.x = -50;
      }
    }
  });

  return (
    <group ref={cloudRef} position={position} scale={scale} rotation={rotation}>
      <mesh>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial
          color={isTimePaused ? "#8a8a8a" : "#ffffff"}
          opacity={isTimePaused ? 0.4 : 0.7}
          transparent
          roughness={1}
        />
      </mesh>
      <mesh position={[1, -0.5, 0]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={isTimePaused ? "#8a8a8a" : "#ffffff"}
          opacity={isTimePaused ? 0.4 : 0.7}
          transparent
          roughness={1}
        />
      </mesh>
      <mesh position={[-1, -0.3, 0]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial
          color={isTimePaused ? "#8a8a8a" : "#ffffff"}
          opacity={isTimePaused ? 0.4 : 0.7}
          transparent
          roughness={1}
        />
      </mesh>
    </group>
  );
};

export const Sky = ({ isTimePaused = false }: SkyProps) => {
  // Add clouds at random positions
  const clouds = useMemo(() => {
    const tempClouds = [];
    for (let i = 0; i < 10; i++) {
      tempClouds.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 100
        ),
        scale: new THREE.Vector3(
          Math.random() + 1,
          Math.random() + 0.5,
          Math.random() + 1
        ),
        rotation: new THREE.Euler(0, Math.random() * Math.PI * 2, 0),
      });
    }
    return tempClouds;
  }, []);

  return (
    <>
      <Stars count={1500} isTimePaused={isTimePaused} />
      {clouds.map((cloud, i) => (
        <Cloud
          key={i}
          position={cloud.position}
          scale={cloud.scale}
          rotation={cloud.rotation}
          isTimePaused={isTimePaused}
        />
      ))}
    </>
  );
};
