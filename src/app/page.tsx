import { Hero } from "@/components/Hero";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Sidebar />
    </div>
  );
}
