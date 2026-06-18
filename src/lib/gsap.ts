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
