<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreIntendedUrl
{
    public function handle(Request $request, Closure $next)
    {
        if (
            $request->method() === 'GET' &&
            !Auth::check() &&
            ! $request->is('login', 'register', 'password/*')
        ) {
            $request->session()->put('url.intended', $request->fullUrl());
        }

        return $next($request);
    }
}
