# Thiệp cưới online (Wedding Card)

## Mục tiêu

Trang thiệp cưới online một trang (one-page), phong cách sang trọng, lãng mạn.
Tông màu lấy theo thiệp giấy thật của cặp đôi: **đỏ rượu vang (wine) + mauve bụi +
gold, nền trắng** (token `--color-*` trong `src/index.css`). Nội dung (tên, gia đình,
ngày giờ, địa điểm, lời cảm ơn, trình tự ngày cưới) lấy từ thiệp giấy; ảnh & STK
thay được sau mà không đụng vào code giao diện.

## Yêu cầu

- **Build tĩnh thuần**: Vite + React (SPA), deploy được lên GitHub Pages (sub-path)
  và Cloudflare Pages → `base: "./"`, asset public truy cập qua helper `asset()`.
- **Form gọi API bên thứ ba**: RSVP + sổ lưu bút ghi vào Supabase (REST/PostgREST,
  anon key). **Chưa cấu hình env thì tự fallback localStorage** — web demo vẫn chạy.
- **Nội dung tập trung**: mọi chữ/ảnh/link lấy từ `src/lib/wedding-config.ts`.
- **Responsive**: hiển thị tốt tại 375px, 768px, 1280px (mobile-first).
- **Hiệu ứng nhẹ**: chỉ CSS animation + IntersectionObserver, cánh hoa rơi ≤ 14 phần tử
  chỉ animate `transform/opacity`, tôn trọng `prefers-reduced-motion`.
- **Nhẹ cho mọi thiết bị**: font tự host (Fontsource, có subset vietnamese),
  không thư viện animation, ảnh placeholder SVG.

## Các section (theo thứ tự)

1. **Cover** — màn bìa nút "Mở thiệp" (khoá scroll, phát nhạc khi mở).
2. **Hero** — tên cặp đôi (script), ảnh vòm, ngày cưới + âm lịch.
3. **Countdown** — đếm ngược tới hôn lễ.
4. **Couple** — giới thiệu chú rể & cô dâu.
5. **Story** — timeline chuyện tình.
6. **Gallery** — album masonry + lightbox.
7. **Events** — sự kiện cưới + "Chỉ đường" / "Thêm vào lịch" + trình tự ngày cưới (timeline).
8. **GiftBox** — QR + STK, nút sao chép (fallback execCommand cho WebView).
9. **RSVP** — form xác nhận → Supabase (fallback localStorage).
10. **Guestbook** — sổ lưu bút → Supabase (fallback localStorage + lời chúc mẫu).
11. **Footer** — lời cảm ơn.

Phần tử nổi: nút nhạc nền, nút lên đầu trang, lớp cánh hoa rơi.

## Dữ liệu từ xa (Supabase)

- Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (xem `.env.example`).
- Bảng `rsvp_responses` (insert-only với anon) và `wishes` (insert + select với anon),
  RLS bật — SQL tạo bảng trong `docs/supabase.md`.
- Lớp API thuần fetch tại `src/lib/api.ts` (không SDK — giữ bundle nhỏ), unit test
  được vì nhận config + dùng fetch stub.
- Quy tắc: cấu hình thiếu → `getRemoteConfig()` trả `null` → component dùng
  `src/lib/local-store.ts`.

## Triển khai

- `pnpm build` → `dist/` tĩnh.
- GitHub Pages: workflow `.github/workflows/deploy.yml` (push lên `main` là deploy);
  bật Pages = "GitHub Actions" trong Settings. Secrets `VITE_SUPABASE_*` (tuỳ chọn).
- Cloudflare Pages: build command `pnpm build`, output `dist`, khai báo env tương tự.

## Tiêu chí nghiệm thu

- `pnpm test` xanh (countdown, calendar link, api client).
- `pnpm build` (tsc + vite) không lỗi; mở bản build bằng `pnpm preview` hiển thị đúng.
- Screenshot 375 / 768 / 1280 không vỡ layout.
- Không có env Supabase: RSVP/lưu bút vẫn hoạt động (localStorage).
- Tắt JS vẫn đọc được nội dung; `prefers-reduced-motion` tắt hiệu ứng.
