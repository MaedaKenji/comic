import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function CreateComic() {
    // const { data, setData, post, processing, errors, reset } = useForm<{
    //     title: string;
    //     author: string;
    //     description: string;
    //     cover: File | null;
    //     genre: string;
    //     badge?: string;
    // }>({
    //     title: '',
    //     author: '',
    //     description: '',
    //     badge: '',
    //     cover: null,
    //     genre: '',
    // });

    interface ComicForm {
        title: string;
        author: string;
        description: string;
        cover: File | null;
        genre: string[];
        badge?: string;
    }

    const { data, setData, post, processing, errors, reset } =
        useForm<ComicForm>({
            title: '',
            author: '',
            description: '',
            badge: '',
            cover: null,
            genre: [],
        });

    const GENRE_OPTIONS = [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Romance',
        'Sci-Fi',
    ];

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('admin.comics.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AdminLayout>
            <Head title="Add Comic" />

            <div className="max-w-xl space-y-4 p-6">
                <h1 className="text-2xl font-semibold">Add Comic</h1>

                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    <Input
                        label="Title"
                        required
                        value={data.title}
                        error={errors.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    <Input
                        label="Author"
                        required
                        value={data.author}
                        error={errors.author}
                        onChange={(e) => setData('author', e.target.value)}
                    />

                    <Input label="Genres" required={true} error={errors.genre}>
                        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                            {GENRE_OPTIONS.map((genre) => (
                                <label
                                    key={genre}
                                    className="flex cursor-pointer items-center space-x-2 rounded-lg border border-white/10 p-2 transition hover:bg-white/5"
                                >
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 bg-transparent text-orange-500 focus:ring-orange-500"
                                        value={genre}
                                        checked={data.genre.includes(genre)}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            const selectedGenre =
                                                e.target.value;
                                            const isChecked = e.target.checked;

                                            if (isChecked) {
                                                setData('genre', [
                                                    ...data.genre,
                                                    selectedGenre,
                                                ]);
                                            } else {
                                                setData(
                                                    'genre',
                                                    data.genre.filter(
                                                        (g: string) =>
                                                            g !== selectedGenre,
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{genre}</span>
                                </label>
                            ))}
                        </div>
                    </Input>

                    <Input
                        label="Badge"
                        value={data.badge ?? ''}
                        error={errors.badge}
                        onChange={(e) => setData('badge', e.target.value)}
                    />

                    <div>
                        <label className="mb-1 block text-sm">
                            Description
                            {/* Added red asterisk below */}
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                            required // Also a good idea to add this for browser validation
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm">
                            Cover
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            accept="image/jpg, image/png, image/jpeg, image/webp"
                            onChange={(e) =>
                                setData('cover', e.target.files?.[0] ?? null)
                            }
                            className="block w-full text-sm"
                        />
                        {errors.cover && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.cover}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700 disabled:opacity-60"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

// function Input({
//     label,
//     value,
//     error,
//     onChange,
//     required = false, // Step 3: Add the required prop with a default of false
// }: {
//     label: ReactNode; // Changed to ReactNode for flexibility
//     value: string;
//     error?: string;
//     onChange: React.ChangeEventHandler<HTMLInputElement>;
//     required?: boolean; // Define the prop type
// }) {
//     return (
//         <div>
//             <label className="mb-1 block text-sm">
//                 {label}
//                 {/* Step 3: Automatically add the red asterisk if required is true */}
//                 {required && <span className="ml-1 text-red-500">*</span>}
//             </label>
//             <input
//                 value={value}
//                 onChange={onChange}
//                 // Good practice: pass the required attribute to the input tag too
//                 required={required}
//                 className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
//             />
//             {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
//         </div>
//     );
// }

function Input({
    label,
    value,
    error,
    onChange,
    required = false,
    children, // Tambahkan children
}: {
    label: React.ReactNode;
    value?: string; // Buat opsional karena checkbox tidak pakai value ini
    error?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>; // Buat opsional
    required?: boolean;
    children?: React.ReactNode; // Tambahkan tipe children
}) {
    return (
        <div>
            <label className="mb-1 block text-sm">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {/* Jika ada children (untuk Genre), tampilkan children. 
                Jika tidak, tampilkan input default */}
            {children ? (
                children
            ) : (
                <input
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
            )}

            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}
