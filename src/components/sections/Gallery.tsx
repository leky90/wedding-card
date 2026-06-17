import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/assets";
import { weddingConfig } from "@/lib/wedding-config";

export function Gallery() {
  const photos = weddingConfig.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((cur) => (cur === null ? cur : (cur + dir + photos.length) % photos.length)),
    [photos.length],
  );

  // Khoá cuộn + phím tắt khi đang xem ảnh lớn
  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Khoảnh khắc"
          title="Album Hình Cưới"
          description="Chạm vào ảnh để xem ở kích thước lớn nhé!"
        />
      </Reveal>

      <Reveal className="mx-auto max-w-5xl columns-2 gap-3 md:columns-3 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Xem ${photo.alt}`}
            className="group relative mb-3 block w-full cursor-pointer overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-primary md:mb-4"
          >
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="h-auto w-full transition duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary-dark/0 opacity-0 transition duration-300 group-hover:bg-primary-dark/25 group-hover:opacity-100">
              <ZoomIn className="h-7 w-7 text-white drop-shadow" aria-hidden />
            </span>
          </button>
        ))}
      </Reveal>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh cưới"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#30060f]/95 p-4"
          onClick={close}
        >
          <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* container cố định + object-contain: hiển thị đúng với mọi tỉ lệ ảnh */}
            <div className="relative h-[72vh] w-[88vw] max-w-3xl">
              <img
                src={asset(photos[index].src)}
                alt={photos[index].alt}
                className="h-full w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs tracking-widest text-white/70">
              {index + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-soft"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-soft md:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Ảnh sau"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-soft md:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}
