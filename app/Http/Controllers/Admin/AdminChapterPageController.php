<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chapter;
use App\Models\ChapterPage;
use Illuminate\Support\Facades\DB;

class AdminChapterPageController extends Controller
{
    public function store(Request $request, Chapter $chapter)
    {
        $validated = $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'max:8192'], // 8MB each
        ]);

        DB::transaction(function () use ($chapter, $validated) {
            // start after existing last page
            $start = (int) $chapter->pages()->max('page_number');
            $pageNumber = $start + 1;

            foreach ($validated['images'] as $file) {
                $path = $file->store("comics/{$chapter->comic_id}/chapters/{$chapter->id}", 'public');

                ChapterPage::create([
                    'chapter_id' => $chapter->id,
                    'page_number' => $pageNumber++,
                    'image_path' => $path,
                ]);
            }
        });

        return back()->with('success', 'Pages uploaded.');
    }
}
