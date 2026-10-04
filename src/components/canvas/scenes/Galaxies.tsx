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

/** 星系纪元：结构在共动网格固定位置凝结 */
export function Galaxies({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);

  return (
    <ComovingCloud
      eraId={cosmicEras[4].id}
      particleCount={cosmicEras[4].visual.particleCount}
      a={a}
      color={palette.primary}
      accentColor={palette.accent}
      intensity={intensity}
      eraProgress={u}
      active={active}
    />
  );
}
