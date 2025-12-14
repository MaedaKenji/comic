import React from "react";

export type MangaItem = {
  id: number;
  title: string;
  cover: string;
};

const MangaCard: React.FC<{ item: MangaItem }> = ({ item }) => {
  return (
    <div className="w-[170px] shrink-0">
      <div className="relative overflow-hidden rounded-xl bg-white/5">
        <img
          src={item.cover}
          alt={item.title}
          className="h-[240px] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="mt-2 text-sm font-semibold text-white/90 line-clamp-2">
        {item.title}
      </div>
    </div>
  );
};

export default MangaCard;
