/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare に静的ファイルとして置くため、out/ へ書き出す
  output: "export",
  // 静的書き出しでは画像最適化サーバーが無いので、元画像をそのまま配信する
  images: { unoptimized: true },
};

export default nextConfig;
