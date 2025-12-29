<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureSingleSession
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            if (Auth::user()->session_id !== session()->getId()) {
                Auth::logout();
                session()->invalidate();
                session()->regenerateToken();

                return redirect('/login')->withErrors([
                    'session' => 'Your account was logged in elsewhere.',
                ]);
            }
        }

        return $next($request);
    }
}
