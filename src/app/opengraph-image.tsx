import { ImageResponse } from "next/og";
import { site } from "../../content/site";

export const dynamic = "force-static";

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
          background: "#000000",
          padding: "64px",
        }}
      >
        <div style={{ color: "#8a8a8a", fontSize: 28, marginBottom: 16, display: "flex" }}>
          {site.role}
        </div>
        <div style={{ color: "#f2f2f2", fontSize: 108, display: "flex" }}>{site.name}</div>
        <div style={{ width: 120, height: 8, background: "#f2f2f2", marginTop: 24, display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
