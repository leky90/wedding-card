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
      <path d="M6 13 H82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M138 13 H214" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="92" cy="13" r="2" fill="currentColor" />
      <circle cx="128" cy="13" r="2" fill="currentColor" />
      <path
        d="M110 20.5 c-7.5-6.2-12-9.8-12-14.3 a6 6 0 0 1 11-3.3 a6 6 0 0 1 11 3.3 c0 4.5-4.5 8.1-10 14.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Cụm hoa nhỏ đặt trên đỉnh khung ảnh vòm. */
export function BloomCluster(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 44" fill="none" aria-hidden="true" {...props}>
      <path d="M8 34 Q 70 10 132 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M40 27 q -6 -10 -16 -10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".6" />
      <path d="M100 27 q 6 -10 16 -10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".6" />
      <g fill="currentColor">
        <circle cx="70" cy="16" r="4" opacity=".9" />
        <circle cx="63" cy="13" r="3.2" opacity=".65" />
        <circle cx="77" cy="13" r="3.2" opacity=".65" />
        <circle cx="66" cy="21" r="3.2" opacity=".65" />
        <circle cx="74" cy="21" r="3.2" opacity=".65" />
        <circle cx="24" cy="17" r="3.4" opacity=".8" />
        <circle cx="116" cy="17" r="3.4" opacity=".8" />
        <circle cx="44" cy="25" r="2.6" opacity=".55" />
        <circle cx="96" cy="25" r="2.6" opacity=".55" />
      </g>
      <path d="M52 30 q 6 -8 14 -7 q -4 9 -14 7z" fill="currentColor" opacity=".5" />
      <path d="M88 30 q -6 -8 -14 -7 q 4 9 14 7z" fill="currentColor" opacity=".5" />
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
