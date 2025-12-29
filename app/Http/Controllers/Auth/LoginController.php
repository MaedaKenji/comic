<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'auth' => 'Invalid email or password.',
            ]);
        }

        // 🔒 Regenerate session
        $request->session()->regenerate();

        $user = Auth::user();
        $currentSessionId = Session::getId();

        // 🚫 Kick previous session if exists
        if ($user->session_id && $user->session_id !== $currentSessionId) {
            Session::getHandler()->destroy($user->session_id);
        }

        // ✅ Save current session
        $user->session_id = $currentSessionId;
        $user->save();

        return redirect()->route('home');
    }
}
