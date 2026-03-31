"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ArchitectureBlocks } from "./ArchitectureBlocks";
import { ParticleField } from "./ParticleField";

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color="#8b5cf6" />
          <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#06b6d4" />
          <ArchitectureBlocks />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
