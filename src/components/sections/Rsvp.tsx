import { Heart, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRemoteConfig, insertRsvp, type RsvpPayload } from "@/lib/api";
import { saveLocalRsvp } from "@/lib/local-store";
import { cn } from "@/lib/utils";
import { weddingConfig } from "@/lib/wedding-config";

const inputClass =
  "w-full rounded-xl border border-rose-soft/70 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70";

// Có env Supabase thì gửi API, không thì lưu localStorage (chế độ demo)
const REMOTE = getRemoteConfig();

export function Rsvp() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [side, setSide] = useState("Chú rể");
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Bạn ơi, cho chúng mình xin tên nhé!");
      return;
    }
    if (!attend) {
      setError("Bạn chọn giúp mình có tham dự được không nha!");
      return;
    }
    setError(null);

    const payload: RsvpPayload = {
      name: name.trim(),
      side,
      attend,
      guests,
      message: message.trim(),
    };

    if (REMOTE) {
      setSending(true);
      const ok = await insertRsvp(REMOTE, payload);
      setSending(false);
      if (!ok) {
        setError("Gửi chưa được do kết nối. Bạn thử lại giúp mình nhé!");
        return;
      }
    } else {
      saveLocalRsvp({ ...payload, sentAt: new Date().toISOString() });
    }
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setAttend(null);
    setGuests(1);
    setMessage("");
  };

  return (
    <section id="rsvp" className="bg-white px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Bạn sẽ đến chứ?"
          title="Xác Nhận Tham Dự"
          description={`Vui lòng phản hồi trước ngày ${weddingConfig.rsvp.deadline} để chúng mình chuẩn bị đón tiếp chu đáo nhất nhé!`}
        />
      </Reveal>

      <Reveal className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-rose-soft/60 bg-gradient-to-b from-white to-blush/70 p-6 shadow-card md:p-9">
          {sent ? (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush">
                <Heart className="animate-heart h-8 w-8 fill-primary text-primary" aria-hidden />
              </span>
              <p className="mt-5 font-display text-3xl font-medium italic text-primary-deep md:text-4xl">Cảm ơn {name.trim()}!</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {attend === "yes"
                  ? "Chúng mình rất mong được gặp bạn trong ngày vui. Hẹn gặp bạn nhé!"
                  : "Tiếc quá! Cảm ơn bạn đã phản hồi, hẹn gặp bạn một dịp gần nhất nhé!"}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 cursor-pointer rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold text-primary transition hover:bg-blush"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="rsvp-name" className={labelClass}>
                  Tên của bạn *
                </label>
                <input
                  id="rsvp-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Ngọc Anh"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="rsvp-side" className={labelClass}>
                    Bạn là khách của
                  </label>
                  <select id="rsvp-side" value={side} onChange={(e) => setSide(e.target.value)} className={inputClass}>
                    <option>Chú rể</option>
                    <option>Cô dâu</option>
                    <option>Cả hai</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rsvp-guests" className={labelClass}>
                    Số người tham dự
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>Bạn có tham dự được không? *</legend>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="attend"
                      className="peer sr-only"
                      checked={attend === "yes"}
                      onChange={() => setAttend("yes")}
                    />
                    <span className="block rounded-xl border border-rose-soft/70 bg-white py-2.5 text-center text-sm transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                      Chắc chắn rồi! 🎉
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="attend"
                      className="peer sr-only"
                      checked={attend === "no"}
                      onChange={() => setAttend("no")}
                    />
                    <span className="block rounded-xl border border-rose-soft/70 bg-white py-2.5 text-center text-sm transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                      Tiếc quá, mình bận 😢
                    </span>
                  </label>
                </div>
              </fieldset>

              <div>
                <label htmlFor="rsvp-message" className={labelClass}>
                  Lời nhắn
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gửi đôi lời tới cô dâu chú rể..."
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              {error && (
                <p role="alert" className="text-xs font-medium text-primary">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-card transition hover:bg-primary-deep disabled:cursor-default disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden /> {sending ? "Đang gửi..." : "Gửi xác nhận"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
