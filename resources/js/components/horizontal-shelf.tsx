import React, { useRef } from "react";

const HorizontalShelf: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="opacity-90">🔥</span> {title}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy("left")}
            className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition"
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {children}
      </div>
    </section>
  );
};

export default HorizontalShelf;
