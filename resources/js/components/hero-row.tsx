import React from "react";
import HeroCard, { HeroItem } from "./hero-card";

const HeroRow: React.FC<{ items: HeroItem[] }> = ({ items }) => {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {items.slice(0, 3).map((it) => (
          <HeroCard key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
};

export default HeroRow;
