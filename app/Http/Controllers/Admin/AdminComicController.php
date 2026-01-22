<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminComicController extends Controller
{
    public function index()
    {
        return inertia('admin/comics', [
            'comics' => Comic::latest()->get()->map(function ($comic) {
                return [
                    'id' => $comic->id,
                    'title' => $comic->title,
                    'author' => $comic->author,
                    'description' => $comic->description,
                    'cover_url' => $comic->cover_path
                        ? asset('storage/' . $comic->cover_path)
                        : null,
                ];
            }),
        ]);
    }
    public function create()
    {
        return Inertia::render('admin/comics/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'cover' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:4096'],
            'badge' => ['nullable', 'string', 'max:255'],
            'genre' => ['required', 'array'],
            'genre.*' => ['string'],
        ]);

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $request->file('cover')->store('covers', 'public');
        }

        // Explicitly remove the 'cover' object before creating
        unset($data['cover']);

        Comic::create($data);

        return redirect()->route('admin.comics.index');
    }

    public function edit(Comic $comic)
    {
        return Inertia::render('admin/comics/edit', [
            'comic' => $comic,
        ]);
    }

    public function update(Request $request, Comic $comic)
    {
        if ($request->hasFile('cover')) {
            if ($comic->cover_path)
                Storage::disk('public')->delete($comic->cover_path);
            $data['cover_path'] = $request->file('cover')->store('covers', 'public');
        }
        $comic->update($data);
    }

    public function destroy(Comic $comic)
    {
        $comic->delete();

        return back()->with('success', 'Comic deleted');
    }
}
