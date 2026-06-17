/**
 * ⚙️ FILE CẤU HÌNH THIỆP CƯỚI
 *
 * Toàn bộ thông tin hiển thị trên thiệp (tên, ngày giờ, địa điểm, ảnh...)
 * đều nằm ở đây. Chỉ cần sửa file này và thay ảnh trong thư mục
 * /public/images là có thiệp của riêng bạn — không cần đụng vào code giao diện.
 */

export interface Person {
  /** Tên gọi hiển thị lớn trên thiệp */
  name: string;
  fullName: string;
  /** Thứ bậc trong gia đình, ví dụ "Quý Nam", "Út Nữ" (để trống "" sẽ ẩn) */
  lineage?: string;
  /** Để trống ("") nếu chưa muốn hiển thị tên ba mẹ */
  parents: { father: string; mother: string };
  /** Quê quán hiển thị dưới tên ba mẹ (để trống "" sẽ ẩn) */
  hometown?: string;
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
  /** Nhãn ngày hiển thị, ví dụ "Thứ Năm, 16.07.2026" */
  dateLabel: string;
  /** Ngày âm lịch riêng của sự kiện, ví dụ "Nhằm 03/06 Bính Ngọ" (để trống sẽ ẩn) */
  lunarLabel?: string;
  /** Thời gian bắt đầu/kết thúc (ISO, múi giờ VN) — dùng cho nút "Thêm vào lịch" */
  startIso: string;
  endIso: string;
  venue: string;
  address: string;
  /** Link Google Maps cho nút "Chỉ đường" */
  mapUrl: string;
  icon: "flower" | "rings" | "party";
}

