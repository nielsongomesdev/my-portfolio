import { Hero, About, Projects, Contact } from "@/sections";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}