import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { site } from "@/data";
import { routing } from "@/i18n/routing";

export const alt = "Nielson Gomes · Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a0a0b 0%, #141416 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ef4444" }} />
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a1a1aa" }}>
            {t("ogRole")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#a1a1aa" }}>{t("ogStack")}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#71717a",
          }}
        >
          <span>{site.url.replace("https://", "")}</span>
          <span>{site.city}, {site.country}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
