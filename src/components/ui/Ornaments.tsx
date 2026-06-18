import type { SVGProps } from "react";

/**
 * Bộ hoạ tiết SVG trang trí dùng chung — vẽ theo `currentColor`
 * nên đổi màu bằng class `text-*` ở nơi sử dụng.
 */

/** Cụm hoa hồng + cành lá đặt ở góc khung (mặc định góc trên-trái, lật bằng scale). */
export function CornerFloral(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 150 150" fill="none" aria-hidden="true" {...props}>
      {/* bông hồng xoáy */}
      <path
        d="M44 44 a6 6 0 1 1 12 1 a11 11 0 1 1 -22 -2 a16 16 0 1 1 32 3 a22 22 0 1 1 -44 -4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* cành chính */}
      <path
        d="M58 62 C 82 84, 104 100, 138 110"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M52 70 C 60 96, 74 122, 96 140"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* lá */}
      <path d="M84 86 q 14 -12 26 -6 q -8 14 -26 6z" fill="currentColor" opacity=".75" />
      <path d="M104 100 q 16 -8 26 0 q -10 12 -26 0z" fill="currentColor" opacity=".55" />
      <path d="M66 100 q -2 -18 10 -26 q 8 14 -10 26z" fill="currentColor" opacity=".75" />
      <path d="M78 124 q -4 -16 6 -26 q 10 12 -6 26z" fill="currentColor" opacity=".55" />
      {/* nụ hoa */}
      <circle cx="138" cy="110" r="5" fill="currentColor" />
      <circle cx="96" cy="140" r="5" fill="currentColor" />
      <path d="M30 78 q 10 6 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="96" r="4" fill="currentColor" opacity=".8" />
    </svg>
  );
}

/** Đường kẻ ngang hai bên + trái tim ở giữa, dùng dưới tiêu đề section. */
export function HeartDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 26" fill="none" aria-hidden="true" {...props}>
      <path className="hd-line" d="M6 13 H82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path className="hd-line" d="M138 13 H214" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="92" cy="13" r="2" fill="currentColor" />
      <circle cx="128" cy="13" r="2" fill="currentColor" />
      <path
        className="hd-heart"
        d="M110 20.5 c-7.5-6.2-12-9.8-12-14.3 a6 6 0 0 1 11-3.3 a6 6 0 0 1 11 3.3 c0 4.5-4.5 8.1-10 14.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Đôi nhẫn cưới lồng nhau + tia lấp lánh — dùng cho mục "Lời Cảm Ơn". */
export function WeddingRings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* tia lấp lánh */}
      <path d="M21 13 V6 M17.5 9.5 H24.5" opacity=".85" />
      <path d="M61 17 V12 M58.5 14.5 H63.5" opacity=".7" />
      <path d="M41 9 V4 M38.5 6.5 H43.5" opacity=".6" />
      {/* hai nhẫn lồng nhau */}
      <circle cx="33" cy="41" r="15" />
      <circle cx="49" cy="41" r="15" />
      {/* viên đá nhỏ trên nhẫn trái */}
      <path d="M33 26 l-3.4 -4.2 3.4 -4.2 3.4 4.2 z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Đôi nhẫn cưới lồng nhau (icon sự kiện Lễ Thành Hôn). */
export function RingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9.2" cy="14.5" r="5.6" />
      <circle cx="14.8" cy="14.5" r="5.6" />
      <path d="M12 6.6 10.2 4.4 12 2.4l1.8 2z" />
    </svg>
  );
}
