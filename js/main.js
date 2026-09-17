const GAMES = [
  {
    slug: "fortnite",
    title: "Fortnite",
    genre: "Battle royale",
    cover: "images/fortnite.png",
    officialScore: 7.8,
    blurb:
      "Honderd spelers, een krimpende cirkel en bouwen als wapen. Fortnite blijft zichzelf heruitvinden met nieuwe seizoenen en crossovers.",
  },
  {
    slug: "hollow-knight",
    title: "Hollow Knight",
    genre: "Metroidvania",
    initial: "H",
    officialScore: 9.2,
    blurb:
      "Een handgetekend ondergronds rijk vol geheimen, zware baasgevechten en een weemoedige sfeer die je bijblijft.",
  },
  {
    slug: "stardew-valley",
    title: "Stardew Valley",
    genre: "Boerderijsimulatie",
    initial: "S",
    officialScore: 9.0,
    blurb:
      "Erf een verwaarloosde boerderij, bouw ze op, leer het dorp kennen. Rustgevend, verslavend en verrassend diep.",
  },
  {
    slug: "hades",
    title: "Hades",
    genre: "Roguelike",
    initial: "H",
    officialScore: 9.3,
    blurb:
      "Vecht je een weg uit de onderwereld, run na run. Scherpe besturing, rake dialogen en een verhaal dat evolueert met elke dood.",
  },
];

const STORAGE_PREFIX = "reviews_";

function getReviews(slug) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReview(slug, review) {
  const reviews = getReviews(slug);
  reviews.unshift(review);
  localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(reviews));
  return reviews;
}

function communityAverage(slug) {
  const reviews = getReviews(slug);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.score, 0);
  return sum / reviews.length;
}

function scoreClass(score) {
  return score < 6 ? "low" : "";
}

function coverMarkup(game, sizeClass) {
  const base = typeof IMG_BASE !== "undefined" ? IMG_BASE : "";
  if (game.cover) {
    return `<img class="cover ${sizeClass}" src="${base}${game.cover}" alt="Cover van ${game.title}"
      onerror="this.outerHTML = '<div class=&quot;cover-fallback ${sizeClass}&quot; style=&quot;background:${fallbackColor(
        game.slug
      )}&quot;>${(game.initial || game.title[0]).toUpperCase()}</div>'">`;
  }
  return `<div class="cover-fallback ${sizeClass}" style="background:${fallbackColor(
    game.slug
  )}">${(game.initial || game.title[0]).toUpperCase()}</div>`;
}

function fallbackColor(slug) {
  const palette = ["#3c6e71", "#a97730", "#5b3a52", "#2f4858", "#6b4226"];
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) % palette.length;
  return palette[hash];
}

function renderGameGrid(container) {
  container.innerHTML = GAMES.map((game) => {
    const avg = communityAverage(game.slug);
    const avgMarkup = avg
      ? `<div class="score-block ${scoreClass(avg)}"><span class="num">${avg.toFixed(
          1
        )}</span><span class="label">community (${getReviews(game.slug).length})</span></div>`
      : `<div class="score-block"><span class="num">—</span><span class="label">nog geen reviews</span></div>`;

    return `
      <a class="ticket" href="games/game.html?slug=${game.slug}">
        ${coverMarkup(game, "")}
        <div class="stub">
          <div class="genre">${game.genre}</div>
          <div class="title">${game.title}</div>
          <div class="scores">
            <div class="score-block ${scoreClass(game.officialScore)}">
              <span class="num">${game.officialScore.toFixed(1)}</span>
              <span class="label">redactie</span>
            </div>
            ${avgMarkup}
          </div>
        </div>
      </a>
    `;
  }).join("");
}