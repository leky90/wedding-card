import { useEffect, useRef } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { gsap } from "@/lib/gsap";
import { weddingConfig, type Person } from "@/lib/wedding-config";

interface PersonCardProps {
  person: Person;
  role: string;
  parentLabel: string;
}

function PersonCard({ person, role, parentLabel }: PersonCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        data-portrait
        className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-card"
      >
        <img
          src={asset(person.image)}
          alt={person.fullName}
          loading="lazy"
          data-portrait-img
          className="tile-img absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: person.imagePosition }}
        />
      </div>
      <p
        data-portrait-line
        className="mt-6 font-display text-4xl font-medium italic text-primary-deep md:text-5xl"
      >
        {person.name}
      </p>
      <p
        data-portrait-line
        className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep/85 md:text-sm"
      >
        {person.fullName}
      </p>
      <p
        data-portrait-line
        className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-rose-mid"
      >
        {role}
        {person.lineage ? ` · ${person.lineage}` : ""}
      </p>
      {(person.parents.father || person.parents.mother) && (
        <p data-portrait-line className="mt-4 text-sm leading-relaxed text-muted">
          {parentLabel}
          <br />
          Ông {person.parents.father} &amp; Bà {person.parents.mother}
        </p>
      )}
      {person.hometown && (
        <p data-portrait-line className="mt-1.5 text-xs text-muted/85">
          {person.hometown}
        </p>
      )}
      <p data-portrait-line className="mt-4 max-w-xs text-sm italic leading-relaxed text-ink/80">
        “{person.intro}”
      </p>
    </div>
  );
}

export function Couple() {
  const { groom, bride } = weddingConfig.couple;
  const rootRef = useRef<HTMLElement>(null);

  // Mỗi chân dung "vén" lộ từ dưới + ảnh lắng về scale 1, rồi tên/vai trò hiện so le
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        self.selector!("[data-portrait]").forEach((wrap: Element) => {
          const img = wrap.querySelector("[data-portrait-img]");
          const lines = wrap.parentElement!.querySelectorAll("[data-portrait-line]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 82%", once: true } });
          tl.fromTo(
            wrap,
            { clipPath: "inset(0 0 100% 0 round 16px)" },
            { clipPath: "inset(0 0 0% 0 round 16px)", duration: 1.1, ease: "power3.out", clearProps: "clipPath" },
            0,
          )
            .fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out", clearProps: "transform" }, 0)
            .from(lines, { y: 16, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" }, 0.4);
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-white px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Hạnh phúc trăm năm"
          title="Chú Rể & Cô Dâu"
          description={weddingConfig.invitation.message}
          divider
        />
      </Reveal>
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-10">
        <PersonCard person={groom} role="Chú rể" parentLabel="Con trai của" />
        <PersonCard person={bride} role="Cô dâu" parentLabel="Con gái của" />
      </div>
    </section>
  );
}
