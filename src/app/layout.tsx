import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Great_Vibes, Playfair_Display } from "next/font/google";

import { weddingConfig } from "@/lib/wedding-config";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-great-vibes",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const { groom, bride } = weddingConfig.couple;

export const metadata: Metadata = {
  title: `${groom.name} ♥ ${bride.name} | Thiệp Cưới`,
  description: `Trân trọng kính mời bạn đến chung vui cùng ${groom.name} & ${bride.name} — ${weddingConfig.wedding.displayDate}`,
};

export const viewport: Viewport = {
  themeColor: "#8a0f29",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${greatVibes.variable} ${beVietnam.variable}`}
    >
      <body className="antialiased">
        {/* Không có JS vẫn đọc được thiệp: bỏ màn bìa, hiện mọi nội dung */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}#invitation-cover{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
