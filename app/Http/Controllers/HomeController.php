<?php
namespace App\Http\Controllers;

use App\Models\Comic;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Fetch Hero Content (Latest 5)
        $hero = Comic::latest()
            ->take(5)
            ->get()
            ->map(fn ($comic) => $this->transformComic($comic));

        // 2. Fetch Popular Content (Most Bookmarked or Highest Rated)
        $popular = Comic::withCount('bookmarks') // Assumes you have a bookmarks relationship
            ->orderBy('bookmarks_count', 'desc')
            ->take(10)
            ->get()
            ->map(fn ($comic) => $this->transformComic($comic));

        return Inertia::render('home', [
            'hero' => $hero,
            'popular' => $popular,
        ]);
    }

    /**
     * Helper to keep the data structure consistent across sections
     */
    private function transformComic($comic)
    {
        return [
            'id'          => $comic->id,
            'title'       => $comic->title,
            'author'      => $comic->author,
            'description' => $comic->description,
            'cover'       => $comic->cover_path ? asset('storage/' . $comic->cover_path) : null,
            'badge'       => $comic->badge,
            'genre'       => $comic->genre,
            'slug'        => $comic->slug,
        ];
    }
}