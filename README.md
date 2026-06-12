# 💌 Thiệp Cưới Online

Trang thiệp cưới online một trang, tông **đỏ - trắng** sang trọng, responsive mọi
thiết bị, hiệu ứng nhẹ (hoa rơi, fade khi cuộn, đếm ngược...). **Build tĩnh hoàn toàn**
bằng Vite + React + Tailwind v4 — deploy miễn phí lên GitHub Pages / Cloudflare Pages.
RSVP & sổ lưu bút gửi về **Supabase** (free), chưa cấu hình thì tự chạy chế độ demo.

## Chạy thử

```bash
pnpm install
pnpm dev        # mở http://localhost:5173
```

Lệnh khác: `pnpm build` (ra thư mục `dist/`) · `pnpm preview` (xem bản build) ·
`pnpm test` · `pnpm lint`.

## ✏️ Thay nội dung của bạn (3 bước)

### 1. Sửa thông tin — [`src/lib/wedding-config.ts`](src/lib/wedding-config.ts)

Tên cô dâu chú rể, song thân, ngày cưới (dương + âm lịch), 3 sự kiện (giờ, địa điểm,
link Google Maps), chuyện tình, STK mừng cưới, lời chúc mẫu... Tất cả nằm trong
một file duy nhất. (Tiêu đề tab trình duyệt tự lấy theo tên trong config.)

> `dateIso` / `startIso` / `endIso` dùng định dạng ISO kèm múi giờ VN, ví dụ
> `"2026-12-20T18:00:00+07:00"` — phục vụ đếm ngược và nút "Thêm vào lịch".

### 2. Thay ảnh — thư mục [`public/images/`](public/images)

Ảnh hiện tại là SVG placeholder có ghi kích thước gợi ý. Thả ảnh thật (jpg/png) vào
rồi đổi đường dẫn trong `wedding-config.ts` (ví dụ `image: "/images/groom.jpg"`).

### 3. Nhạc nền — `public/music/wedding-song.mp3`

Thêm file nhạc (bản có quyền sử dụng). Nhạc tự phát khi khách bấm "Mở thiệp".

## 📨 Nhận RSVP & lời chúc qua Supabase

Làm theo [docs/supabase.md](docs/supabase.md) (~10 phút): tạo 2 bảng bằng SQL có sẵn,
copy `.env.example` → `.env`, điền `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.

- **Chưa có `.env`** → form vẫn chạy, dữ liệu lưu localStorage máy khách (demo).
- **Có `.env`** → RSVP ghi vào bảng riêng tư, lời chúc hiển thị chung cho mọi khách.

## 🚀 Deploy miễn phí

### GitHub Pages (tự động qua Actions)

1. Đẩy repo lên GitHub (nhánh `main`).
2. Repo → **Settings → Pages** → Source: chọn **GitHub Actions**.
3. (Tuỳ chọn) **Settings → Secrets and variables → Actions → Variables**: thêm
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. Push là deploy — workflow tại [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Nhờ `base: "./"` trong [vite.config.ts](vite.config.ts), trang chạy đúng dưới
`https://<user>.github.io/<repo>/` lẫn custom domain.

### Cloudflare Pages

Dashboard → Workers & Pages → **Connect to Git** → chọn repo, cấu hình:

| Mục | Giá trị |
|---|---|
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (tuỳ chọn) |

## Cấu trúc

```
src/
├── main.tsx / App.tsx    # khởi động + ghép section
├── index.css             # theme đỏ-trắng (token --color-*) + keyframes
├── components/
│   ├── Cover.tsx            # màn bìa "Mở thiệp"
│   ├── FloatingButtons.tsx  # nút nhạc + lên đầu trang
│   ├── sections/            # Hero, Countdown, Couple, Story, Gallery,
│   │                        # Events, GiftBox, Rsvp, Guestbook, Footer
│   └── ui/                  # Reveal, Petals (hoa rơi), hoạ tiết SVG
└── lib/
    ├── wedding-config.ts  # ✏️ NỘI DUNG THIỆP Ở ĐÂY
    ├── api.ts             # gọi Supabase REST (fetch thuần, có unit test)
    ├── local-store.ts     # fallback localStorage khi chưa có Supabase
    └── countdown.ts       # đếm ngược + link Google Calendar
```

## Ghi chú

- Hiệu ứng tôn trọng `prefers-reduced-motion`; tắt JS vẫn đọc được thiệp.
- Font tự host (Fontsource, subset vietnamese) — không phụ thuộc Google CDN.
- Đổi màu chủ đạo: sửa token `--color-*` đầu [src/index.css](src/index.css).
