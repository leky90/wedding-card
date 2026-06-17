import type { CSSProperties } from "react";

import { asset } from "@/lib/assets";
import { blurPath } from "@/lib/photo";
import { cn } from "@/lib/utils";

/**
 * Nền ảnh soft-focus dùng chung: 1 lớp ảnh mờ (LQIP phóng to + blur) + 1 lớp phủ
 * (scrim) đặt TUYỆT ĐỐI phía sau nội dung thật của section. Ảnh sắc nét (Hero, Couple,
 * Story, Gallery) KHÔNG đi qua đây. Chỉ CSS tĩnh nên không cần thêm rule reduced-motion.
 *
 * Mỗi scrim là "hợp đồng" tương phản — đã tinh chỉnh theo vùng SÁNG nhất của ảnh để
 * chữ luôn đạt WCAG AA:
 *   haze   → trang kem nổi trên ảnh mờ; chữ ĐẬM (ink/wine) đọc tốt  (ink ≥6:1, wine ≥7:1)
 *   veil   → để lộ ảnh nhiều hơn; chỉ cho nhãn lớn ≥24px (không cho body dài)
 *   cover  → ảnh tối cho chữ SÁNG (Cover/Hero); làm tối bằng lớp ink trung tính + chút tint wine
 *   footer → wine gần đặc phủ ảnh (Footer); chữ trắng giữ ~8:1, ảnh chỉ là vân nền
 */
export type ScrimVariant = "haze" | "veil" | "cover" | "footer";

const SCRIM: Record<ScrimVariant, string> = {
  haze: "linear-gradient(180deg, rgba(255,253,251,.90) 0%, rgba(250,246,243,.86) 50%, rgba(255,253,251,.92) 100%)",
  veil: "linear-gradient(180deg, rgba(255,253,251,.72) 0%, rgba(250,246,243,.80) 100%)",
  cover:
    "radial-gradient(120% 90% at 50% 42%, rgba(40,12,16,.30) 0%, rgba(40,12,16,.55) 55%, rgba(40,12,16,.74) 100%), linear-gradient(0deg, rgba(124,27,34,.16), rgba(124,27,34,.16))",
  footer:
    "linear-gradient(180deg, rgba(124,27,34,.93) 0%, rgba(86,16,26,.96) 60%, rgba(58,12,19,.985) 100%)",
};

const DEFAULT_BLUR: Record<ScrimVariant, number> = {
  haze: 18,
  veil: 18,
  cover: 16,
  footer: 20,
};

interface PhotoBackdropProps {
  /** Đường dẫn ảnh gốc trong config (vd "/images/hero-couple.jpg"); LQIP suy ra tự động */
  image: string;
  /** Công thức tương phản theo tên */
  scrim: ScrimVariant;
  /** Bán kính blur (px) trên LQIP; mặc định theo scrim */
  blur?: number;
  /** Phóng to để giấu mép blur trong suốt; không vượt 1.15 */
  scale?: number;
  /** object-position cho ảnh */
  position?: string;
  /** true CHỈ cho Cover + Hero (trên màn đầu) */
  eager?: boolean;
  /** Viền chỉ vàng mảnh trên/dưới (kiểu khung ảnh) */
  frame?: boolean;
  className?: string;
}

export function PhotoBackdrop({
  image,
  scrim,
  blur,
  scale = 1.12,
  position = "50% 30%",
  eager = false,
  frame = false,
  className,
}: PhotoBackdropProps) {
  const radius = blur ?? DEFAULT_BLUR[scrim];
  const imgStyle: CSSProperties = {
    objectPosition: position,
    filter: `blur(${radius}px)`,
    transform: `scale(${scale})`,
    transformOrigin: "center",
  };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      style={
        frame
          ? { boxShadow: "inset 0 1px 0 rgba(184,154,110,.22), inset 0 -1px 0 rgba(184,154,110,.22)" }
          : undefined
      }
    >
      <img
        src={asset(blurPath(image))}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "low"}
        className="absolute inset-0 h-full w-full object-cover"
        style={imgStyle}
      />
      <div className="absolute inset-0" style={{ background: SCRIM[scrim] }} />
    </div>
  );
}
