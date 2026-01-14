// År i footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Aktiv lenke i meny (marker siden du er på)
(function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();

// Mobilmeny
(function mobileMenu() {
  const btn = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
})();

// Demo events (endres her, så oppdateres både events.html og "Neste arrangement" på index)
const eventsData = [
  {
    title: "Kulturkveld",
    date: "2026-02-07",
    time: "18:00",
    place: "Oslo",
    desc: "En kveld med fellesskap, samtaler og kultur."
  },
  {
    title: "Familiesamling",
    date: "2026-02-21",
    time: "14:00",
    place: "Oslo",
    desc: "Sosial samling for familier og barn."
  }
];

function formatDateISO(iso) {
  // Enkel norsk datoformat: DD.MM.YYYY
  const [y, m, d] = iso.split("-").map(x => parseInt(x, 10));
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

(function renderEvents() {
  const listEl = document.getElementById("eventsList");
  if (listEl) {
    if (!eventsData.length) {
      listEl.innerHTML = `<p class="muted">Ingen arrangementer er lagt inn ennå.</p>`;
      return;
    }

    listEl.innerHTML = eventsData.map(e => `
      <article class="event">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <div class="meta">
          <span>Dato: ${formatDateISO(e.date)}</span>
          <span>Tid: ${e.time}</span>
          <span>Sted: ${e.place}</span>
        </div>
      </article>
    `).join("");
  }

  const nextEl = document.getElementById("nextEvent");
  if (nextEl) {
    const today = new Date();
    const upcoming = [...eventsData]
      .map(e => ({...e, dt: new Date(`${e.date}T${e.time}:00`)}))
      .filter(e => e.dt >= today)
      .sort((a,b) => a.dt - b.dt)[0];

    if (!upcoming) {
      nextEl.innerHTML = `<p class="muted">Ingen kommende arrangementer.</p>`;
      return;
    }

    nextEl.innerHTML = `
      <div class="event">
        <h3>${upcoming.title}</h3>
        <p>${upcoming.desc}</p>
        <div class="meta">
          <span>Dato: ${formatDateISO(upcoming.date)}</span>
          <span>Tid: ${upcoming.time}</span>
          <span>Sted: ${upcoming.place}</span>
        </div>
      </div>
    `;
  }
})();
