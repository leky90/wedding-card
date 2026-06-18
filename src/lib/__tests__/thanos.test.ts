import { describe, expect, it } from "vitest";

import { buildParticleLayout, easeOutCubic, MAX_DELAY } from "@/lib/thanos";

describe("buildParticleLayout", () => {
  it("tạo đúng cols*rows particle, phủ kín khung", () => {
    const parts = buildParticleLayout(4, 3, 200, 150);
    expect(parts).toHaveLength(12);
    for (const p of parts) {
      expect(p.hx).toBeGreaterThanOrEqual(0);
      expect(p.hx).toBeLessThan(200);
      expect(p.hy).toBeGreaterThanOrEqual(0);
      expect(p.hy).toBeLessThan(150);
      expect(p.cw).toBeGreaterThan(0);
      expect(p.ch).toBeGreaterThan(0);
    }
  });

  it("delay nằm trong [0, MAX_DELAY] để các particle hoàn tất trước t=1", () => {
    const parts = buildParticleLayout(20, 20, 300, 300);
    for (const p of parts) {
      expect(p.delay).toBeGreaterThanOrEqual(0);
      expect(p.delay).toBeLessThanOrEqual(MAX_DELAY);
    }
  });

  it("xác định (cùng seed → cùng kết quả) để test ổn định", () => {
    const a = buildParticleLayout(6, 6, 120, 120, 7);
    const b = buildParticleLayout(6, 6, 120, 120, 7);
    expect(a[10]).toEqual(b[10]);
    const c = buildParticleLayout(6, 6, 120, 120, 8);
    expect(c[10].ox).not.toEqual(a[10].ox);
  });
});

describe("easeOutCubic", () => {
  it("đi từ 0 tới 1 và lồi (ease-out)", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});
