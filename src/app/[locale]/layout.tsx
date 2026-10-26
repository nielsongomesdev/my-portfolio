import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer, Header, MobileNav, Providers, SkipLink } from "@/components";
import { site } from "@/data";
import { routing } from "@/i18n/routing";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const isPt = locale === "pt";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("home.title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("home.description"),
    applicationName: t("siteName"),
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    alternates: {
      canonical: isPt ? "/pt" : "/",
      languages: { en: "/", pt: "/pt", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: isPt ? "pt_BR" : "en_US",
      alternateLocale: isPt ? "en_US" : "pt_BR",
      url: isPt ? "/pt" : "/",
      title: t("home.title"),
      description: t("home.description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "common" });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.legalName,
    alternateName: site.name,
    jobTitle: t("role"),
    url: `${site.url}${locale === "pt" ? "/pt" : ""}`,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  };

  return (
    <html lang={locale} className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <Providers>
            <SkipLink />
            <div className="site-backdrop" aria-hidden="true" />
            <Header />
            <main id="content" className="pt-16">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </Providers>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          // Static, server-generated JSON derived from local constants only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
