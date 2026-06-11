import { HeartDivider } from "@/components/ui/Ornaments";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Chữ script nhỏ phía trên tiêu đề */
  eyebrow: string;
  title: string;
  description?: string;
  /** dark = đặt trên nền đỏ đậm */
  tone?: "light" | "dark";
}

export function SectionHeading({ eyebrow, title, description, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className={cn("font-script text-3xl md:text-4xl", dark ? "text-rose-soft" : "text-rose-mid")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-semibold tracking-wide md:text-[2.6rem] md:leading-tight",
          dark ? "text-white" : "text-primary-deep",
        )}
      >
        {title}
      </h2>
      <HeartDivider className={cn("mx-auto mt-5 h-5 w-44", dark ? "text-rose-soft" : "text-primary")} />
      {description && (
        <p className={cn("mt-5 text-sm leading-relaxed md:text-base", dark ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
