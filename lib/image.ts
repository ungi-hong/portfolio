import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/** public 配下の画像の縦横ピクセルをビルド時に取得する（next/image のレイアウトシフト防止用）。 */
export function publicImageSize(src: string): { width: number; height: number } {
  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const { width, height } = imageSize(fs.readFileSync(file));
  return { width: width ?? 0, height: height ?? 0 };
}
