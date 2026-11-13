import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const asset = {
  source: "assets/nextborder-founder-motion.svg",
  frameDir: "founder-frames",
  width: 720,
  height: 340
};

const svgPath = path.join(root, asset.source);
const frameDir = path.join(root, asset.frameDir);
const svg = fs.readFileSync(svgPath, "utf8");

fs.rmSync(frameDir, { recursive: true, force: true });
fs.mkdirSync(frameDir, { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=${asset.width}, initial-scale=1"></head>
<body style="margin:0;width:${asset.width}px;height:${asset.height}px;overflow:hidden;background:#0A0A0B">
  <div style="width:${asset.width}px;height:${asset.height}px">${svg.replace("<svg ", `<svg width="${asset.width}" height="${asset.height}" `)}</div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: asset.width, height: asset.height },
    deviceScaleFactor: 1
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(250);

  // Capture one eight-second ambient motion loop at 8 fps.
  for (let i = 0; i < 64; i += 1) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({ path: path.join(frameDir, name) });
    await page.waitForTimeout(125);
  }
  console.log("Rendered 64 optimized-size founder background frames.");
} finally {
  await browser.close();
}
