import { NotebookPen, Quote } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchWishes, getRemoteConfig, insertWish } from "@/lib/api";
import { gsap, EASE, DUR, sectionTl } from "@/lib/gsap";
import { addLocalWish, loadLocalWishes } from "@/lib/local-store";
import { cn } from "@/lib/utils";
import { weddingConfig, type Wish } from "@/lib/wedding-config";

const inputClass =
  "w-full rounded-xl border border-rose-soft/70 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/15";

// Có env Supabase thì đọc/ghi API, không thì localStorage (chế độ demo)
const REMOTE = getRemoteConfig();

export function Guestbook() {
  // Chế độ remote: hiển thị lời chúc mẫu trong lúc tải (và khi bảng còn trống)
  const [wishes, setWishes] = useState<Wish[]>(() =>
    REMOTE ? weddingConfig.wishes : loadLocalWishes(),
  );
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!REMOTE) return;
    let alive = true;
    fetchWishes(REMOTE).then((remoteWishes) => {
      if (alive && remoteWishes.length) setWishes(remoteWishes);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Entrance: 2 cột (form + list) hiện theo KHỐI, once. KHÔNG bao giờ stagger từng <li>
  // (list prepend khi gửi → giật). Desktop hội tụ theo x trong cột lưới hữu hạn; mobile dùng
  // y:24 tránh tràn ngang ở 375px. clearProps:'transform' → list kết về none (giữ inner-scroll).
  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const tl = sectionTl(rootRef.current, "top 80%");
        tl.from(q('[data-gb="form"]'), { x: -20, autoAlpha: 0, duration: DUR.veil, ease: EASE.veil, clearProps: "transform" }, 0)
          .from(q('[data-gb="list"]'), { x: 20, autoAlpha: 0, duration: DUR.veil, ease: EASE.veil, clearProps: "transform" }, 0.12);
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767.98px)", () => {
        const tl = sectionTl(rootRef.current, "top 80%");
        tl.from(q('[data-gb="form"]'), { y: 24, autoAlpha: 0, duration: DUR.line, ease: EASE.veil, clearProps: "transform" }, 0)
          .from(q('[data-gb="list"]'), { y: 24, autoAlpha: 0, duration: DUR.line, ease: EASE.veil, clearProps: "transform" }, 0.1);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Bạn điền giúp mình cả tên và lời chúc nhé!");
      return;
    }
    setError(null);

    const wish: Wish = { name: name.trim(), message: message.trim() };
    if (REMOTE) {
      setSending(true);
      const ok = await insertWish(REMOTE, wish);
      setSending(false);
      if (!ok) {
        setError("Gửi chưa được do kết nối — bạn thử lại nhé!");
        return;
      }
    } else {
      addLocalWish(wish);
    }
    setWishes((prev) => [wish, ...prev]);
    setName("");
    setMessage("");
  };

  return (
    <section ref={rootRef} className="bg-blush px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Lưu giữ kỷ niệm"
          title="Sổ Lưu Bút"
          description="Để lại đôi lời yêu thương cho cô dâu chú rể bạn nhé!"
        />
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[2fr_3fr]">
        <div data-gb="form">
          <form
            onSubmit={submit}
            noValidate
            className="rounded-3xl border border-rose-soft/60 bg-white p-6 shadow-card md:p-7"
          >
            <div>
              <label htmlFor="wish-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
                Tên của bạn
              </label>
              <input
                id="wish-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Gia đình cô Tư"
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="wish-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
                Lời chúc
              </label>
              <textarea
                id="wish-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                className={cn(inputClass, "resize-none")}
              />
            </div>
            {error && (
              <p role="alert" className="mt-3 text-xs font-medium text-primary">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-card transition hover:bg-primary-deep disabled:cursor-default disabled:opacity-60"
            >
              <NotebookPen className="h-4 w-4" aria-hidden /> {sending ? "Đang gửi..." : "Gửi lời chúc"}
            </button>
          </form>
        </div>

        <div data-gb="list">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-rose-mid md:text-left">
            {wishes.length} lời chúc
          </p>
          <ul className="thin-scrollbar max-h-[430px] space-y-3 overflow-y-auto pr-1">
            {wishes.map((wish, i) => (
              <li key={`${wish.name}-${i}`} className="rounded-2xl border border-rose-soft/50 bg-white p-4 shadow-sm">
                <Quote className="h-4 w-4 text-rose-mid" aria-hidden />
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{wish.message}</p>
                <p className="mt-2 text-xs font-bold text-primary">{wish.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
