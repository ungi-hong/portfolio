import Image from "next/image";
import type { CSSProperties } from "react";
import type { PhotoData } from "@/lib/content";

/**
 * src があれば画像、なければラベル付きプレースホルダを表示。
 * JSON に "src" を足すだけで写真に差し替えられる。
 */
export default function Photo({
  photo,
  className,
}: {
  photo: PhotoData;
  className?: string;
}) {
  const style = photo.ratio ? ({ aspectRatio: photo.ratio } as CSSProperties) : undefined;
  const cls = ["ph", className].filter(Boolean).join(" ");

  if (photo.src) {
    return (
      <div className={cls} style={style}>
        <Image
          src={photo.src}
          alt={photo.alt ?? ""}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 360px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div className={cls} style={style}>
      <span>{photo.label}</span>
    </div>
  );
}
