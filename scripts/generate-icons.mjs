import fs from "node:fs";
import sharp from "sharp";

fs.mkdirSync("public/icons", { recursive: true });

const svg = fs.readFileSync("public/icon.svg");
const iconInner = svg
	.toString("utf8")
	.replace(/^[\s\S]*?<svg[^>]*>/, "")
	.replace(/<\/svg>\s*$/, "")
	.replace(/<rect width="100" height="100" fill="#000"\/>/, "");

await sharp(svg).resize(32, 32).png().toFile("public/favicon-32x32.png");
await sharp(svg).resize(180, 180).png().toFile("public/icons/apple-touch-icon.png");
await sharp(svg).resize(192, 192).png().toFile("public/icons/icon-192.png");
await sharp(svg).resize(512, 512).png().toFile("public/icons/icon-512.png");

const socialCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000"/>
  <g transform="translate(80 115) scale(4)">
    ${iconInner}
  </g>
  <text x="520" y="300" fill="#fff" font-family="Segoe UI, system-ui, sans-serif" font-size="72" font-weight="700">stavroskarelis.com</text>
  <text x="520" y="380" fill="#57ff9a" font-family="Segoe UI, system-ui, sans-serif" font-size="36">Personal blog</text>
</svg>`;

await sharp(Buffer.from(socialCard)).png().toFile("public/social-card.png");

console.log("Icons generated in public/");
