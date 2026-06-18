# Nhạc nền

Trang web phát một bản nhạc nền khi khách bấm **"Mở thiệp"** (và có nút bật/tắt ở
góc dưới bên trái). File nhạc được trỏ trong `src/lib/wedding-config.ts` ở mục `music`.

## Thêm bài "Aloha" (Jo Jung Suk)

1. Tự chuẩn bị file nhạc **hợp pháp** (mua trên store nhạc, hoặc bản bạn có quyền dùng).
2. Đổi tên thành `aloha.mp3` và đặt vào đúng thư mục này: `public/music/aloha.mp3`.
3. Chạy lại / build lại là nhạc sẽ phát.

> Lưu ý bản quyền: "Aloha" do Jo Jung Suk trình bày là nhạc thương mại có bản quyền.
> Mình không kèm sẵn file nhạc trong mã nguồn — bạn cần tự cung cấp bản hợp pháp.
> Đây là thiệp cưới dùng riêng (phi thương mại) nên thường không sao, nhưng vẫn nên
> dùng nguồn nhạc hợp pháp.

## Đổi sang bài khác

Sửa `music` trong `src/lib/wedding-config.ts`:

```ts
music: {
  src: "/music/ten-file.mp3", // đặt file vào public/music/
  title: "Tên bài hát",
  artist: "Ca sĩ",
},
```
