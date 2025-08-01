// server.js
import express from "express";

const app = express();

// Ruta raíz para comprobar que el servidor está activo
app.get("/", (req, res) => {
  res.send("✅ Servidor JKAnime Scraper activo");
});

// Puerto dinámico proporcionado por Railway o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
