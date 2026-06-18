import { ArrowUp, Disc3, Music } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { INVITATION_OPEN_EVENT } from "@/components/Cover";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { weddingConfig } from "@/lib/wedding-config";

/** Nút nhạc nền (trái) + nút lên đầu trang (phải). */
export function FloatingButtons() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const tryPlay = useCallback(async () => {
    if (!audioRef.current) {
      const audio = new Audio(asset(weddingConfig.music.src));
      audio.loop = true;
      audio.volume = 0.55;
      audioRef.current = audio;
    }
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      // Chưa có file nhạc hoặc trình duyệt chặn autoplay — giữ im lặng
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      void tryPlay();
    }
  };

  // Khách bấm "Mở thiệp" → tự bật nhạc (đã có user gesture nên không bị chặn)
  useEffect(() => {
    const onOpen = () => {
      void tryPlay();
    };
    window.addEventListener(INVITATION_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INVITATION_OPEN_EVENT, onOpen);
  }, [tryPlay]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rời trang/unmount thì dừng nhạc
  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={
          playing
            ? `Tắt nhạc nền: ${weddingConfig.music.title}`
            : `Bật nhạc nền: ${weddingConfig.music.title} - ${weddingConfig.music.artist}`
        }
        title={
          playing
            ? `Đang phát: ${weddingConfig.music.title} - ${weddingConfig.music.artist}`
            : `Bật nhạc nền: ${weddingConfig.music.title} - ${weddingConfig.music.artist}`
        }
        className="press fixed bottom-5 left-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-rose-soft/70 bg-white/95 text-primary shadow-lg backdrop-blur transition hover:scale-105"
      >
        {playing ? (
          <Disc3 key="disc" className="h-5 w-5 disc-enter disc-spin" aria-hidden />
        ) : (
          <Music key="music" className="h-5 w-5 disc-enter" aria-hidden />
        )}
      </button>

      {/* Thanh equalizer nhỏ "đang phát" cạnh nút nhạc */}
      {playing && (
        <span
          aria-hidden
          className="eq-wrap eq fixed bottom-[2rem] left-[4.45rem] z-40 h-3 text-primary"
        >
          <span />
          <span />
          <span />
        </span>
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        className={cn(
          "press fixed bottom-5 right-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-deep",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </>
  );
}
