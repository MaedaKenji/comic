<?php

use App\Models\Comic;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


it('stores a new comic and maps the cover file to cover_path', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    Storage::fake('public');

    $fakeImage = UploadedFile::fake()->image('comic-cover.jpg');

    $payload = [
        'title' => 'The Great Adventure',
        'author' => 'Jane Doe',
        'description' => 'A mandatory description.',
        'cover' => $fakeImage,
        'genre' => ['Adventure', 'Fantasy'],
    ];

    $response = $this->actingAs($admin)->post(route('admin.comics.store'), $payload);

    $response->assertRedirect(route('admin.comics.index'));

    // 1. Refresh the data from the DB
    $comic = Comic::latest()->first();

    // 2. Assert the path is NOT null first
    expect($comic->cover_path)->not->toBeNull();

    // 3. Now check the storage
    expect(Storage::disk('public')->exists($comic->cover_path))->toBeTrue();
});

it('fails validation if title is missing', function () {
    // 1. Create a user (and ensure they have the 'admin' role if required)
    $user = User::factory()->create([
        'role' => 'admin'
    ]);

    // 2. Act as that user
    $response = $this->actingAs($user)
        ->postJson(route('admin.comics.store'), [
            'title' => '', // Empty title to trigger validation
        ]);

    // 3. Now it will bypass the 401 and hit the 422 validation error
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['title']);

    expect(Comic::count())->toBe(0);
});

it('able to add genre to database', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    Storage::fake('public');

    $fakeImage = UploadedFile::fake()->image('comic-cover.jpg');

    $payload = [
        'title' => 'Mystery Tales',
        'author' => 'John Smith',
        'description' => 'A collection of mysterious stories.',
        'cover' => $fakeImage,
        'genre' => ['Mystery', 'Thriller'],
    ];

    $response = $this->actingAs($admin)->post(route('admin.comics.store'), $payload);

    $response->assertRedirect(route('admin.comics.index'));

    $comic = Comic::latest()->first();
    // --------DEBUG DISINI-----
    // dd($comic->genre);

    expect($comic->genre)->toContain('Mystery', 'Thriller');
});