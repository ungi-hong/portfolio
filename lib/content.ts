import profileJson from "@/content/profile.json";
import homeJson from "@/content/home.json";
import careerJson from "@/content/career.json";
import worksJson from "@/content/works.json";

/* ============ 型定義 ============ */

export interface Profile {
  brand: string;
  email: string;
  github: string;
  githubLabel: string;
  footer: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface Trait {
  k: string;
  text: string;
}

export interface Stat {
  value: number;
  suffix?: string; // カウント末尾に付く文字（アニメーション対象）例: "社"
  unit?: string; // 数字の外に置く静的な単位 例: "年"
  cap: string;
}

export interface PhotoData {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string; // 例: "4/5"
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    role: string;
    lead: string;
    ctaPrimary: CTA;
    ctaGhost: CTA;
  };
  about: {
    no: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    portrait: PhotoData;
    handNote: string;
    traits: Trait[];
  };
  stats: Stat[];
  camp: {
    no: string;
    eyebrow: string;
    title: string;
    lead: string;
    photos: PhotoData[];
    note: { quote: string; html: string };
  };
  teaser: {
    no: string;
    eyebrow: string;
    title: string;
    lead: string;
    items: { kind: string; name: string; desc: string; href: string }[];
    moreLabel: string;
    moreHref: string;
  };
  contact: { no: string; eyebrow: string; title: string };
}

export interface SkillCard {
  heading: string;
  items: string[];
}
export interface TechRow {
  name: string;
  years: string;
  level: number; // 0-100
}
export interface AchievementRow {
  label: string;
  text: string;
}
export interface Achievement {
  badge: string;
  title: string;
  rows: AchievementRow[];
}
export interface Project {
  name: string;
  role: string;
  tech: string;
  desc: string;
  achievements?: Achievement[];
}
export interface TimelineItem {
  period: string;
  company: string;
  biz?: string;
  tags?: string[];
  projects: Project[];
}
export interface CareerContent {
  head: { eyebrow: string; title: string; lead: string };
  // 職務要約の本文は content/prose/career-summary.md
  summary: { heading: string };
  skills: { no: string; eyebrow: string; title: string; cards: SkillCard[] };
  techStack: { no: string; eyebrow: string; title: string; rows: TechRow[]; note: string };
  career: { no: string; eyebrow: string; title: string; items: TimelineItem[] };
  // 自己PRの本文は content/prose/self-pr.md
  pr: { no: string; eyebrow: string; title: string };
  next: { label: string; title: string; href: string };
}

export interface Status {
  label: string;
  type: string; // "live" | "wip"
}
export interface WorkCard {
  kind: string;
  name: string;
  desc: string;
  image?: string; // 例: "/img/unipark.png"（縦横は自動取得）
  imageAlt?: string;
  feats?: string[];
  stack?: string[];
  status: Status;
  repo: string;
  wip?: boolean;
  wipNoteLabel?: string;
  wipNote?: string;
}
export interface FeaturePoint {
  b: string;
  text: string;
}
export interface FeaturedWork {
  kind: string;
  name: string;
  image: string;
  width: number;
  height: number;
  imageAlt: string;
  badge: string;
  summary: string;
  mainFeatures: FeaturePoint[];
  techPoints: FeaturePoint[];
  stack: string[];
  status: Status;
  repo: string;
}
export interface WorkGroup {
  screenLabel: string;
  title: string;
  subtitle: string;
  count: string;
  isWip?: boolean;
  feature?: FeaturedWork;
  cards?: WorkCard[];
}
export interface WorksContent {
  head: { eyebrow: string; title: string; lead: string };
  groups: WorkGroup[];
  next: { label: string; title: string; href: string };
}

/* ============ 型付きエクスポート ============ */

export const profile = profileJson as unknown as Profile;
export const home = homeJson as unknown as HomeContent;
export const career = careerJson as unknown as CareerContent;
export const works = worksJson as unknown as WorksContent;
