// resources/js/Components/hero/HeroCard.tsx
import { Link } from '@inertiajs/react';
import type { HeroItem } from './hero/types';

type Props = {
    item: HeroItem;
};

export default function HeroCard({ item }: Props) {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        // If link exists, wrap with Inertia Link. Otherwise use a div.
        if (item.link) {
            return (
                <Link
                    href={item.link}
                    className="block h-full"
                    preserveScroll
                >
                    {children}
                </Link>
            );
        }
        return <div className="h-full">{children}</div>;
    };

    return (
        <Wrapper>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
                {/* Cover */}
                <div className="relative aspect-[16/9] w-full bg-slate-800">
                    {item.cover ? (
                        <img
                            src={item.cover}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
                            No Cover
                        </div>
                    )}

                    {/* Badge */}
                    {item.badge ? (
                        <div className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                            {item.badge}
                        </div>
                    ) : null}

                    {/* Watermark */}
                    {item.watermark ? (
                        <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-widest text-white/40">
                            {item.watermark}
                        </div>
                    ) : null}

                    {/* Fade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-bold text-white">
                        {item.title}
                    </h3>

                    {item.chips?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {item.chips.slice(0, 4).map((chip, idx) => (
                                <span
                                    key={`${chip}-${idx}`}
                                    className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/80"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    {/* Call-to-action */}
                    <div className="mt-4">
                        <span className="inline-flex items-center rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20">
                            {item.link ? 'Open' : 'View'}
                        </span>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
