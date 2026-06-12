import type { RsvpPayload } from "@/lib/api";
import { weddingConfig, type Wish } from "@/lib/wedding-config";

/**
 * Chế độ demo (chưa cấu hình Supabase): lưu phản hồi vào localStorage
 * của máy khách để form vẫn hoạt động trọn vẹn.
 */

const WISH_KEY = "wedding-wishes";
const RSVP_KEY = "wedding-rsvp";

function readArray<T>(key: string): T[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function appendItem<T>(key: string, item: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify([...readArray<T>(key), item]));
  } catch {
    // storage bị chặn/đầy — bỏ qua, không chặn trải nghiệm khách
  }
}

/** Lời chúc đã lưu trên máy (mới nhất trước) + lời chúc mẫu trong config. */
export function loadLocalWishes(): Wish[] {
  return [...readArray<Wish>(WISH_KEY).reverse(), ...weddingConfig.wishes];
}

export function addLocalWish(wish: Wish) {
  appendItem(WISH_KEY, wish);
}

export function saveLocalRsvp(entry: RsvpPayload & { sentAt: string }) {
  appendItem(RSVP_KEY, entry);
}
