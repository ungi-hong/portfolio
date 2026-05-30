import { createElement, type CSSProperties } from "react";

/**
 * 文字列を HTML としてそのまま描画する。
 * 改行(<br />)や強調(<span class="accent">…</span>)、Markdown 変換後の HTML を埋め込む。
 * 自分で書いた信頼できるコンテンツ専用。
 */
export default function Html({
  as = "span",
  html,
  className,
  style,
}: {
  as?: string;
  html: string;
  className?: string;
  style?: CSSProperties;
}) {
  return createElement(as, {
    className,
    style,
    dangerouslySetInnerHTML: { __html: html },
  });
}
