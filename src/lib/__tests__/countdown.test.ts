import { describe, expect, it } from "vitest";

import { buildGoogleCalendarUrl, getTimeLeft } from "@/lib/countdown";

describe("getTimeLeft", () => {
  it("tách đúng ngày/giờ/phút/giây khi chưa tới ngày cưới", () => {
    const now = new Date("2026-12-01T00:00:00+07:00");
    const result = getTimeLeft("2026-12-03T05:30:45+07:00", now);
    expect(result).toEqual({
      days: 2,
      hours: 5,
      minutes: 30,
      seconds: 45,
      isOver: false,
    });
  });

  it("trả về toàn 0 và isOver=true khi đã qua ngày cưới", () => {
    const now = new Date("2027-01-01T00:00:00+07:00");
    expect(getTimeLeft("2026-12-20T18:00:00+07:00", now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: true,
    });
  });

  it("isOver=true tại đúng thời điểm diễn ra", () => {
    const at = new Date("2026-12-20T18:00:00+07:00");
    expect(getTimeLeft("2026-12-20T18:00:00+07:00", at).isOver).toBe(true);
  });
});

describe("buildGoogleCalendarUrl", () => {
  it("tạo link lịch đúng định dạng UTC và giữ nguyên nội dung tiếng Việt", () => {
    const url = buildGoogleCalendarUrl({
      title: "Lễ Thành Hôn — Quân & Hà",
      startIso: "2026-12-20T09:00:00+07:00",
      endIso: "2026-12-20T11:00:00+07:00",
      location: "TP. Hồ Chí Minh",
    });
    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe(
      "https://calendar.google.com/calendar/render",
    );
    expect(parsed.searchParams.get("action")).toBe("TEMPLATE");
    expect(parsed.searchParams.get("dates")).toBe(
      "20261220T020000Z/20261220T040000Z",
    );
    expect(parsed.searchParams.get("text")).toBe("Lễ Thành Hôn — Quân & Hà");
    expect(parsed.searchParams.get("location")).toBe("TP. Hồ Chí Minh");
  });
});
