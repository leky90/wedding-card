import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Trễ thêm (ms) để các phần tử cạnh nhau xuất hiện so le */
  delay?: number;
  /**
   * scale = phóng nhẹ (ảnh); stagger = các con trực tiếp hiện so le
   * (mỗi con gắn style={{ "--i": n }}).
   */
  variant?: "scale" | "stagger";
}

/** Bọc nội dung để fade-up nhẹ khi cuộn tới (IntersectionObserver, chạy 1 lần). */
export function Reveal({ children, className, delay = 0, variant }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        variant === "scale" && "reveal-scale",
        variant === "stagger" && "reveal-stagger",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
