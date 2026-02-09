<?php
// app/Http/Controllers/ComicController.php
// Used for displaying comics to users not admin management
namespace App\Http\Controllers;

use App\Models\Comic;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\ComicResource;

class ComicController extends Controller
{
    public function index()
    {
        return Inertia::render('comics/index', [
            'comics' => Comic::latest()->get(),
        ]);
    }

    public function show(Comic $comic)
    {
        // return Inertia::render('comics/show', [
        //     'comic' => $comic,
        // ]);
        // Eager load relationships so they are available in the Resource
        $comic->load('chapters');

        return Inertia::render('comics/show', [
            // Wrap the model in the Resource
            'comic' => new ComicResource($comic),
        ]);
    }

    public function showChapter(Comic $comic, $chapterNumber)
    {
        $chapter = $comic->chapters()
            ->where('number', $chapterNumber)
            ->with([
                'pages' => function ($q) {
                    $q->orderBy('page_number');
                }
            ])
            ->firstOrFail();

        // Previous & Next chapter (for navigation)
        $prevChapter = $comic->chapters()
            ->where('number', '<', $chapterNumber)
            ->orderBy('number', 'desc')
            ->first();

        $nextChapter = $comic->chapters()
            ->where('number', '>', $chapterNumber)
            ->orderBy('number', 'asc')
            ->first();

        return Inertia::render('comics/chapter', [
            'comic' => new ComicResource($comic),
            'chapter' => [
                'id' => $chapter->id,
                'number' => $chapter->number,
                'title' => $chapter->title,
                'pages' => $chapter->pages->map(fn($page) => [
                    'id' => $page->id,
                    'page_number' => $page->page_number,
                    'image' => asset('storage/' . $page->image_path),
                ]),
            ],
            'navigation' => [
                'prev' => $prevChapter?->number,
                'next' => $nextChapter?->number,
            ],
        ]);
    }
    public function reader(Comic $comic, $chapterNumber)
    {
        $chapter = $comic->chapters()
            ->where('number', $chapterNumber)
            ->with(['pages' => fn($q) => $q->orderBy('page_number')])
            ->firstOrFail();

        return Inertia::render('comics/reader/index', [
            'comic' => new ComicResource($comic),
            'chapter' => [
                'id' => $chapter->id,
                'number' => $chapter->number,
                'title' => $chapter->title,
                'pages' => $chapter->pages->map(fn($page) => [
                    'id' => $page->id,
                    'page_number' => $page->page_number,
                    'image' => asset('storage/' . $page->image_path),
                ]),
            ],
            'chapters' => $comic->chapters()
                ->orderBy('number')
                ->get(['id', 'number']),
        ]);

    }

}
