import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

/**
 * ==強調== を <span class="hl">強調</span> に変換する。
 * Markdown には無い、このサイト独自のアクセント装飾（オレンジ）。
 */
function applyMarks(md: string): string {
  return md.replace(/==([^=\n]+?)==/g, '<span class="hl">$1</span>');
}

/** 段落・リストなどを含むブロックを HTML 文字列にする（<p> で囲まれる）。 */
export function renderMarkdown(md: string): string {
  return marked.parse(applyMarks(md), { async: false }) as string;
}

/** 1行分のインライン Markdown を HTML 文字列にする（<p> で囲まない）。 */
export function renderInline(md: string): string {
  return marked.parseInline(applyMarks(md), { async: false }) as string;
}

const PROSE_DIR = path.join(process.cwd(), "content", "prose");

/** content/prose/<name>.md を読み込んで HTML 文字列にする。 */
export function loadProse(name: string): string {
  return renderMarkdown(fs.readFileSync(path.join(PROSE_DIR, `${name}.md`), "utf8"));
}
