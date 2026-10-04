"use client";

import { useTimelineStore } from "@/stores/useTimelineStore";
import { eraProgressAt } from "@/lib/cosmology";
import { cosmicEras } from "@/data/cosmic-eras";
import { ComovingCloud } from "../effects/ComovingCloud";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  active: boolean;
  a: number;
  palette: { primary: string; accent: string; background: string };
  intensity: number;
}

/** 暴胀：共动网格拉伸可视化 — 网格线随 a(t) 膨胀，直观呈现空间本身在生长 */
export function Inflation({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);
  const gridRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!gridRef.current) return;
    gridRef.current.scale.setScalar(Math.max(0.01, a * 0.3));
    gridRef.current.children.forEach((child) => {
      const line = child as THREE.LineSegments;
      (line.material as THREE.LineBasicMaterial).opacity =
        0.15 * intensity * (active ? 1 : 0.2);
    });
  });

  return (
    <group>
      {/* 共动网格 */}
      <group ref={gridRef}>
        <gridHelper args={[10, 8, palette.accent, palette.primary]} rotation={[Math.PI / 4, 0, 0]} />
        <gridHelper args={[10, 8, palette.accent, palette.primary]} rotation={[-Math.PI / 4, 0, 0]} />
      </group>
      <ComovingCloud
        eraId={cosmicEras[1].id}
        particleCount={cosmicEras[1].visual.particleCount}
        a={a}
        color={palette.primary}
        accentColor={palette.accent}
        intensity={intensity}
        eraProgress={u}
        active={active}
      />
    </group>
  );
}
