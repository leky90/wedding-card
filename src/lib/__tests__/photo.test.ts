import { describe, expect, it } from "vitest";

import { blurPath } from "@/lib/photo";

describe("blurPath", () => {
  it("ánh xạ ảnh trong /images sang thư mục /images/blur", () => {
    expect(blurPath("/images/hero-couple.jpg")).toBe("/images/blur/hero-couple.jpg");
    expect(blurPath("/images/gallery-7.jpg")).toBe("/images/blur/gallery-7.jpg");
  });

  it("chỉ thay thư mục, giữ nguyên tên file và phần mở rộng", () => {
    expect(blurPath("/images/story-2.jpg")).toMatch(/^\/images\/blur\/story-2\.jpg$/);
  });

  it("đường dẫn không nằm trong /images thì giữ nguyên", () => {
    expect(blurPath("/music/song.mp3")).toBe("/music/song.mp3");
  });
});
