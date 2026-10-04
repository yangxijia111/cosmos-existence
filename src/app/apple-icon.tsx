import { ImageResponse } from "next/og";

export const alt = "COSMOS / 存在";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple Touch Icon：深空底 + 奇点光核 + 共动轨道弧（与 icon.svg 同视觉语言） */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "#030308",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* 奇点光晕 */}
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 15,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.45) 0%, rgba(129,140,248,0.1) 45%, rgba(129,140,248,0) 70%)",
          }}
        />
        {/* 光核 */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#ede9fe",
          }}
        />
        {/* 共动轨道弧（倾斜实心边框环） */}
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 68,
            width: 120,
            height: 44,
            borderRadius: "50%",
            border: "2px solid rgba(110,231,240,0.45)",
          }}
        />
      </div>
    ),
    size
  );
}
