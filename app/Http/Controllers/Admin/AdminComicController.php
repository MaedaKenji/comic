<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminComicController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/comics/index', [
            'comics' => Comic::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/comics/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
        ]);

        Comic::create($data);

        return redirect()
            ->route('admin.comics.index')
            ->with('success', 'Comic created');
    }

    public function edit(Comic $comic)
    {
        return Inertia::render('admin/comics/edit', [
            'comic' => $comic,
        ]);
    }

    public function update(Request $request, Comic $comic)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
        ]);

        $comic->update($data);

        return redirect()
            ->route('admin.comics.index')
            ->with('success', 'Comic updated');
    }

    public function destroy(Comic $comic)
    {
        $comic->delete();

        return back()->with('success', 'Comic deleted');
    }
}
