import type { WorkCard as WorkCardData } from "@/lib/content";
import Html from "@/components/Html";
import { renderInline } from "@/lib/prose";

export default function WorkCard({
  card,
  className,
}: {
  card: WorkCardData;
  className?: string;
}) {
  const cls = ["work-card card", card.wip ? "wip" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className="kind">{card.kind}</span>
      <h3>{card.name}</h3>
      <Html as="p" className="desc" html={renderInline(card.desc)} />
      {card.feats && (
        <ul className="feat">
          {card.feats.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      {card.stack && (
        <div className="stack-pills">
          {card.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      )}
      {card.wipNote && (
        <div className="wip-note">
          {card.wipNoteLabel && <span className="lbl">{card.wipNoteLabel}</span>}
          <p>{card.wipNote}</p>
        </div>
      )}
      <div className="work-foot">
        <span className={`status ${card.status.type}`}>{card.status.label}</span>
        <a className="repo" href={card.repo} target="_blank" rel="noopener">
          GitHub <span className="ar">→</span>
        </a>
      </div>
    </div>
  );
}
