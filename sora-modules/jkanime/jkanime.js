async function searchResults(query) {
  try {
    const response = await fetch(`https://jkanime.net/buscar/${encodeURIComponent(query)}/`);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const results = [];

    const items = doc.querySelectorAll(".anime__item");

    items.forEach((el) => {
      const enlace = el.querySelector("a");
      const href = enlace?.getAttribute("href") || "";
      const url = href.startsWith("http") ? href : `https://jkanime.net${href}`;

      const imagenEl = el.querySelector(".anime__item__pic");
      const imagen = imagenEl?.getAttribute("data-setbg") || "";

      const slug = href?.split("/").filter(Boolean).pop() || "";
      const titulo = decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());

      results.push({ title: titulo, image: imagen, href: url });
    });

    return JSON.stringify(results);
  } catch (e) {
    console.log("[searchResults] Error:", e);
    return JSON.stringify([]);
  }
}

async function extractDetails(url) {
  return JSON.stringify([{
    description: "Descripción no disponible",
    aliases: "Alias no disponible",
    airdate: "Fecha no disponible"
  }]);
}

async function extractEpisodes(url) {
  return JSON.stringify([]);
}

async function extractStreamUrl(url) {
  return null;
}
