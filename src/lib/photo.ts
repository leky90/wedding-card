/**
 * Suy ra đường dẫn ảnh nền mờ (LQIP) từ ảnh gốc:
 * "/images/hero-couple.jpg" → "/images/blur/hero-couple.jpg".
 * Ảnh blur ~140px (vài KB) được phóng to + blur CSS để tạo nền soft-focus nhẹ máy.
 */
export function blurPath(src: string): string {
  return src.replace("/images/", "/images/blur/");
}
