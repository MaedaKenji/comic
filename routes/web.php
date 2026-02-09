<?php

use Illuminate\Support\Facades\Route;

use App\Models\Comic;

use Inertia\Inertia;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminComicController;
use App\Http\Controllers\ComicController;


Route::get('/', function () {
    $hero = Comic::latest()
        ->take(5)
        ->get()
        ->map(function ($comic) {
            return [
                'id' => $comic->id,
                'title' => $comic->title,
                'author' => $comic->author,
                'description' => $comic->description,
                'cover' => $comic->cover_path
                    ? asset('storage/' . $comic->cover_path)
                    : null,
                'badge' => $comic->badge,
                'genre' => $comic->genre,
                'slug' => $comic->slug,
            ];
        });

    return Inertia::render('home', [
        'hero' => $hero,
    ]);
})->name('home');


Route::post('/register', [RegisterController::class, 'store']);
Route::get('/register', function () {
    return Inertia::render('register');
});

Route::get('/login', fn() => Inertia::render('login'))->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('comics', AdminComicController::class);
        Route::post('/comics/{comic}/chapters', [AdminComicController::class, 'uploadChapterImages'])
            ->name('comics.chapters.store');
    });
Route::redirect('/admin', '/admin/dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', fn() => Inertia::render('Profile'));
});


// Go to that comic page
Route::get('/comics/{comic:slug}', [ComicController::class, 'show'])
    ->name('comics.show');
// Route::get('/comics/{comic:slug}/chapters/{chapter:number}', [ComicController::class, 'showChapter'])
//     ->name('comics.chapters.show');
Route::get('/comics/{comic}/{chapter}', [ComicController::class, 'reader'])
    ->name('comics.reader');



