/**
 * Ghép đường dẫn asset trong /public với base của Vite — nhờ vậy bản build
 * chạy đúng cả khi deploy dưới sub-path (GitHub Pages: /ten-repo/).
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
