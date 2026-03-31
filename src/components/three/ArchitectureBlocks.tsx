"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

const LAYERS = [
  { label: "Presentation", y: 2.0, color: "#7c3aed", width: 2.8, opacity: 0.12 },
  { label: "Identity", y: 1.0, color: "#8b5cf6", width: 2.4, opacity: 0.14 },
  { label: "Application", y: 0.0, color: "#06b6d4", width: 2.0, opacity: 0.16 },
  { label: "Domain", y: -1.0, color: "#0ea5e9", width: 1.6, opacity: 0.18 },
  { label: "Infrastructure", y: -2.0, color: "#6366f1", width: 2.8, opacity: 0.12 },
];

function ArchBlock({
  label,
  y,
  color,
  width,
  opacity,
  index,
}: {
  label: string;
  y: number;
  color: string;
  width: number;
  opacity: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        roughness: 0.3,
        metalness: 0.1,
        transmission: 0.6,
        thickness: 0.5,
        side: THREE.DoubleSide,
      }),
    [color, opacity]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle floating motion — each layer offset
    meshRef.current.position.y = y + Math.sin(t * 0.5 + index * 0.8) * 0.08;
    meshRef.current.rotation.y = Math.sin(t * 0.3 + index * 0.5) * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        <mesh ref={meshRef} position={[0, y, 0]} material={material}>
          <boxGeometry args={[width, 0.35, 1.2]} />
        </mesh>
        {/* Edge glow */}
        <mesh position={[0, y, 0]}>
          <boxGeometry args={[width + 0.02, 0.37, 1.22]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
            wireframe
          />
        </mesh>
        {/* Layer label */}
        <Text
          position={[0, y, 0.65]}
          fontSize={0.12}
          color="#a1a1aa"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

export function ArchitectureBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    // Subtle camera-follow on mouse movement
    const targetRotY = pointer.x * 0.15;
    const targetRotX = -pointer.y * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {LAYERS.map((layer, i) => (
        <ArchBlock key={layer.label} {...layer} index={i} />
      ))}
    </group>
  );
}
