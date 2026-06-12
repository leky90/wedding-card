import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { CornerFloral } from "@/components/ui/Ornaments";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { weddingConfig } from "@/lib/wedding-config";

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback cho WebView (Zalo/Messenger...) chưa có Clipboard API
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  }
}

export function GiftBox() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copy = async (accountNumber: string) => {
    if (await writeToClipboard(accountNumber)) {
      setCopiedAccount(accountNumber);
      window.setTimeout(() => setCopiedAccount(null), 2200);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#8a0f29_0%,#6d0b22_55%,#4c0817_100%)] px-4 py-16 text-white md:py-24">
      <CornerFloral className="absolute -left-6 -top-6 h-40 w-40 text-white/10 md:h-56 md:w-56" />
      <CornerFloral className="absolute -bottom-6 -right-6 h-40 w-40 -scale-100 text-white/10 md:h-56 md:w-56" />
      <span
        aria-hidden
        className="absolute -right-4 top-8 select-none font-script text-7xl text-white/[0.06] md:text-9xl"
      >
        Thank you
      </span>

      <div className="relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Gửi yêu thương"
            title="Hộp Mừng Cưới"
            description="Sự hiện diện của bạn đã là món quà quý giá nhất. Nếu muốn gửi thêm chút yêu thương, bạn có thể quét mã bên dưới nhé!"
          />
        </Reveal>

        <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2 md:gap-7">
          {weddingConfig.banks.map((account, i) => (
            <Reveal key={account.accountNumber} delay={i * 100}>
              <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 text-center backdrop-blur-sm md:p-8">
                <p className="font-script text-3xl text-rose-soft">{account.label}</p>
                <div className="mx-auto mt-5 w-40 rounded-2xl bg-white p-2 shadow-lg">
                  <img
                    src={asset(account.qrImage)}
                    alt={`Mã QR ${account.label}`}
                    width={600}
                    height={660}
                    loading="lazy"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <p className="mt-5 text-sm font-medium text-white/85">{account.bank}</p>
                <p className="mt-1 font-display text-2xl tracking-[0.18em]">{account.accountNumber}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/60">{account.accountName}</p>
                <button
                  type="button"
                  onClick={() => copy(account.accountNumber)}
                  className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-primary-deep transition hover:bg-rose-soft"
                >
                  {copiedAccount === account.accountNumber ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden /> Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden /> Sao chép STK
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
