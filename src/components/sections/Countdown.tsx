import { useEffect, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTimeLeft } from "@/lib/countdown";
import { weddingConfig } from "@/lib/wedding-config";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingConfig.wedding.dateIso));

  useEffect(() => {
    const id = window.setInterval(
      () => setTimeLeft(getTimeLeft(weddingConfig.wedding.dateIso)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  const cells = [
    { label: "Ngày", value: String(timeLeft.days) },
    { label: "Giờ", value: pad(timeLeft.hours) },
    { label: "Phút", value: pad(timeLeft.minutes) },
    { label: "Giây", value: pad(timeLeft.seconds) },
  ];

  return (
    <section className="bg-cream px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="Cùng đếm ngược" title="Ngày Chung Đôi" />
        <div className="mx-auto grid max-w-md grid-cols-4 divide-x divide-rose-soft/50">
          {cells.map((cell) => (
            <div key={cell.label} className="px-1 text-center">
              <p className="font-display text-4xl font-bold tabular-nums text-primary-deep md:text-6xl">
                {cell.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-rose-mid md:text-xs">{cell.label}</p>
            </div>
          ))}
        </div>
        {timeLeft.isOver && (
          <p className="mt-8 text-center font-display text-2xl font-semibold text-primary md:text-3xl">
            Chúng mình đã chính thức về chung một nhà
          </p>
        )}
      </Reveal>
    </section>
  );
}
