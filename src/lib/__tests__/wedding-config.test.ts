import { describe, expect, it } from "vitest";

import { weddingConfig } from "@/lib/wedding-config";

/**
 * Kiểm tra tính toàn vẹn của nội dung thiệp — chạy trong CI nên sửa config
 * sai (ngày không hợp lệ, thiếu ảnh, lỗi typographic) là build fail ngay.
 */

/** Gom mọi chuỗi khách sẽ NHÌN THẤY trên thiệp */
function visibleStrings(): string[] {
  const { couple, wedding, invitation, events, story, gallery, banks, wishes, dayTimeline } =
    weddingConfig;
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
    invitation.thankYou,
    ...events.flatMap((e) => [e.name, e.dateLabel, e.venue, e.address]),
    ...story.flatMap((s) => [s.year, s.title, s.description]),
    ...gallery.map((g) => g.alt),
    ...banks.flatMap((b) => [b.label, b.bank, b.accountName]),
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
      ...weddingConfig.story.map((s) => s.image),
      ...weddingConfig.gallery.map((g) => g.src),
      ...weddingConfig.banks.map((b) => b.qrImage),
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
      ...weddingConfig.story.map((s) => s.imagePosition),
    ].filter((p): p is string => Boolean(p));
    for (const pos of positions) {
      expect(pos).toMatch(/^\d{1,3}% \d{1,3}%$/);
    }
  });

  it("trình tự ngày cưới: mỗi mốc có giờ dạng HH:MM và nhãn không rỗng", () => {
    expect(weddingConfig.dayTimeline.length).toBeGreaterThanOrEqual(3);
    for (const step of weddingConfig.dayTimeline) {
      expect(step.time, `mốc "${step.label}"`).toMatch(/^\d{2}:\d{2}$/);
      expect(step.label.trim().length).toBeGreaterThan(0);
    }
  });
});
