import Coba from '@/components/coba';
import HeroSlider from '@/components/hero-slider';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { HeroItem } from '../components/hero-card';
import HorizontalShelf from '../components/horizontal-shelf';
import MangaCard, { MangaItem } from '../components/manga-card';
import Navbar from '../components/navbar';

const hero: HeroItem[] = [
    {
        id: 1,
        title: 'Talk To Your Favorite Characters',
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        chips: ['∞ Unlimited chats', '🎧 Voice calls', '🛡️ Ad-free forever'],
        watermark: 'VORTEX SCANS',
    },
    {
        id: 2,
        title: "Barbarian's Adventure In A Fantasy World",
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        badge: 'Hot',
        chips: ['Action', 'Manhwa'],
        watermark: 'VORTEX SCANS',
    },
    {
        id: 3,
        title: 'Return Of The Apocalypse-Class Death Knight',
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        badge: 'Hot',
        chips: ['Action', 'Revenge'],
        watermark: 'VORTEX SCANS',
    },
    {
        id: 4,
        title: 'The Legendary Mechanic',
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        chips: ['Sci-fi', 'Game'],
        watermark: 'VORTEX SCANS',
    },
    {
        id: 5,
        title: 'The Strongest Florist',
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        chips: ['Romance', 'Comedy'],
        watermark: 'VORTEX SCANS',
    },
    {
        id: 6,
        title: 'The Villainess Reverses The Hourglass',
        cover: 'https://storage.vexmanga.com/public/upload/2025/05/26/369150fe-85b2-45fa-91a7-afb60c12dfd5.webp',
        badge: 'Hot',
        chips: ['Drama', 'Revenge'],
        watermark: 'VORTEX SCANS',
    },
];

const popular: MangaItem[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Popular Title ${i + 1}`,
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
}));

const Home: React.FC = () => {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-[#050607] text-white">
            {/* head title */}
            <title>Vortex Manga</title>
            <Navbar />

            <main className="mx-auto px-2">
                {<HeroSlider items={hero} />}

                <Coba></Coba>


                

                <HorizontalShelf title="Popular Today">
                    {popular.map((m) => (
                        <MangaCard key={m.id} item={m} />
                    ))}
                </HorizontalShelf>

                {/* Admin Floating Add Button */}
                {auth?.user?.role === 'admin' && (
                    <Link
                        href="/admin/comics/create"
                        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:scale-105 hover:bg-red-700"
                        aria-label="Add Comic"
                        title="Add Comic"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Link>
                )}
            </main>
        </div>
    );
};

export default Home;
