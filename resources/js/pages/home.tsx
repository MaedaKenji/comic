import React from "react";
import Navbar from "../components/navbar";
import HeroRow from "../components/hero-row";
import HorizontalShelf from "../components/horizontal-shelf";
import MangaCard, { MangaItem } from "../components/manga-card";
import { HeroItem } from "../components/hero-card";
import HeroSlider from "@/components/hero-slider";

const hero: HeroItem[] = [
    {
        id: 1,
        title: "Talk To Your Favorite Characters",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        chips: ["∞ Unlimited chats", "🎧 Voice calls", "🛡️ Ad-free forever"],
        watermark: "VORTEX SCANS",
    },
    {
        id: 2,
        title: "Barbarian's Adventure In A Fantasy World",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        badge: "Hot",
        chips: ["Action", "Manhwa"],
        watermark: "VORTEX SCANS",
    },
    {
        id: 3,
        title: "Return Of The Apocalypse-Class Death Knight",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        badge: "Hot",
        chips: ["Action", "Revenge"],
        watermark: "VORTEX SCANS",
    },
    {
        id: 4,
        title: "The Legendary Mechanic",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        chips: ["Sci-fi", "Game"],
        watermark: "VORTEX SCANS",
    },
    {
        id: 5,
        title: "The Strongest Florist",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        chips: ["Romance", "Comedy"],
        watermark: "VORTEX SCANS",
    },
    {
        id: 6,
        title: "The Villainess Reverses The Hourglass",
        cover: "https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp",
        badge: "Hot",
        chips: ["Drama", "Revenge"],
        watermark: "VORTEX SCANS",
    }
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

      <main className="mx-auto px-2">
        {<HeroSlider items={hero} />}
        {/* <HeroRow items={hero} /> */}

        

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
