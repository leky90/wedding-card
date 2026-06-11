# Thiệp cưới online (Wedding Card)

## Mục tiêu

Trang thiệp cưới online một trang (one-page), tham khảo bố cục mẫu
`https://chungdoi.com/mau-thiep/hoa-moc-hong/demo`, tông màu chủ đạo **đỏ - trắng**,
phong cách sang trọng, lãng mạn. Toàn bộ thông tin & hình ảnh là mockup, thay được
về sau mà không đụng vào code giao diện.

## Yêu cầu

- **Nội dung tập trung**: mọi chữ/ảnh/link lấy từ `src/lib/wedding-config.ts`.
- **Responsive**: hiển thị tốt tại 375px, 768px, 1280px (mobile-first).
- **Hiệu ứng nhẹ**: chỉ dùng CSS animation + IntersectionObserver (không lib animation nặng),
  cánh hoa rơi ≤ 14 phần tử chỉ animate `transform/opacity`, tôn trọng `prefers-reduced-motion`.
- **Truy cập tốt trên mọi thiết bị**: không ảnh nặng (placeholder SVG), font subset
  `vietnamese`, JS client tối thiểu (đa số section là Server Component).

## Các section (theo thứ tự)

1. **Cover** — màn hình bìa với nút "Mở thiệp" (khoá scroll tới khi mở, phát nhạc nếu có).
2. **Hero** — tên cô dâu chú rể (chữ script), ảnh vòm, ngày cưới + ngày âm lịch.
3. **Countdown** — đếm ngược ngày/giờ/phút/giây tới hôn lễ.
4. **Couple** — giới thiệu chú rể & cô dâu (ảnh, tên, song thân, lời giới thiệu).
5. **Story** — timeline chuyện tình yêu.
6. **Gallery** — album ảnh dạng masonry + lightbox (Esc/mũi tên điều hướng).
7. **Events** — các sự kiện cưới: giờ, địa điểm, nút "Chỉ đường" (Google Maps) và
   "Thêm vào lịch" (Google Calendar, không cần backend).
8. **GiftBox** — hộp mừng cưới: QR + STK ngân hàng, nút sao chép.
9. **RSVP** — form xác nhận tham dự (lưu localStorage, chờ nối backend/Google Form sau).
10. **Guestbook** — sổ lưu bút (localStorage + lời chúc mẫu).
11. **Footer** — lời cảm ơn.

Phần tử nổi: nút nhạc nền (đĩa xoay khi phát), nút lên đầu trang, lớp cánh hoa rơi.

## Tiêu chí nghiệm thu

- `pnpm test` xanh (logic countdown + link calendar).
- `pnpm build` không lỗi.
- Screenshot kiểm tra ở 375 / 768 / 1280, không vỡ layout, không tràn ngang.
- Tắt JS vẫn đọc được nội dung (noscript ẩn cover, bỏ hiệu ứng reveal).
- `prefers-reduced-motion: reduce` → tắt hoa rơi & animation.

## Ghi chú kỹ thuật

- Next.js 16 (App Router, React Compiler) + Tailwind CSS v4 (token trong `@theme`).
- Font: Playfair Display (display) · Great Vibes (script) · Be Vietnam Pro (body) — đều subset vietnamese.
- RSVP/Guestbook chưa có backend — dữ liệu localStorage, đánh dấu rõ trong code.
