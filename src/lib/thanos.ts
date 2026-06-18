/**
 * Bố cục particle cho hiệu ứng "tan thành bụi rồi kết tụ" (kiểu Thanos snap, đảo chiều)
 * — ảnh hiện lên từ bụi bay vào và kết lại. Phần hình học/định thời ở đây là THUẦN
 * (xác định theo seed) nên test được; màu particle lấy từ ảnh thu nhỏ lúc chạy.
 */

/** Dải delay tối đa (giây-chuẩn-hoá) — tạo hiệu ứng "quét" có hướng khi kết tụ. */
export const MAX_DELAY = 0.55;

export interface Particle {
  /** ô lưới (cột/hàng) để tra màu từ ảnh thu nhỏ */
  col: number;
  row: number;
  /** vị trí "nhà" (px trong khung) + kích thước ô (px) */
  hx: number;
  hy: number;
  cw: number;
  ch: number;
  /** lệch xuất phát (px) khi chưa kết tụ */
  ox: number;
  oy: number;
  /** thời điểm bắt đầu trong [0, MAX_DELAY] */
  delay: number;
}

/** PRNG xác định (mulberry32) để layout nhất quán theo seed. */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sinh particle cho lưới cols×rows phủ khung boxW×boxH.
 * Quét chéo từ trái-trên → phải-dưới (như cảnh tan biến), kèm jitter; mỗi particle
 * tản ra một hướng ngẫu nhiên (hơi bay lên) khi chưa kết tụ.
 */
export function buildParticleLayout(
  cols: number,
  rows: number,
  boxW: number,
  boxH: number,
  seed = 1,
): Particle[] {
  const rand = mulberry32(seed);
  const cw = boxW / cols;
  const ch = boxH / rows;
  const out: Particle[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sweep = (col / cols) * 0.6 + (row / rows) * 0.4;
      const delay = Math.min(MAX_DELAY, sweep * MAX_DELAY + rand() * 0.12);
      const ang = rand() * Math.PI * 2;
      const dist = 28 + rand() * 64;
      out.push({
        col,
        row,
        hx: col * cw,
        hy: row * ch,
        cw: cw + 0.6, // chồng mép nhẹ để không hở khe khi kết tụ
        ch: ch + 0.6,
        ox: Math.cos(ang) * dist,
        oy: Math.sin(ang) * dist - 16,
        delay,
      });
    }
  }
  return out;
}

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
