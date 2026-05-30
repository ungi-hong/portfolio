import type { Metadata } from "next";
import Link from "next/link";
import Scene from "@/components/Scene";
import Html from "@/components/Html";
import { career } from "@/lib/content";
import { loadProse, renderInline } from "@/lib/prose";
import type { CSSProperties } from "react";
import "../../styles/career.css";

export const metadata: Metadata = {
  title: "経歴 — ungi ポートフォリオ",
  description: "ungi の職務経歴・スキル・技術スタック。フロントエンドを主軸に6年、要件定義から運用・プロセス改善まで。",
};

export default function Career() {
  const summaryHtml = loadProse("career-summary");
  const prHtml = loadProse("self-pr");
  return (
    <>
      <Scene variant="page" />

      <main>
        {/* ページヘッダー */}
        <section className="page-head wrap" data-screen-label="経歴ヘッダー">
          <p className="eyebrow reveal">{career.head.eyebrow}</p>
          <Html as="h1" className="page-title reveal d1" html={career.head.title} />
          <p className="lead reveal d2">{career.head.lead}</p>
        </section>

        {/* 職務要約 */}
        <section className="section" data-screen-label="職務要約">
          <div className="wrap summary-grid">
            <div className="reveal">
              <h2>{career.summary.heading}</h2>
            </div>
            <Html as="div" className="summary-body reveal d1" html={summaryHtml} />
          </div>
        </section>

        {/* 保有スキル */}
        <section className="section" data-screen-label="スキル">
          <div className="wrap">
            <p className="eyebrow reveal">
              <span className="no">{career.skills.no}</span> {career.skills.eyebrow}
            </p>
            <h2 className="section-title reveal d1">{career.skills.title}</h2>
            <div className="skill-cols">
              {career.skills.cards.map((card, i) => (
                <div key={card.heading} className={`skill-card card reveal${i > 0 ? ` d${i}` : ""}`}>
                  <h3>
                    <span className="ic" />
                    {card.heading}
                  </h3>
                  <ul>
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 技術スタック */}
        <section className="section" data-screen-label="技術スタック">
          <div className="wrap">
            <p className="eyebrow reveal">
              <span className="no">{career.techStack.no}</span> {career.techStack.eyebrow}
            </p>
            <h2 className="section-title reveal d1">{career.techStack.title}</h2>
            <div className="stack-wrap">
              {career.techStack.rows.map((row) => (
                <div
                  key={row.name}
                  className="stack-row reveal"
                  style={{ "--lv": `${row.level}%` } as CSSProperties}
                >
                  <span className="name">{row.name}</span>
                  <span className="yrs">{row.years}</span>
                  <span className="bar">
                    <i />
                  </span>
                </div>
              ))}
            </div>
            <p className="proj-tech reveal" style={{ marginTop: "2rem" }}>
              {career.techStack.note}
            </p>
          </div>
        </section>

        {/* 職務経歴 タイムライン */}
        <section className="section" data-screen-label="職務経歴">
          <div className="wrap">
            <p className="eyebrow reveal">
              <span className="no">{career.career.no}</span> {career.career.eyebrow}
            </p>
            <h2 className="section-title reveal d1">{career.career.title}</h2>

            <div className="timeline">
              {career.career.items.map((item, i) => (
                <div key={i} className="tl-item reveal">
                  <div className="tl-period">{item.period}</div>
                  <h3 className="tl-company">{item.company}</h3>
                  {item.biz && <p className="tl-biz">{item.biz}</p>}
                  {item.tags && (
                    <div className="tl-meta">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.projects.map((proj, pi) => (
                    <div key={pi} className="proj card">
                      <div className="proj-top">
                        <span className="proj-name">{proj.name}</span>
                        <span className="proj-role">{proj.role}</span>
                      </div>
                      <div className="proj-tech">{proj.tech}</div>
                      <Html as="p" className="proj-desc" html={renderInline(proj.desc)} />
                      {proj.achievements && (
                        <div className="achv">
                          {proj.achievements.map((achv, ai) => (
                            <div key={ai} className="achv-item">
                              <h5>
                                <span className="badge">{achv.badge}</span>
                                {achv.title}
                              </h5>
                              <div className="achv-cqr">
                                {achv.rows.map((row, ri) => (
                                  <div key={ri} className="row">
                                    <span className="lbl">{row.label}</span>
                                    <Html as="span" className="txt" html={renderInline(row.text)} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 自己PR */}
        <section className="section pr-sec" data-screen-label="自己PR">
          <div className="wrap">
            <p className="eyebrow reveal">
              <span className="no">{career.pr.no}</span> {career.pr.eyebrow}
            </p>
            <h2 className="section-title reveal d1">{career.pr.title}</h2>
            <Html as="div" className="pr-body reveal d2" html={prHtml} />
          </div>
        </section>

        {/* 次ページ */}
        <section className="wrap">
          <Link href={career.next.href} className="next-link">
            <span className="np">{career.next.label}</span>
            <div>
              <h3>{career.next.title}</h3>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
