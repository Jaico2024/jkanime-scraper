export default {
  async search(query, page = 1) {
    const res = await fetch(`https://jkanime-scraper.vercel.app/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    return data.resultados.map(anime => ({
      title: anime.titulo,
      url: anime.url,
      img: anime.imagen,
    }));
  }
}
