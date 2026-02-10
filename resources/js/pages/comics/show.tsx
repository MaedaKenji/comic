import Navbar from '@/components/navbar';
import { Comic } from '@/types/comic';
import { Head, Link as InertiaLink } from '@inertiajs/react';
import {
    Bookmark,
    BookMarked,
    Calendar,
    Flag,
    Pen,
    Star,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

interface Props {
    comic: {
        data: Comic;
    };
}

export default function Show({ comic }: Props) {
    const [activeTab, setActiveTab] = useState<
        'chapters' | 'synopsis' | 'reviews'
    >('chapters');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChapters = (comic.data.chapters || []).filter(
        (chapter) =>
            chapter.number.toString().includes(searchQuery) ||
            chapter.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getTimeAgo = (date: string) => {
        const days = Math.floor(
            (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
        );
        if (days === 0) return 'Today';
        if (days === 1) return '1 day';
        if (days < 30) return `${days} days`;
        if (days < 365)
            return `over ${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
        return `over ${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''}`;
    };

    return (
        <>
            <Head title={comic.data.title} />

            <Navbar></Navbar>

            <div className="min-h-screen bg-black text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                        {/* Left Sidebar */}
                        <div className="space-y-4">
                            {/* Cover Image */}
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={comic.data.cover || ''}
                                    alt={comic.data.title}
                                    className="h-auto w-full object-cover"
                                />
                            </div>

                            {/* Action Buttons */}
                            <button className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                                Read Chapter
                            </button>

                            {/* Bookmarks */}
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                                <Bookmark size={18} />
                                Bookmark
                            </button>

                            {/* Report Issue */}
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 py-3 font-semibold text-white transition hover:bg-gray-700">
                                <Flag size={18} />
                                Report Issue
                            </button>

                            {/* Ratings */}
                            <div className="flex items-center justify-around rounded-lg bg-gray-900 py-4">
                                <div className="text-center">
                                    <div className="flex items-center gap-1 text-xl font-bold text-yellow-400">
                                        <Star size={20} fill="currentColor" />
                                        {comic.data.rating}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {comic.data.total_ratings} ratings
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center gap-1 text-xl font-bold text-blue-400">
                                        <BookMarked size={20} />
                                        {comic.data.total_favorites}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Favorites
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 rounded-lg bg-gray-900 p-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 text-gray-400">📊</div>
                                    <div>
                                        <div className="font-semibold">
                                            Status
                                        </div>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            <span className="text-green-500">
                                                {comic.data.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 text-gray-400">📖</div>
                                    <div>
                                        <div className="font-semibold">
                                            Type
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            {comic.data.type}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Pen
                                        size={18}
                                        className="mt-0.5 text-gray-400"
                                    />
                                    <div>
                                        <div className="font-semibold">
                                            Author
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            {comic.data.author}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User
                                        size={18}
                                        className="mt-0.5 text-gray-400"
                                    />
                                    <div>
                                        <div className="font-semibold">
                                            Artist
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            {comic.data.artist}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <BookMarked
                                        size={18}
                                        className="mt-0.5 text-gray-400"
                                    />
                                    <div>
                                        <div className="font-semibold">
                                            Chapters
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            {comic.data.total_chapters}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar
                                        size={18}
                                        className="mt-0.5 text-gray-400"
                                    />
                                    <div>
                                        <div className="font-semibold">
                                            Last update
                                        </div>
                                        <div className="mt-1 text-gray-300">
                                            {comic.data.last_update}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                {comic.data.alt_title && (
                                    <div className="mb-2 text-sm text-gray-400">
                                        {comic.data.alt_title}
                                    </div>
                                )}
                                <h1 className="text-4xl font-bold">
                                    {comic.data.title}
                                </h1>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-6 border-b border-gray-800">
                                <button
                                    onClick={() => setActiveTab('chapters')}
                                    className={`relative pb-3 font-semibold transition ${
                                        activeTab === 'chapters'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    📚 Chapters ( {comic.data.total_chapters} )
                                    {activeTab === 'chapters' && (
                                        <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('synopsis')}
                                    className={`relative pb-3 font-semibold transition ${
                                        activeTab === 'synopsis'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    📄 Synopsis
                                    {activeTab === 'synopsis' && (
                                        <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`relative pb-3 font-semibold transition ${
                                        activeTab === 'reviews'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    💬 Reviews ( )
                                    {activeTab === 'reviews' && (
                                        <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-red-500"></div>
                                    )}
                                </button>
                            </div>

                            {/* Chapters Tab */}
                            {activeTab === 'chapters' && (
                                <div className="space-y-4">
                                    {/* Search */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search chapters..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="w-full rounded-lg bg-gray-900 px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                                            🔍
                                        </div>
                                    </div>

                                    {/* Chapter List */}
                                    <div className="space-y-2">
                                        {filteredChapters.map((chapter) => (
                                            <InertiaLink
                                                key={chapter.id}
                                                href={route('comics.reader', {
                                                    comic: comic.data.slug,
                                                    chapter: chapter.number,
                                                })}
                                                className="group relative flex w-full items-center gap-4 rounded-lg bg-gray-900 p-4 transition hover:bg-gray-800"
                                            >
                                                <img
                                                    src={comic.data.cover || ''}
                                                    alt={`Chapter ${chapter.number}`}
                                                    className="relative z-10 h-12 w-12 rounded object-cover"
                                                />

                                                <div className="relative z-10 flex-1">
                                                    <div className="font-semibold transition group-hover:text-red-500">
                                                        Chapter {chapter.number}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {getTimeAgo(
                                                            chapter.published_at,
                                                        )}{' '}
                                                        ago
                                                    </div>
                                                </div>

                                                <div className="relative z-10 flex items-center gap-1 text-gray-400">
                                                    <span className="text-red-500">
                                                        ❤
                                                    </span>
                                                    <span>{chapter.likes}</span>
                                                </div>
                                            </InertiaLink>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Synopsis Tab */}
                            {activeTab === 'synopsis' && (
                                <div className="rounded-lg bg-gray-900 p-6">
                                    <p className="leading-relaxed text-gray-300">
                                        {comic.data.description ||
                                            'No synopsis available.'}
                                    </p>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                                <div className="rounded-lg bg-gray-900 p-6 text-center text-gray-400">
                                    <p>
                                        No reviews yet. Be the first to review!
                                    </p>
                                </div>
                            )}

                            {/* Share Section */}
                            <div className="flex gap-4">
                                <div className="flex-1 rounded-lg bg-gray-900 p-6">
                                    <h3 className="mb-2 font-semibold">
                                        Share Vortex Scans
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-400">
                                        to your friends
                                    </p>
                                    <button className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700">
                                        🔗 Share
                                    </button>
                                </div>

                                <div className="flex-1 rounded-lg bg-gray-900 p-6">
                                    <h3 className="mb-2 font-semibold">
                                        Join Our Socials
                                    </h3>
                                    <button className="mt-7 rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700">
                                        💬 Discord
                                    </button>
                                </div>
                            </div>

                            {/* Discussion */}
                            <div className="rounded-lg bg-gray-900 p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <span className="text-red-500">💬</span>
                                    <h3 className="font-semibold">
                                        Discussion
                                    </h3>
                                    <span className="text-sm text-gray-400">
                                        0 comments
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Join the conversation and share your
                                    thoughts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
