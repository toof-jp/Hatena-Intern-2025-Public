/**
 * 受け取った文書を HTML に変換する
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function render(src: string): Promise<string> {
  // TODO: これはサンプル実装 (URL の自動リンク) です
  const html = src.replace(/https?:\/\/[^\s]+/g, (url) => `<a href="${encodeURI(url)}">${url}</a>`);
  return html;
}
