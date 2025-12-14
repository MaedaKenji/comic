import React from "react";

type NavItem = { label: string; href?: string; active?: boolean };

const items: NavItem[] = [
  { label: "Home", active: true },
  { label: "Series" },
  { label: "Novels" },
  { label: "Shop" },
  { label: "Memberships" },
];

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="h-16 flex items-center justify-between gap-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 min-w-[220px]">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
            <span className="font-semibold tracking-wide text-white">
              Vortex Scans
            </span>
          </div>

          {/* Center: Menu */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href || "#"}
                className={[
                  "relative py-2 transition",
                  it.active ? "text-white" : "hover:text-white",
                ].join(" ")}
              >
                {it.label}
                {it.active && (
                  <span className="absolute left-0 right-0 -bottom-[10px] mx-auto h-[2px] w-6 rounded bg-red-600" />
                )}
              </a>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-4 min-w-[220px] text-white/80">
            <button className="hover:text-white transition" aria-label="Discord">
              {/* icon placeholder */}
              <span className="text-lg">💬</span>
            </button>
            <button className="hover:text-white transition" aria-label="Search">
              <span className="text-lg">🔎</span>
            </button>
            <button className="hover:text-white transition" aria-label="Notifications">
              <span className="text-lg">🔔</span>
            </button>
            <button className="hover:text-white transition" aria-label="Profile">
              <span className="text-lg">👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
