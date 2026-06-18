import { CalendarPlus, Camera, Flower2, MapPin, UtensilsCrossed, Users, Wine } from "lucide-react";
import { useEffect, useRef } from "react";

import { CornerFloral, RingsIcon } from "@/components/ui/Ornaments";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildGoogleCalendarUrl } from "@/lib/countdown";
import { gsap } from "@/lib/gsap";
import { weddingConfig, type TimelineStep, type WeddingEvent } from "@/lib/wedding-config";

function EventIcon({ icon }: { icon: WeddingEvent["icon"] }) {
  const cls = "h-6 w-6";
  if (icon === "flower") return <Flower2 className={cls} aria-hidden />;
  if (icon === "rings") return <RingsIcon className={cls} />;
  return <Wine className={cls} aria-hidden />;
}

function TimelineIcon({ icon }: { icon: TimelineStep["icon"] }) {
  const cls = "h-5 w-5";
  if (icon === "welcome") return <Users className={cls} aria-hidden />;
  if (icon === "rings") return <RingsIcon className={cls} />;
  if (icon === "photo") return <Camera className={cls} aria-hidden />;
  return <UtensilsCrossed className={cls} aria-hidden />;
}

export function Events() {
  const { groom, bride } = weddingConfig.couple;
  const rootRef = useRef<HTMLElement>(null);

  // Thẻ sự kiện "rải" vào, đường timeline vẽ ngang + chấm mốc nẩy lên
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.from(q("[data-event-card]"), {
          y: 40,
          rotateZ: 1.5,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform", // trả lại transform cho hover card-lift
          scrollTrigger: { trigger: q("[data-event-grid]")[0], start: "top 78%", once: true },
        });
        gsap.fromTo(
          q("[data-timeline-rule]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "power2.out",
            duration: 0.9,
            scrollTrigger: { trigger: q("[data-timeline-rule]")[0], start: "top 85%", once: true },
          },
        );
        gsap.from(q("[data-timeline-dot]"), {
          scale: 0.6,
          autoAlpha: 0,
          ease: "back.out(1.6)",
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: { trigger: q("[data-timeline-rule]")[0], start: "top 80%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767.98px)", () => {
        gsap.from(q("[data-event-card]"), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: q("[data-event-grid]")[0], start: "top 85%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-gradient-to-b from-white to-cream px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Trân trọng kính mời"
          title="Sự Kiện Cưới"
          description="Rất mong bạn bớt chút thời gian đến chung vui cùng gia đình chúng tôi trong những thời khắc đáng nhớ này."
        />
      </Reveal>

      <div data-event-grid className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3 md:gap-6">
        {weddingConfig.events.map((event) => (
          <article
            key={event.id}
            data-event-card
            className="card-lift relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-rose-soft/60 bg-white p-6 text-center shadow-card md:p-7"
          >
              {/* hoạ tiết gold chỉ trên thẻ Tiệc Thân Mật — như tấm 15.07 của thiệp giấy */}
              {event.id === "tiec-than-mat" && (
                <CornerFloral
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 -scale-x-100 text-gold/35"
                />
              )}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush text-primary ring-1 ring-rose-soft/70">
                <EventIcon icon={event.icon} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-primary-deep md:text-2xl">{event.name}</h3>
              <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-primary">{event.time}</p>
              <p className="mt-1 text-sm text-muted">{event.dateLabel}</p>
              {event.lunarLabel && (
                <p className="mt-0.5 text-xs italic text-muted/80">{event.lunarLabel}</p>
              )}
              <span aria-hidden className="my-4 h-px w-12 bg-rose-soft" />
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary-deep">
                {event.venue}
              </p>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{event.address}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-deep"
                >
                  <MapPin className="h-3.5 w-3.5" aria-hidden /> Chỉ đường
                </a>
                <a
                  href={buildGoogleCalendarUrl({
                    title: `${event.name} - ${bride.name} & ${groom.name}`,
                    startIso: event.startIso,
                    endIso: event.endIso,
                    location: `${event.venue}, ${event.address}`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-blush"
                >
                  <CalendarPlus className="h-3.5 w-3.5" aria-hidden /> Thêm vào lịch
                </a>
              </div>
          </article>
        ))}
      </div>

      {/* Trình tự ngày cưới — mô phỏng timeline trong thiệp giấy */}
      <Reveal className="mx-auto mt-14 max-w-2xl md:mt-20">
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-rose-mid">
          Trình tự ngày cưới
        </p>
        <ol className="relative grid grid-cols-2 gap-y-9 sm:grid-cols-4">
          <span
            aria-hidden
            data-timeline-rule
            className="absolute inset-x-8 top-7 hidden h-px bg-rose-soft sm:block"
          />
          {weddingConfig.dayTimeline.map((step) => (
            <li key={step.label} className="relative flex flex-col items-center text-center">
              <span
                data-timeline-dot
                className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-soft bg-white text-primary shadow-sm"
              >
                <TimelineIcon icon={step.icon} />
              </span>
              <p className="mt-3 font-display text-lg font-semibold tabular-nums text-primary">{step.time}</p>
              <p className="mt-0.5 text-xs tracking-wide text-ink">{step.label}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
