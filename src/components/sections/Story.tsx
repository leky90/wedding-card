import { Heart } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { weddingConfig } from "@/lib/wedding-config";

export function Story() {
  return (
    <section className="relative overflow-hidden bg-blush px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="Chuyện chúng mình" title="Câu Chuyện Tình Yêu" />
      </Reveal>

      <div className="relative mx-auto max-w-3xl">
        {/* trục dọc timeline */}
        <span aria-hidden className="absolute inset-y-2 left-4 w-px bg-rose-soft md:left-1/2" />
        <ol className="space-y-10 md:space-y-14">
          {weddingConfig.story.map((milestone, i) => {
            const onLeft = i % 2 === 0;
            return (
              <li key={milestone.year} className="relative">
                <span
                  aria-hidden
                  className="absolute left-4 top-3 z-10 -translate-x-1/2 rounded-full bg-blush p-1 md:left-1/2"
                >
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                </span>
                <Reveal delay={i * 60}>
                  <article
                    className={cn(
                      "ml-12 overflow-hidden rounded-2xl border border-rose-soft/50 bg-white shadow-card md:w-[calc(50%-2.5rem)]",
                      onLeft ? "md:ml-0" : "md:ml-[calc(50%+2.5rem)]",
                    )}
                  >
                    <div className="relative h-52 w-full md:h-60">
                      <img
                        src={asset(milestone.image)}
                        alt={milestone.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: milestone.imagePosition }}
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="font-display text-2xl font-bold tracking-wide text-rose-mid">{milestone.year}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-primary-deep">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{milestone.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
