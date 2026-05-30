import Link from "next/link";
import Scene from "@/components/Scene";
import Html from "@/components/Html";
import Photo from "@/components/Photo";
import { home, profile } from "@/lib/content";
import { renderInline } from "@/lib/prose";
import "../styles/index.css";

export default function Home() {
  return (
    <>
      <Scene variant="home" />

      <main>
        {/* ===== ヒーロー ===== */}
        <section className="hero section" data-screen-label="ヒーロー">
          <div className="wrap hero-inner">
            <p className="eyebrow reveal">{home.hero.eyebrow}</p>
            <Html as="h1" className="hero-title reveal d1" html={home.hero.title} />
            <p className="hero-role reveal d2">{home.hero.role}</p>
            <Html as="p" className="hero-lead reveal d3" html={home.hero.lead} />
            <div className="hero-cta reveal d4">
              <Link className="btn btn-primary" href={home.hero.ctaPrimary.href}>
                {home.hero.ctaPrimary.label} <span className="arr">→</span>
              </Link>
              <Link className="btn btn-ghost" href={home.hero.ctaGhost.href}>
                {home.hero.ctaGhost.label} <span className="arr">→</span>
              </Link>
            </div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="下へ">
            <span className="dot" />
            <span className="txt">SCROLL</span>
          </a>
        </section>

        {/* ===== 自己紹介・人柄 ===== */}
        <section className="section" id="about" data-screen-label="自己紹介">
          <div className="wrap about-grid">
            <div className="about-portrait reveal">
              <Photo photo={home.about.portrait} />
              <p className="hand-note">{home.about.handNote}</p>
            </div>
            <div className="about-body">
              <p className="eyebrow reveal">
                <span className="no">{home.about.no}</span> {home.about.eyebrow}
              </p>
              <Html as="h2" className="section-title reveal d1" html={home.about.title} />
              {home.about.paragraphs.map((p, i) => (
                <Html
                  key={i}
                  as="p"
                  className="lead reveal d2"
                  style={i > 0 ? { marginTop: "1.1rem" } : undefined}
                  html={renderInline(p)}
                />
              ))}
              <ul className="trait-list reveal d3">
                {home.about.traits.map((t) => (
                  <li key={t.k}>
                    <span className="k">{t.k}</span>
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== ステータス（数字） ===== */}
        <section className="section stats-sec" data-screen-label="数字">
          <div className="wrap stats">
            {home.stats.map((s, i) => (
              <div key={i} className={`stat reveal${i > 0 ? ` d${i}` : ""}`}>
                <span className="num">
                  <span data-count={s.value} data-suffix={s.suffix}>
                    0
                  </span>
                  {s.unit}
                </span>
                <span className="cap">{s.cap}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 趣味・キャンプ ===== */}
        <section className="section camp-sec" id="camp" data-screen-label="キャンプ">
          <div className="wrap">
            <div className="camp-head">
              <p className="eyebrow reveal">
                <span className="no">{home.camp.no}</span> {home.camp.eyebrow}
              </p>
              <Html as="h2" className="section-title reveal d1" html={home.camp.title} />
              <p className="lead reveal d2">{home.camp.lead}</p>
            </div>
            <div className="camp-gallery">
              {home.camp.photos.map((photo, i) => (
                <Photo key={i} photo={photo} className={`reveal${i > 0 ? ` d${i}` : ""}`} />
              ))}
            </div>
            <div className="camp-note card reveal">
              <p className="hand-note big">{home.camp.note.quote}</p>
              <Html as="p" html={home.camp.note.html} />
            </div>
          </div>
        </section>

        {/* ===== 作品への導線 ===== */}
        <section className="section works-teaser" id="works" data-screen-label="作品導線">
          <div className="wrap">
            <p className="eyebrow reveal">
              <span className="no">{home.teaser.no}</span> {home.teaser.eyebrow}
            </p>
            <h2 className="section-title reveal d1">{home.teaser.title}</h2>
            <p className="lead reveal d2">{home.teaser.lead}</p>
            <div className="teaser-grid">
              {home.teaser.items.map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`teaser card reveal${i > 0 ? ` d${i}` : ""}`}
                >
                  <span className="t-kind">{item.kind}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <span className="t-go">詳しく見る →</span>
                </Link>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: 40 }}>
              <Link className="btn btn-ghost" href={home.teaser.moreHref}>
                {home.teaser.moreLabel} <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 連絡先 ===== */}
        <section className="section contact-sec" id="contact" data-screen-label="連絡先">
          <div className="wrap contact-inner reveal">
            <p className="eyebrow">
              <span className="no">{home.contact.no}</span> {home.contact.eyebrow}
            </p>
            <Html as="h2" className="section-title" html={home.contact.title} />
            <div className="contact-links">
              <a className="contact-card card" href={`mailto:${profile.email}`}>
                <span className="c-label">Email</span>
                <span className="c-val">{profile.email}</span>
                <span className="arr">→</span>
              </a>
              <a className="contact-card card" href={profile.github} target="_blank" rel="noopener">
                <span className="c-label">GitHub</span>
                <span className="c-val">{profile.githubLabel}</span>
                <span className="arr">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
