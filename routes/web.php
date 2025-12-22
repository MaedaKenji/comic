<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/register', function () {
    return Inertia::render('register');
});

Route::get('/login', function () {
 return Inertia::render('login');
});

Route::get('/home', function () {
    return Inertia::render('Home');
});


// Protected
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', Profile::class);
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', fn () => Inertia::render('Profile'));
});


