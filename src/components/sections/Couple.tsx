import { Heart } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { weddingConfig, type Person } from "@/lib/wedding-config";

interface PersonCardProps {
  person: Person;
  role: string;
  parentLabel: string;
  /** Nghiêng nhẹ khung viền cho tự nhiên */
  frameTilt: string;
}

function PersonCard({ person, role, parentLabel, frameTilt }: PersonCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className={cn("absolute -inset-3 rounded-b-3xl rounded-t-full border border-primary/25", frameTilt)} />
        <div className="relative aspect-[3/4] w-52 overflow-hidden rounded-b-2xl rounded-t-full shadow-card md:w-60">
          <img
            src={asset(person.image)}
            alt={person.fullName}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <p className="mt-8 font-script text-4xl text-primary-deep md:text-5xl">{person.name}</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-rose-mid">{role}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {parentLabel}
        <br />
        Ông {person.parents.father} &amp; Bà {person.parents.mother}
      </p>
      <p className="mt-4 max-w-xs text-sm italic leading-relaxed text-ink/80">“{person.intro}”</p>
    </div>
  );
}

export function Couple() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Hạnh phúc trăm năm"
          title="Chú Rể & Cô Dâu"
          description={weddingConfig.invitation.message}
        />
      </Reveal>
      <div className="mx-auto grid max-w-4xl gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <Reveal delay={80}>
          <PersonCard person={groom} role="Chú rể" parentLabel="Con trai của" frameTilt="-rotate-2" />
        </Reveal>
        <Reveal delay={160} className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-4">
          <span className="font-script text-6xl text-rose-mid">&amp;</span>
          <span aria-hidden className="h-24 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <Heart className="animate-heart h-6 w-6 fill-primary text-primary" aria-hidden />
        </Reveal>
        <Reveal delay={240}>
          <PersonCard person={bride} role="Cô dâu" parentLabel="Con gái của" frameTilt="rotate-2" />
        </Reveal>
      </div>
    </section>
  );
}
