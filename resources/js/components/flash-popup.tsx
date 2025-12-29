import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashSuccess() {
    const { flash } = usePage().props as any;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000); // ⏱ 4 seconds

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 rounded bg-green-600 px-4 py-2 text-white shadow-lg">
            {flash.success}
        </div>
    );
}
