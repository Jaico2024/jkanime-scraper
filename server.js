import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Servidor activo en Railway");
});

app.get("/test", async (req, res) => {
  const puppeteer = await import("puppeteer");
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });
    const title = await page.title();
    res.json({ success: true, title });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
