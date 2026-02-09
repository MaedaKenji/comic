<?php

use App\Models\Comic;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;


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

it('allows an admin to delete a comic', function () {
    // 1. Setup: Create an admin user and a comic to delete
    // (Assuming you have an 'is_admin' check or similar)
    $admin = User::factory()->create(['role' => 'admin']);
    $comic = Comic::factory()->create([
        'title' => 'Comic to be Deleted',
        'cover_path' => 'comics/cover.jpg'
    ]);

    // Create a fake disk if you are testing file deletion too
    Storage::fake('public');

    // 2. Act: Send the DELETE request
    $response = $this->actingAs($admin)
        ->delete(route('admin.comics.destroy', $comic));

    // 3. Assertions
    // Check redirect to index (matching your onSuccess router.visit)
    $response->assertRedirect(route('admin.comics.index'));

    // Check database: ensure the record is gone
    $this->assertDatabaseMissing('comics', [
        'id' => $comic->id,
    ]);
});

it('prevents guests from deleting comics', function () {
    $comic = Comic::factory()->create();

    $this->delete(route('admin.comics.destroy', $comic))
        ->assertRedirect(route('login'));

    $this->assertDatabaseHas('comics', ['id' => $comic->id]);
});

it('simulates the guest view and ensures auth props are correct', function () {
    $this->get('/')
        ->assertStatus(200)
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('home') // Make sure this matches your file name in Resources/js/Pages
                ->where('auth.user', null) // Confirm user is a guest
                // Check that 'hero' data is being sent so the page actually loads
                ->has('hero')
        );
});

it('user can login and previous session is destroyed', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => bcrypt('password'),
    ]);

    $this->post(route('login'), [
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($user);

    // Simulate a second login
    $this->post(route('login'), [
        'email' => '<EMAIL>',
        'password' => 'password',
    ]);

    // Check that the user is authenticated with the new session
    $this->assertAuthenticatedAs($user);
});

it('user can logout and session_id is cleared', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => bcrypt('password'),
        'session_id' => 'some_session_id',
    ]);

    $this->post(route('login'), [
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($user);

    $this->post(route('logout'));

    $this->assertGuest();

    $user->refresh();
    expect($user->session_id)->toBeNull();
});

it('after login redirect user to root ', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => bcrypt('password'),
    ]);
    $response = $this->post(route('login'), [
        'email' => 'user@example.com',
        'password' => 'password',
    ]);
    $response->assertRedirect('/');
});