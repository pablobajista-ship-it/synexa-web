import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b1f44",
          borderRadius: 14,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="g" x1="10" y1="10" x2="70" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0b1f44" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <g transform="translate(6 6) scale(0.88)">
            <polygon points="10,10 50,10 70,30 50,50 10,50 28,30" fill="url(#g)" />
            <polygon points="90,50 50,50 30,70 50,90 90,90 72,70" fill="#14b8a6" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
