import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export type HeroItem = {
    id: number;
    title: string;
    cover: string;
    badge?: string;
    genre?: string[];
};

type PageProps = {
    hero: HeroItem[];
};

interface Props {
    items: HeroItem[];
    onClickItem?: (item: HeroItem) => void;
}

export default function HeroSlider({ items, onClickItem }: Props) {
    const isDragging = useRef(false);
    const { hero = [] } = usePage<PageProps>().props;
    console.log(hero);

    return (
        <section className="w-full overflow-hidden">
            <Swiper
                slidesPerView={3}
                spaceBetween={12}
                loop
                grabCursor
                onTouchMove={() => (isDragging.current = true)}
                onTouchEnd={() =>
                    setTimeout(() => (isDragging.current = false), 50)
                }
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1280: {
                        slidesPerView: 3,
                    },
                }}
                className="hero-swiper"
            >
                {hero.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="xl:h-[360px]cursor-pointer rounded- relative h-[260px] w-full select-none md:h-[430px]"
                            onClick={() => {
                                if (!isDragging.current && onClickItem) {
                                    onClickItem(item);
                                }
                            }}
                        >
                            {/* image */}
                            <img
                                src={item.cover}
                                alt={item.title}
                                draggable={false}
                                className="absolute inset-0 h-full w-full rounded-lg object-cover"
                            />

                            {/* overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* content */}
                            <div className="absolute right-8 bottom-8 left-8">
                                {item.badge && (
                                    <span className="relative left-1/2 mx-auto mb-3 block inline-flex w-fit -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-black shadow-[0_0_12px_rgba(255,140,0,0.6)] ...">
                                        {item.badge}
                                    </span>
                                )}

                                <h2 className="text-center text-2xl leading-tight font-extrabold text-white drop-shadow xl:text-3xl">
                                    {item.title}
                                </h2>

                                {item.genre && (
                                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                                        {item.genre.map((c) => (
                                            <span
                                                key={c}
                                                className="relative inline-flex items-center justify-center"
                                            >
                                                {/* glow layer */}
                                                <span className="absolute inset-0 rounded-full bg-red-600 opacity-60 blur-md"></span>

                                                {/* main chip */}
                                                <span className="relative rounded-full bg-black/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                                                    {c}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
