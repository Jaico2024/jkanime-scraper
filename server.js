import express from "express";
import handler from "./api/search.js";

const app = express();

app.get("/api/search", handler);

app.get("/api/test-puppeteer", async (req, res) => {
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
    await browser.close();
    res.json({ success: true, title });
  } catch (err) {
    if (browser) await browser.close();
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
