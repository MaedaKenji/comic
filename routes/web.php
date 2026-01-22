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
                'link' => route('comics.show', $comic->id),
                'badge' => $comic->badge,
                'genre' => $comic->genre,
            ];
        });

    return Inertia::render('home', [
        'hero' => $hero,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/comics/{comic}', [ComicController::class, 'show'])
    ->name('comics.show');

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
        
        // This single line handles index, create, store, show, edit, update, and destroy
        Route::resource('comics', AdminComicController::class);
    });



Route::redirect('/admin', '/admin/dashboard');






// Protected
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', Profile::class);
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', fn() => Inertia::render('Profile'));
});


