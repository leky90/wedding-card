import { Heart } from "lucide-react";

import { asset } from "@/lib/assets";
import { weddingConfig } from "@/lib/wedding-config";

/** Lấy chữ cái đầu của từ cuối trong tên ("Như Quỳnh" → "Q") */
const initialOf = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? "";

export function Hero() {
  const { groom, bride } = weddingConfig.couple;
  const { wedding } = weddingConfig;

  // "16 . 07 . 2026" → ["16", "07", "26"] cho khối số lớn
  const digits = wedding.displayDate.match(/\d+/g) ?? [];
  const dateRows = [digits[0] ?? "", digits[1] ?? "", (digits[2] ?? "").slice(-2)];

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-20">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Monogram chữ lồng Q & K — chữ serif đậm tương phản cao như thiệp giấy */}
        <p
          className="rise font-display text-5xl font-bold leading-none tracking-[0.06em] text-primary-deep md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          {initialOf(bride.name)}
          <span className="px-1.5 font-normal text-primary/45">&amp;</span>
          {initialOf(groom.name)}
        </p>

        <p
          className="rise mt-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-rose-mid md:text-xs"
          style={{ animationDelay: "260ms" }}
        >
          Save the date
        </p>

        {/* ảnh vòm */}
        <div className="rise mt-8" style={{ animationDelay: "400ms" }}>
          <div className="relative aspect-[3/4] w-48 overflow-hidden rounded-b-[1.6rem] rounded-t-full shadow-card ring-1 ring-rose-soft/70 md:w-60">
            <img
              src={asset(wedding.heroImage)}
              alt={`${bride.name} và ${groom.name}`}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: wedding.heroImagePosition }}
            />
          </div>
        </div>

        {/* tên cô dâu & chú rể — chữ viết tay, cô dâu trước như thiệp */}
        <h1
          className="rise mt-8 flex flex-col items-center gap-1 font-script text-[2.75rem] leading-tight text-primary-deep md:text-6xl"
          style={{ animationDelay: "540ms" }}
        >
          <span>{bride.name}</span>
          <Heart aria-hidden className="animate-heart my-1 h-6 w-6 fill-primary text-primary md:h-7 md:w-7" />
          <span>{groom.name}</span>
        </h1>

        {/* số ngày cưới cỡ lớn, màu rose-gold (chữ ký thị giác của thiệp) */}
        <div
          className="rise mt-9 flex flex-col items-center font-display font-bold leading-none tabular-nums text-rosegold"
          style={{ animationDelay: "700ms" }}
        >
          {dateRows.map((row, i) => (
            <span key={i} className="contents">
              {i > 0 && <span aria-hidden className="my-2 block h-px w-12 bg-rosegold/45 md:w-16" />}
              <span className="text-[4.25rem] md:text-[8.5rem]">{row}</span>
            </span>
          ))}
        </div>
        <p className="rise mt-5 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs" style={{ animationDelay: "820ms" }}>
          {wedding.dayLabel} · {wedding.lunarDate}
        </p>
      </div>
    </section>
  );
}
