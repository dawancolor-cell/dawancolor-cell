import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const svgPath = path.join(root, "assets", "typography-motion.svg");
const frameDir = path.join(root, "frames");
const svg = fs.readFileSync(svgPath, "utf8");

fs.rmSync(frameDir, { recursive: true, force: true });
fs.mkdirSync(frameDir, { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;width:1440px;height:400px;overflow:hidden;background:#10272A">
  <div style="width:1440px;height:400px">${svg.replace("<svg ", '<svg width="1440" height="400" ')}</div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 400 },
    deviceScaleFactor: 1
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(250);
  for (let i = 0; i < 64; i += 1) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({ path: path.join(frameDir, name) });
    await page.waitForTimeout(100);
  }
  console.log("Rendered 64 animation frames.");
} finally {
  await browser.close();
}
