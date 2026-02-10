import HeroSlider from '@/components/hero-slider';
import HorizontalShelf from '@/components/horizontal-shelf';
import MangaCard from '@/components/manga-card';
import { MangaItem } from '@/types/manga';
import Navbar from '@/components/navbar';
import { User } from '@/types/auth/user';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

interface HomeProps {
    popular: MangaItem[];
    auth: { user: User };
}

const Home: React.FC = () => {
    const props = usePage().props as unknown as HomeProps;
    const { auth } = usePage().props as any;
    const { popular } = props;

    return (
        <div className="min-h-screen bg-[#050607] text-white">
            {/* head title */}
            <title>Vortex Manga</title>
            <Navbar />

            <main className="mx-auto px-2">
                {<HeroSlider />}

                <HorizontalShelf title="Popular">
                    {popular.map((manga) => (
                        <Link
                            key={manga.id}
                            href={route('comics.show', { comic: manga.slug })}
                            className="flex-shrink-0 transition hover:opacity-90"
                        >
                            <MangaCard item={manga} />
                        </Link>
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
