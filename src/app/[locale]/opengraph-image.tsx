import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { site } from "@/data";
import { routing } from "@/i18n/routing";

export const alt = "Nielson Gomes · Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

const BG = "#0a0a0b";
const FG = "#f4f4f5";
const MUTED = "#a1a1aa";
const SUBTLE = "#71717a";
const ACCENT = "#ef4444";
const HIGHLIGHT = "Full Stack";

const asset = (...segments: string[]) => readFile(path.join(process.cwd(), "src", "assets", ...segments));

const splitRole = (role: string) => {
  const index = role.indexOf(HIGHLIGHT);
  if (index === -1) return [{ text: role, accent: false }];

  return [
    { text: role.slice(0, index).trim(), accent: false },
    { text: HIGHLIGHT, accent: true },
    { text: role.slice(index + HIGHLIGHT.length).trim(), accent: false },
  ].filter((line) => line.text);
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const [photo, outfit400, outfit600, outfit700, mono500] = await Promise.all([
    asset("og", "photo.png"),
    asset("fonts", "outfit-400.woff"),
    asset("fonts", "outfit-600.woff"),
    asset("fonts", "outfit-700.woff"),
    asset("fonts", "jetbrains-mono-500.woff"),
  ]);
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;
  const roleLines = splitRole(t("ogRole"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BG,
          color: FG,
          fontFamily: "Outfit",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ position: "absolute", right: 40, bottom: 0, display: "flex", width: 400, height: 600 }}>
          <div
            style={{
              position: "absolute",
              left: "-15%",
              right: "-15%",
              top: "15%",
              bottom: "-10%",
              background: "radial-gradient(circle at 50% 55%, rgba(239,68,68,0.38), rgba(239,68,68,0) 62%)",
            }}
          />
          <img
            src={photoSrc}
            alt=""
            width={400}
            height={600}
            style={{ position: "absolute", bottom: 0, maskImage: "linear-gradient(to right, black 74%, transparent)" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 90,
              background: `linear-gradient(to top, ${BG}, rgba(10,10,11,0))`,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: 760,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width={56} height={56} viewBox="0 0 64 64">
              <rect width={64} height={64} rx={14} fill="#111113" />
              <rect x={1} y={1} width={62} height={62} rx={13} fill="none" stroke={ACCENT} strokeOpacity={0.45} strokeWidth={2} />
              <path d="M10 45V19l15 26V19" stroke={FG} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M51.8 24.2a11 11 0 1 0 3.2 7.8H46" stroke={ACCENT} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 32, fontWeight: 600 }}>{site.name}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {roleLines.map((line) => (
              <div
                key={line.text}
                style={{
                  fontSize: 104,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: -3,
                  color: line.accent ? ACCENT : FG,
                }}
              >
                {line.text}
              </div>
            ))}
            <div style={{ marginTop: 28, fontSize: 28, color: MUTED }}>{t("ogStack")}</div>
          </div>

          <div style={{ fontFamily: "JetBrains Mono", fontSize: 22, color: SUBTLE }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: outfit400, weight: 400, style: "normal" },
        { name: "Outfit", data: outfit600, weight: 600, style: "normal" },
        { name: "Outfit", data: outfit700, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono500, weight: 500, style: "normal" },
      ],
    }
  );
}
