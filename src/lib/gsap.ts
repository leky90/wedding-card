import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INVITATION_OPEN_EVENT } from "@/components/Cover";

/**
 * Đăng ký ScrollTrigger DUY NHẤT một lần ở đây — các section import { gsap, ScrollTrigger }
 * từ file này, không tự registerPlugin. Mọi hiệu ứng scroll nằm trong gsap.context +
 * gsap.matchMedia("(prefers-reduced-motion: no-preference)") nên tự tắt khi giảm chuyển động.
 */
gsap.registerPlugin(ScrollTrigger);
// Thanh địa chỉ iOS co/giãn không được làm "giật" lại pin
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

/**
 * Bảng ease / thời lượng / stagger / scrub DÙNG CHUNG để toàn site cùng một "physics"
 * (khớp với token CSS --ease-* trong index.css). Mọi section import từ đây thay vì viết
 * literal, nên cảm giác chuyển động đồng nhất.
 */
export const EASE = { veil: "expo.out", silk: "power3.out", press: "back.out(1.5)", drift: "none" } as const;
export const DUR = { veil: 1.0, line: 0.6, pop: 0.55, head: 0.7 } as const; // giây; mỗi entrance < 1.4s
export const STAG = { line: 0.07, tile: 0.1 } as const;
export const SCRUB = { photo: 0.6, soft: 0.8, settle: 0.9 } as const; // độ trễ mượt của scrub
export const DRIFT = { portrait: 18, floral: 60, copy: 18, grid: 18 } as const; // px y-travel tối đa

/** Timeline scroll-trigger chạy 1 lần cho 1 section. */
export function sectionTl(trigger: Element | null, start = "top 80%") {
  return gsap.timeline({ scrollTrigger: { trigger: trigger as Element, start, once: true } });
}

/**
 * Refresh ScrollTrigger SAU khi màn bìa mở khoá cuộn (Cover gỡ overlay sau 1000ms) và sau
 * khi font/ảnh thay đổi layout. Trigger dựng lúc mount sẽ cache sai chiều cao vì <body>
 * đang overflow:hidden ~1s đầu. Gọi hook này MỘT lần ở App (trên <main>).
 */
export function useScrollRefresh() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    // Cover phát sự kiện này khi bấm "Mở thiệp"; overlay bị gỡ 1000ms sau đó.
    const onOpen = () => window.setTimeout(refresh, 1100);
    window.addEventListener(INVITATION_OPEN_EVENT, onOpen);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener(INVITATION_OPEN_EVENT, onOpen);
      window.removeEventListener("load", refresh);
    };
  }, []);
}
