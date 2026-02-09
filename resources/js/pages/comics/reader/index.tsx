import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

interface Resource<T> {
    data: T;
}

interface Page {
    id: number;
    page_number: number;
    image: string;
}
interface ReaderChapter {
    id: number;
    number: number;
    title?: string;
    pages: Page[];
}

interface ChapterListItem {
    id: number;
    number: number;
}

interface Comic {
    id: number;
    title: string;
    slug: string;
    cover: string;
}

interface ComicReaderProps {
    comic: Resource<Comic>;
    chapter: ReaderChapter; // ✅ pages
    chapters: ChapterListItem[]; // ✅ list only
    // nextChapter?: ChapterListItem;
    // prevChapter?: ChapterListItem;
}

export default function ComicReader({
    comic,
    chapter,
    chapters,
    // nextChapter,
    // prevChapter,
}: ComicReaderProps) {
    const [showControls, setShowControls] = useState(true);
    const [reactions, setReactions] = useState({
        like: 15,
        love: 37,
        laugh: 5,
        wow: 4,
        sad: 1,
        angry: 0,
    });
    const [userReaction, setUserReaction] = useState<string | null>(null);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    // sort navigation list by chapter number first (IMPORTANT)
    const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
    const currentIndex = sortedChapters.findIndex( // find current chapter by number
        (ch) => ch.number === chapter.number,
    );
    const prevChapter =
        currentIndex > 0 ? sortedChapters[currentIndex - 1].number : undefined;
    const nextChapter =
        currentIndex < sortedChapters.length - 1
            ? sortedChapters[currentIndex + 1].number
            : undefined;

    // Auto-hide controls on scroll
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleScroll = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setShowControls(false), 2000);
        };

        window.addEventListener('scroll', handleScroll);
        timeout = setTimeout(() => setShowControls(false), 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    console.log('Prop All:', {
        comic,
        chapter,
        chapters,
        nextChapter,
        prevChapter,
    });

    const handleReaction = (reaction: string) => {
        if (userReaction === reaction) {
            setUserReaction(null);
            setReactions((prev) => ({
                ...prev,
                [reaction]: prev[reaction as keyof typeof prev] - 1,
            }));
        } else {
            if (userReaction) {
                setReactions((prev) => ({
                    ...prev,
                    [userReaction]: prev[userReaction as keyof typeof prev] - 1,
                }));
            }
            setUserReaction(reaction);
            setReactions((prev) => ({
                ...prev,
                [reaction]: prev[reaction as keyof typeof prev] + 1,
            }));
        }
    };

    const handleChapterChange = (chapterNumnber: number) => {
        router.visit(
            route('comics.reader', {
                comic: comic.data.slug,
                chapter: chapterNumnber,
            }),
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${comic.data.title} - Chapter ${chapter.number}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <Head title={`${comic.data.title} - Chapter ${chapter.number}`} />

            <div className="min-h-screen bg-[#0a0a0a] text-white">
                {/* Header - Fixed with fade */}
                <header
                    // className={`fixed top-0 right-0 left-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm transition-all duration-300 ${
                    //     showControls
                    //         ? 'translate-y-0 opacity-100'
                    //         : '-translate-y-full opacity-0'
                    // }`}
                    className={`top-0 right-0 left-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm transition-all duration-300`}
                >
                    <div className="mx-auto max-w-4xl px-4 py-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={comic.data.cover}
                                alt={comic.data.title}
                                className="h-16 w-12 rounded-md object-cover ring-2 ring-white/10"
                            />
                            <div className="min-w-0 flex-1">
                                <h1 className="truncate text-lg font-bold tracking-tight">
                                    {comic.data.title}
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Chapter {chapter.number}
                                    {chapter.title && ` - ${chapter.title}`}
                                </p>
                            </div>
                            <Link
                                href={route('comics.show', {
                                    comic: comic.data.slug,
                                })}
                                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                            >
                                ← Back
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Navigation Bar */}
                <div
                    className={`top-20 right-0 left-0 z-40 transition-all duration-300`}
                >
                    <div className="mx-auto max-w-4xl px-4 py-3">
                        <div className="flex items-center gap-2 rounded-xl bg-black/80 px-4 py-3 ring-1 ring-white/10 backdrop-blur-md">
                            <button
                                onClick={
                                    () =>
                                        prevChapter &&
                                        handleChapterChange(prevChapter) // TODO: change to chapter.number if needed
                                }
                                disabled={!prevChapter}
                                className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                ← Prev
                            </button>

                            <Link
                                href={route('comics.show', {
                                    comic: comic.data.slug,
                                })}
                                className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                            >
                                Home
                            </Link>

                            <select
                                value={chapter.id}
                                onChange={(e) => {
                                    const selectedId = Number(e.target.value);
                                    const selected = chapters.find(
                                        (ch) => ch.id === selectedId,
                                    );

                                    // Only trigger if a match is found to avoid potential runtime crashes
                                    if (selected) {
                                        handleChapterChange(selected.number);
                                    }
                                }}
                                className="flex-1 appearance-none rounded-lg bg-white/5 px-4 py-2 text-sm font-medium ring-1 ring-white/10 transition-all outline-none hover:bg-white/10 focus:ring-2 focus:ring-white/20"
                            >
                                {chapters.map((ch) => (
                                    <option
                                        key={ch.id}
                                        value={ch.id}
                                        className="bg-[#1a1a1a] text-white"
                                    >
                                        Chapter {ch.number}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={
                                    () =>
                                        nextChapter &&
                                        handleChapterChange(nextChapter) // TODO: change to chapter.number if needed
                                }
                                disabled={!nextChapter}
                                className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content - Comic Images */}
                <main className="mx-auto max-w-4xl px-4 pt-8 pb-8">
                    <div className="space-y-0">
                        {chapter.pages.map((image, index) => (
                            <div key={image.id} className="relative">
                                <img
                                    src={image.image}
                                    alt={`Page ${index + 1}`}
                                    className="h-auto w-full"
                                    loading={index < 3 ? 'eager' : 'lazy'}
                                />
                            </div>
                        ))}
                    </div>

                    {/* End of Chapter Message */}
                    <div className="mt-8 rounded-2xl bg-gradient-to-br from-red-950/30 to-purple-950/30 p-8 text-center ring-1 ring-white/10">
                        <h3 className="mb-2 text-2xl font-bold">
                            End of Chapter {chapter.number}
                        </h3>
                        <p className="mb-6 text-gray-400">
                            Thank you for reading! Stay tuned for the next
                            chapter.
                        </p>

                        {nextChapter && (
                            <button
                                onClick={
                                    () => handleChapterChange(nextChapter) // TODO: change to chapter.number if needed
                                }
                                className="rounded-lg bg-red-600 px-6 py-3 font-semibold transition-colors hover:bg-red-700"
                            >
                                Continue to Chapter {nextChapter} →
                            </button>
                        )}
                    </div>

                    {/* Report Issue Button */}
                    <div className="mt-6">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10">
                            🚩 Report Issue
                        </button>
                    </div>

                    {/* Reactions Section */}
                    <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                        <h3 className="mb-4 text-lg font-semibold">
                            How did you like this chapter?
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {Object.entries(reactions).map(([key, count]) => {
                                const emojis: Record<string, string> = {
                                    like: '👍',
                                    love: '❤️',
                                    laugh: '😂',
                                    wow: '😮',
                                    sad: '😢',
                                    angry: '😠',
                                };

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleReaction(key)}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                            userReaction === key
                                                ? 'bg-red-600 ring-2 ring-red-400'
                                                : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="text-lg">
                                            {emojis[key]}
                                        </span>
                                        <span>{count}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleShare}
                            className="mt-4 w-full rounded-lg bg-gradient-to-r from-red-600 to-purple-600 px-6 py-3 font-semibold transition-all hover:from-red-700 hover:to-purple-700"
                        >
                            Share Vortex Scans to your friends
                        </button>
                    </div>

                    {/* Join Socials */}
                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/30 p-6 ring-1 ring-white/10">
                        <h3 className="mb-3 text-lg font-semibold">
                            Join Our Socials
                        </h3>
                        <div className="flex gap-3">
                            <a
                                href="https://discord.gg/example"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 rounded-lg bg-[#5865F2] px-4 py-3 text-center font-medium transition-colors hover:bg-[#4752C4]"
                            >
                                Discord
                            </a>
                            <button className="flex-1 rounded-lg bg-white/5 px-4 py-3 text-center font-medium transition-colors hover:bg-white/10">
                                Discussion
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">1 comment</h3>
                            <button
                                onClick={() => setShowComments(!showComments)}
                                className="text-sm text-gray-400 transition-colors hover:text-white"
                            >
                                {showComments ? 'Hide' : 'Show'} discussion
                            </button>
                        </div>

                        {showComments && (
                            <div className="space-y-4">
                                <div className="py-4 text-center text-sm text-gray-400">
                                    Sign in to share your thoughts and react to
                                    comments
                                </div>

                                <div className="rounded-lg bg-white/5 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-500 text-sm font-bold">
                                            S
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Subwaysurf1
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    about 2 hours ago
                                                </span>
                                            </div>
                                            <p className="text-sm">Lol</p>
                                            <div className="mt-2 flex items-center gap-3">
                                                <button className="flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-white">
                                                    👍 Like
                                                </button>
                                                <button className="text-xs text-gray-400 transition-colors hover:text-white">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-white/5 p-4">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) =>
                                            setCommentText(e.target.value)
                                        }
                                        placeholder="Join the discussion..."
                                        className="w-full resize-none bg-transparent text-sm outline-none"
                                        rows={3}
                                    />
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            disabled={!commentText.trim()}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
                    <div className="mx-auto max-w-6xl px-4 py-12">
                        <div className="mb-8">
                            <h3 className="mb-2 text-xl font-bold">
                                Vortex Scans
                            </h3>
                            <p className="max-w-md text-sm text-gray-400">
                                Read Comics, manga, manhua, manhwa, translated
                                swiftly: Vortex, your ultimate library.
                            </p>
                        </div>

                        <div className="mb-8 flex flex-wrap gap-6 text-sm text-gray-400">
                            <a
                                href="#"
                                className="transition-colors hover:text-white"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-white"
                            >
                                DMCA
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-white"
                            >
                                Discord
                            </a>
                        </div>

                        <div className="text-xs text-gray-500">
                            <p className="mb-1">Made by V DEV</p>
                            <p>© 2026 All Rights Reserved v2.0.0</p>
                        </div>
                    </div>
                </footer>

                {/* Mobile Bottom Navigation */}
                <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-sm md:hidden">
                    <div className="flex items-center justify-around px-4 py-3">
                        <button
                            onClick={
                                () =>
                                    prevChapter &&
                                    handleChapterChange(prevChapter) // TODO: change to chapter.number if needed
                            }
                            disabled={!prevChapter}
                            className="flex flex-col items-center gap-1 text-xs disabled:opacity-30"
                        >
                            <span className="text-lg">← asdasdasdasd</span>
                            <span>Prev</span>
                        </button>

                        <Link
                            href={route('comics.show', {
                                comic: comic.data.slug,
                            })}
                            className="flex flex-col items-center gap-1 text-xs"
                        >
                            <span className="text-lg">🏠</span>
                            <span>Home</span>
                        </Link>

                        <button
                            onClick={() => setShowControls(!showControls)}
                            className="flex flex-col items-center gap-1 text-xs"
                        >
                            <span className="text-lg">☰</span>
                            <span>Menu</span>
                        </button>

                        <button
                            onClick={
                                () =>
                                    nextChapter &&
                                    handleChapterChange(nextChapter) // TODO: change to chapter.number if needed
                            }
                            disabled={!nextChapter}
                            className="flex flex-col items-center gap-1 text-xs disabled:opacity-30"
                        >
                            <span className="text-lg">→</span>
                            <span>Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
