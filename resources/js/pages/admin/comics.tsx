import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

type Comic = {
    id: number;
    title: string;
    author?: string;
    description?: string;
    cover_url?: string;
};

export default function IndexComic() {
    const { comics } = usePage<{ comics: Comic[] }>().props;

    return (
        <AdminLayout>
            <Head title="Manage Comics" />
            <div className="min-h-screen bg-slate-900 p-8 text-white">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manage Comics</h1>
                    <Link
                        href={route('admin.comics.create')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
                    >
                        + Add New Comic
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {comics.map((comic) => (
                        <div
                            key={comic.id}
                            className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5"
                        >
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
                                <h2 className="text-lg leading-tight font-bold">
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
                                    href={route('admin.comics.edit', comic.id)}
                                    className="flex-1 rounded-md bg-white/10 py-2 text-center text-xs hover:bg-white/20"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </AdminLayout>
    );
}
