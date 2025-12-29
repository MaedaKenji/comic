<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminComicController;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/home', function () {
    return Inertia::render('home');
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
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');
        Route::get(
            '/comics',
            fn() =>
            Inertia::render('admin/comics')
        )->name('comics');
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


