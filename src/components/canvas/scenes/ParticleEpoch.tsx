"use client";

import { useTimelineStore } from "@/stores/useTimelineStore";
import { eraProgressAt } from "@/lib/cosmology";
import { cosmicEras } from "@/data/cosmic-eras";
import { ComovingCloud } from "../effects/ComovingCloud";

interface SceneProps {
  active: boolean;
  a: number;
  palette: { primary: string; accent: string; background: string };
  intensity: number;
}

/** 粒子纪元：等离子体雾 → 原子凝结（CMB 余晖） */
export function ParticleEpoch({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);

  return (
    <ComovingCloud
      eraId={cosmicEras[2].id}
      particleCount={cosmicEras[2].visual.particleCount}
      a={a}
      color={palette.primary}
      accentColor={palette.accent}
      intensity={intensity}
      eraProgress={u}
      active={active}
    />
  );
}
