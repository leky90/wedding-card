import { describe, expect, it } from "vitest";

// Vite ?raw: nạp nội dung index.html dạng chuỗi (không cần node:fs)
import html from "../../../index.html?raw";

/**
 * Bảo vệ thẻ SEO / Open Graph trong index.html — xoá nhầm là test fail.
 * Crawler MXH (Facebook, Zalo...) đọc HTML tĩnh nên các thẻ này phải nằm sẵn.
 */
describe("SEO / Open Graph meta", () => {
  it("có description, canonical và title", () => {
    expect(html).toMatch(/<meta\s+name="description"\s+content=".+"/);
    expect(html).toMatch(/<link\s+rel="canonical"\s+href="https:\/\/.+"/);
    expect(html).toMatch(/<title>.+<\/title>/);
  });

  it("có đủ thẻ Open Graph (title, description, type, url, image tuyệt đối)", () => {
    for (const prop of ["og:title", "og:description", "og:type", "og:url", "og:image"]) {
      expect(html, `thiếu ${prop}`).toContain(`property="${prop}"`);
    }
    // og:image phải là URL tuyệt đối (MXH không nhận đường dẫn tương đối)
    expect(html).toMatch(/property="og:image"\s+content="https:\/\/[^"]+\.(jpg|png)"/);
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
  });

  it("có Twitter card dạng ảnh lớn", () => {
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toMatch(/name="twitter:image"\s+content="https:\/\/.+"/);
  });
});
