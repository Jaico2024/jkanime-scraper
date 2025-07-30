import express from "express";
import handler from "./api/search.js";

const app = express();

app.get("/api/search", handler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
