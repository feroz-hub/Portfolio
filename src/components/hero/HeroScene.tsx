"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/**
 * Static CSS fallback for mobile / reduced-motion / WebGL unsupported.
 * Shows subtle floating gradient orbs instead of Three.js.
 */
function HeroFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/3 top-1/4 h-64 w-64 animate-pulse rounded-full bg-[var(--accent-primary)]/8 blur-[80px]" />
      <div className="absolute bottom-1/3 right-1/4 h-48 w-48 animate-pulse rounded-full bg-[var(--accent-cyan)]/6 blur-[60px] [animation-delay:1s]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#6366f1]/5 blur-[90px] [animation-delay:2s]" />
    </div>
  );
}

function subscribeToHeroScenePreference() {
  return () => {};
}

function getHeroSceneSnapshot() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  return !prefersReduced && !isMobile && !!gl;
}

export function HeroScene() {
  const shouldRender = useSyncExternalStore(
    subscribeToHeroScenePreference,
    getHeroSceneSnapshot,
    () => false
  );

  if (!shouldRender) {
    return <HeroFallback />;
  }

  return <Scene />;
}