/** Một mốc trong trình tự ngày cưới (timeline ngắn) */
export interface TimelineStep {
  /** Giờ dạng "HH:MM" */
  time: string;
  label: string;
  icon: "welcome" | "rings" | "party" | "photo";
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

export interface Wish {
  name: string;
  message: string;
}

export interface WeddingConfig {
  couple: { groom: Person; bride: Person };
  wedding: {
    /** Mốc đếm ngược (giờ hôn lễ chính) */
    dateIso: string;
    displayDate: string;
    dayLabel: string;
    /** Ngày âm lịch */
    lunarDate: string;
    heroImage: string;
    heroImagePosition?: string;
  };
  invitation: {
    headline: string;
    message: string;
    /** Lời cảm ơn — đoạn 1 (hành trình + biết ơn) */
    thankYou1: string;
    /** Lời cảm ơn — đoạn 2 (lời mời dự lễ Vu Quy) */
    thankYou2: string;
  };
  events: WeddingEvent[];
  /** Trình tự ngày cưới hiển thị trong mục Sự Kiện */
  dayTimeline: TimelineStep[];
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
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
      fullName: "Lê Đình Kỳ",
      lineage: "Quý Nam",
      parents: { father: "Lê Đình Đức", mother: "Châu Thị Bạch Yến" },
      hometown: "Chi Lăng, Phường Phú Xuân, Thành phố Huế",
      intro:
        "Một người trầm tính, thích những điều giản dị. Từ ngày có Quỳnh, niềm vui mỗi ngày của Kỳ là được nhìn thấy nụ cười của cô ấy.",
      image: "/images/groom.jpg",
      imagePosition: "50% 22%",
    },
    bride: {
      name: "Như Quỳnh",
      fullName: "Nguyễn Thị Như Quỳnh",
      lineage: "Út Nữ",
      parents: { father: "Nguyễn Ngọc Mạnh", mother: "Hoàng Thị Tĩnh" },
      hometown: "Lưỡng Kim, Xã Nam Cửa Việt, Tỉnh Quảng Trị",
      intro:
        "Cô gái nhỏ yêu hoa và những điều dịu dàng. Quỳnh tin rằng hạnh phúc là một bữa cơm ấm, có đủ hai người.",
      image: "/images/bride.jpg",
      imagePosition: "50% 20%",
    },
  },

  wedding: {
    // Đếm ngược tới Lễ Vu Quy lúc 09:00 sáng 16.07.2026 (theo thiệp giấy)
    dateIso: "2026-07-16T09:00:00+07:00",
    displayDate: "16 . 07 . 2026",
    dayLabel: "Thứ Năm",
    lunarDate: "(Nhằm ngày 03 tháng 06 năm Bính Ngọ)",
    heroImage: "/images/hero-couple.jpg",
    heroImagePosition: "50% 18%",
  },

  invitation: {
    headline: "Trân trọng kính mời",
    message: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi.",
    thankYou1:
      "Hành trình 10 năm yêu thương, từ những ngày đầu còn bỡ ngỡ, qua bao lần giận hờn rồi lại tha thứ, cùng nhau vun đắp và trưởng thành, đã đưa Như Quỳnh và Đình Kỳ đến ngày hôm nay. Cảm ơn vì trong suốt chặng đường ấy luôn có gia đình, người thân, bạn bè ủng hộ và chúc phúc cho tình yêu này.",
    thankYou2:
      "Hôn lễ này đối với chúng con, chúng mình là một cột mốc tình yêu to lớn. Chính vì vậy, Như Quỳnh và Đình Kỳ xin kính mời Ông Bà, Cô Bác, Anh chị em bạn bè đến tham dự lễ Vu Quy để cùng khóc, cùng cười và cùng chứng kiến niềm hạnh phúc trọn vẹn nhất trong ngày trọng đại này.",
  },

  events: [
    {
      id: "tiec-than-mat",
      name: "Tiệc Thân Mật",
      time: "16:00",
      dateLabel: "Thứ Tư, 15.07.2026",
      lunarLabel: "Nhằm 02/06 Bính Ngọ",
      startIso: "2026-07-15T16:00:00+07:00",
      endIso: "2026-07-15T19:00:00+07:00",
      venue: "Hội Trường HTX Lưỡng Kim",
      address: "Khu vực 1, Lưỡng Kim, Nam Cửa Việt, Quảng Trị",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+HTX+L%C6%B0%E1%BB%A1ng+Kim+Nam+C%E1%BB%ADa+Vi%E1%BB%87t+Qu%E1%BA%A3ng+Tr%E1%BB%8B",
      icon: "party",
    },
    {
      id: "vu-quy",
      name: "Lễ Vu Quy",
      time: "09:00",
      dateLabel: "Thứ Năm, 16.07.2026",
      lunarLabel: "Nhằm 03/06 Bính Ngọ",
      startIso: "2026-07-16T09:00:00+07:00",
      endIso: "2026-07-16T11:00:00+07:00",
      venue: "Tư Gia Nhà Gái",
      address: "Lưỡng Kim, Xã Nam Cửa Việt, Tỉnh Quảng Trị",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=L%C6%B0%E1%BB%A1ng+Kim+Nam+C%E1%BB%ADa+Vi%E1%BB%87t+Qu%E1%BA%A3ng+Tr%E1%BB%8B",
      icon: "flower",
    },
    {
      id: "tiec-cuoi",
      name: "Tiệc Mừng Cưới",
      time: "11:00",
      dateLabel: "Thứ Năm, 16.07.2026",
      lunarLabel: "Nhằm 03/06 Bính Ngọ",
      startIso: "2026-07-16T11:00:00+07:00",
      endIso: "2026-07-16T14:00:00+07:00",
      venue: "Hội Trường HTX Lưỡng Kim",
      address: "Khu vực 1, Lưỡng Kim, Nam Cửa Việt, Quảng Trị",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+HTX+L%C6%B0%E1%BB%A1ng+Kim+Nam+C%E1%BB%ADa+Vi%E1%BB%87t+Qu%E1%BA%A3ng+Tr%E1%BB%8B",
      icon: "rings",
    },
  ],

  dayTimeline: [
    { time: "10:30", label: "Đón khách", icon: "welcome" },
    { time: "11:00", label: "Lễ Cưới", icon: "rings" },
    { time: "11:30", label: "Tiệc Cưới", icon: "party" },
    { time: "13:00", label: "Chụp Hình", icon: "photo" },
  ],

  story: [
    {
      year: "2016",
      title: "Lần đầu gặp gỡ",
      description:
        "Mười năm trước, Kỳ và Quỳnh gặp nhau khi cả hai còn rất trẻ. Cái gật đầu chào ngày ấy, ai ngờ lại là khởi đầu của cả một đời.",
      image: "/images/story-1.jpg",
      imagePosition: "50% 30%",
    },
    {
      year: "2019",
      title: "Về chung một đội",
      description:
        "Qua những ngày bỡ ngỡ, qua cả những lần giận hờn rồi lại tha thứ, hai đứa chọn nắm tay nhau đi tiếp, cùng vun đắp và trưởng thành.",
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
        "Và hôm nay, sau mười năm yêu thương, chúng mình chính thức gọi nhau là gia đình. Cảm ơn bạn đã là một phần của hành trình này.",
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

  rsvp: { deadline: "10.07.2026" },

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
