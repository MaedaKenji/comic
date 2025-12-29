import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';


type Comic = {
    id: number;
    title: string;
    author?: string;
};

export default function ComicsIndex() {
    const { comics } = usePage<{ comics: Comic[] }>().props;
    const { delete: destroy } = useForm({});


    return (
        <AdminLayout>
            <Head title="Manage Comics" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Comics</h1>

                    <Link
                        href={route('admin.comics.create')}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                    >
                        + Add Comic
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                        <thead className="bg-white/5 text-white/60">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Author</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comics.map((comic) => (
                                <tr
                                    key={comic.id}
                                    className="border-t border-white/10"
                                >
                                    <td className="px-4 py-3">
                                        {comic.title}
                                    </td>
                                    <td className="px-4 py-3">
                                        {comic.author ?? '-'}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Link
                                            href={route(
                                                'admin.comics.edit',
                                                comic.id
                                            )}
                                            className="text-blue-400 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                confirm('Delete this comic?') &&
                                                destroy(
                                                    route(
                                                        'admin.comics.destroy',
                                                        comic.id
                                                    )
                                                )
                                            }
                                            className="text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
