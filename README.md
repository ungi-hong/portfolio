# portfolio

フロントエンドエンジニア **ungi** のポートフォリオサイト。経歴・作品・連絡先をまとめた、黄昏のキャンプサイトをテーマにした静的サイト。

## 技術スタック

- [Next.js 16](https://nextjs.org/)（App Router / Turbopack）
- React 19 / TypeScript
- フォント: `next/font/google`（Shippori Mincho B1 / Zen Kaku Gothic New / Klee One / DM Mono）
- 画像最適化: `next/image`
- スタイル: 素の CSS（`styles/` 配下）

## 構成

```
app/            ルーティング（/ , /career , /works）と layout・OG/favicon
components/     UI コンポーネント（Scene の演出ロジックを含む）
content/        ページ文言を JSON で集約（profile / home / career / works）
lib/            JSON を型付けして公開する content.ts ほか
styles/         ページ別の CSS
public/img/     画像アセット
```

文言はすべて `content/*.json` に集約し、`lib/content.ts` で型付けして読み込む。表示と内容を分離しているので、原稿の修正は JSON だけで完結する。

## 開発

このリポジトリは **pnpm** を前提にしている。

```bash
pnpm install
pnpm dev      # 開発サーバー (http://localhost:3000)
pnpm build    # 本番ビルド
pnpm start    # 本番サーバー
pnpm lint     # ESLint
```
