import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat title="Users" value="1,248" />
                    <Stat title="Comics" value="342" />
                    <Stat title="Views Today" value="8,921" />
                    <Stat title="Reports" value="3" danger />
                </div>
            </div>
        </AdminLayout>
    );
}

function Stat({
    title,
    value,
    danger = false,
}: {
    title: string;
    value: string;
    danger?: boolean;
}) {
    return (
        <div
            className={[
                'rounded-xl border p-5',
                danger
                    ? 'border-red-500/30 bg-red-500/10 text-red-400'
                    : 'border-white/10 bg-white/5',
            ].join(' ')}
        >
            <p className="text-sm text-white/60">{title}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
    );
}
