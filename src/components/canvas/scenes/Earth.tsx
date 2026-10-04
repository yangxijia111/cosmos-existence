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

/** 地球纪元：黯淡蓝点 + 背景星野 */
export function Earth({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);
  const earthRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useFrameElapsed();

  useFrame(() => {
    const earth = earthRef.current;
    if (!earth) return;
    earth.rotation.y = elapsedRef.current * 0.05;
    // 蓝点从远处逐渐显现
    const mat = earth.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.min(1, u * 2) * intensity * (active ? 1 : 0.3);
  });

  return (
    <group>
      {/* 黯淡蓝点 */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshBasicMaterial color="#4f8ef7" transparent opacity={0} />
      </mesh>
      {/* 微弱光晕 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#6ee7f0"
          transparent
          opacity={0.08 * intensity * u}
          depthWrite={false}
        />
      </mesh>
      <ComovingCloud
        eraId={cosmicEras[5].id}
        particleCount={cosmicEras[5].visual.particleCount}
        a={a}
        color={palette.primary}
        accentColor={palette.accent}
        intensity={intensity * 0.7}
        eraProgress={u}
        active={active}
      />
    </group>
  );
}
