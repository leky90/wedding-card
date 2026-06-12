# Kết nối Supabase cho RSVP & Sổ lưu bút

Mất khoảng 10 phút, gói **Free** của Supabase là quá đủ cho một đám cưới.
Chưa kết nối thì web vẫn chạy bình thường ở chế độ demo (lưu localStorage).

## 1. Tạo project

Vào [supabase.com](https://supabase.com) → **New project** (chọn region Singapore
cho gần Việt Nam) → đợi vài phút khởi tạo.

## 2. Tạo bảng + bật bảo mật RLS

Mở **SQL Editor** → New query → dán toàn bộ đoạn dưới → **Run**:

```sql
-- Bảng phản hồi tham dự: khách chỉ GHI được, không đọc được của nhau
create table public.rsvp_responses (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 120),
  side text not null default '',
  attend text not null check (attend in ('yes', 'no')),
  guests int not null default 1 check (guests between 1 and 20),
  message text not null default '' check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

-- Bảng lời chúc: khách ghi + đọc
create table public.wishes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 120),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.rsvp_responses enable row level security;
alter table public.wishes enable row level security;

create policy "anon can insert rsvp" on public.rsvp_responses
  for insert to anon with check (true);

create policy "anon can insert wishes" on public.wishes
  for insert to anon with check (true);

create policy "anon can read wishes" on public.wishes
  for select to anon using (true);
```

## 3. Lấy khoá API

**Project Settings → API**: copy **Project URL** và **anon public** key, rồi:

```bash
cp .env.example .env   # điền 2 giá trị vào .env
pnpm dev               # form giờ ghi thẳng vào Supabase
```

> Lưu ý: `anon` key là khoá **công khai** (nó nằm trong bundle JS), an toàn nhờ
> RLS ở trên — bảng RSVP không cho ai đọc, chỉ cho ghi. Tuyệt đối **không** dùng
> `service_role` key ở frontend.

## 4. Khai báo biến khi deploy

- **GitHub Pages**: repo → Settings → Secrets and variables → Actions →
  **Variables** → thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`
  (workflow build sẽ tự nhúng vào).
- **Cloudflare Pages**: project → Settings → **Environment variables** → thêm 2 biến
  tương tự cho Production.

## Xem phản hồi của khách

Dashboard → **Table Editor** → bảng `rsvp_responses` (danh sách xác nhận tham dự)
và `wishes` (lời chúc). Chỉ bạn — người đăng nhập dashboard — đọc được RSVP.

## Chống spam (tuỳ chọn)

Bảng `wishes` cho ghi công khai. Nếu bị spam, chuyển sang chế độ xét duyệt:

```sql
alter table public.wishes add column approved boolean not null default false;
drop policy "anon can read wishes" on public.wishes;
create policy "anon can read approved wishes" on public.wishes
  for select to anon using (approved);
```

Lời chúc mới sẽ ẩn cho tới khi bạn tick `approved` trong Table Editor.
