import { Heart } from "lucide-react";

import { CornerFloral } from "@/components/ui/Ornaments";
import { weddingConfig } from "@/lib/wedding-config";

export function Footer() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#7c1b22_0%,#56101a_58%,#3a0c13_100%)] px-4 py-20 text-center text-white md:py-28">
      <CornerFloral className="absolute -left-8 -top-8 h-44 w-44 text-gold/20" />
      <CornerFloral className="absolute -bottom-8 -right-8 h-44 w-44 -scale-100 text-gold/20" />

      <p className="font-script text-6xl text-rose-soft md:text-8xl">Thank you!</p>
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80">
        {weddingConfig.invitation.thankYou}
      </p>

      <p className="mt-10 flex items-center justify-center gap-3 font-display text-lg tracking-[0.25em] md:text-xl">
        <span>{bride.name.toUpperCase()}</span>
        <Heart className="animate-heart h-5 w-5 fill-rose-soft text-rose-soft" aria-hidden />
        <span>{groom.name.toUpperCase()}</span>
      </p>
      <p className="mt-3 text-xs tracking-[0.5em] text-white/60">{weddingConfig.wedding.displayDate}</p>

      <span aria-hidden className="mx-auto mt-10 block h-px w-40 bg-white/15" />
      <p className="mt-6 text-[11px] text-white/45">
        Thiệp cưới online · Được tạo với <Heart className="inline h-3 w-3 fill-current" aria-hidden /> dành tặng
        khách quý
      </p>
    </footer>
  );
}
