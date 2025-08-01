// server.js
import express from "express";

const app = express();

// Ruta raíz para comprobar estado del servidor
app.get("/", (req, res) => {
  res.send("✅ Servidor JKAnime Scraper activo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
