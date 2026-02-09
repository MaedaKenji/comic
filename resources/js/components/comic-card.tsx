import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {Comic } from '@/types/comic';




type ComicCardProps = {
    comic: Comic;
};

export default function ComicCard({ comic }: ComicCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {/* Cover Image */}
            <div className="aspect-[3/4] w-full bg-slate-800">
                {comic.cover_url ? (
                    <img
                        src={comic.cover_url}
                        alt={comic.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                        No Cover
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow p-4">
                <h2 className="text-lg font-bold leading-tight">
                    {comic.title}
                </h2>
                <p className="mb-2 text-sm text-gray-400">
                    {comic.author || 'Unknown Author'}
                </p>
                <p className="line-clamp-3 text-xs text-gray-500">
                    {comic.description}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 p-4 pt-0">
                <Link
                    href={route('admin.comics.edit', comic.slug)}
                    className="flex-1 rounded-md bg-white/10 py-2 text-center text-xs hover:bg-white/20"
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
