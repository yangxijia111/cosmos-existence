"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateCloud, hashSeed } from "@/lib/particles";
import { usePerfStore } from "@/stores/usePerfStore";

interface ComovingCloudProps {
  /** 纪元 id（决定粒子分布种子与数量配置） */
  eraId: string;
  particleCount: { high: number; medium: number; low: number };
  /** 当前尺度因子 a(t) — 世界坐标 = 共动坐标 × a */
  a: number;
  color: string;
  accentColor: string;
  intensity: number;
  /** 纪元内局部进度 0~1，用于纪元特有的形态演化 */
  eraProgress: number;
  active: boolean;
}

/**
 * 共动粒子云 — 所有纪元的共用渲染件
 * 粒子共动坐标固定，随 a(t) 整体缩放 → 空间膨胀而非物质飞散
 */
export function ComovingCloud({
  eraId,
  particleCount,
  a,
  color,
  accentColor,
  intensity,
  eraProgress,
  active,
}: ComovingCloudProps) {
  const level = usePerfStore((s) => s.level);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const count = particleCount[level];

  const cloud = useMemo(
    () => generateCloud(count, hashSeed(eraId)),
    [count, eraId]
  );

  // 每帧把尺度因子写入材质 uniform（用 size 衰减 + 颜色插值表达纪元进程）
  useFrame(() => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.size = 0.6 * Math.min(2, 1 + a * 0.01);
    mat.opacity = intensity * (active ? 1 : 0.35);
    // 颜色在 primary → accent 间随纪元进度微移
    const c = new THREE.Color(color).lerp(new THREE.Color(accentColor), eraProgress * 0.5);
    mat.color = c;
  });

  return (
    <points ref={pointsRef} scale={a} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[cloud.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.6}
        sizeAttenuation
        transparent
        opacity={intensity}
        color={color}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
