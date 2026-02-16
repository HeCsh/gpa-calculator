import { ImageResponse } from "@vercel/og";

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export function createOGImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "white",
            }}
          >
            G
          </div>
          <span
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              fontWeight: 500,
            }}
          >
            thegpacalculator.net
          </span>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              textAlign: "center",
              marginTop: "24px",
              maxWidth: "700px",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}
