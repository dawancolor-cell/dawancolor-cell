import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const svgPath = path.join(root, "assets", "typography-motion.svg");
const frameDir = path.join(root, "frames");
const svg = fs.readFileSync(svgPath, "utf8");

fs.rmSync(frameDir, { recursive: true, force: true });
fs.mkdirSync(frameDir, { recursive: true });

const width = 864;
const height = 240;
const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=${width}, initial-scale=1"></head>
<body style="margin:0;width:${width}px;height:${height}px;overflow:hidden;background:#10272A">
  <div style="width:${width}px;height:${height}px">${svg.replace("<svg ", `<svg width="${width}" height="${height}" `)}</div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(250);

  // Capture an entire 8-second motion cycle at 8 fps.
  for (let i = 0; i < 64; i += 1) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({ path: path.join(frameDir, name) });
    await page.waitForTimeout(125);
  }
  console.log("Rendered 64 optimized-size animation frames.");
} finally {
  await browser.close();
}
