import type { Metadata } from "next";
import {
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
  Klee_One,
  DM_Mono,
} from "next/font/google";
import "../styles/site.css";
import "../styles/scene.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// 日本語フォントは全グリフが重いので preload しない（display: swap で表示）
const serif = Shippori_Mincho_B1({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif",
});
const sans = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans",
});
const hand = Klee_One({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-hand",
});
const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const fontVars = `${serif.variable} ${sans.variable} ${hand.variable} ${mono.variable}`;

const siteUrl = "https://ungi.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ungi — フロントエンドエンジニア ポートフォリオ",
  description:
    "フロントエンドエンジニア ungi のポートフォリオ。React / Next.js / TypeScript を中心に6年。経歴・作品・連絡先。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "ungi — ポートフォリオ",
    title: "ungi — フロントエンドエンジニア ポートフォリオ",
    description:
      "React / Next.js / TypeScript を中心に6年。役割を超えて落ちているボールを拾う、フロントエンドエンジニアのポートフォリオ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "ungi — フロントエンドエンジニア ポートフォリオ",
    description:
      "React / Next.js / TypeScript を中心に6年。フロントエンドエンジニア ungi のポートフォリオ。",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={fontVars}>
      <body className="scene-dusk">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
