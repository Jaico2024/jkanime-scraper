/*
 * JKAnime Module for Sora
 */

async function searchResults(keyword) {
    try {
        const encoded = encodeURIComponent(keyword);
        const response = await fetch(`https://jkanime.net/buscar/${encoded}/`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const items = Array.from(doc.querySelectorAll(".anime__item"));

        const results = items.map(el => {
            const a = el.querySelector("a");
            const href = a?.getAttribute("href") || "";
            const fullUrl = href.startsWith("http") ? href : `https://jkanime.net${href}`;

            const imgDiv = el.querySelector(".anime__item__pic");
            const image = imgDiv?.getAttribute("data-setbg") || "";

            const slug = href.split("/").filter(Boolean).pop();
            const title = decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

            return {
                title,
                image,
                href: fullUrl
            };
        });

        return JSON.stringify(results);
    } catch (error) {
        console.error("[searchResults] Error:", error);
        return JSON.stringify([]);
    }
}

async function extractDetails(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const synopsis = doc.querySelector(".anime__details__text > p")?.textContent.trim() || "Description: Unknown";
        const airdate = doc.querySelector(".anime__details__widget span:nth-child(3)")?.textContent.trim() || "Unknown";

        return JSON.stringify([{
            description: synopsis,
            aliases: "",
            airdate: `Aired: ${airdate}`
        }]);
    } catch (error) {
        console.error("[extractDetails] Error:", error);
        return JSON.stringify([{
            description: "Description: Unknown",
            aliases: "",
            airdate: "Aired: Unknown"
        }]);
    }
}

async function extractEpisodes(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const eps = Array.from(doc.querySelectorAll(".episodios li a"));
        const episodes = eps.map(a => ({
            href: a.href,
            number: a.textContent.trim()
        })).reverse();

        return JSON.stringify(episodes);
    } catch (error) {
        console.error("[extractEpisodes] Error:", error);
        return JSON.stringify([]);
    }
}

async function extractStreamUrl(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const match = html.match(/file:\s*['"](https?:\\/\\/[^'"]+)['"]/) || html.match(/source src=['"](https?:[^'"]+)['"]/);

        if (match) {
            return match[1].replace(/\\/g, "");
        }

        return null;
    } catch (error) {
        console.error("[extractStreamUrl] Error:", error);
        return null;
    }
}
