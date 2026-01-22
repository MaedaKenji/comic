// resources/js/components/hero/hero-section.tsx
import { usePage } from '@inertiajs/react';
import HeroSlider from '@/components/hero-slider2';
import type { HeroItem } from './hero/types';

type PageProps = {
    hero?: HeroItem[];
};

export default function HeroSection() {
    const { hero = [] } = usePage<PageProps>().props;

    if (!hero.length) return null;

    return (
        <section className="mx-auto max-w-6xl px-4 pt-6">
            <HeroSlider items={hero} />
        </section>
    );
}
