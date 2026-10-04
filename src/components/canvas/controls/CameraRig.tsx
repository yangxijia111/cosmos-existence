"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTimelineStore } from "@/stores/useTimelineStore";
import { cameraAt } from "@/lib/cosmology";
import { useFrameElapsed } from "@/hooks/useFrameElapsed";

/**
 * CameraRig — 共动框架内的相机运镜
 * 缓慢 dolly（径向推拉）+ drift（极缓慢轨道漂移），由时间线驱动
 */
export function CameraRig() {
  const elapsedRef = useFrameElapsed();
  useFrame((state, delta) => {
    const t = useTimelineStore.getState().t;
    const cam = cameraAt(t);
    const camera = state.camera as THREE.PerspectiveCamera;

    // FOV 插值
    camera.fov = cam.fov;

    // dolly：径向距离随纪元推进
    // drift：极缓慢的轨道漂移，保持电影感
    const drift = elapsedRef.current * 0.02;
    const d = cam.radius;
    camera.position.set(
      Math.sin(drift) * d,
      Math.sin(drift * 0.5) * d * 0.2,
      Math.cos(drift) * d
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // delta 未直接使用，但保留接口以兼容未来相机阻尼
    void delta;
  });

  return null;
}
