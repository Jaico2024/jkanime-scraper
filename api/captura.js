// api/captura.js
import puppeteer from "puppeteer";

export default async function handler(req, res) {
const { q } = req.query;
if (!q) return res.status(400).json({ error: "No query provided" });

let browser;

try {
browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: "/usr/bin/chromium"
});

  const page = await browser.newPage();
await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
);

await page.goto(`https://jkanime.net/buscar/${encodeURIComponent(q)}/`, {
  waitUntil: "networkidle2",
  timeout: 30000
});

await page.screenshot({ path: "/tmp/pagina.png", fullPage: true });

await browser.close();

res.setHeader("Content-Type", "image/png");
res.sendFile("/tmp/pagina.png");
} catch (error) {
if (browser) await browser.close();
console.error("Error en captura:", error);
res.status(500).json({ error: "Error al capturar la página" });
}
}
