import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

type User = {
    name: string;
    email: string;
    role: string;
};

type PageProps = {
    auth: {
        user: User;
    };
};

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-zinc-900">
                <div className="p-5 border-b border-white/10">
                    <h2 className="text-lg font-semibold">Admin Panel</h2>
                    <p className="text-xs text-white/50">
                        {auth.user.email}
                    </p>
                </div>

                <nav className="p-4 space-y-1">
                    <AdminNav href="/admin/dashboard" label="Dashboard" />
                    <AdminNav href="/admin/comics" label="Comics" />
                    <AdminNav href="/admin/users" label="Users" />
                    <AdminNav href="/admin/reports" label="Reports" />
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}

function AdminNav({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="block rounded-lg px-4 py-2 text-sm hover:bg-white/5"
        >
            {label}
        </Link>
    );
}
