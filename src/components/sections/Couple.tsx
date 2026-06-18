import type { CSSProperties } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { weddingConfig, type Person } from "@/lib/wedding-config";

interface PersonCardProps {
  person: Person;
  role: string;
  parentLabel: string;
}

function PersonCard({ person, role, parentLabel }: PersonCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-card">
        <img
          src={asset(person.image)}
          alt={person.fullName}
          loading="lazy"
          className="tile-img absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: person.imagePosition }}
        />
      </div>
      <p className="mt-6 font-display text-4xl font-medium italic text-primary-deep md:text-5xl">{person.name}</p>
      <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep/85 md:text-sm">
        {person.fullName}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-rose-mid">
        {role}
        {person.lineage ? ` · ${person.lineage}` : ""}
      </p>
      {(person.parents.father || person.parents.mother) && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {parentLabel}
          <br />
          Ông {person.parents.father} &amp; Bà {person.parents.mother}
        </p>
      )}
      {person.hometown && <p className="mt-1.5 text-xs text-muted/85">{person.hometown}</p>}
      <p className="mt-4 max-w-xs text-sm italic leading-relaxed text-ink/80">“{person.intro}”</p>
    </div>
  );
}

export function Couple() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Hạnh phúc trăm năm"
          title="Chú Rể & Cô Dâu"
          description={weddingConfig.invitation.message}
          divider
        />
      </Reveal>
      <Reveal variant="stagger" className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-10">
        <div style={{ "--i": 0 } as CSSProperties}>
          <PersonCard person={groom} role="Chú rể" parentLabel="Con trai của" />
        </div>
        <div style={{ "--i": 1 } as CSSProperties}>
          <PersonCard person={bride} role="Cô dâu" parentLabel="Con gái của" />
        </div>
      </Reveal>
    </section>
  );
}
