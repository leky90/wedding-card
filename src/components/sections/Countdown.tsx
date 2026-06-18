import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTimeLeft } from "@/lib/countdown";
import { gsap, EASE, DUR, STAG, sectionTl } from "@/lib/gsap";
import { weddingConfig } from "@/lib/wedding-config";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const rootRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingConfig.wedding.dateIso));

  useEffect(() => {
    const id = window.setInterval(
      () => setTimeLeft(getTimeLeft(weddingConfig.wedding.dateIso)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  // Entrance: 4 ô "đáp xuống" so le — CHỈ animate wrapper ô (data-cd="cell"), KHÔNG bao giờ
  // chạm <p> số (re-render mỗi giây sẽ giật nếu dính transform). Không parallax ô.
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        sectionTl(rootRef.current, "top 80%").from(
          q('[data-cd="cell"]'),
          { y: 24, autoAlpha: 0, scale: 0.92, stagger: STAG.tile, duration: DUR.line, ease: EASE.veil, clearProps: "transform" },
          0,
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cells = [
    { label: "Ngày", value: String(timeLeft.days) },
    { label: "Giờ", value: pad(timeLeft.hours) },
    { label: "Phút", value: pad(timeLeft.minutes) },
    { label: "Giây", value: pad(timeLeft.seconds) },
  ];

  return (
    <section ref={rootRef} className="bg-cream px-4 py-16 md:py-24">
      {/* Reveal ôm RIÊNG tiêu đề (giữ .hd-line/.hd-heart theo .revealed); lưới do GSAP sở hữu */}
      <Reveal>
        <SectionHeading eyebrow="Cùng đếm ngược" title="Ngày Chung Đôi" />
      </Reveal>
      <div data-cd="grid" className="mx-auto grid max-w-md grid-cols-4 divide-x divide-rose-soft/50">
        {cells.map((cell) => (
          <div key={cell.label} data-cd="cell" className="px-1 text-center">
            <p className="font-display text-4xl font-bold tabular-nums text-primary-deep md:text-6xl">
              {cell.value}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-rose-mid md:text-xs">{cell.label}</p>
          </div>
        ))}
      </div>
      {timeLeft.isOver && (
        <p className="mt-8 text-center font-display text-2xl font-semibold text-primary md:text-3xl">
          Chúng mình đã chính thức về chung một nhà
        </p>
      )}
    </section>
  );
}
