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
  parents: { father: string; mother: string };
  /** Lời giới thiệu ngắn */
  intro: string;
  image: string;
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
      name: "Minh Quân",
      fullName: "Đỗ Minh Quân",
      parents: { father: "Đỗ Văn Bình", mother: "Lê Thị Mai" },
      intro:
        "Một chàng kỹ sư yêu cà phê sáng và những chuyến đi xa. Từ ngày gặp Hà, mọi chuyến đi đều có thêm một người đồng hành.",
      image: "/images/groom.svg",
    },
    bride: {
      name: "Thu Hà",
      fullName: "Trần Thu Hà",
      parents: { father: "Trần Quốc Hùng", mother: "Phạm Thu Hương" },
      intro:
        "Cô gái nhỏ thích hoa, thích nấu ăn và tin rằng hạnh phúc nằm ở những điều giản dị nhất — như một bữa cơm có đủ hai người.",
      image: "/images/bride.svg",
    },
  },

  wedding: {
    dateIso: "2026-12-20T18:00:00+07:00",
    displayDate: "20 . 12 . 2026",
    dayLabel: "Chủ Nhật",
    lunarDate: "(Tức ngày 12 tháng 11 năm Bính Ngọ)",
    heroImage: "/images/hero-couple.svg",
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
      venue: "Trung Tâm Tiệc Cưới Diamond Palace — Sảnh Ruby",
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
        "Một buổi chiều mưa Sài Gòn, chúng mình tình cờ ngồi chung một quán cà phê nhỏ. Ai ngờ cái gật đầu chào hôm ấy lại là mở đầu của cả một đời.",
      image: "/images/story-1.svg",
    },
    {
      year: "2021",
      title: "Lời tỏ tình",
      description:
        "Dưới ánh đèn vàng của con phố quen, Quân lấy hết can đảm nói ba từ quan trọng nhất. Và Hà đã cười — nụ cười thay cho câu trả lời.",
      image: "/images/story-2.svg",
    },
    {
      year: "2025",
      title: "Lời cầu hôn",
      description:
        "Trên đồi hoa Đà Lạt lộng gió, một chiếc nhẫn nhỏ và một câu hỏi lớn: \"Làm vợ anh nhé?\" — Hà gật đầu trước khi nước mắt kịp rơi.",
      image: "/images/story-3.svg",
    },
    {
      year: "2026",
      title: "Về chung một nhà",
      description:
        "Và hôm nay, chúng mình chính thức gọi nhau là gia đình. Cảm ơn bạn đã là một phần trong hành trình hạnh phúc này.",
      image: "/images/story-4.svg",
    },
  ],

  gallery: [
    { src: "/images/gallery-1.svg", alt: "Ảnh cưới 1", width: 800, height: 1000 },
    { src: "/images/gallery-2.svg", alt: "Ảnh cưới 2", width: 800, height: 800 },
    { src: "/images/gallery-3.svg", alt: "Ảnh cưới 3", width: 800, height: 1100 },
    { src: "/images/gallery-4.svg", alt: "Ảnh cưới 4", width: 800, height: 650 },
    { src: "/images/gallery-5.svg", alt: "Ảnh cưới 5", width: 800, height: 950 },
    { src: "/images/gallery-6.svg", alt: "Ảnh cưới 6", width: 800, height: 800 },
  ],

  banks: [
    {
      label: "Mừng cưới Chú Rể",
      bank: "Vietcombank — CN Bình Thạnh",
      accountNumber: "0123456789",
      accountName: "DO MINH QUAN",
      qrImage: "/images/qr-groom.svg",
    },
    {
      label: "Mừng cưới Cô Dâu",
      bank: "Techcombank — CN Đà Lạt",
      accountNumber: "9876543210",
      accountName: "TRAN THU HA",
      qrImage: "/images/qr-bride.svg",
    },
  ],

  rsvp: { deadline: "10.12.2026" },

  wishes: [
    {
      name: "Gia đình Bác Hai",
      message: "Chúc hai con trăm năm hạnh phúc, sớm sinh quý tử, mãi yêu thương nhau như ngày đầu!",
    },
    {
      name: "Hội bạn thân Đại học",
      message: "Cuối cùng cũng đến ngày này rồi! Chúc hai bạn về chung nhà luôn đầy ắp tiếng cười.",
    },
    {
      name: "Đồng nghiệp của Hà",
      message: "Chúc chị Hà và anh Quân hạnh phúc viên mãn, bên nhau đầu bạc răng long nhé!",
    },
  ],

  audioSrc: "/music/wedding-song.mp3",
};
