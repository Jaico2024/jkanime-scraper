// server.js
import express from "express";
import handler from "./api/search.js";
import capturaHandler from "./api/captura.js";

const app = express();

app.get("/api/search", handler);
app.get("/api/captura", capturaHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
