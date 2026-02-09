<?php

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
}
