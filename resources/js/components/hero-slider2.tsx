// resources/js/Components/hero/HeroSlider.tsx
import { useMemo, useRef } from 'react';
import HeroCard from './hero-card2';
import type { HeroItem } from './hero/types';

type Props = {
    items: HeroItem[];
};

export default function HeroSlider2({ items }: Props) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const canScroll = items.length > 1;

    const scrollByCards = (dir: 'left' | 'right') => {
        const el = scrollerRef.current;
        if (!el) return;

        // scroll by ~1.2 card widths (responsive)
        const cardWidth = 320; // px target
        const amount = dir === 'left' ? -cardWidth * 1.2 : cardWidth * 1.2;

        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    const title = useMemo(() => {
        // optional section title logic
        return 'Featured';
    }, []);

    return (
        <div className="relative">
            {/* Header */}
            <div className="mb-3 flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>
                    <p className="text-xs text-white/60">
                        Swipe/scroll to explore
                    </p>
                </div>

                {canScroll && (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => scrollByCards('left')}
                            className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                            aria-label="Previous"
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCards('right')}
                            className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                            aria-label="Next"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Scroller */}
            <div
                ref={scrollerRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="w-[280px] shrink-0 snap-start sm:w-[320px]"
                    >
                        <HeroCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
