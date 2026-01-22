import React from "react";

type Chip = string;

export type HeroItem = {
  id: number;
  title: string;
  cover: string;
  badge?: string; // "Hot"
  chips?: Chip[];
  watermark?: string; // e.g. "VORTEX SCANS"
};

export default function HeroCard({ item }: { item: HeroItem }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.cover})` }}
      />
      
      {/* Dark overlay + vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.06)]" />

      {/* Watermark top-left */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-red-600/90 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]" />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-white/80">MANHUA</div>
          <div className="text-sm font-bold tracking-wide text-white">
            {item.watermark || "VORTEX SCANS"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-[360px] flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-3">
          {item.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/95 px-3 py-1 text-xs font-semibold text-black">
              🔥 {item.badge}
            </span>
          )}
        </div>

        <h2 className="text-2xl md:text-[28px] font-extrabold leading-tight text-white drop-shadow">
          {item.title}
        </h2>

        {item.chips?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
