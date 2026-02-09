import { Head } from '@inertiajs/react';
import { Bookmark, Flag, Star, BookMarked, Pen, User, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Comic } from '@/types/comic';

// type Props = {
//     comic: Comic;
// };

interface Props {
    comic : {
        data : Comic;
    };
}


export default function Show({ comic }: Props) {
    const [activeTab, setActiveTab] = useState<'chapters' | 'synopsis' | 'reviews'>('chapters');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChapters = (comic.data.chapters || []).filter(chapter =>
        chapter.number.toString().includes(searchQuery) ||
        chapter.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTimeAgo = (date: string) => {
        const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
        if (days === 0) return 'Today';
        if (days === 1) return '1 day';
        if (days < 30) return `${days} days`;
        if (days < 365) return `over ${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
        return `over ${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''}`;
    };
    console.log("From pages/comics/show.tsx - comic:", comic);
    

    return (
        <>
            <Head title={comic.data.title} />
            
            <div className="min-h-screen bg-black text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                        {/* Left Sidebar */}
                        <div className="space-y-4">
                            {/* Cover Image */}
                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src={comic.data.cover || ''}
                                    alt={comic.data.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Action Buttons */}
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
                                Read Chapter 
                            </button>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
                                <Bookmark size={18} />
                                Bookmark
                            </button>

                            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
                                <Flag size={18} />
                                Report Issue
                            </button>

                            {/* Ratings */}
                            <div className="flex items-center justify-around py-4 bg-gray-900 rounded-lg">
                                <div className="text-center">
                                    <div className="flex items-center gap-1 text-yellow-400 text-xl font-bold">
                                        <Star size={20} fill="currentColor" />
                                        {comic.data.rating}
                                    </div>
                                    <div className="text-xs text-gray-400">{comic.data.total_ratings} ratings</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center gap-1 text-blue-400 text-xl font-bold">
                                        <BookMarked size={20} />
                                        {comic.data.total_favorites}
                                    </div>
                                    <div className="text-xs text-gray-400">Favorites</div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 text-sm bg-gray-900 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-gray-400 w-6">📊</div>
                                    <div>
                                        <div className="font-semibold">Status</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            <span className="text-green-500">{comic.data.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-gray-400 w-6">📖</div>
                                    <div>
                                        <div className="font-semibold">Type</div>
                                        <div className="text-gray-300 mt-1">{comic.data.type}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Pen size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Author</div>
                                        <div className="text-gray-300 mt-1">{comic.data.author}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Artist</div>
                                        <div className="text-gray-300 mt-1">{comic.data.artist}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <BookMarked size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Chapters</div>
                                        <div className="text-gray-300 mt-1">{comic.data.total_chapters}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Last update</div>
                                        <div className="text-gray-300 mt-1">{comic.data.last_update}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                {comic.data.alt_title && (
                                    <div className="text-gray-400 text-sm mb-2">{comic.data.alt_title}
                                    </div>
                                    
                                )}
                                <h1 className="text-4xl font-bold">{comic.data.title}</h1>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-6 border-b border-gray-800">
                                <button
                                    onClick={() => setActiveTab('chapters')}
                                    className={`pb-3 font-semibold transition relative ${
                                        activeTab === 'chapters'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    📚 Chapters ( {comic.data.total_chapters} )
                                    {activeTab === 'chapters' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('synopsis')}
                                    className={`pb-3 font-semibold transition relative ${
                                        activeTab === 'synopsis'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    📄 Synopsis
                                    {activeTab === 'synopsis' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`pb-3 font-semibold transition relative ${
                                        activeTab === 'reviews'
                                            ? 'text-red-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    💬 Reviews (  )
                                    {activeTab === 'reviews' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
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
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            🔍
                                        </div>
                                    </div>

                                    {/* Chapter List */}
                                    <div className="space-y-2">
                                        {filteredChapters.map((chapter) => (
                                            <div
                                                key={chapter.id}
                                                className="flex items-center gap-4 bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition group"
                                            >
                                                <img
                                                    src={comic.data.cover || ''}
                                                    alt={`Chapter ${chapter.number}`}
                                                    className="w-12 h-12 rounded object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold group-hover:text-red-500 transition">
                                                        Chapter {chapter.number}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {getTimeAgo(chapter.published_at)} ago
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <span className="text-red-500">❤</span>
                                                    <span>{chapter.likes}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Synopsis Tab */}
                            {activeTab === 'synopsis' && (
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <p className="text-gray-300 leading-relaxed">
                                        {comic.data.description || 'No synopsis available.'}
                                    </p>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                                <div className="bg-gray-900 rounded-lg p-6 text-center text-gray-400">
                                    <p>No reviews yet. Be the first to review!</p>
                                </div>
                            )}

                            {/* Share Section */}
                            <div className="flex gap-4">
                                <div className="flex-1 bg-gray-900 rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">Share Vortex Scans</h3>
                                    <p className="text-sm text-gray-400 mb-4">to your friends</p>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">
                                        🔗 Share
                                    </button>
                                </div>

                                <div className="flex-1 bg-gray-900 rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">Join Our Socials</h3>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition mt-7">
                                        💬 Discord
                                    </button>
                                </div>
                            </div>

                            {/* Discussion */}
                            <div className="bg-gray-900 rounded-lg p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-red-500">💬</span>
                                    <h3 className="font-semibold">Discussion</h3>
                                    <span className="text-sm text-gray-400">0 comments</span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Join the conversation and share your thoughts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Example usage with sample data
// Show.defaultProps = {
//     comic: {
//         id: 1,
//         title: 'Hardcore Leveling Warrior: Earth Game',
//         subtitle: '열렙전사 3부',
//         cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop',
//         description: 'The legendary Hardcore Leveling Warrior returns in an epic new adventure...',
//         status: 'Ongoing',
//         type: 'Manhwa',
//         author: 'Kim sehoon (김세훈)',
//         artist: 'Kim sehoon (김세훈)',
//         total_chapters: 123,
//         rating: 4.28,
//         total_ratings: 1234,
//         total_favorites: 591,
//         last_update: '4 days ago',
//         chapters: [
//             { id: 121, number: 121, title: 'Chapter 121', published_at: '2026-01-22', likes: 12 },
//             { id: 21, number: 21, title: 'Chapter 21', published_at: '2025-01-26', likes: 51 },
//         ]
//     }
// }