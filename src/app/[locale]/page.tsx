import { setRequestLocale } from "next-intl/server";
import { Approach, ContactCta, FeaturedProjects, Hero } from "@/sections";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Approach />
      <ContactCta />
    </>
  );
}
