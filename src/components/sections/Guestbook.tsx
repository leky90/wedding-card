"use client";

import { NotebookPen, Quote } from "lucide-react";
import { useState, useSyncExternalStore, type FormEvent } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import {
  addWish,
  getServerWishesSnapshot,
  getWishesSnapshot,
  subscribeWishes,
} from "@/lib/wish-store";

const inputClass =
  "w-full rounded-xl border border-rose-soft/70 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function Guestbook() {
  // localStorage là "external store" → SSR render lời chúc mẫu,
  // client tự cập nhật thêm lời chúc đã lưu mà không lệch hydration
  const wishes = useSyncExternalStore(subscribeWishes, getWishesSnapshot, getServerWishesSnapshot);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Bạn điền giúp mình cả tên và lời chúc nhé!");
      return;
    }
    setError(null);
    addWish({ name: name.trim(), message: message.trim() });
    setName("");
    setMessage("");
  };

  return (
    <section className="bg-blush px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Lưu giữ kỷ niệm"
          title="Sổ Lưu Bút"
          description="Để lại đôi lời yêu thương cho cô dâu chú rể bạn nhé!"
        />
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[2fr_3fr]">
        <Reveal>
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
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-card transition hover:bg-primary-deep"
            >
              <NotebookPen className="h-4 w-4" aria-hidden /> Gửi lời chúc
            </button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-rose-mid md:text-left">
            {wishes.length} lời chúc 💕
          </p>
          <ul className="thin-scrollbar max-h-[430px] space-y-3 overflow-y-auto pr-1">
            {wishes.map((wish, i) => (
              <li key={`${wish.name}-${i}`} className="rounded-2xl border border-rose-soft/50 bg-white p-4 shadow-sm">
                <Quote className="h-4 w-4 text-rose-mid" aria-hidden />
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{wish.message}</p>
                <p className="mt-2 text-xs font-bold text-primary">— {wish.name}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
