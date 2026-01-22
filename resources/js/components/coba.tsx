// resources/js/components/coba.tsx
import { usePage } from '@inertiajs/react';
import type { HeroItem } from './hero/types';

type PageProps = {
    hero: HeroItem[];
};

export default function Coba() {
    const { hero = [] } = usePage<PageProps>().props;

    if (hero.length === 0) return null;

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hero.map((item, index) => (
                <div
                    key={item.id ?? index}
                    className="relative h-[494px] w-[430px] overflow-hidden rounded-2xl bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
                >
                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.cover})` }}
                    />

                    {/* Dark overlay + vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                    <div className="absolute inset-0 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.06)]" />

                    {/* Watermark top-left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-red-600/90 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]" />
                        <div className="leading-tight">
                            <div className="text-[10px] font-semibold text-white/80">
                                MANHUA
                            </div>
                            <div className="text-sm font-bold tracking-wide text-white">
                                {/* {item.watermark || 'VORTEX SCANS'} */}
                                {'VORTEX SCANS'}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative flex h-[360px] flex-col justify-end p-6">
                        <div className="mb-3 flex items-center gap-2">
                            {item.badge && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/95 px-3 py-1 text-xs font-semibold text-black">
                                    🔥 {item.badge}
                                </span>
                            )}
                        </div>

                        <h2 className="text-2xl leading-tight font-extrabold text-white drop-shadow md:text-[28px]">
                            {item.title}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
}
