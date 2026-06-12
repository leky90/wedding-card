# 💌 Thiệp Cưới Online

Trang thiệp cưới online một trang, tông **đỏ - trắng** sang trọng, responsive trên mọi
thiết bị, hiệu ứng nhẹ (cánh hoa rơi, fade khi cuộn, đếm ngược...). Xây dựng bằng
Next.js 16 + Tailwind CSS v4.

## Chạy thử

```bash
pnpm install
pnpm dev        # mở http://localhost:3000
```

Lệnh khác: `pnpm build` (build production) · `pnpm test` (unit test) · `pnpm lint`.

## ✏️ Thay nội dung của bạn (3 bước)

Mọi chữ trên thiệp đều là **mockup** và nằm gọn trong **một file duy nhất**:

### 1. Sửa thông tin — [`src/lib/wedding-config.ts`](src/lib/wedding-config.ts)

Tên cô dâu chú rể, song thân, ngày cưới (dương + âm lịch), 3 sự kiện (giờ, địa điểm,
link Google Maps), chuyện tình yêu, số tài khoản mừng cưới, lời chúc mẫu... Sửa trực
tiếp các giá trị, lưu lại là thiệp tự cập nhật.

> Lưu ý: `dateIso` / `startIso` / `endIso` dùng định dạng ISO kèm múi giờ VN,
> ví dụ `"2026-12-20T18:00:00+07:00"` — dùng cho đếm ngược và nút "Thêm vào lịch".

### 2. Thay ảnh — thư mục [`public/images/`](public/images)

Ảnh hiện tại là SVG placeholder có ghi sẵn kích thước gợi ý. Thả ảnh thật (jpg/png)
vào thư mục rồi đổi đường dẫn tương ứng trong `wedding-config.ts`
(ví dụ `image: "/images/groom.jpg"`). Gồm: ảnh hero, chân dung 2 người, 4 ảnh
chuyện tình, 6 ảnh album, 2 mã QR ngân hàng.

### 3. Nhạc nền — `public/music/wedding-song.mp3`

Thêm file nhạc (bản có bản quyền sử dụng) vào đúng tên trên. Nhạc tự phát khi khách
bấm "Mở thiệp"; chưa có file thì nút nhạc im lặng, không lỗi.

## Cấu trúc

```
src/
├── app/                  # layout (font, SEO), page ghép các section, theme globals.css
├── components/
│   ├── Cover.tsx         # màn bìa "Mở thiệp"
│   ├── FloatingButtons.tsx  # nút nhạc + lên đầu trang
│   ├── sections/         # Hero, Countdown, Couple, Story, Gallery, Events,
│   │                     # GiftBox, Rsvp, Guestbook, Footer
│   └── ui/               # Reveal (hiện khi cuộn), Petals (hoa rơi), hoạ tiết SVG
└── lib/                  # wedding-config.ts (NỘI DUNG Ở ĐÂY), countdown, wish-store
```

Đổi màu chủ đạo: sửa các token `--color-*` đầu file [`src/app/globals.css`](src/app/globals.css).

## Ghi chú

- **RSVP & Sổ lưu bút** hiện lưu `localStorage` trên máy khách (chưa có backend).
  Muốn nhận phản hồi tập trung: nối Google Form/Sheets hoặc API — điểm thay duy nhất
  là `saveRsvp()` trong `Rsvp.tsx` và `src/lib/wish-store.ts`.
- Hiệu ứng tôn trọng `prefers-reduced-motion`; không có JS vẫn đọc được toàn bộ thiệp.
- Deploy nhanh: đẩy repo lên GitHub rồi import vào [Vercel](https://vercel.com) — trang
  build tĩnh hoàn toàn nên tải rất nhanh.
