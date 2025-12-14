import React from "react";
import Navbar from "../components/navbar";
import HeroRow from "../components/hero-row";
import HorizontalShelf from "../components/horizontal-shelf";
import MangaCard, { MangaItem } from "../components/manga-card";
import { HeroItem } from "../components/hero-card";

const hero: HeroItem[] = [
  {
    id: 1,
    title: "Talk To Your Favorite Characters",
    cover:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1600&q=80",
    chips: ["∞ Unlimited chats", "🎧 Voice calls", "🛡️ Ad-free forever"],
    watermark: "VORTEX SCANS",
  },
  {
    id: 2,
    title: "Barbarian's Adventure In A Fantasy World",
    cover:
      "https://images.unsplash.com/photo-1520975958225-1c190adf4f9a?auto=format&fit=crop&w=1600&q=80",
    badge: "Hot",
    chips: ["Action", "Manhwa"],
    watermark: "VORTEX SCANS",
  },
  {
    id: 3,
    title: "Return Of The Apocalypse-Class Death Knight",
    cover:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1600&q=80",
    badge: "Hot",
    chips: ["Action", "Revenge"],
    watermark: "VORTEX SCANS",
  },
];

const popular: MangaItem[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Popular Title ${i + 1}`,
  cover:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
}));

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050607] text-white">
      {/* subtle background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(220,38,38,0.18),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.10),transparent_35%)]" />

      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 pb-16">
        <HeroRow items={hero} />

        <HorizontalShelf title="Popular Today">
          {popular.map((m) => (
            <MangaCard key={m.id} item={m} />
          ))}
        </HorizontalShelf>
      </main>
    </div>
  );
};

export default Home;
