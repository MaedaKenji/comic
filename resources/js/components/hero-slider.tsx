import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Manga } from "../types/manga";

interface Props {
  items: Manga[];
}

const HeroSlider: React.FC<Props> = ({ items }) => {
  return (
    <Swiper slidesPerView={3} spaceBetween={20}>
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="h-[350px] rounded-xl bg-cover bg-center relative"
            style={{ backgroundImage: `url(${item.cover})` }}
          >
            {item.is_hot && (
              <span className="absolute top-4 left-4 bg-orange-500 px-2 py-1 text-sm rounded">
                Hot
              </span>
            )}
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold">{item.title}</h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
