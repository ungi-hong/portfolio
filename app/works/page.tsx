import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";
import Html from "@/components/Html";
import WorkCard from "@/components/works/WorkCard";
import FeaturedWork from "@/components/works/FeaturedWork";
import { works } from "@/lib/content";
import "../../styles/career.css";
import "../../styles/works.css";

export const metadata: Metadata = {
  title: "作品 — ungi ポートフォリオ",
  description: "ungi の制作物。VSCode/Chrome 拡張、面談日程調整アプリ TimePick、キャンプ場通知ボットなど。",
};

export default function Works() {
  return (
    <>
      <Scene variant="page" />

      <main>
        <section className="page-head wrap" data-screen-label="作品ヘッダー">
          <p className="eyebrow reveal">{works.head.eyebrow}</p>
          <Html as="h1" className="page-title reveal d1" html={works.head.title} />
          <p className="lead reveal d2">{works.head.lead}</p>
        </section>

        {works.groups.map((group, gi) => {
          const sectionStyle: CSSProperties | undefined = gi > 0 ? { paddingTop: 0 } : undefined;
          const groupStyle: CSSProperties | undefined = gi === 0 ? { marginTop: 0 } : undefined;
          const groupCls = ["wrap works-group", group.isWip ? "is-wip" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <section
              key={gi}
              className="section"
              data-screen-label={group.screenLabel}
              style={sectionStyle}
            >
              <div className={groupCls} style={groupStyle}>
                <div className="group-label reveal">
                  <h2>{group.title}</h2>
                  <span className="gl-sub">{group.subtitle}</span>
                  <span className="gl-count">{group.count}</span>
                </div>

                {group.feature && <FeaturedWork feature={group.feature} />}

                {group.cards && (
                  <div className="work-grid">
                    {group.cards.map((card, ci) => (
                      <WorkCard
                        key={card.name}
                        card={card}
                        className={`reveal${ci > 0 ? ` d${ci}` : ""}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* 連絡導線 */}
        <section className="wrap">
          <Link href={works.next.href} className="next-link">
            <span className="np">{works.next.label}</span>
            <div>
              <h3>{works.next.title}</h3>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
