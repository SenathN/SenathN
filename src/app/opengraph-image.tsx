import { ImageResponse } from "next/og";
import { site } from "../../content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0F0C24",
          padding: "64px",
        }}
      >
        <div style={{ color: "#C4BAFF", fontSize: 28, marginBottom: 16, display: "flex" }}>
          {site.role}
        </div>
        <div style={{ color: "#F5F3FF", fontSize: 108, display: "flex" }}>{site.name}</div>
        <div style={{ width: 120, height: 8, background: "#A08DFF", marginTop: 24, display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
