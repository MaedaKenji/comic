import React from 'react';
import { Head } from '@inertiajs/react';

export default function Chapter({ comic, chapter, pages }: any) {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <Head title={`${comic.title} - Chapter ${chapter.number}`} />

      <div className="mb-4">
        <h1 className="text-xl font-semibold">{comic.title}</h1>
        <p className="text-sm opacity-70">
          Chapter {chapter.number}: {chapter.title}
        </p>
      </div>

      <div className="space-y-3">
        {pages.map((p: any) => (
          <img
            key={p.page_number}
            src={p.url}
            alt={`Page ${p.page_number}`}
            className="w-full rounded-lg"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
