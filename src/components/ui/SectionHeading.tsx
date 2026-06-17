import { HeartDivider } from "@/components/ui/Ornaments";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Nhãn nhỏ in hoa phía trên tiêu đề */
  eyebrow: string;
  title: string;
  description?: string;
  /** dark = đặt trên nền đỏ đậm */
  tone?: "light" | "dark";
  /** Hiện đường kẻ trái tim dưới tiêu đề (mặc định tắt để tránh lặp khuôn) */
  divider?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  divider = false,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className="mx-auto mb-9 max-w-2xl text-center md:mb-12">
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.4em]",
          dark ? "text-rose-soft" : "text-rose-mid",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-[1.9rem] font-bold tracking-[0.01em] md:text-[2.6rem] md:leading-tight",
          dark ? "text-white" : "text-primary-deep",
        )}
      >
        {title}
      </h2>
      {divider && (
        <HeartDivider className={cn("mx-auto mt-5 h-5 w-44", dark ? "text-rose-soft" : "text-primary")} />
      )}
      {description && (
        <p className={cn("mt-5 text-sm leading-relaxed md:text-base", dark ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
