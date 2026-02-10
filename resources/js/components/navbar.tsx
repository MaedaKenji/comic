import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import FlashSuccess from './flash-popup';

const Navbar: React.FC = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openAuth, setOpenAuth] = useState(false);
    const { auth } = usePage().props as any;
    const authDropdownRef = useRef<HTMLDivElement | null>(null);
    const notifDropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef(null);

    const items = [
        { label: 'Home', href: '/', active: false },
        { label: 'Series', href: '/series' },
        { label: 'Novels', href: '/novels' },
    ];

    {
        auth.user ? (
            <>
                <span>{auth.user.username}</span>
                <button onClick={() => router.post('/logout')}>Logout</button>
            </>
        ) : (
            <Link href="/login">Login</Link>
        );
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpenSearch(false);
                setOpenAuth(false);
                setOpenNotif(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                authDropdownRef.current &&
                !authDropdownRef.current.contains(target)
            ) {
                setOpenAuth(false);
            }

            if (
                notifDropdownRef.current &&
                !notifDropdownRef.current.contains(target)
            ) {
                setOpenNotif(false);
            }

            if (
                searchRef.current &&
                !(searchRef.current as any).contains(target)
            ) {
                setOpenSearch(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('pointerdown', handleClickOutside, true);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener(
                'pointerdown',
                handleClickOutside,
                true,
            );
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex h-16 items-center justify-between gap-6">
                    {/* Left: Logo */}
                    <div className="flex min-w-[220px] items-center gap-3">
                        {/* logo*/}
                        <a href="/">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://storage.vexmanga.com/public/upload/2024/12/02/Logo-d426c8cb30892710.webp"
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                    className="shrink-0"
                                />
                                <span className="font-gotham text-lg font-bold tracking-wide text-white">
                                    Vortex Scans
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Center: Menu */}
                    <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
                        {items.map((it) => (
                            <a
                                key={it.label}
                                href={it.href || '#'}
                                className={[
                                    'relative py-2 transition',
                                    it.active
                                        ? 'text-white'
                                        : 'hover:text-white',
                                ].join(' ')}
                            >
                                {it.label}
                                {it.active && (
                                    <span className="absolute right-0 -bottom-0 left-0 mx-auto h-[2px] w-6 rounded bg-red-600" />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex min-w-[220px] items-center justify-end gap-4 text-white/80">
                        <div className="flex items-center gap-4 text-white/70">
                            {/* Discord */}
                            <a
                                href="https://discord.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                                aria-label="Discord"
                            >
                                {/* SVG unchanged */}
                                <svg
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    className="h-5 w-5"
                                >
                                    {' '}
                                    <path
                                        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
                                        fill="currentColor"
                                    ></path>{' '}
                                </svg>
                            </a>

                            {/* Search */}
                            <button
                                onClick={() => setOpenSearch(true)}
                                className="cursor-pointer transition hover:text-white"
                                aria-label="Search"
                                ref={searchRef}
                            >
                                <svg
                                    aria-hidden="true"
                                    fill="none"
                                    focusable="false"
                                    height="1em"
                                    role="presentation"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                >
                                    {' '}
                                    <path
                                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    ></path>{' '}
                                    <path
                                        d="M22 22L20 20"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    ></path>{' '}
                                </svg>
                            </button>

                            {/* Search Overlay */}
                            <div
                                className={`fixed inset-0 z-[70] transition ${
                                    openSearch ? 'visible' : 'invisible'
                                }`}
                            >
                                {/* Backdrop */}
                                <div
                                    onClick={() => setOpenSearch(false)}
                                    className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                                        openSearch ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />

                                {/* Floating Panel */}
                                <div
                                    className={`absolute top-20 left-1/2 w-[90%] max-w-[900px] -translate-x-1/2 transform transition-all duration-300 ease-out ${openSearch ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} `}
                                >
                                    <div className="rounded-2xl border border-white/10 bg-[#0b0d10] px-6 py-5 shadow-2xl">
                                        {/* Input Row */}
                                        <div className="flex items-center gap-3">
                                            {/* Search Input */}
                                            <div className="flex flex-1 items-center gap-3 rounded-full bg-white/10 px-5 py-3">
                                                <svg
                                                    className="h-5 w-5 text-white/50"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>

                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="What are we looking for?"
                                                    className="flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
                                                />
                                            </div>

                                            {/* Search Button */}
                                            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 transition hover:bg-red-500">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Close Button */}
                                            <button
                                                onClick={() =>
                                                    setOpenSearch(false)
                                                }
                                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                                            >
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="mt-5 flex justify-center">
                                                <div className="rounded-full bg-pink-100 px-6 py-2 text-sm text-pink-600">
                                                    {error}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <FlashSuccess />

                            {/* Notification */}
                            <div className="flex" ref={notifDropdownRef}>
                                <button
                                    onClick={() => setOpenNotif((v) => !v)}
                                    className="relative transition hover:text-white"
                                    aria-label="Notifications"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                        className="h-5 w-6 transition-all duration-300"
                                        style={{ color: 'white', opacity: 0.6 }}
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                        ></path>{' '}
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                {openNotif && (
                                    <div className="absolute right-0 mt-10 w-80 rounded-xl border border-white/10 bg-[#0b0d10] shadow-xl">
                                        <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold">
                                            Notifications
                                        </div>

                                        <ul className="max-h-64 overflow-auto">
                                            <li className="px-4 py-3 text-sm transition hover:bg-white/5">
                                                🔥 New chapter released
                                                <div className="mt-1 text-xs text-white/50">
                                                    2 minutes ago
                                                </div>
                                            </li>
                                            <li className="px-4 py-3 text-sm transition hover:bg-white/5">
                                                ⭐ You bookmarked a series
                                                <div className="mt-1 text-xs text-white/50">
                                                    1 hour ago
                                                </div>
                                            </li>
                                        </ul>

                                        <a
                                            href="/notifications"
                                            className="block px-4 py-3 text-center text-sm text-red-500 transition hover:text-red-400"
                                        >
                                            View all
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Profile */}
                            <div className="flex" ref={authDropdownRef}>
                                {/* PROFILE BUTTON */}
                                <button
                                    className={[
                                        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full transition',
                                        auth.user
                                            ? 'bg-emerald-500 text-black'
                                            : 'border border-white/20 bg-[#0b0d10] text-white/70 hover:text-white',
                                    ].join(' ')}
                                    onClick={() => setOpenAuth((v) => !v)}
                                    aria-label="Profile menu"
                                >
                                    {/* LOGGED-IN WITH AVATAR */}
                                    {auth.user?.avatar ? (
                                        <img
                                            src={auth.user.avatar}
                                            alt={auth.user.username}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : auth.user ? (
                                        /* LOGGED-IN WITHOUT AVATAR → INITIAL */
                                        <span className="text-sm font-bold">
                                            {auth.user.username[0].toUpperCase()}
                                        </span>
                                    ) : (
                                        /* GUEST ICON */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.5 6a4.5 4.5 0 1 1 9 0
                   4.5 4.5 0 0 1-9 0ZM3.751
                   20.105a8.25 8.25 0 0 1
                   16.498 0 .75.75 0 0
                   1-.437.695A18.683
                   18.683 0 0 1 12
                   22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>

                                {/* LOGGED-IN DROPDOWN */}
                                {auth.user && openAuth && (
                                    <div className="absolute right-0 mt-10 w-72 rounded-2xl border border-white/10 bg-[#0b0d10] p-3 shadow-2xl">
                                        {/* USER INFO */}
                                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-black">
                                                {auth.user.username[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-white">
                                                    {auth.user.username}
                                                </p>
                                                <p className="truncate text-xs text-white/60">
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                            <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70 capitalize">
                                                {auth.user.role}
                                            </span>
                                        </div>

                                        {/* MENU */}
                                        <div className="mt-2 space-y-1 text-sm">
                                            <Link
                                                href="/coins"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                                            >
                                                💰 <span>Coins</span>
                                                <span className="ml-auto text-white/60">
                                                    0
                                                </span>
                                            </Link>

                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                                            >
                                                👤 <span>View Profile</span>
                                            </Link>

                                            {auth.user.role === 'admin' && (
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                                                >
                                                    ⚙️ <span>Admin Panel</span>
                                                </Link>
                                            )}

                                            <Link
                                                href="/support"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                                            >
                                                ❓ <span>Help & Support</span>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    router.post('/logout')
                                                }
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
                                            >
                                                🚪 <span>Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* GUEST POPUP (unchanged) */}
                                {!auth.user && openAuth && (
                                    <div className="absolute right-0 mt-10 w-64 rounded-2xl border border-white/10 bg-[#0b0d10] p-4 shadow-2xl">
                                        <Link
                                            href="/login"
                                            className="block w-full rounded-full bg-red-600 py-3 text-center font-semibold transition hover:bg-red-500"
                                        >
                                            Sign In
                                        </Link>

                                        <Link
                                            href="/register"
                                            className="mt-3 block w-full rounded-full border border-white/10 py-3 text-center text-white/80 transition hover:bg-white/5"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
