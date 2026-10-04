"use client";

import { useFrame } from "@react-three/fiber";
import { useTimelineStore } from "@/stores/useTimelineStore";
import { eraIndexAt, scaleFactorAt } from "@/lib/cosmology";
import { cosmicEras } from "@/data/cosmic-eras";
import { Singularity } from "./scenes/Singularity";
import { Inflation } from "./scenes/Inflation";
import { ParticleEpoch } from "./scenes/ParticleEpoch";
import { Stars } from "./scenes/Stars";
import { Galaxies } from "./scenes/Galaxies";
import { Earth } from "./scenes/Earth";
import { CameraRig } from "./controls/CameraRig";

const sceneMap = [
  Singularity,
  Inflation,
  ParticleEpoch,
  Stars,
  Galaxies,
  Earth,
];

/**
 * Universe — 场景组装
 * 按当前纪元挂载子场景，驱动尺度因子与相机
 * 相机运镜已抽离至 CameraRig
 */
export function Universe() {
  const tick = useTimelineStore((s) => s.tick);
  const t = useTimelineStore((s) => s.t);

  // 时间线推进（纯业务，不含相机逻辑）
  useFrame((_, delta) => {
    tick(delta);
  });

  const eraIdx = eraIndexAt(t);
  const a = scaleFactorAt(t);

  return (
    <group>
      <CameraRig />
      {sceneMap.map((Scene, i) => {
        const active = i === eraIdx;
        // 保留前一纪元场景做短暂交叉淡入
        const visible = active || i === eraIdx - 1;
        if (!visible) return null;
        return (
          <Scene
            key={cosmicEras[i].id}
            active={active}
            a={a}
            palette={cosmicEras[i].visual.palette}
            intensity={cosmicEras[i].visual.intensity}
          />
        );
      })}
    </group>
  );
}
