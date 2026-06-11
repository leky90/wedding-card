import type { CSSProperties } from "react";

interface PetalSpec {
  left: string;
  size: number;
  delay: number;
  dur: number;
  drift: number;
  opacity: number;
  color: string;
}

/**
 * Thông số cố định (không random) để server render ổn định,
 * không lệch hydration. Tối đa 12 cánh hoa cho nhẹ máy yếu.
 */
const PETALS: PetalSpec[] = [
  { left: "4%", size: 16, delay: 0, dur: 14, drift: 40, opacity: 0.55, color: "#e89aa8" },
  { left: "12%", size: 12, delay: 3.5, dur: 17, drift: -30, opacity: 0.45, color: "#d4677d" },
  { left: "21%", size: 18, delay: 7, dur: 13, drift: 55, opacity: 0.6, color: "#f3c6ce" },
  { left: "30%", size: 11, delay: 1.5, dur: 18, drift: -45, opacity: 0.4, color: "#e89aa8" },
  { left: "39%", size: 15, delay: 9, dur: 15, drift: 35, opacity: 0.55, color: "#d4677d" },
  { left: "48%", size: 13, delay: 5, dur: 16, drift: -25, opacity: 0.5, color: "#f3c6ce" },
  { left: "57%", size: 17, delay: 11, dur: 14, drift: 50, opacity: 0.6, color: "#e89aa8" },
  { left: "66%", size: 12, delay: 2.5, dur: 18, drift: -40, opacity: 0.45, color: "#f3c6ce" },
  { left: "74%", size: 16, delay: 8, dur: 13.5, drift: 30, opacity: 0.55, color: "#d4677d" },
  { left: "82%", size: 11, delay: 4.5, dur: 17, drift: -35, opacity: 0.4, color: "#e89aa8" },
  { left: "90%", size: 15, delay: 10, dur: 15, drift: 45, opacity: 0.55, color: "#f3c6ce" },
  { left: "96%", size: 13, delay: 6, dur: 16, drift: -50, opacity: 0.5, color: "#d4677d" },
];

/** Lớp cánh hoa rơi phủ toàn trang — thuần CSS, không cần JS. */
export function Petals() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {PETALS.map((petal, i) => (
        <svg
          key={i}
          className="petal"
          width={petal.size}
          height={petal.size}
          viewBox="0 0 24 24"
          style={
            {
              "--left": petal.left,
              "--delay": `${petal.delay}s`,
              "--dur": `${petal.dur}s`,
              "--drift": `${petal.drift}px`,
              "--petal-o": petal.opacity,
            } as CSSProperties
          }
        >
          <path d="M12 2 C 6.5 7, 4.5 13, 12 22 C 19.5 13, 17.5 7, 12 2 Z" fill={petal.color} />
        </svg>
      ))}
    </div>
  );
}
