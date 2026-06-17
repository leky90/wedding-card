import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

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
      {/* khung viền kép mảnh — tối giản như thiệp giấy */}
      <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-gold/35 md:inset-6" />
      <div className="pointer-events-none absolute inset-5 rounded-[20px] border border-primary/10 md:inset-8" />

      <div className="relative text-center">
        <p
          className="rise font-display text-5xl font-bold leading-none tracking-[0.06em] text-primary-deep md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {initialOf(bride.name)}
          <span className="px-1.5 font-normal text-primary/45">&amp;</span>
          {initialOf(groom.name)}
        </p>
        <p className="rise mt-5 text-[11px] font-semibold uppercase tracking-[0.5em] text-rose-mid md:text-xs" style={{ animationDelay: "260ms" }}>
          Thiệp mời cưới
        </p>

        <div
          className="rise mt-6 flex flex-col items-center justify-center gap-1 font-script text-5xl leading-snug text-primary-deep md:flex-row md:gap-5 md:text-7xl"
          style={{ animationDelay: "400ms" }}
        >
          <span>{bride.name}</span>
          <Heart className="animate-heart h-6 w-6 fill-primary text-primary md:h-8 md:w-8" aria-hidden />
          <span>{groom.name}</span>
        </div>

        <p className="rise mt-6 font-display text-sm tracking-[0.35em] text-ink md:text-base" style={{ animationDelay: "540ms" }}>
          {wedding.dayLabel.toUpperCase()} · {wedding.displayDate}
        </p>

        <div className="rise mt-10" style={{ animationDelay: "700ms" }}>
          <button
            type="button"
            onClick={open}
            aria-label="Mở thiệp mời"
            className="group relative inline-flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-card transition duration-300 hover:scale-105 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:h-28 md:w-28"
          >
            <span aria-hidden className="absolute inset-0 rounded-full border border-primary/60" style={{ animation: "ring-pulse 2.4s ease-out infinite" }} />
            <span aria-hidden className="absolute inset-0 rounded-full border border-primary/40" style={{ animation: "ring-pulse 2.4s ease-out 1.2s infinite" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">Mở thiệp</span>
          </button>
          <p className="mt-5 text-xs text-muted">Chạm để mở thiệp mời</p>
        </div>
      </div>
    </div>
  );
}
