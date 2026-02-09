import AdminLayout from '@/layouts/admin-layout';
import { Comic } from '@/types/comic';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { z } from 'zod';

const comicSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    alt_title: z.string().optional(),
    author: z.string().min(1, 'Author is required'),
    artist: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
});

type ComicFormData = z.infer<typeof comicSchema>;

interface ChapterImage {
    file: File;
    preview: string;
    order: number;
}

export default function EditComic() {
    const { comic } = usePage<{ comic: Comic }>().props;

    const form = useForm<ComicFormData>({
        title: comic.title ?? '',
        alt_title: comic.alt_title ?? '',
        author: comic.author ?? '',
        artist: comic.artist ?? '',
        status: comic.status ?? '',
        type: comic.type ?? '',
    });

    const { data, setData, put, processing, errors, setError, clearErrors } =
        form;

    // Chapter image upload state
    const [chapterNumber, setChapterNumber] = useState<string>('');
    const [chapterImages, setChapterImages] = useState<ChapterImage[]>([]);

    function validate(): boolean {
        clearErrors();

        const parsed = comicSchema.safeParse(data);
        if (parsed.success) return true;

        // Map Zod issues to Inertia form errors
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path.join('.') || 'form';
            // keep first error per field
            if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setError(fieldErrors);
        return false;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        put(route('admin.comics.update', comic.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                alert('Comic updated successfully.');
            },
            onError: (errs) => {
                console.error(errs);
                alert('Update failed.');
            },
        });
    }

    function onDelete() {
        const ok = confirm('Are you sure you want to delete this comic?');
        if (!ok) return;

        router.delete(route('admin.comics.destroy', { comic: comic.id }), {
            onSuccess: () => router.visit(route('admin.comics.index')),
            onError: (errs) => {
                console.error(errs);
                alert('Delete failed.');
            },
        });
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;

        const validFiles = Array.from(files).filter((file) => {
            const isValid =
                file.type === 'image/webp' ||
                file.type === 'image/jpeg' ||
                file.type === 'image/png';
            if (!isValid) {
                alert(
                    `${file.name} is not a valid image format. Please use WEBP, JPEG, or PNG.`,
                );
            }
            return isValid;
        });

        const newImages: ChapterImage[] = validFiles.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            order: chapterImages.length + index + 1,
        }));

        setChapterImages((prev) => [...prev, ...newImages]);
    }

    function removeImage(index: number) {
        setChapterImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            // Reorder remaining images
            return updated.map((img, i) => ({ ...img, order: i + 1 }));
        });
    }

    function moveImage(index: number, direction: 'up' | 'down') {
        setChapterImages((prev) => {
            const newImages = [...prev];
            const newIndex = direction === 'up' ? index - 1 : index + 1;

            if (newIndex < 0 || newIndex >= newImages.length) return prev;

            [newImages[index], newImages[newIndex]] = [
                newImages[newIndex],
                newImages[index],
            ];

            // Update order numbers
            return newImages.map((img, i) => ({ ...img, order: i + 1 }));
        });
    }

    function uploadChapterImages() {
        if (!chapterNumber) {
            alert('Please enter a chapter number.');
            return;
        }

        if (chapterImages.length === 0) {
            alert('Please select at least one image.');
            return;
        }

        const formData = new FormData();
        formData.append('chapter_number', chapterNumber);

        chapterImages.forEach((img, index) => {
            formData.append(`images[${index}][file]`, img.file);
            formData.append(`images[${index}][order]`, img.order.toString());
        });

        const url = route('admin.comics.chapters.store', { comic: comic.slug });
        console.log('Post URL:', url);
        router.post(
            route('admin.comics.chapters.store', { comic: comic.slug }),
            formData,
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    alert('Chapter images uploaded successfully.');
                    setChapterNumber('');
                    setChapterImages([]);
                },
                onError: (errs) => {
                    console.error(errs);
                    alert('Upload failed.');
                },
            },
        );
    }

    return (
        <AdminLayout>
            <Head title="Edit Comic" />

            <div className="max-w-4xl space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Comic</h1>
                </div>

                {/* Comic Details Form */}
                <div className="space-y-6 rounded-lg bg-white/5 p-6">
                    <h2 className="text-xl font-semibold">Comic Details</h2>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <Input
                            label="Title"
                            name="title"
                            value={data.title}
                            error={errors.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="off"
                        />

                        <Input
                            label="Alternative Title"
                            name="alt_title"
                            value={data.alt_title ?? ''}
                            error={errors.alt_title}
                            onChange={(e) =>
                                setData('alt_title', e.target.value)
                            }
                            autoComplete="off"
                        />

                        <Input
                            label="Author"
                            name="author"
                            value={data.author}
                            error={errors.author}
                            onChange={(e) => setData('author', e.target.value)}
                            autoComplete="off"
                        />

                        <Input
                            label="Artist"
                            name="artist"
                            value={data.artist ?? ''}
                            error={errors.artist}
                            onChange={(e) => setData('artist', e.target.value)}
                            autoComplete="off"
                        />

                        <Input
                            label="Status (e.g., Ongoing, Completed)"
                            name="status"
                            value={data.status ?? ''}
                            error={errors.status}
                            onChange={(e) => setData('status', e.target.value)}
                            autoComplete="off"
                        />

                        <Input
                            label="Type (e.g., Manhwa, Manga, Manhua)"
                            name="type"
                            value={data.type ?? ''}
                            error={errors.type}
                            onChange={(e) => setData('type', e.target.value)}
                            autoComplete="off"
                        />

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700 disabled:opacity-60"
                            >
                                {processing ? 'Updating…' : 'Update'}
                            </button>

                            <button
                                type="button"
                                onClick={onDelete}
                                disabled={processing}
                                className="rounded-lg bg-gray-800 px-4 py-2 text-sm hover:bg-gray-900 disabled:opacity-60"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>

                {/* Chapter Images Upload Section */}
                <div className="space-y-6 rounded-lg bg-white/5 p-6">
                    <h2 className="text-xl font-semibold">
                        Upload Chapter Images
                    </h2>

                    <div className="space-y-4">
                        <Input
                            label="Chapter Number"
                            name="chapter_number"
                            type="number"
                            value={chapterNumber}
                            onChange={(e) => setChapterNumber(e.target.value)}
                            autoComplete="off"
                        />

                        <div className="space-y-2">
                            <label className="block text-sm">
                                Select Images (WEBP, JPEG, PNG)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/webp,image/jpeg,image/png"
                                onChange={handleImageUpload}
                                className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 outline-none file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-4 file:py-1 file:text-sm file:text-white hover:file:bg-red-700"
                            />
                            <p className="text-xs text-gray-400">
                                You can select multiple images. They will be
                                ordered automatically, but you can reorder them
                                below.
                            </p>
                        </div>

                        {/* Image Preview Grid */}
                        {chapterImages.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium">
                                    Selected Images ({chapterImages.length})
                                </h3>
                                <div className="grid gap-3">
                                    {chapterImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 rounded-lg bg-white/5 p-3"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={img.preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-20 w-20 rounded object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {img.file.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Order: {img.order} •{' '}
                                                    {(
                                                        img.file.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{' '}
                                                    MB
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        moveImage(index, 'up')
                                                    }
                                                    disabled={index === 0}
                                                    className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-30"
                                                    title="Move up"
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        moveImage(index, 'down')
                                                    }
                                                    disabled={
                                                        index ===
                                                        chapterImages.length - 1
                                                    }
                                                    className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-30"
                                                    title="Move down"
                                                >
                                                    ↓
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="rounded bg-red-600/20 px-2 py-1 text-xs text-red-400 hover:bg-red-600/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={uploadChapterImages}
                            disabled={
                                !chapterNumber || chapterImages.length === 0
                            }
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700 disabled:opacity-60"
                        >
                            Upload Chapter Images
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function Input({
    label,
    name,
    value,
    error,
    onChange,
    type = 'text',
    autoComplete,
}: {
    label: string;
    name: string;
    value: string;
    error?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
}) {
    return (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-white/20"
            />

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
