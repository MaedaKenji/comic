<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comic;
use App\Models\Chapter;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChapterController extends Controller
{

    public function show(Comic $comic, Chapter $chapter)
    {
        abort_unless($chapter->comic_id === $comic->id, 404);

        $pages = $chapter->pages()->get()->map(fn($p) => [
            'page_number' => $p->page_number,
            'url' => Storage::url($p->image_path),
        ]);

        return Inertia::render('Reader/Chapter', [
            'comic' => $comic,
            'chapter' => $chapter,
            'pages' => $pages,
        ]);
    }
}
