<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ComicResource;
use App\Http\Requests\UpdateComicRequest;
use Illuminate\Support\Facades\DB;

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

    public function uploadChapterImages(Request $request, Comic $comic)
    {
        // 1. Validate - Note: 'number' matches your Model fillable
        $request->validate([
            'chapter_number' => ['required', 'numeric'],
            'images' => ['required', 'array'],
            'images.*.file' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'images.*.order' => ['required', 'integer'],
        ]);

        return DB::transaction(function () use ($request, $comic) {
            // 2. Create the Chapter
            $chapter = $comic->chapters()->create([
                'number' => $request->chapter_number,
                'title' => $request->title ?? "Chapter " . $request->chapter_number,
            ]);

            // 3. Process and Save Pages
            foreach ($request->file('images') as $index => $imageItem) {
                $file = $imageItem['file'];

                // Generate a clean path: comics/1/chapters/10/page_1.webp
                $path = $file->store("comics/{$comic->id}/chapters/{$chapter->id}", 'public');

                // 4. Create ChapterPage entry
                $chapter->pages()->create([
                    'page_number' => $request->input("images.$index.order"),
                    'image_path' => $path,
                    // Optional: You can get width/height if you want to be fancy
                    // 'width'    => getimagesize($file)[0],
                    // 'height'   => getimagesize($file)[1],
                ]);
            }

            return redirect()->back()->with('success', 'Chapter uploaded successfully!');
        });
    }
}
