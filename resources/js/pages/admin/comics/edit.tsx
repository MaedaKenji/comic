import AdminLayout from '@/layouts/admin-layout';
import { Comic } from '@/types/comic';
import { Head, router, useForm, usePage } from '@inertiajs/react';
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

  const { data, setData, put, processing, errors, setError, clearErrors } = form;

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

  console.log('Data:', data);

  return (
    <AdminLayout>
      <Head title="Edit Comic" />

      <div className="max-w-xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Edit Comic</h1>
        </div>

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
            onChange={(e) => setData('alt_title', e.target.value)}
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
        className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
