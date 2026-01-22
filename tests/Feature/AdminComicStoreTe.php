<?php

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Admin\AdminComicController;
use App\Models\Comic;

it('stores comic without cover', function () {
    $data = [
        'title' => 'Test Comic',
        'author' => 'Author',
        'description' => 'A short description',
    ];

    $request = Request::create('/admin/comics', 'POST', $data);

    (new AdminComicController())->store($request);

    $this->assertDatabaseHas('comics', ['title' => 'Test Comic']);
});

it('stores comic with cover', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->image('cover.jpg');

    $request = Request::create('/admin/comics', 'POST', [
        'title' => 'Test Comic With Cover',
        'author' => 'Author',
    ]);

    $request->files->set('cover', $file);

    (new AdminComicController())->store($request);

    Storage::disk('public')->assertExists('covers/' . $file->hashName());
    $this->assertDatabaseHas('comics', ['title' => 'Test Comic With Cover']);
});
