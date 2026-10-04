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

/** 恒星纪元：第一代恒星在黑暗中点燃（暖色光点） */
export function Stars({ active, a, palette, intensity }: SceneProps) {
  const t = useTimelineStore((s) => s.t);
  const { u } = eraProgressAt(t);

  return (
    <ComovingCloud
      eraId={cosmicEras[3].id}
      particleCount={cosmicEras[3].visual.particleCount}
      a={a}
      color={palette.primary}
      accentColor={palette.accent}
      intensity={intensity}
      eraProgress={u}
      active={active}
    />
  );
}
