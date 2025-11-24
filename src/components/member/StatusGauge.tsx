import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import "./StatusGauge.css";

interface GaugeProps {
  value: number;
}

function RotatingGauge({ value }: GaugeProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const percentage = Math.min(Math.max(value, 0)) / 100;

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.15, 16, 50]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      <mesh ref={ringRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.18, 16, 50, Math.PI * 2 * percentage]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={0.3}
        />
      </mesh>

      <Text
        position={[0, 0, 0]}
        fontSize={0.6}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        {value}%
      </Text>
    </group>
  );
}

export default function StatusGauge({ value }: GaugeProps) {
  return (
    <div className="status-gauge">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingGauge value={value} />
      </Canvas>
    </div>
  );
}
