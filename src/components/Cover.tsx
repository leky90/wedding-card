import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { CornerFloral } from "@/components/ui/Ornaments";
import { cn } from "@/lib/utils";
import { weddingConfig } from "@/lib/wedding-config";

/** Sự kiện phát ra khi khách mở thiệp — nơi khác (nhạc nền) lắng nghe. */
export const INVITATION_OPEN_EVENT = "invitation:open";

/** Màn hình bìa "Mở thiệp" — khoá cuộn cho tới khi khách chạm mở. */
export function Cover() {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (opened) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

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
      id="invitation-cover"
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-cream px-6 transition-all duration-1000 ease-in-out",
        opened && "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      {/* khung viền kép + hoa 4 góc */}
      <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-primary/25 md:inset-6" />
      <div className="pointer-events-none absolute inset-5 rounded-[20px] border border-primary/10 md:inset-8" />
      <CornerFloral className="pointer-events-none absolute left-5 top-5 h-20 w-20 text-primary/40 md:left-9 md:top-9 md:h-36 md:w-36" />
      <CornerFloral className="pointer-events-none absolute right-5 top-5 h-20 w-20 -scale-x-100 text-primary/40 md:right-9 md:top-9 md:h-36 md:w-36" />
      <CornerFloral className="pointer-events-none absolute bottom-5 left-5 h-20 w-20 -scale-y-100 text-primary/40 md:bottom-9 md:left-9 md:h-36 md:w-36" />
      <CornerFloral className="pointer-events-none absolute bottom-5 right-5 h-20 w-20 -scale-100 text-primary/40 md:bottom-9 md:right-9 md:h-36 md:w-36" />

      <div className="relative text-center">
        <p className="rise text-[11px] font-semibold uppercase tracking-[0.5em] text-primary md:text-xs" style={{ animationDelay: "150ms" }}>
          Thiệp mời cưới
        </p>

        <div
          className="rise mt-6 flex flex-col items-center justify-center gap-1 font-script text-5xl leading-snug text-primary-deep md:flex-row md:gap-5 md:text-7xl"
          style={{ animationDelay: "320ms" }}
        >
          <span>{groom.name}</span>
          <Heart className="animate-heart h-6 w-6 fill-rose-mid text-rose-mid md:h-8 md:w-8" aria-hidden />
          <span>{bride.name}</span>
        </div>

        <p className="rise mt-6 font-display text-sm tracking-[0.35em] text-ink md:text-base" style={{ animationDelay: "480ms" }}>
          {wedding.dayLabel.toUpperCase()} · {wedding.displayDate}
        </p>

        <div className="rise mt-10" style={{ animationDelay: "660ms" }}>
          <button
            type="button"
            onClick={open}
            aria-label="Mở thiệp mời"
            className="group relative inline-flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-card transition duration-300 hover:scale-105 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:h-28 md:w-28"
          >
            <span aria-hidden className="absolute inset-0 rounded-full border border-primary/60" style={{ animation: "ring-pulse 2.4s ease-out infinite" }} />
            <span aria-hidden className="absolute inset-0 rounded-full border border-primary/40" style={{ animation: "ring-pulse 2.4s ease-out 1.2s infinite" }} />
            <span className="font-script text-2xl md:text-3xl">Mở thiệp</span>
          </button>
          <p className="mt-5 text-xs text-muted">Chạm để mở thiệp mời</p>
        </div>
      </div>
    </div>
  );
}
