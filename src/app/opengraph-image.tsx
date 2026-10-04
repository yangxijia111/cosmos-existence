import { ImageResponse } from "next/og";

/** alt 与尺寸元数据（file convention 自动注入 og 标签） */
export const alt = "COSMOS / 存在 — 从宇宙诞生到人生意义的沉浸式哲学探索";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * 确定性伪随机（mulberry32）
 * og 图必须可复现：相同 seed → 相同星点布局，构建产物稳定
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 星点场：位置/半径/亮度全部来自固定 seed，不随时间变化 */
const STARS = (() => {
  const rand = mulberry32(42);
  return Array.from({ length: 140 }, () => ({
    x: rand() * 1200,
    y: rand() * 630,
    r: 0.8 + rand() * 2.2,
    o: 0.15 + rand() * 0.65,
  }));
})();

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(180deg, #030308 0%, #060611 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* 星点场 */}
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.r,
              height: s.r,
              borderRadius: "50%",
              background: "#c4c4dc",
              opacity: s.o,
            }}
          />
        ))}

        {/* 中央奇点光晕（radial 渐变模拟发光） */}
        <div
          style={{
            position: "absolute",
            left: 430,
            top: 115,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(129,140,248,0.12) 45%, rgba(129,140,248,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 574,
            top: 259,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#ede9fe",
          }}
        />

        {/* 版面内容 */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.45em",
              color: "#3d3d6e",
              marginBottom: "36px",
            }}
          >
            13.8 BILLION YEARS OF COSMIC EVOLUTION
          </div>
          <div
            style={{
              fontSize: "96px",
              letterSpacing: "0.22em",
              color: "#ededf5",
              lineHeight: 1,
              marginBottom: "40px",
              paddingLeft: "0.22em",
            }}
          >
            COSMOS
          </div>
          <div
            style={{
              width: "120px",
              height: "1px",
              background: "#2a2a52",
              marginBottom: "36px",
            }}
          />
          <div
            style={{
              fontSize: "19px",
              letterSpacing: "0.32em",
              color: "#8a8ab8",
              paddingLeft: "0.32em",
            }}
          >
            FROM THE BIG BANG TO THE QUESTION OF MEANING
          </div>
        </div>
      </div>
    ),
    size
  );
}
