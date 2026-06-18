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

1. **Cover** — màn bìa: ảnh cưới SẮC NÉT toàn màn + lớp phủ gradient (không làm mờ),
   nút "Mở thiệp" (khoá scroll, phát nhạc khi mở).
2. **Hero** — ảnh cưới lớn/rõ ở trên + chữ trên nền kem ở dưới: monogram Q & K,
   tên cặp đôi (serif italic), số ngày cưới cỡ lớn rose-gold, âm lịch.
3. **Countdown** — đếm ngược tới hôn lễ.
4. **Couple** — chú rể & cô dâu: 2 ảnh chân dung lớn dạng chữ nhật (không khung vòm).
5. **Gallery** — album masonry + lightbox.
6. **Events** — sự kiện cưới + "Chỉ đường" / "Thêm vào lịch" + trình tự ngày cưới (timeline).
7. **RSVP** — form xác nhận → Supabase (fallback localStorage).
8. **Guestbook** — sổ lưu bút → Supabase (fallback localStorage + lời chúc mẫu).
9. **Footer / Lời Cảm Ơn** — mục đóng nền wine đậm (đặc, không ảnh): đôi nhẫn lồng nhau,
   lời cảm ơn (2 đoạn theo thiệp giấy) và chữ ký tên cặp đôi.

> Đã gỡ theo yêu cầu: mục **GiftBox** (STK + QR), mục **Câu Chuyện Tình Yêu** (Story),
> và toàn bộ **nền ảnh mờ/soft-focus** (component PhotoBackdrop). Ảnh nay hiển thị
> TO, RÕ, KHÔNG đóng khung vòm.

## Typography (bám thiệp giấy)

Thiệp giấy dùng serif tương phản cao (kiểu Didone) cho tên/ngày/monogram, KHÔNG dùng
chữ viết tay nối nét. Vì vậy web bỏ hẳn font script (Great Vibes) và dùng:

- **Playfair Display** (`--font-display`): monogram + tiêu đề + số ngày = `font-bold`;
  **tên cặp đôi = `italic` weight 500** (giữ nét mềm mại mà vẫn là serif, đúng thiệp).
- **Be Vietnam Pro** (`--font-body`): nội dung + nhãn in hoa nhỏ.
- Màu: chữ wine #7c1b22, số ngày rose-gold #c79a92; nhãn nhỏ rose-mid #9c5f5c (đạt AA).
- Một điểm duy nhất chữ nằm trên ảnh là Cover — dùng lớp phủ gradient tối (không blur)
  để chữ trắng đạt WCAG AA.

Phần tử nổi: nút nhạc nền, nút lên đầu trang, lớp cánh hoa rơi.

## Hiệu ứng (animation) & nhạc nền

- **Hệ chuyển động thuần CSS** (token easing + keyframes trong `src/index.css`):
  chỉ animate `transform/opacity` cho nhẹ máy. Vào trang `.rise` (cover/hero, so le),
  cuộn tới `.reveal` (+ biến thể `reveal-scale`, `reveal-stagger` qua `<Reveal variant>`),
  số ngày cưới hiện so le (`.rise-num` + gạch `.rule-draw`), màn bìa nâng lên kiểu rèm
  (`.cover-shell`/`.cover-opened`, khớp `setTimeout` 1000ms), đường kẻ trái tim vẽ vào
  (`.hd-line`/`.hd-heart`). Vi tương tác: nhấn (`.press`), nâng thẻ (`.card-lift`),
  phóng ảnh hover (`.tile-img`), lightbox vào (`.lb-figure`/`.lb-img`).
- **Tôn trọng `prefers-reduced-motion`**: 1 khối master tắt mọi hiệu ứng, giữ trạng thái
  cuối; nhạc/lightbox/RSVP/đếm ngược KHÔNG bị khoá theo motion.
- **Nhạc nền** cấu hình ở `weddingConfig.music` (`src`, `title`, `artist`). Tự phát khi
  bấm "Mở thiệp" (đã có user gesture), lặp, volume 0.55; nút góc trái bật/tắt — đĩa xoay
  + thanh equalizer "đang phát". **Cần tự đặt file nhạc hợp pháp** vào `public/music/`
  (mặc định `aloha.mp3`); xem `public/music/README.md`. Repo không kèm file nhạc bản quyền.

## Hiệu ứng cuộn GSAP (ScrollTrigger)

Ngoài hệ CSS ở trên, một số mốc cuộn "ấn tượng" dùng **GSAP + ScrollTrigger**:

- Đăng ký DUY NHẤT ở `src/lib/gsap.ts` + hook `useScrollRefresh()` (gọi 1 lần trong App)
  để `ScrollTrigger.refresh()` SAU khi màn bìa mở khoá cuộn (~1100ms) và khi font/ảnh đổi
  layout, và khi đóng lightbox.
- Mỗi section dùng chung khuôn: `useEffect` + `gsap.context(rootRef)` +
  `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, cleanup `ctx.revert()`.
  **Mọi from-state nằm trong matchMedia** → bật "giảm chuyển động" là KHÔNG có trigger nào,
  nội dung hiện đầy đủ (no-op thật sự). Chỉ animate transform/opacity/clipPath.
- 5 mốc: Hero parallax ảnh (scrub), Gallery vén ảnh `ScrollTrigger.batch` clip, Couple
  vén chân dung + ảnh lắng + chữ hiện so le, Events thẻ "rải vào" (desktop nghiêng nhẹ,
  mobile phẳng) + timeline vẽ ngang + chấm nẩy, Footer lộ từng dòng theo mặt nạ + lắng nhẹ.
- KHÔNG scroll-jacking, KHÔNG pin (giữ mượt + không tràn ngang ở 375px). `clearProps`
  trên ảnh/thẻ có hover để GSAP không "khoá" transform của `.tile-img`/`.card-lift`.
- Không đụng tới Cover open/scroll-lock, lightbox, form RSVP/Guestbook, đếm ngược, nhạc.

## SEO & chia sẻ mạng xã hội

- Thẻ meta tĩnh trong `index.html` (crawler MXH không chạy JS nên phải tĩnh):
  `description`, `canonical`, **Open Graph** (`og:title/description/type/url/image`,
  `og:image:width/height`, `og:locale`) và **Twitter** `summary_large_image`.
- **Thumbnail share** `public/og-image.jpg` (1200×630) — thẻ wine + tên cặp đôi
  (Playfair italic) + ngày rose-gold + ảnh cưới; render bằng canvas dùng đúng font
  của site. `og:image` để **URL tuyệt đối** (MXH không nhận đường dẫn tương đối).
- Test `src/lib/__tests__/seo.test.ts` chặn việc xoá nhầm các thẻ này.
- Khi đổi tên miền: sửa URL trong các thẻ `canonical`/`og:url`/`og:image`/`twitter:image`.
  Sau khi deploy, dùng Facebook Sharing Debugger để "Scrape Again" làm mới preview.

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
