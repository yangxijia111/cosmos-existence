"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * 帧累加计时器（单位：秒）
 * three r16x+ 弃用了 THREE.Clock（R3F 的 state.clock 即其实例，
 * 读取 elapsedTime 会触发控制台弃用警告），这里用每帧 delta 自管理累加。
 * 注意：只能在 useFrame 等非渲染阶段读取 ref.current
 */
export function useFrameElapsed(): React.RefObject<number> {
  const elapsedRef = useRef(0);
  useFrame((_, delta) => {
    elapsedRef.current += delta;
  });
  return elapsedRef;
}
