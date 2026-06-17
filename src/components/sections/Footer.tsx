import { WeddingRings } from "@/components/ui/Ornaments";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { weddingConfig } from "@/lib/wedding-config";

export function Footer() {
  const { groom, bride } = weddingConfig.couple;
  const { invitation, wedding } = weddingConfig;

  return (
    <footer className="relative overflow-hidden bg-primary-deep px-5 py-24 text-center text-white md:py-32">
      <PhotoBackdrop image="/images/hero-couple.jpg" scrim="footer" position="50% 40%" />

      <Reveal className="mx-auto max-w-prose">
        <WeddingRings className="mx-auto h-16 w-20 text-rose-soft md:h-20 md:w-24" />

        <h2 className="mt-7 font-display text-3xl font-bold uppercase tracking-[0.16em] text-rose-soft md:text-5xl">
          Lời Cảm Ơn
        </h2>

        <div className="mx-auto mt-8 space-y-5 text-sm leading-relaxed text-white/85 md:text-[15px]">
          <p>{invitation.thankYou1}</p>
          <p>{invitation.thankYou2}</p>
        </div>

        <p className="mt-9 text-[10px] uppercase tracking-[0.32em] text-white/65">Trân trọng</p>
        <p className="mt-2 font-script text-4xl text-rose-soft md:text-5xl">
          {bride.name} và {groom.name}
        </p>
      </Reveal>

      <p className="relative mt-12 text-[11px] uppercase tracking-[0.3em] text-white/60">
        {bride.name} &amp; {groom.name} · {wedding.displayDate}
      </p>
    </footer>
  );
}
