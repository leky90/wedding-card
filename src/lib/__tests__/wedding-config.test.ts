import { describe, expect, it } from "vitest";

import { weddingConfig } from "@/lib/wedding-config";

/**
 * Kiểm tra tính toàn vẹn của nội dung thiệp — chạy trong CI nên sửa config
 * sai (ngày không hợp lệ, thiếu ảnh, lỗi typographic) là build fail ngay.
 */

/** Gom mọi chuỗi khách sẽ NHÌN THẤY trên thiệp */
function visibleStrings(): string[] {
  const { couple, wedding, invitation, events, gallery, wishes, dayTimeline } = weddingConfig;
  const personStrings = [couple.groom, couple.bride].flatMap((p) => [
    p.name,
    p.fullName,
    p.intro,
    p.lineage ?? "",
    p.hometown ?? "",
    p.parents.father,
    p.parents.mother,
  ]);
  return [
    ...personStrings,
    wedding.displayDate,
    wedding.dayLabel,
    wedding.lunarDate,
    invitation.headline,
    invitation.message,
    invitation.thankYou1,
    invitation.thankYou2,
    ...events.flatMap((e) => [e.name, e.dateLabel, e.lunarLabel ?? "", e.venue, e.address]),
    ...gallery.map((g) => g.alt),
    ...wishes.flatMap((w) => [w.name, w.message]),
    ...dayTimeline.map((t) => t.label),
  ];
}

describe("wedding-config: nội dung hiển thị", () => {
  it("không chứa em-dash (—) hay en-dash (–) trong chuỗi hiển thị", () => {
    for (const text of visibleStrings()) {
      expect(text, `Chuỗi vi phạm: "${text}"`).not.toMatch(/[—–]/);
    }
  });

  it("lời cảm ơn có đủ hai đoạn, không rỗng", () => {
    expect(weddingConfig.invitation.thankYou1.trim().length).toBeGreaterThan(0);
    expect(weddingConfig.invitation.thankYou2.trim().length).toBeGreaterThan(0);
  });

  it("ngày cưới và thời gian sự kiện là ISO hợp lệ, kết thúc sau bắt đầu", () => {
    expect(Number.isNaN(new Date(weddingConfig.wedding.dateIso).getTime())).toBe(false);
    for (const event of weddingConfig.events) {
      const start = new Date(event.startIso).getTime();
      const end = new Date(event.endIso).getTime();
      expect(Number.isNaN(start), `${event.id}: startIso không hợp lệ`).toBe(false);
      expect(Number.isNaN(end), `${event.id}: endIso không hợp lệ`).toBe(false);
      expect(end, `${event.id}: endIso phải sau startIso`).toBeGreaterThan(start);
    }
  });

  it("ảnh khai báo đúng đường dẫn /images và kích thước dương", () => {
    const imagePaths = [
      weddingConfig.wedding.heroImage,
      weddingConfig.couple.groom.image,
      weddingConfig.couple.bride.image,
      ...weddingConfig.gallery.map((g) => g.src),
    ];
    for (const path of imagePaths) {
      expect(path).toMatch(/^\/images\//);
    }
    for (const photo of weddingConfig.gallery) {
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it("imagePosition (nếu có) đúng định dạng CSS object-position \"x% y%\"", () => {
    const positions = [
      weddingConfig.wedding.heroImagePosition,
      weddingConfig.couple.groom.imagePosition,
      weddingConfig.couple.bride.imagePosition,
    ].filter((p): p is string => Boolean(p));
    for (const pos of positions) {
      expect(pos).toMatch(/^\d{1,3}% \d{1,3}%$/);
    }
  });

  it("mỗi sự kiện có id duy nhất", () => {
    const ids = weddingConfig.events.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("nhạc nền: trỏ tới file trong /music và có tên bài + ca sĩ", () => {
    expect(weddingConfig.music.src).toMatch(/^\/music\/.+\.(mp3|ogg|m4a)$/);
    expect(weddingConfig.music.title.trim().length).toBeGreaterThan(0);
    expect(weddingConfig.music.artist.trim().length).toBeGreaterThan(0);
  });

  it("trình tự ngày cưới: mỗi mốc có giờ dạng HH:MM và nhãn không rỗng", () => {
    expect(weddingConfig.dayTimeline.length).toBeGreaterThanOrEqual(3);
    for (const step of weddingConfig.dayTimeline) {
      expect(step.time, `mốc "${step.label}"`).toMatch(/^\d{2}:\d{2}$/);
      expect(step.label.trim().length).toBeGreaterThan(0);
    }
  });
});
