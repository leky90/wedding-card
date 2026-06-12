import type { Wish } from "@/lib/wedding-config";

/**
 * Lớp gọi Supabase (PostgREST) bằng fetch thuần — không cần SDK, giữ bundle nhỏ.
 * Mọi hàm nhận config tường minh nên unit-test được. Component lấy config qua
 * getRemoteConfig(); trả null (chưa cấu hình env) thì dùng local-store thay thế.
 */

export interface RemoteConfig {
  url: string;
  anonKey: string;
}

export interface RsvpPayload {
  name: string;
  side: string;
  attend: "yes" | "no";
  guests: number;
  message: string;
}

type EnvLike = Record<string, string | undefined>;

export function getRemoteConfig(env: EnvLike = import.meta.env as EnvLike): RemoteConfig | null {
  const url = env.VITE_SUPABASE_URL?.trim().replace(/\/+$/, "");
  const anonKey = env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export const TABLES = {
  rsvp: "rsvp_responses",
  wishes: "wishes",
} as const;

function baseHeaders(config: RemoteConfig): Record<string, string> {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
    "Content-Type": "application/json",
  };
}

async function insertRow(config: RemoteConfig, table: string, payload: unknown): Promise<boolean> {
  try {
    const res = await fetch(`${config.url}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...baseHeaders(config), Prefer: "return=minimal" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    // mất mạng / CORS — component sẽ mời khách thử lại
    return false;
  }
}

export function insertRsvp(config: RemoteConfig, payload: RsvpPayload): Promise<boolean> {
  return insertRow(config, TABLES.rsvp, payload);
}

export function insertWish(config: RemoteConfig, wish: Wish): Promise<boolean> {
  return insertRow(config, TABLES.wishes, wish);
}

export async function fetchWishes(config: RemoteConfig, limit = 100): Promise<Wish[]> {
  try {
    const params = new URLSearchParams({
      select: "name,message",
      order: "created_at.desc",
      limit: String(limit),
    });
    const res = await fetch(`${config.url}/rest/v1/${TABLES.wishes}?${params.toString()}`, {
      headers: baseHeaders(config),
    });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is Wish =>
        typeof row === "object" &&
        row !== null &&
        typeof (row as Wish).name === "string" &&
        typeof (row as Wish).message === "string",
    );
  } catch {
    return [];
  }
}
