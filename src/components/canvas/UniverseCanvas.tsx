"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Universe } from "./Universe";
import { usePerfStore } from "@/stores/usePerfStore";

/**
 * UniverseCanvas — R3F Canvas 宿主
 * 动态挂载，void 阶段不加载 WebGL 资源
 * DPR 上限随性能档位变化（性能降级核心手段之一）
 */
export function UniverseCanvas() {
  const maxDpr = usePerfStore((s) => s.maxDpr);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 60], fov: 60, near: 0.1, far: 2000 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, maxDpr]}
        style={{ background: "#030308" }}
      >
        <Suspense fallback={null}>
          <Universe />
        </Suspense>
      </Canvas>
    </div>
  );
}
