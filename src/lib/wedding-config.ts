/**
 * ⚙️ FILE CẤU HÌNH THIỆP CƯỚI
 *
 * Toàn bộ thông tin hiển thị trên thiệp (tên, ngày giờ, địa điểm, ảnh,
 * số tài khoản...) đều nằm ở đây. Chỉ cần sửa file này và thay ảnh trong
 * thư mục /public/images là có thiệp của riêng bạn — không cần đụng vào
 * code giao diện.
 */

export interface Person {
  /** Tên gọi hiển thị lớn trên thiệp */
  name: string;
  fullName: string;
  /** Để trống ("") nếu chưa muốn hiển thị tên ba mẹ */
  parents: { father: string; mother: string };
  /** Lời giới thiệu ngắn */
  intro: string;
  image: string;
  /** Vị trí crop ảnh trong khung (CSS object-position), ví dụ "50% 25%" */
  imagePosition?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  /** Giờ diễn ra, ví dụ "09:00" */
  time: string;
  /** Nhãn ngày hiển thị, ví dụ "Chủ Nhật, 20.12.2026" */
  dateLabel: string;
  /** Thời gian bắt đầu/kết thúc (ISO, múi giờ VN) — dùng cho nút "Thêm vào lịch" */
  startIso: string;
  endIso: string;
  venue: string;
  address: string;
  /** Link Google Maps cho nút "Chỉ đường" */
  mapUrl: string;
  icon: "flower" | "rings" | "party";
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  /** Vị trí crop ảnh (CSS object-position) */
  imagePosition?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BankAccount {
  /** Nhãn hiển thị, ví dụ "Mừng cưới Chú Rể" */
  label: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  qrImage: string;
}

export interface Wish {
  name: string;
  message: string;
}

export interface WeddingConfig {
  couple: { groom: Person; bride: Person };
  wedding: {
    /** Mốc đếm ngược (thường là giờ tiệc chính) */
    dateIso: string;
    displayDate: string;
    dayLabel: string;
    /** Ngày âm lịch — nhớ thay bằng ngày âm chính xác của bạn */
    lunarDate: string;
    heroImage: string;
    heroImagePosition?: string;
  };
  invitation: {
    headline: string;
    message: string;
    thankYou: string;
  };
  events: WeddingEvent[];
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
  banks: BankAccount[];
  rsvp: { deadline: string };
  /** Lời chúc mẫu hiển thị sẵn trong sổ lưu bút */
  wishes: Wish[];
  /** File nhạc nền — thêm file thật vào /public/music */
  audioSrc: string;
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: "Đình Kỳ",
      fullName: "Đình Kỳ", // TODO: cập nhật họ tên đầy đủ
      parents: { father: "", mother: "" }, // TODO: điền tên ba mẹ (để trống sẽ ẩn dòng này)
      intro:
        "Một người trầm tính, thích những điều giản dị. Từ ngày có Quỳnh, niềm vui mỗi ngày của Kỳ là được nhìn thấy nụ cười của cô ấy.",
      image: "/images/groom.jpg",
      imagePosition: "50% 22%",
    },
    bride: {
      name: "Như Quỳnh",
      fullName: "Như Quỳnh", // TODO: cập nhật họ tên đầy đủ
      parents: { father: "", mother: "" }, // TODO: điền tên ba mẹ (để trống sẽ ẩn dòng này)
      intro:
        "Cô gái nhỏ yêu hoa và những điều dịu dàng. Quỳnh tin rằng hạnh phúc là một bữa cơm ấm, có đủ hai người.",
      image: "/images/bride.jpg",
      imagePosition: "50% 20%",
    },
  },

  wedding: {
    // TODO: thay bằng ngày cưới thật (giờ tiệc chính để đếm ngược)
    dateIso: "2026-12-20T18:00:00+07:00",
    displayDate: "20 . 12 . 2026",
    dayLabel: "Chủ Nhật",
    lunarDate: "(Tức ngày 12 tháng 11 năm Bính Ngọ)",
    heroImage: "/images/hero-couple.jpg",
    heroImagePosition: "50% 18%",
  },

  invitation: {
    headline: "Trân trọng kính mời",
    message:
      "Sự hiện diện của bạn là niềm vinh hạnh lớn nhất đối với gia đình chúng tôi. Rất mong được đón tiếp bạn trong ngày vui của hai chúng mình!",
    thankYou:
      "Cảm ơn bạn đã dành thời gian đến chung vui cùng hai gia đình. Chúc bạn luôn bình an, hạnh phúc và gặp nhiều may mắn trong cuộc sống.",
  },

  events: [
    {
      id: "vu-quy",
      name: "Lễ Vu Quy",
      time: "09:00",
      dateLabel: "Chủ Nhật, 20.12.2026",
      startIso: "2026-12-20T09:00:00+07:00",
      endIso: "2026-12-20T11:00:00+07:00",
      venue: "Tư Gia Nhà Gái",
      address: "123 Đường Hoa Hồng, Phường 5, Quận Bình Thạnh, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=123+Duong+Hoa+Hong+Binh+Thanh",
      icon: "flower",
    },
    {
      id: "thanh-hon",
      name: "Lễ Thành Hôn",
      time: "11:30",
      dateLabel: "Chủ Nhật, 20.12.2026",
      startIso: "2026-12-20T11:30:00+07:00",
      endIso: "2026-12-20T13:30:00+07:00",
      venue: "Tư Gia Nhà Trai",
      address: "456 Đường Mai Anh Đào, Phường 9, TP. Đà Lạt, Lâm Đồng",
      mapUrl: "https://maps.google.com/?q=456+Duong+Mai+Anh+Dao+Da+Lat",
      icon: "rings",
    },
    {
      id: "tiec-cuoi",
      name: "Tiệc Mừng Cưới",
      time: "18:00",
      dateLabel: "Chủ Nhật, 20.12.2026",
      startIso: "2026-12-20T18:00:00+07:00",
      endIso: "2026-12-20T21:00:00+07:00",
      venue: "Trung Tâm Tiệc Cưới Diamond Palace, Sảnh Ruby",
      address: "789 Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Diamond+Palace+Dien+Bien+Phu",
      icon: "party",
    },
  ],

  story: [
    {
      year: "2019",
      title: "Lần đầu gặp gỡ",
      description:
        "Một buổi chiều cuối năm, Kỳ gặp Quỳnh qua lời giới thiệu của một người bạn chung. Cái gật đầu chào hôm ấy, ai ngờ lại là mở đầu của cả một đời.",
      image: "/images/story-1.jpg",
      imagePosition: "50% 30%",
    },
    {
      year: "2021",
      title: "Lời tỏ tình",
      description:
        "Sau hai năm làm bạn, Kỳ lấy hết can đảm nói ra ba từ quan trọng nhất. Quỳnh chỉ cười, và nụ cười ấy chính là câu trả lời.",
      image: "/images/story-2.jpg",
      imagePosition: "52% 35%",
    },
    {
      year: "2025",
      title: "Lời cầu hôn",
      description:
        "Một chiếc nhẫn nhỏ và một câu hỏi lớn: \"Làm vợ anh nhé?\". Quỳnh gật đầu trước khi nước mắt kịp rơi.",
      image: "/images/story-3.jpg",
      imagePosition: "50% 40%",
    },
    {
      year: "2026",
      title: "Về chung một nhà",
      description:
        "Và hôm nay, chúng mình chính thức gọi nhau là gia đình. Cảm ơn bạn đã là một phần trong hành trình hạnh phúc này.",
      image: "/images/story-4.jpg",
      imagePosition: "50% 55%",
    },
  ],

  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Ảnh cưới trong cung điện cổ", width: 1064, height: 1600 },
    { src: "/images/gallery-2.jpg", alt: "Cô dâu trên bậc thang di sản", width: 1019, height: 1600 },
    { src: "/images/gallery-3.jpg", alt: "Nắm tay nhau bước về phía trước", width: 1013, height: 1600 },
    { src: "/images/gallery-4.jpg", alt: "Nụ hôn lên trán cô dâu", width: 1064, height: 1600 },
    { src: "/images/gallery-5.jpg", alt: "Vòng tay ôm từ phía sau", width: 1064, height: 1600 },
    { src: "/images/gallery-6.jpg", alt: "Hai đứa mình trong studio", width: 1015, height: 1600 },
    { src: "/images/gallery-7.jpg", alt: "Giữa vườn hoa pastel", width: 1065, height: 1600 },
    { src: "/images/gallery-8.jpg", alt: "Chiều vàng bên thành cổ", width: 1013, height: 1600 },
  ],

  banks: [
    {
      label: "Mừng cưới Chú Rể",
      bank: "Vietcombank", // TODO: cập nhật ngân hàng + chi nhánh
      accountNumber: "0123456789", // TODO: số tài khoản thật
      accountName: "DINH KY",
      qrImage: "/images/qr-groom.svg", // TODO: thay QR thật
    },
    {
      label: "Mừng cưới Cô Dâu",
      bank: "Techcombank", // TODO: cập nhật ngân hàng + chi nhánh
      accountNumber: "9876543210", // TODO: số tài khoản thật
      accountName: "NHU QUYNH",
      qrImage: "/images/qr-bride.svg", // TODO: thay QR thật
    },
  ],

  rsvp: { deadline: "10.12.2026" },

  wishes: [
    {
      name: "Gia đình Bác Hai",
      message: "Chúc hai con trăm năm hạnh phúc, sớm sinh quý tử, mãi yêu thương nhau như ngày đầu!",
    },
    {
      name: "Hội bạn thân",
      message: "Cuối cùng cũng đến ngày này rồi! Chúc Kỳ và Quỳnh về chung nhà luôn đầy ắp tiếng cười.",
    },
    {
      name: "Đồng nghiệp của Quỳnh",
      message: "Chúc Quỳnh và anh Kỳ hạnh phúc viên mãn, bên nhau đầu bạc răng long nhé!",
    },
  ],

  audioSrc: "/music/wedding-song.mp3",
};
