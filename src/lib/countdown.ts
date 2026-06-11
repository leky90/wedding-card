const MS = {
  day: 86_400_000,
  hour: 3_600_000,
  minute: 60_000,
  second: 1_000,
} as const;

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

/** Tính thời gian còn lại tới ngày cưới (đẩy `now` vào để test được). */
export function getTimeLeft(targetIso: string, now: Date = new Date()): TimeLeft {
  const diff = new Date(targetIso).getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  return {
    days: Math.floor(diff / MS.day),
    hours: Math.floor((diff % MS.day) / MS.hour),
    minutes: Math.floor((diff % MS.hour) / MS.minute),
    seconds: Math.floor((diff % MS.minute) / MS.second),
    isOver: false,
  };
}

/** Tạo link "Thêm vào lịch" Google Calendar — không cần backend. */
export function buildGoogleCalendarUrl(event: {
  title: string;
  startIso: string;
  endIso: string;
  location: string;
  details?: string;
}): string {
  // Google Calendar nhận thời gian UTC dạng cơ bản: 20261220T020000Z
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${fmt(event.startIso)}/${fmt(event.endIso)}`,
    location: event.location,
    details: event.details ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
