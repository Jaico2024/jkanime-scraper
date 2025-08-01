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
      waitUntil: "networkidle2"
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    const resultados = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll(".anime__item"));

      return items.map(el => {
        const enlace = el.querySelector("a");
        const href = enlace?.getAttribute("href") || "";
        const url = href.startsWith("http") ? href : `https://jkanime.net${href}`;

        const imagenEl = el.querySelector(".anime__item__pic");
        const imagen = imagenEl?.getAttribute("data-setbg") || "";

        // Extraer el título desde el slug de la URL
        const slug = href?.split("/").filter(Boolean).pop() || "";
        const titulo = decodeURIComponent(slug)
          .replace(/-/g, " ")
          .replace(/\b\w/g, l => l.toUpperCase());

        return { titulo, url, imagen };
      });
    });

    await browser.close();
    res.status(200).json({ resultados });

  } catch (error) {
    if (browser) await browser.close();
    console.error("Error en puppeteer:", error);
    res.status(500).json({ error: "Error al obtener resultados con Puppeteer" });
  }
}
