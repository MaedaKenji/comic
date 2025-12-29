import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function AdminComics() {
    return (
        <AdminLayout>
            <Head title="Manage Comics" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">
                    Manage Comics
                </h1>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">
                        Comic management table goes here.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
