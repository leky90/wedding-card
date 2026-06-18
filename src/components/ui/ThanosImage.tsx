import { useEffect, useRef, type CSSProperties } from "react";

import { asset } from "@/lib/assets";
import { buildParticleLayout, easeOutCubic, MAX_DELAY } from "@/lib/thanos";
import { cn } from "@/lib/utils";

interface ThanosImageProps {
  /** Đường dẫn ảnh trong /public (asset() áp dụng bên trong) */
  src: string;
  alt: string;
  /** class cho <img> */
  className?: string;
  /** class cho span bọc ngoài */
  wrapClassName?: string;
  /** true = ảnh phủ kín khung cha (absolute inset-0 object-cover); false = ảnh tự định chiều cao */
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  imgStyle?: CSSProperties;
}

const TINT: [number, number, number] = [199, 154, 146]; // rose-gold: bụi ánh kim
const DURATION = 1500;

/**
 * Ảnh "hiện lên từ bụi" (Thanos snap đảo chiều): khi cuộn tới, ảnh kết tụ từ các hạt
 * bụi rose-gold bay vào rồi lắng thành ảnh sắc nét. Thuần canvas (transform/opacity),
 * giới hạn ~3-4k hạt, chạy 1 lần rồi gỡ canvas. Tôn trọng prefers-reduced-motion.
 */
export function ThanosImage({
  src,
  alt,
  className,
  wrapClassName,
  fill = false,
  width,
  height,
  loading = "lazy",
  imgStyle,
}: ThanosImageProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !img || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return; // hiện ảnh bình thường

    img.style.opacity = "0"; // giấu ảnh thật cho tới khi kết tụ xong
    let raf = 0;
    let failsafe = 0;
    let played = false;

    // luôn hiện ảnh thật (kể cả khi rAF bị tab nền tạm dừng) — không bao giờ kẹt ẩn
    const reveal = () => {
      window.clearTimeout(failsafe);
      cancelAnimationFrame(raf);
      img.style.opacity = "1";
      if (canvas) canvas.style.display = "none";
    };

    // Phòng xa: nếu IntersectionObserver không bao giờ kích hoạt (môi trường không
    // vẽ/compositing lạ), vẫn hiện ảnh sau 5s — KHÔNG bao giờ để ảnh kẹt ẩn.
    failsafe = window.setTimeout(reveal, 5000);

    const dissolveIn = () => {
      img.style.opacity = "0"; // chắc chắn chỉ thấy bụi trên canvas trong lúc kết tụ
      const boxW = Math.round(wrap.clientWidth);
      const boxH = Math.round(wrap.clientHeight);
      const ctx = canvas.getContext("2d");
      if (!boxW || !boxH || !ctx) {
        reveal();
        return;
      }
      canvas.width = boxW;
      canvas.height = boxH;
      canvas.style.display = "block";

      const cols = Math.max(16, Math.min(54, Math.round(boxW / 5)));
      const rows = Math.max(12, Math.round(cols * (boxH / boxW)));

      // ảnh thu nhỏ để lấy màu từng ô (same-origin → không bị taint)
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d");
      if (!octx) {
        reveal();
        return;
      }
      octx.drawImage(img, 0, 0, cols, rows);
      let data: Uint8ClampedArray;
      try {
        data = octx.getImageData(0, 0, cols, rows).data;
      } catch {
        reveal(); // lỡ ảnh bị taint thì hiện thẳng
        return;
      }

      const parts = buildParticleLayout(cols, rows, boxW, boxH, 1);
      const span = 1 - MAX_DELAY;
      let t0 = 0;

      const frame = (now: number) => {
        if (!t0) t0 = now;
        const t = Math.min(1, (now - t0) / DURATION);
        ctx.clearRect(0, 0, boxW, boxH);
        for (const p of parts) {
          const local = easeOutCubic(Math.min(1, Math.max(0, (t - p.delay) / span)));
          if (local <= 0) continue;
          const idx = (p.row * cols + p.col) * 4;
          // bụi rose-gold → màu thật khi lắng xuống
          const r = Math.round(TINT[0] + (data[idx] - TINT[0]) * local);
          const g = Math.round(TINT[1] + (data[idx + 1] - TINT[1]) * local);
          const b = Math.round(TINT[2] + (data[idx + 2] - TINT[2]) * local);
          const grow = 0.4 + 0.6 * local;
          ctx.globalAlpha = local;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(p.hx + p.ox * (1 - local), p.hy + p.oy * (1 - local), p.cw * grow, p.ch * grow);
        }
        ctx.globalAlpha = 1;
        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          reveal();
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played) {
            played = true;
            io.disconnect();
            window.clearTimeout(failsafe);
            // chắc chắn ảnh hiện trong ~2.7s dù rAF bị tab nền tạm dừng
            failsafe = window.setTimeout(reveal, DURATION + 1200);
            const decoded = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
            decoded.then(dissolveIn);
          }
        }
      },
      { threshold: 0.28 },
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      img.style.opacity = ""; // img: node đã chụp ở đầu effect
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      className={cn(fill ? "absolute inset-0 block overflow-hidden" : "relative block overflow-hidden", wrapClassName)}
    >
      <img
        ref={imgRef}
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={cn(fill ? "h-full w-full object-cover" : "block h-auto w-full", className)}
        style={imgStyle}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ display: "none" }}
      />
    </span>
  );
}
