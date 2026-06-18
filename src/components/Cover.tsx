import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { asset } from "@/lib/assets";
import { gsap, EASE, DUR } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { weddingConfig } from "@/lib/wedding-config";

/** Sự kiện phát ra khi khách mở thiệp — nơi khác (nhạc nền) lắng nghe. */
export const INVITATION_OPEN_EVENT = "invitation:open";

/** Lấy chữ cái đầu của từ cuối trong tên ("Như Quỳnh" → "Q") */
const initialOf = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? "";

/** Màn hình bìa "Mở thiệp" — khoá cuộn cho tới khi khách chạm mở. */
export function Cover() {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  // Entrance màn bìa: chạy NGAY khi mount (không ScrollTrigger — bìa cố định, đang khoá cuộn).
  // GSAP làm chủ opacity+transform của 6 node chữ; reduced-motion → callback không chạy, hiện đủ.
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.from(q('[data-cv="mono"]'), { y: 30, autoAlpha: 0, scale: 0.985, duration: DUR.head, ease: EASE.veil }, 0)
          .from(q('[data-cv="eyebrow"]'), { y: 18, autoAlpha: 0, duration: DUR.line, ease: EASE.silk }, 0.18)
          .from(q('[data-cv="names"]'), { y: 24, autoAlpha: 0, duration: DUR.head, ease: EASE.veil }, 0.3)
          .from(q('[data-cv="date"]'), { y: 16, autoAlpha: 0, duration: DUR.line, ease: EASE.silk }, 0.5)
          .from(q('[data-cv="cta"]'), { y: 14, autoAlpha: 0, scale: 0.9, duration: DUR.pop, ease: EASE.press }, 0.62)
          .from(q('[data-cv="hint"]'), { autoAlpha: 0, duration: 0.5, ease: EASE.silk }, 0.85);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (hidden) return null;

  const open = () => {
    if (opened) return;
    setOpened(true);
    window.dispatchEvent(new CustomEvent(INVITATION_OPEN_EVENT));
    // chờ hiệu ứng trượt lên kết thúc rồi mới gỡ khỏi DOM
    window.setTimeout(() => setHidden(true), 1000);
  };

  const { groom, bride } = weddingConfig.couple;
  const { wedding } = weddingConfig;

  return (
    <div
      ref={rootRef}
      id="invitation-cover"
      className={cn(
        "cover-shell fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-cream px-6",
        opened && "pointer-events-none cover-opened",
      )}
    >
      {/* ảnh cưới sắc nét toàn màn + lớp phủ gradient (không làm mờ) để chữ trắng đọc rõ */}
      <img
        src={asset(wedding.heroImage)}
        alt={`${bride.name} và ${groom.name}`}
        fetchPriority="high"
        className="cover-photo pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "50% 22%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(40,12,16,.55) 0%, rgba(40,12,16,.42) 45%, rgba(40,12,16,.66) 100%)",
        }}
      />

      {/* khung viền kép mảnh — tối giản như thiệp giấy */}
      <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-rose-soft/45 md:inset-6" />
      <div className="pointer-events-none absolute inset-5 rounded-[20px] border border-rose-soft/25 md:inset-8" />

      <div className="relative text-center">
        <p
          data-cv="mono"
          className="font-display text-5xl font-bold leading-none tracking-[0.06em] text-white md:text-6xl"
        >
          {initialOf(bride.name)}
          <span className="px-1.5 font-normal text-white/55">&amp;</span>
          {initialOf(groom.name)}
        </p>
        <p data-cv="eyebrow" className="mt-5 text-[11px] font-semibold uppercase tracking-[0.5em] text-rose-soft md:text-xs">
          Thiệp mời cưới
        </p>

        <div
          data-cv="names"
          className="mt-6 flex flex-col items-center justify-center gap-1 font-display text-4xl font-medium italic leading-snug text-white md:flex-row md:gap-5 md:text-6xl"
        >
          <span>{bride.name}</span>
          <Heart className="animate-heart h-6 w-6 fill-primary text-primary md:h-8 md:w-8" aria-hidden />
          <span>{groom.name}</span>
        </div>

        <p data-cv="date" className="mt-6 font-display text-sm tracking-[0.35em] text-rose-soft md:text-base">
          {wedding.dayLabel.toUpperCase()} · {wedding.displayDate}
        </p>

        <div data-cv="cta" className="mt-10">
          <button
            type="button"
            onClick={open}
            aria-label="Mở thiệp mời"
            className="press group relative inline-flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-card transition hover:scale-105 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-soft md:h-28 md:w-28"
          >
            <span aria-hidden className="cover-ring absolute inset-0 rounded-full border border-primary/60" />
            <span aria-hidden className="cover-ring-2 absolute inset-0 rounded-full border border-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">Mở thiệp</span>
          </button>
          <p data-cv="hint" className="mt-5 text-xs text-white/80">Chạm để mở thiệp mời</p>
        </div>
      </div>
    </div>
  );
}
