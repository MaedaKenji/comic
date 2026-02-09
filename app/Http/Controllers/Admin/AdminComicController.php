<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ComicResource;
use App\Http\Requests\UpdateComicRequest;

class AdminComicController extends Controller
{
    public function index()
    {
        return inertia('admin/comics', [
            'comics' => ComicResource::collection(Comic::latest()->get()),
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

    public function update(UpdateComicRequest $request, Comic $comic)
    {
        $data = $request->validated();

        // Handle cover upload
        if ($request->hasFile('cover')) {
            // delete old
            if ($comic->cover_path) {
                Storage::disk('public')->delete($comic->cover_path);
            }

            // store new
            $data['cover_path'] = $request->file('cover')->store('covers', 'public');
        }

        // Don't accidentally try to store the file object into DB
        unset($data['cover']);

        $comic->update($data);

        return redirect()
            ->route('admin.comics.edit', $comic)
            ->with('success', 'Comic updated successfully.');
    }
    public function destroy(Comic $comic)
    {
        if ($comic->cover_path) {
            Storage::disk('public')->delete($comic->cover_path);
        }
        $comic->delete();

        return redirect()->route('admin.comics.index');
    }

    public function show(Comic $comic)
    {
        return Inertia::render('admin/comics/show', [
            'comic' => $comic,
        ]);
    }
}
