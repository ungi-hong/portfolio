import Image from "next/image";
import type { CSSProperties } from "react";
import type { FeaturedWork as FeaturedWorkData } from "@/lib/content";

export default function FeaturedWork({ feature }: { feature: FeaturedWorkData }) {
  return (
    <div className="feature card reveal">
      <div className="feature-shot">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          width={feature.width}
          height={feature.height}
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div className="scrim" />
        <span className="feature-badge">{feature.badge}</span>
      </div>
      <div className="feature-body">
        <span className="kind">{feature.kind}</span>
        <div className="feature-head">
          <h3>{feature.name}</h3>
        </div>
        <p className="summary">{feature.summary}</p>

        <div className="feature-split">
          <div>
            <h4>
              <span className="ic" />主な機能
            </h4>
            <div className="pts">
              {feature.mainFeatures.map((p, i) => (
                <p key={i} className="pt">
                  <b>{p.b}</b>　{p.text}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h4>
              <span className="ic" />技術的な工夫
            </h4>
            <div className="pts">
              {feature.techPoints.map((p, i) => (
                <p key={i} className="pt">
                  <b>{p.b}</b>　{p.text}
                </p>
              ))}
            </div>
            <h4 style={{ marginTop: "1.8rem" } as CSSProperties}>
              <span className="ic" />技術スタック
            </h4>
            <div className="stack-pills">
              {feature.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="work-foot">
        <span className={`status ${feature.status.type}`}>{feature.status.label}</span>
        <a className="repo" href={feature.repo} target="_blank" rel="noopener">
          GitHub <span className="ar">→</span>
        </a>
      </div>
    </div>
  );
}
