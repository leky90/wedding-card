import { Heart } from "lucide-react";

import { asset } from "@/lib/assets";
import { weddingConfig } from "@/lib/wedding-config";

/** Lấy chữ cái đầu của từ cuối trong tên ("Như Quỳnh" → "Q") */
const initialOf = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? "";

export function Hero() {
  const { groom, bride } = weddingConfig.couple;
  const { wedding } = weddingConfig;

  // "16 . 07 . 2026" → ["16", "07", "2026"] cho khối số lớn
  const digits = wedding.displayDate.match(/\d+/g) ?? [];
  const dateRows = [digits[0] ?? "", digits[1] ?? "", digits[2] ?? ""];

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-cream py-12 md:py-20">
      {/* Ảnh cưới lớn, rõ ràng — full-bleed trên mobile, bo góc trên desktop */}
      <div className="rise w-full md:mx-auto md:max-w-2xl md:px-5" style={{ animationDelay: "120ms" }}>
        <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-[4/5] md:rounded-2xl md:shadow-card">
          <img
            src={asset(wedding.heroImage)}
            alt={`${bride.name} và ${groom.name}`}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: wedding.heroImagePosition }}
          />
        </div>
      </div>

      {/* Chữ trên nền kem — serif tương phản cao như thiệp giấy */}
      <div className="mt-10 flex w-full max-w-md flex-col items-center px-5 text-center md:mt-14">
        <p
          className="rise font-display text-5xl font-bold leading-none tracking-[0.06em] text-primary-deep md:text-7xl"
          style={{ animationDelay: "260ms" }}
        >
          {initialOf(bride.name)}
          <span className="px-1.5 font-normal text-primary/45">&amp;</span>
          {initialOf(groom.name)}
        </p>

        <p
          className="rise mt-5 text-[11px] font-semibold uppercase tracking-[0.5em] text-rose-mid md:text-xs"
          style={{ animationDelay: "380ms" }}
        >
          Save the date
        </p>

        <h1
          className="rise mt-6 flex flex-col items-center gap-1 font-display text-4xl font-medium italic leading-tight text-primary-deep md:text-6xl"
          style={{ animationDelay: "500ms" }}
        >
          <span>{bride.name}</span>
          <Heart aria-hidden className="animate-heart my-1 h-6 w-6 fill-primary text-primary md:h-7 md:w-7" />
          <span>{groom.name}</span>
        </h1>

        <div className="mt-9 flex flex-col items-center font-display font-bold leading-none tabular-nums text-rosegold">
          {dateRows.map((row, i) => (
            <span key={i} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="rule-draw my-2 block h-px w-12 bg-rosegold/45 md:w-16"
                  style={{ animationDelay: `${720 + (i - 1) * 120}ms` }}
                />
              )}
              <span
                className="rise-num text-[3.75rem] md:text-[7rem]"
                style={{ animationDelay: `${640 + i * 120}ms` }}
              >
                {row}
              </span>
            </span>
          ))}
        </div>

        <p
          className="rise mt-5 text-[11px] uppercase tracking-[0.28em] text-rose-mid md:text-xs"
          style={{ animationDelay: "760ms" }}
        >
          {wedding.dayLabel} · {wedding.lunarDate}
        </p>
      </div>
    </section>
  );
}
