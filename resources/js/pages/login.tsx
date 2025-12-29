import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '../components/navbar';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [info, setInfo] = useState<string | null>(null);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post('/login');
}


    return (
        <>
            <Head title="Login" />
            <div className="flex min-h-screen flex-col bg-black text-white">
                <Navbar />

                {/* MAIN */}
                <main className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md px-6 text-center">
                        <h1 className="mb-6 text-2xl font-bold">
                            Welcome Back
                        </h1>

                        {/* LOGO */}
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-600 text-4xl text-red-600">
                                🔥
                            </div>
                        </div>

                        {/* FORM */}
                        <form className="space-y-4" onSubmit={submit}>
                            <div className="text-left">
                                <label className="text-xs text-white/70">
                                    Email
                                </label>
                                <div className="mt-1 flex items-center rounded bg-neutral-800 px-3">
                                    <span className="mr-2 text-white/40">
                                        ✉️
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="username@domain.com"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData('email', e.target.value);
                                            clearErrors('email');
                                        }}
                                        className="w-full bg-transparent py-2 text-sm focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="text-left">
                                <div className="flex justify-between text-xs text-white/70">
                                    <label>Password</label>
                                    <a
                                        href="#"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <div className="mt-1 flex items-center rounded bg-neutral-800 px-3">
                                    <span className="mr-2 text-white/40">
                                        🔒
                                    </span>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        onChange={(e) => {
                                            setData('password', e.target.value);
                                            clearErrors('password');
                                        }}
                                        placeholder="Your password"
                                        className="w-full bg-transparent py-2 text-sm focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="text-white/40"
                                    >
                                        👁️
                                    </button>
                                </div>
                            </div>
                            {/* INFO */}
                            {info && (
                                <div className="rounded bg-blue-500/10 px-3 py-2 text-xs text-blue-300">
                                    {info}
                                </div>
                            )}
                            {/* ERRORS */}
                            {(errors.email || errors.password) && (
                                <div className="rounded bg-red-500/10 px-3 py-2 text-xs text-red-300">
                                    {errors.email ?? errors.password}
                                </div>
                            )}
                            

                            <button
                                type="submit"
                                className="w-full rounded bg-red-600 py-2 font-semibold transition hover:bg-red-700"
                                disabled={processing}
                            >
                                {processing ? 'Logging in…' : 'Login'}
                            </button>
                        </form>

                        {/* SOCIAL */}
                        <div className="my-4 text-xs text-white/40">
                            Or continue with
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 rounded bg-neutral-800 py-2 text-sm hover:bg-neutral-700">
                                Discord
                            </button>
                            <button className="flex-1 rounded bg-neutral-800 py-2 text-sm hover:bg-neutral-700">
                                Google
                            </button>
                        </div>

                        {/* REGISTER */}
                        <p className="mt-6 text-sm text-white/60">
                            Not a member?{' '}
                            <Link
                                href="/register"
                                className="text-blue-400 hover:underline"
                            >
                                Create New Account
                            </Link>
                        </p>
                    </div>
                </main>

                {/* FOOTER */}
                <footer className="py-6 text-center text-xs text-white/40">
                    <p className="font-semibold text-white">Vortex Scans</p>
                    <p className="mt-1">
                        Read comics, manga, manhua, manhwa, translated swiftly.
                    </p>

                    <div className="mt-3 flex justify-center gap-4">
                        <a href="#" className="hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white">
                            DMCA
                        </a>
                        <a href="#" className="hover:text-white">
                            Discord
                        </a>
                    </div>

                    <div className="mt-4 text-red-500">Made by V DEV</div>
                    <div className="mt-1">
                        © 2025 All Rights Reserved · v1.5
                    </div>
                </footer>
            </div>
        </>
    );
}
