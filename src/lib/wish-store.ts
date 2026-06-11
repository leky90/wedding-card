import { weddingConfig, type Wish } from "@/lib/wedding-config";

/**
 * Store nhỏ cho sổ lưu bút, đọc/ghi localStorage — dùng qua useSyncExternalStore
 * để SSR và client không lệch nhau (chưa có backend; sau này nối API chỉ cần
 * thay file này).
 */

const STORAGE_KEY = "wedding-wishes";

const listeners = new Set<() => void>();
// Phòng khi localStorage bị chặn (trình duyệt riêng tư) — giữ lời chúc trong phiên
let memoryOverlay: Wish[] = [];
let version = 0;
let cache: { key: string; wishes: Wish[] } | null = null;

function readJson(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parseWishes(json: string): Wish[] {
  try {
    const parsed: unknown = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as Wish[]) : [];
  } catch {
    return [];
  }
}

/** Lời chúc mới nhất trước, lời chúc mẫu (config) cuối danh sách. */
export function getWishesSnapshot(): Wish[] {
  const json = readJson();
  const key = `${version}:${json}`;
  if (!cache || cache.key !== key) {
    const saved = [...memoryOverlay, ...parseWishes(json)];
    cache = { key, wishes: [...saved.reverse(), ...weddingConfig.wishes] };
  }
  return cache.wishes;
}

const SERVER_WISHES = weddingConfig.wishes;

export function getServerWishesSnapshot(): Wish[] {
  return SERVER_WISHES;
}

export function subscribeWishes(callback: () => void): () => void {
  listeners.add(callback);
  // đồng bộ nếu khách mở thiệp ở tab khác
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function addWish(wish: Wish) {
  try {
    const saved = parseWishes(readJson());
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, wish]));
  } catch {
    memoryOverlay = [...memoryOverlay, wish];
  }
  version += 1;
  listeners.forEach((listener) => listener());
}
