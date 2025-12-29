import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateComic() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
    });

    return (
        <AdminLayout>
            <Head title="Add Comic" />

            <div className="p-6 max-w-xl space-y-4">
                <h1 className="text-2xl font-semibold">Add Comic</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route('admin.comics.store'));
                    }}
                    className="space-y-4"
                >
                    <Input
                        label="Title"
                        value={data.title}
                        error={errors.title}
                        onChange={(e) =>
                            setData('title', e.target.value)
                        }
                    />

                    <Input
                        label="Author"
                        value={data.author}
                        error={errors.author}
                        onChange={(e) =>
                            setData('author', e.target.value)
                        }
                    />

                    <button
                        disabled={processing}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

function Input({
    label,
    value,
    error,
    onChange,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div>
            <label className="block text-sm mb-1">{label}</label>
            <input
                value={value}
                onChange={onChange}
                className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm"
            />
            {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
}
