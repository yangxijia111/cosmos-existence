"use client";

import { useTimelineStore } from "@/stores/useTimelineStore";
import { eraProgressAt } from "@/lib/cosmology";
import { cosmicEras } from "@/data/cosmic-eras";
import { ComovingCloud } from "../effects/ComovingCloud";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFrameElapsed } from "@/hooks/useFrameElapsed";

interface SceneProps {
  active: boolean;
  a: number;
  palette: { primary: string; accent: string; background: string };
  intensity: number;
}

/** 奇点：极高密度光核 + 量子涨落闪烁 */
export function Singularity({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);
  const coreRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useFrameElapsed();

  useFrame(() => {
    const core = coreRef.current;
    if (!core) return;
    // 量子涨落：光核随机微闪
    const elapsed = elapsedRef.current;
    const flicker = 0.9 + Math.sin(elapsed * 17) * 0.05 + Math.sin(elapsed * 41) * 0.05;
    core.scale.setScalar(flicker * (0.5 + u * 0.5));
    (core.material as THREE.MeshBasicMaterial).opacity = 0.9 * intensity * (active ? 1 : 0.2);
  });

  return (
    <group>
      {/* 光核 */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={palette.primary} transparent opacity={0.9} />
      </mesh>
      <ComovingCloud
        eraId={cosmicEras[0].id}
        particleCount={cosmicEras[0].visual.particleCount}
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
