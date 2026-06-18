import { useEffect, useRef } from "react";

import { WeddingRings } from "@/components/ui/Ornaments";
import { gsap, EASE, DUR, STAG, SCRUB } from "@/lib/gsap";
import { weddingConfig } from "@/lib/wedding-config";

export function Footer() {
  const { groom, bride } = weddingConfig.couple;
  const { invitation, wedding } = weddingConfig;
  const rootRef = useRef<HTMLElement>(null);

  // Màn kết "Lời Cảm Ơn": nhẫn hiện, tiêu đề trồi, 2 đoạn lộ theo mặt nạ, chữ ký cuối
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
        });
        tl.from(q("[data-footer-rings]"), { scale: 0.7, autoAlpha: 0, duration: DUR.head, ease: EASE.press }, 0)
          .from(q("[data-footer-title]"), { y: 24, autoAlpha: 0, duration: DUR.head, ease: EASE.veil }, 0.2)
          .from(q("[data-footer-line]"), { yPercent: 110, autoAlpha: 0, stagger: STAG.line, duration: 0.8, ease: EASE.silk }, 0.35)
          .from(q("[data-footer-sign]"), { y: 18, autoAlpha: 0, stagger: STAG.line, duration: 0.8, ease: EASE.silk }, 0.95);
        // trôi nhẹ "lắng xuống" cho cả khối khi tiến tới cuối trang
        gsap.fromTo(
          q("[data-footer-content]"),
          { y: 24 },
          {
            y: -8,
            ease: EASE.drift,
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom bottom", scrub: SCRUB.settle },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden bg-primary-deep px-5 py-24 text-center text-white md:py-32"
    >
      <div data-footer-content className="mx-auto max-w-prose">
        <div data-footer-rings className="mx-auto h-16 w-20 text-rose-soft md:h-20 md:w-24">
          <WeddingRings className="h-full w-full" />
        </div>

        <h2
          data-footer-title
          className="mt-7 font-display text-3xl font-bold uppercase tracking-[0.16em] text-rose-soft md:text-5xl"
        >
          Lời Cảm Ơn
        </h2>

        <div className="mx-auto mt-8 space-y-5 text-sm leading-relaxed text-white/85 md:text-[15px]">
          <p className="overflow-hidden">
            <span data-footer-line className="block">
              {invitation.thankYou1}
            </span>
          </p>
          <p className="overflow-hidden">
            <span data-footer-line className="block">
              {invitation.thankYou2}
            </span>
          </p>
        </div>

        <p data-footer-sign className="mt-9 text-[10px] uppercase tracking-[0.32em] text-white/65">
          Trân trọng
        </p>
        <p
          data-footer-sign
          className="mt-2 font-display text-3xl font-medium italic text-rose-soft md:text-4xl"
        >
          {bride.name} và {groom.name}
        </p>
      </div>

      <p className="relative mt-12 text-[11px] uppercase tracking-[0.3em] text-white/60">
        {bride.name} &amp; {groom.name} · {wedding.displayDate}
      </p>
    </footer>
  );
}
