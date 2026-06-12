import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchWishes, getRemoteConfig, insertRsvp, insertWish } from "@/lib/api";

const CONFIG = { url: "https://demo.supabase.co", anonKey: "anon-key-123" };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getRemoteConfig", () => {
  it("trả null khi thiếu biến môi trường", () => {
    expect(getRemoteConfig({})).toBeNull();
    expect(getRemoteConfig({ VITE_SUPABASE_URL: "https://x.supabase.co" })).toBeNull();
    expect(getRemoteConfig({ VITE_SUPABASE_ANON_KEY: "k" })).toBeNull();
  });

  it("đọc config, trim và bỏ dấu / thừa cuối URL", () => {
    expect(
      getRemoteConfig({
        VITE_SUPABASE_URL: "https://x.supabase.co/",
        VITE_SUPABASE_ANON_KEY: " k ",
      }),
    ).toEqual({ url: "https://x.supabase.co", anonKey: "k" });
  });
});

describe("insertRsvp / insertWish", () => {
  it("POST đúng endpoint với header Supabase", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const ok = await insertRsvp(CONFIG, {
      name: "Ngọc Anh",
      side: "Cô dâu",
      attend: "yes",
      guests: 2,
      message: "Chúc mừng!",
    });

    expect(ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://demo.supabase.co/rest/v1/rsvp_responses");
    expect(init.method).toBe("POST");
    expect(init.headers.apikey).toBe("anon-key-123");
    expect(init.headers.Authorization).toBe("Bearer anon-key-123");
    expect(init.headers.Prefer).toBe("return=minimal");
    expect(JSON.parse(init.body).name).toBe("Ngọc Anh");
  });

  it("trả false khi server từ chối hoặc mất mạng", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await insertWish(CONFIG, { name: "A", message: "B" })).toBe(false);

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await insertWish(CONFIG, { name: "A", message: "B" })).toBe(false);
  });
});

describe("fetchWishes", () => {
  it("GET đúng query và lọc bỏ dòng không hợp lệ", async () => {
    const rows = [{ name: "A", message: "Chúc mừng" }, { name: 1, message: "x" }, null];
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => rows });
    vi.stubGlobal("fetch", fetchMock);

    const wishes = await fetchWishes(CONFIG, 50);

    expect(wishes).toEqual([{ name: "A", message: "Chúc mừng" }]);
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("/rest/v1/wishes?");
    expect(url).toContain("select=name%2Cmessage");
    expect(url).toContain("order=created_at.desc");
    expect(url).toContain("limit=50");
  });

  it("trả mảng rỗng khi server lỗi", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await fetchWishes(CONFIG)).toEqual([]);
  });
});
