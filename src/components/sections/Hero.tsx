import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";

import { BloomCluster, CornerFloral } from "@/components/ui/Ornaments";
import { weddingConfig } from "@/lib/wedding-config";

/** Lấy chữ cái đầu của từ cuối trong tên ("Minh Quân" → "Q") */
const initialOf = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? "";

export function Hero() {
  const { groom, bride } = weddingConfig.couple;
  const { wedding } = weddingConfig;
  const monogram = `${initialOf(groom.name)}&${initialOf(bride.name)}`;

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-20">
      {/* nền loang hồng nhẹ + monogram chìm */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_8%_0%,#fdeef1_0%,transparent_55%),radial-gradient(50rem_36rem_at_100%_100%,#fbe3e8_0%,transparent_50%)]"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-script text-[11rem] leading-none text-primary/[0.05] md:text-[24rem]"
      >
        {monogram}
      </span>

      <CornerFloral className="absolute left-3 top-3 h-28 w-28 text-primary/30 md:left-8 md:top-8 md:h-44 md:w-44" />
      <CornerFloral className="absolute right-3 top-3 h-28 w-28 -scale-x-100 text-primary/30 md:right-8 md:top-8 md:h-44 md:w-44" />
      <CornerFloral className="absolute bottom-3 left-3 hidden h-28 w-28 -scale-y-100 text-primary/20 md:bottom-8 md:left-8 md:block md:h-44 md:w-44" />
      <CornerFloral className="absolute bottom-3 right-3 hidden h-28 w-28 -scale-100 text-primary/20 md:bottom-8 md:right-8 md:block md:h-44 md:w-44" />

      <div className="flex flex-col items-center text-center">
        <p className="rise text-[11px] font-semibold uppercase tracking-[0.55em] text-primary md:text-sm" style={{ animationDelay: "200ms" }}>
          Save · The · Date
        </p>

        {/* ảnh vòm + cụm hoa trên đỉnh */}
        <div className="rise relative mt-10" style={{ animationDelay: "380ms" }}>
          <BloomCluster className="absolute -top-7 left-1/2 z-10 h-10 w-32 -translate-x-1/2 text-primary md:-top-8 md:h-12 md:w-40" />
          <div className="absolute -inset-3 rounded-b-[2rem] rounded-t-full border border-primary/30 md:-inset-4" />
          <div className="relative aspect-[3/4] w-52 overflow-hidden rounded-b-[1.6rem] rounded-t-full shadow-card md:w-64">
            <Image
              src={wedding.heroImage}
              alt={`${groom.name} và ${bride.name}`}
              fill
              priority
              sizes="(min-width: 768px) 16rem, 13rem"
              className="object-cover"
            />
          </div>
        </div>

        <h1
          className="rise mt-10 flex flex-col items-center gap-1 font-script text-[2.75rem] leading-tight text-primary-deep md:flex-row md:gap-6 md:text-7xl"
          style={{ animationDelay: "560ms" }}
        >
          <span>{groom.name}</span>
          <Heart aria-hidden className="animate-heart h-7 w-7 fill-rose-mid text-rose-mid md:h-9 md:w-9" />
          <span>{bride.name}</span>
        </h1>

        <div className="rise mt-7" style={{ animationDelay: "720ms" }}>
          <div className="flex items-center justify-center gap-4 font-display text-lg tracking-[0.3em] text-ink md:text-2xl">
            <span aria-hidden className="h-px w-10 bg-primary/40 md:w-16" />
            <span>{wedding.displayDate}</span>
            <span aria-hidden className="h-px w-10 bg-primary/40 md:w-16" />
          </div>
          <p className="mt-3 text-xs italic text-muted md:text-sm">
            {wedding.dayLabel}, {wedding.lunarDate}
          </p>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/70">
        <ChevronDown className="animate-bounce-soft h-6 w-6" />
      </div>
    </section>
  );
}
