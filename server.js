import express from "express";
import handler from "./api/search.js";

const app = express();

// Ruta base para Railway
app.get("/", (req, res) => {
  res.send("✅ Servidor JKAnime Scraper activo");
});

// Ruta principal de búsqueda
app.get("/api/search", handler);

// Ruta de prueba de Puppeteer
app.get("/api/test-puppeteer", async (req, res) => {
  console.log("📡 Endpoint /api/test-puppeteer recibido");

  const puppeteer = await import("puppeteer");
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/usr/bin/chromium"
    });

    const page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });

    const title = await page.title();
    res.json({ success: true, title });

  } catch (err) {
    console.error("❌ Error en Puppeteer:", err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
