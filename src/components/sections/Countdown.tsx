"use client";

import { useEffect, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { weddingConfig } from "@/lib/wedding-config";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  // null khi SSR/chưa mount → hiển thị "--" để không lệch hydration
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(weddingConfig.wedding.dateIso));
    // tick đầu chạy qua callback để không setState đồng bộ trong effect
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const cells = [
    { label: "Ngày", value: timeLeft ? String(timeLeft.days) : "--" },
    { label: "Giờ", value: timeLeft ? pad(timeLeft.hours) : "--" },
    { label: "Phút", value: timeLeft ? pad(timeLeft.minutes) : "--" },
    { label: "Giây", value: timeLeft ? pad(timeLeft.seconds) : "--" },
  ];

  return (
    <section className="bg-gradient-to-b from-cream to-blush px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="Cùng đếm ngược" title="Ngày Chung Đôi" />
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-2.5 md:gap-5">
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="rounded-2xl border border-rose-soft/60 bg-white py-4 text-center shadow-card md:py-7"
            >
              <p className="font-display text-2xl font-semibold tabular-nums text-primary-deep md:text-5xl">
                {cell.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted md:text-xs">{cell.label}</p>
            </div>
          ))}
        </div>
        {timeLeft?.isOver && (
          <p className="mt-8 text-center font-script text-3xl text-primary">
            Chúng mình đã chính thức về chung một nhà 💍
          </p>
        )}
      </Reveal>
    </section>
  );
}
