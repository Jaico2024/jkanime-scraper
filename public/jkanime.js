export default {
  async search(query) {
    const resp = await fetch(`https://jkanime.net/buscar/${encodeURIComponent(query)}/`);
    const html = await resp.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const items = Array.from(doc.querySelectorAll(".anime__item"));
    return items.map(el => ({
      title: el.querySelector("a")?.title || el.querySelector("a")?.innerText.trim(),
      url: el.querySelector("a")?.href,
      img: el.querySelector(".anime__item__pic")?.dataset.setbg
    }));
  }
};
