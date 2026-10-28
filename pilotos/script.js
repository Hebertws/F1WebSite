const teamColors = {
  McLaren: "#ff8a00", Ferrari: "#f5222d", Mercedes: "#32d4d8", "Red Bull Racing": "#2b5cff",
  Williams: "#4aa3ff", "Aston Martin": "#26d978", Alpine: "#ff61b6", "Racing Bulls": "#f2f5ff",
  "Haas F1 Team": "#d9dde5", Audi: "#c9ccd1", Cadillac: "#c49a52",
};

// Fotos: coloque o arquivo em assets/pilotos/<slug>.jpg (ex.: assets/pilotos/antonelli.jpg).
// Enquanto não existir, o card mostra as iniciais do piloto.
// Campos: [slug, nome, número, equipe, país, nascimento (AAAA-MM-DD), cidade, estreia, títulos, biografia, destaques]
const PILOTS = [
  ["antonelli", "Kimi Antonelli", 12, "Mercedes", "Itália", "2006-08-25", "Bolonha", 2025, "0", "Nascido em Bolonha, foi escolhido a dedo pela Mercedes ainda adolescente e chegou à F1 aos 18 anos para ocupar a vaga de Lewis Hamilton. Une velocidade pura a uma calma rara para a idade.", ["Jovem prodígio", "Academia Mercedes"]],
  ["hamilton", "Lewis Hamilton", 44, "Ferrari", "Reino Unido", "1985-01-07", "Stevenage", 2007, "7", "Heptacampeão mundial e dono dos maiores recordes da categoria, trocou a Mercedes pela Ferrari em 2025 para viver o sonho de pilotar de vermelho. Referência em leitura de corrida e em dias de chuva.", ["7 títulos", "Recordista de vitórias"]],
  ["russell", "George Russell", 63, "Mercedes", "Reino Unido", "1998-02-15", "King's Lynn", 2019, "0", "Formado na academia da Mercedes, passou pela Williams antes de se firmar na equipe alemã em 2022. É rápido na classificação, articulado fora do carro e atua como diretor da associação de pilotos (GPDA).", ["Volta lançada", "Voz do paddock"]],
  ["leclerc", "Charles Leclerc", 16, "Ferrari", "Mônaco", "1997-10-16", "Monte Carlo", 2018, "0", "Cresceu nas ruas de Mônaco e é o grande nome da Ferrari desde 2019. Em 2024 venceu em casa, tirando um peso de anos. Brilha na classificação, com uma volta que poucos igualam.", ["Mestre da pole", "Vitória em Mônaco"]],
  ["norris", "Lando Norris", 4, "McLaren", "Reino Unido", "1999-11-13", "Bristol", 2019, "1", "Estreou pela McLaren em 2019 e cresceu com a equipe até transformá-la em candidata ao título. Campeão mundial de 2025, é conhecido pelo carisma, pelo humor e pela consistência nas corridas.", ["Campeão 2025", "Fã de e-sports"]],
  ["piastri", "Oscar Piastri", 81, "McLaren", "Austrália", "2001-04-06", "Melbourne", 2023, "0", "Campeão da F3 e da F2 em anos seguidos, chegou à McLaren em 2023 e logo virou vencedor. Frio e preciso, quase nunca erra, e faz da calma a sua principal arma.", ["Sangue-frio", "Campeão F3 e F2"]],
  ["verstappen", "Max Verstappen", 1, "Red Bull Racing", "Países Baixos", "1997-09-30", "Hasselt (Bélgica)", 2015, "4", "Estreou aos 17 anos, a idade mais baixa da história, e conquistou quatro títulos seguidos entre 2021 e 2024. Agressivo nas ultrapassagens e implacável na defesa de posição.", ["4 títulos", "Estreante mais jovem"]],
  ["gasly", "Pierre Gasly", 10, "Alpine", "França", "1996-02-07", "Rouen", 2017, "0", "Venceu o GP da Itália de 2020 pela AlphaTauri, uma das vitórias mais marcantes da década. Desde 2024 lidera o projeto da Alpine com pilotagem consistente.", ["Vitória em Monza", "Líder da Alpine"]],
  ["hadjar", "Isack Hadjar", 6, "Red Bull Racing", "França", "2004-09-28", "Paris", 2025, "0", "Filho de pai argelino e mãe francesa, estreou em 2025 pela equipe B da Red Bull e subiu ao pódio ainda como novato. Em 2026 foi promovido à equipe principal.", ["Promovido à Red Bull", "Pódio de estreante"]],
  ["lawson", "Liam Lawson", 30, "Racing Bulls", "Nova Zelândia", "2002-02-11", "Hastings", 2023, "0", "Pupilo da Red Bull, entrou na F1 como substituto em 2023 e impressionou pela rapidez. Passou rapidamente pela equipe principal e hoje é o líder da Racing Bulls.", ["Reserva de luxo", "Combativo"]],
  ["bearman", "Oliver Bearman", 87, "Haas F1 Team", "Reino Unido", "2005-05-08", "Chelmsford", 2024, "0", "Entrou para a história ao estrear pela Ferrari na Arábia Saudita em 2024, substituindo Sainz com apenas 18 anos, e pontuou logo de cara. Hoje é peça fixa da Haas.", ["Estreia relâmpago", "Academia Ferrari"]],
  ["colapinto", "Franco Colapinto", 43, "Alpine", "Argentina", "2003-05-27", "Pilar", 2024, "0", "Chegou à Williams no meio de 2024 e pontuou nas primeiras corridas, o que causou comoção na Argentina. Assumiu o segundo carro da Alpine e carrega uma torcida apaixonada.", ["Fenômeno argentino", "Torcida gigante"]],
  ["lindblad", "Arvid Lindblad", 41, "Racing Bulls", "Reino Unido", "2007-08-08", "Londres", 2026, "0", "Um dos pilotos mais jovens da história a chegar ao grid, é fruto do programa da Red Bull e estreou na F1 em 2026. Tem ascendência indiana e já é visto como uma grande promessa britânica.", ["Novato 2026", "Programa Red Bull"]],
  ["sainz", "Carlos Sainz", 55, "Williams", "Espanha", "1994-09-01", "Madri", 2015, "0", "Filho do bicampeão de rali de mesmo nome, soma quatro vitórias na F1, duas pela Ferrari e outras duas na McLaren e na Ferrari de novo, todas com inteligência de corrida. Desde 2025 é o líder técnico da Williams.", ["4 vitórias", "Cérebro estrategista"]],
  ["albon", "Alexander Albon", 23, "Williams", "Tailândia", "1996-03-23", "Londres", 2019, "0", "Nascido em Londres, corre sob a bandeira da Tailândia. Reconstruiu a carreira na Williams, onde é o piloto mais experiente da equipe e um dos mais eficientes em resultados.", ["Corre pela Tailândia", "Renascimento"]],
  ["ocon", "Esteban Ocon", 31, "Haas F1 Team", "França", "1996-09-17", "Évreux", 2016, "0", "Venceu o GP da Hungria de 2020 pela Alpine, com uma defesa de posição memorável. Chegou à Haas em 2025 em busca de um novo ciclo.", ["Vitória na Hungria", "Defesa de ferro"]],
  ["bortoleto", "Gabriel Bortoleto", 5, "Audi", "Brasil", "2004-10-14", "Osasco", 2025, "0", "Campeão da F3 em 2023 e da F2 em 2024, é o primeiro brasileiro no grid desde Felipe Massa. Chegou em 2025 à Sauber, hoje Audi, e carrega a torcida do país.", ["Campeão F3 e F2", "Orgulho brasileiro"]],
  ["alonso", "Fernando Alonso", 14, "Aston Martin", "Espanha", "1981-07-29", "Oviedo", 2001, "2", "Bicampeão mundial em 2005 e 2006, é um dos pilotos mais completos da história e segue competitivo depois de mais de duas décadas na F1. Corre na Aston Martin desde 2023.", ["2 títulos", "Veterano lendário"]],
  ["hulkenberg", "Nico Hulkenberg", 27, "Audi", "Alemanha", "1987-08-19", "Emmerich", 2010, "0", "Venceu as 24 Horas de Le Mans de 2015 e esperou 239 largadas para subir ao pódio na F1, o que fez em Silverstone em 2025. Tido como o piloto mais rápido nas voltas rápidas de classificação.", ["Campeão em Le Mans", "Pódio tardio"]],
  ["bottas", "Valtteri Bottas", 77, "Cadillac", "Finlândia", "1989-08-28", "Nastola", 2013, "0", "Dez vitórias e cinco temporadas como companheiro de Hamilton na Mercedes. Em 2026 volta ao grid pela estreante Cadillac, como piloto experiente para guiar a equipe nova.", ["10 vitórias", "Líder da Cadillac"]],
  ["perez", "Sergio Perez", 11, "Cadillac", "México", "1990-01-26", "Guadalajara", 2011, "0", "Seis vezes vencedor, é famoso pelo cuidado com os pneus e por brilhar em circuitos de rua. Depois de passar pela Red Bull, volta em 2026 como o piloto mexicano da Cadillac.", ["6 vitórias", "Gestão de pneus"]],
  ["stroll", "Lance Stroll", 18, "Aston Martin", "Canadá", "1998-10-29", "Montreal", 2017, "0", "Estreou aos 18 anos e subiu ao pódio ainda em 2017. Fez pole na Turquia em 2020 e costuma ganhar posições nas largadas. Aston Martin é o time de sua família.", ["Pole em 2020", "Mestre das largadas"]],
].map(([slug, name, number, team, country, born, place, debut, titles, bio, tags]) => ({
  slug, name, number, team, country, born, place, debut, titles, bio, tags, points: null, wins: null, pos: null,
}));

const $ = (id) => document.getElementById(id);
const norm = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const initials = (n) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");
const age = (iso) => Math.floor((Date.now() - new Date(iso)) / 31557600000);
const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
const photoHtml = (p) =>
  `<span class="initials">${initials(p.name)}</span><span class="pilot-num">${p.number}</span>` +
  `<img src="../assets/pilotos/${p.slug}.jpg" alt="${p.name}" loading="lazy" />`;

let query = "";
let team = "Todas";
let visible = [];
let current = -1;
const sortOptions = ["classificacao", "numero", "idade", "nome"];
const requestedSort = new URLSearchParams(window.location.search).get("ordem");
let sortBy = sortOptions.includes(requestedSort) ? requestedSort : "classificacao";
let sortDescending = false;
let standingsLoaded = false;
let standingsAvailable = false;
let calendarLoaded = false;
let remainingSchedule = null;

const leaderPoints = () => {
  const scores = PILOTS.map((p) => p.points).filter(Number.isFinite);
  return scores.length ? Math.max(...scores) : null;
};

function renderCompareWarning() {
  const warning = $("compare-warning");
  let message = "";
  if (standingsLoaded && !standingsAvailable) {
    message = "Pontos e chance de título estão indisponíveis no momento; os dados locais continuam disponíveis.";
  } else if (standingsAvailable && calendarLoaded && !remainingSchedule) {
    message = "Chance de título indisponível: não foi possível carregar o calendário.";
  }
  warning.textContent = message;
  warning.hidden = !message;
}

function compareRows(a, b) {
  const rows = [
    { label: "Posição no campeonato", key: "pos", direction: -1, format: (v) => `${v}º` },
    { label: "Pontos", key: "points", direction: 1 },
    { label: "Vitórias", key: "wins", direction: 1 },
    { label: "Idade", key: "age", direction: -1, format: (v) => `${v} anos` },
    { label: "Estreia na F1", key: "debut", direction: -1 },
    { label: "Títulos", key: "titles", direction: 1 },
    { label: "Equipe", key: "team" },
    { label: "País", key: "country" },
  ];
  return rows.map((row) => {
    const rawA = row.key === "age" ? (a.born ? age(a.born) : null) : row.key === "titles" ? (a.titles == null ? null : Number(a.titles)) : a[row.key];
    const rawB = row.key === "age" ? (b.born ? age(b.born) : null) : row.key === "titles" ? (b.titles == null ? null : Number(b.titles)) : b[row.key];
    const valueA = Number.isFinite(rawA) || typeof rawA === "string" ? rawA : null;
    const valueB = Number.isFinite(rawB) || typeof rawB === "string" ? rawB : null;
    const display = (value) => value === null || value === "" ? "—" : row.format ? row.format(value) : value;
    const comparable = typeof valueA === "number" && typeof valueB === "number";
    const aLeads = comparable && valueA !== valueB && (valueA - valueB) * row.direction > 0;
    const bLeads = comparable && valueA !== valueB && (valueB - valueA) * row.direction > 0;
    return { label: row.label, a: display(valueA), b: display(valueB), aLeads, bLeads };
  });
}

function renderTitleChance(pilot, pointsLeader) {
  if (!remainingSchedule || !Number.isFinite(pilot.points) || pointsLeader === null) return "";
  const isLeader = pilot.points === pointsLeader;
  const eliminated = pointsLeader - pilot.points > remainingSchedule.availablePoints;
  const status = isLeader ? "Líder" : eliminated ? "Eliminado matematicamente" : "Ainda pode ser campeão";
  const statusKey = isLeader ? "leader" : eliminated ? "eliminated" : "possible";
  return `<span class="compare-title-chance" data-status="${statusKey}">${status}</span>
    <p class="compare-title-detail">Faltam ${remainingSchedule.races} ${remainingSchedule.races === 1 ? "corrida" : "corridas"} e ${remainingSchedule.sprints} ${remainingSchedule.sprints === 1 ? "sprint" : "sprints"}, no máximo ${remainingSchedule.availablePoints} pontos. O cálculo compara a diferença para o líder com os pontos restantes possíveis.</p>`;
}

function renderCompare() {
  const selectA = $("compare-pilot-a");
  const selectB = $("compare-pilot-b");
  const result = $("compare-result");
  const a = PILOTS.find((p) => p.slug === selectA.value);
  const b = PILOTS.find((p) => p.slug === selectB.value);
  renderCompareWarning();

  if (!a || !b) {
    result.innerHTML = `<p class="compare-prompt">Selecione dois pilotos para ver a comparação.</p>`;
    return;
  }
  if (a === b) {
    result.innerHTML = `<p class="compare-message">Escolha outro piloto para comparar com ${a.name}.</p>`;
    return;
  }

  const rows = compareRows(a, b);
  const pointsLeader = leaderPoints();
  const panel = (pilot, side) => `<article class="compare-driver" style="--team-color:${teamColors[pilot.team]}">
    <h3>${pilot.name}</h3>
    <dl class="compare-stats">${rows.map((row) => {
      const leads = side === "a" ? row.aLeads : row.bLeads;
      return `<div class="compare-stat${leads ? " is-advantage" : ""}"><dt>${row.label}</dt><dd>${row[side]}</dd></div>`;
    }).join("")}</dl>
    ${renderTitleChance(pilot, pointsLeader)}
  </article>`;
  result.innerHTML = `<div class="compare-cards">${panel(a, "a")}${panel(b, "b")}</div>`;
}

function populateCompareSelects() {
  ["compare-pilot-a", "compare-pilot-b"].forEach((id) => {
    $(id).insertAdjacentHTML("beforeend", PILOTS.map((p) => `<option value="${p.slug}">${p.name}</option>`).join(""));
  });
}

function wirePhotos(root) {
  root.querySelectorAll(".pilot-photo, .pm-photo").forEach((box) => {
    const img = box.querySelector("img");
    img.addEventListener("load", () => box.classList.add("has-photo"));
    img.addEventListener("error", () => img.remove());
    if (img.complete && img.naturalWidth) box.classList.add("has-photo");
  });
}

function comparePilots(a, b) {
  let order = 0;
  if (sortBy === "classificacao") {
    const aMissing = !Number.isFinite(a.pos);
    const bMissing = !Number.isFinite(b.pos);
    if (aMissing !== bMissing) return aMissing ? 1 : -1;
    if (!aMissing) order = a.pos - b.pos;
  } else if (sortBy === "numero") {
    order = a.number - b.number;
  } else if (sortBy === "idade") {
    order = String(b.born || "").localeCompare(String(a.born || ""));
  } else {
    order = norm(a.name).localeCompare(norm(b.name), "pt-BR");
  }

  if (order !== 0) return sortDescending ? -order : order;
  return norm(a.name).localeCompare(norm(b.name), "pt-BR") || PILOTS.indexOf(a) - PILOTS.indexOf(b);
}

function updateSortDirection() {
  const button = $("sort-direction");
  const direction = sortDescending ? "decrescente" : "crescente";
  const nextDirection = sortDescending ? "crescente" : "decrescente";
  const icon = sortDescending ? "arrow-down" : "arrow-up";
  button.setAttribute("aria-label", `Ordem ${direction}. Inverter para ${nextDirection}`);
  button.setAttribute("aria-pressed", String(sortDescending));
  button.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i>`;
  window.lucide?.createIcons();
}

function saveSortToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("ordem", sortBy);
  window.history.replaceState(window.history.state, "", url);
}

function renderGrid() {
  const q = norm(query);
  visible = PILOTS.filter(
    (p) => (team === "Todas" || p.team === team) && norm(`${p.name} ${p.country} ${p.team}`).includes(q)
  ).sort(comparePilots);
  const sortNames = {
    classificacao: "classificação",
    numero: "número",
    idade: "idade",
    nome: "nome",
  };
  $("pilot-count").textContent = `${visible.length} ${visible.length === 1 ? "piloto" : "pilotos"} · ordem ${sortNames[sortBy]} ${sortDescending ? "decrescente" : "crescente"}`;
  $("pilot-grid").innerHTML = visible.length
    ? visible.map((p, i) => {
        const [first, ...rest] = p.name.split(" ");
        return `<button class="pilot-card" type="button" data-i="${i}" style="--team-color:${teamColors[p.team]}" aria-label="Ver perfil de ${p.name}">
          <div class="pilot-photo">${photoHtml(p)}</div>
          <div class="pilot-info">
            <span class="pilot-team">${p.team}</span>
            <h3><span>${first}</span>${rest.join(" ")}</h3>
            <p>${p.country}${p.pos ? ` · ${p.pos}º no campeonato` : ""}${Number.isFinite(p.points) ? `<span class="pilot-distance">${p.points === leaderPoints() ? "Líder do campeonato" : `${leaderPoints() - p.points} pontos atrás do líder`}</span>` : ""}</p>
          </div></button>`;
      }).join("")
    : `<p class="empty-state">Nenhum piloto encontrado. Tente outro nome ou limpe o filtro de equipe.</p>`;
  wirePhotos($("pilot-grid"));
}

function renderFilters() {
  const teams = ["Todas", ...new Set(PILOTS.map((p) => p.team))];
  $("team-filters").innerHTML = teams
    .map((t) => `<button class="chip" type="button" data-team="${t}" style="--team-color:${teamColors[t] || "#f5222d"}" aria-pressed="${t === team}">${t}</button>`)
    .join("");
}

function renderHero() {
  const countries = new Set(PILOTS.map((p) => p.country)).size;
  const teams = new Set(PILOTS.map((p) => p.team)).size;
  $("hero-stats").innerHTML = [["Pilotos", PILOTS.length], ["Equipes", teams], ["Países", countries]]
    .map(([l, v]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("");
}

function openModal(i) {
  current = i;
  const p = visible[i];
  const stats = [
    ["Idade", `${age(p.born)} anos`], ["Estreia na F1", p.debut], ["Títulos", p.titles],
    ["Posição", p.pos ? `${p.pos}º` : "—"], ["Pontos", p.points ?? "—"], ["Vitórias", p.wins ?? "—"],
  ];
  const modal = $("pilot-modal");
  modal.style.setProperty("--team-color", teamColors[p.team]);
  modal.innerHTML = `
    <button class="pm-close" id="pm-close" type="button" aria-label="Fechar"><i data-lucide="x"></i></button>
    <div class="pm-photo">${photoHtml(p)}</div>
    <div class="pm-body">
      <span class="panel-kicker" style="color:${teamColors[p.team]}">${p.team}</span>
      <h3 id="pm-name">${p.name}</h3>
      <p class="pm-sub">${p.country} · nasceu em ${p.place}, ${fmtDate(p.born)}</p>
      <p class="pm-bio">${p.bio}</p>
      <dl class="pm-stats">${stats.map(([l, v]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("")}</dl>
      <div class="pm-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="pm-nav">
        <button class="button compact" id="pm-prev" type="button"><i data-lucide="chevron-left"></i>Anterior</button>
        <button class="button compact" id="pm-next" type="button">Próximo<i data-lucide="chevron-right"></i></button>
      </div>
    </div>`;
  wirePhotos(modal);
  const overlay = $("pilot-modal-overlay");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("is-visible"));
  document.body.style.overflow = "hidden";
  window.lucide?.createIcons();
  $("pm-close").focus();
}

function closeModal() {
  const overlay = $("pilot-modal-overlay");
  overlay.classList.remove("is-visible");
  document.body.style.overflow = "";
  setTimeout(() => (overlay.hidden = true), 250);
  document.querySelector(`.pilot-card[data-i="${current}"]`)?.focus();
}

function step(d) {
  openModal((current + d + visible.length) % visible.length);
}

function wireEvents() {
  $("pilot-search").addEventListener("input", (e) => { query = e.target.value; renderGrid(); });
  $("pilot-sort").addEventListener("change", (e) => {
    if (!sortOptions.includes(e.target.value)) return;
    sortBy = e.target.value;
    sortDescending = false;
    saveSortToUrl();
    updateSortDirection();
    renderGrid();
  });
  $("sort-direction").addEventListener("click", () => {
    sortDescending = !sortDescending;
    updateSortDirection();
    renderGrid();
  });
  $("compare-pilot-a").addEventListener("change", renderCompare);
  $("compare-pilot-b").addEventListener("change", renderCompare);
  $("team-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    team = b.dataset.team;
    renderFilters();
    renderGrid();
  });
  $("pilot-grid").addEventListener("click", (e) => {
    const c = e.target.closest(".pilot-card");
    if (c) openModal(Number(c.dataset.i));
  });
  $("pilot-modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "pilot-modal-overlay" || e.target.closest("#pm-close")) closeModal();
    else if (e.target.closest("#pm-prev")) step(-1);
    else if (e.target.closest("#pm-next")) step(1);
  });
  document.addEventListener("keydown", (e) => {
    if ($("pilot-modal-overlay").hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  const toggle = $("mobile-nav-toggle");
  const nav = $("main-navigation");
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("is-open")));
}

// Pontos, vitórias e posição vêm dos standings; o calendário é consultado uma vez.
async function loadStandings() {
  try {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/current/driverstandings.json");
    if (!res.ok) throw new Error(`Jolpica respondeu ${res.status}`);
    const data = await res.json();
    const lists = data.MRData?.StandingsTable?.StandingsLists;
    const list = lists?.[0]?.DriverStandings;
    if (!Array.isArray(list) || !list.length) throw new Error("Classificação indisponível.");
    let gridPosition = 0;
    list.forEach((s) => {
      const fam = norm(s.Driver.familyName);
      const p = PILOTS.find((x) => norm(x.name).includes(fam));
      if (p) {
        gridPosition += 1;
        const points = Number(s.points);
        const wins = Number(s.wins);
        Object.assign(p, {
          points: Number.isFinite(points) ? points : null,
          wins: Number.isFinite(wins) ? wins : null,
          pos: gridPosition,
        });
      }
    });
    standingsAvailable = true;
  } catch (err) {
    console.warn("Pilotos: sem dados da API.", err);
  } finally {
    standingsLoaded = true;
    renderGrid();
    renderCompare();
  }
}

async function loadRemainingSchedule() {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`);
    if (!res.ok) throw new Error(`Jolpica respondeu ${res.status}`);
    const data = await res.json();
    const races = data.MRData?.RaceTable?.Races;
    if (!Array.isArray(races) || !races.length) throw new Error("Calendário indisponível.");

    // Datas sem horário são comparadas em ISO para evitar diferenças de fuso.
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const future = (date) => typeof date === "string" && date > today;
    const remainingRaces = races.filter((race) => future(race.date)).length;
    const remainingSprints = races.filter((race) => future(race.Sprint?.date)).length;
    remainingSchedule = {
      races: remainingRaces,
      sprints: remainingSprints,
      availablePoints: remainingRaces * 25 + remainingSprints * 8,
    };
  } catch (err) {
    console.warn("Pilotos: calendário indisponível.", err);
  } finally {
    calendarLoaded = true;
    renderCompare();
  }
}

renderHero();
renderFilters();
$("pilot-sort").value = sortBy;
updateSortDirection();
renderGrid();
populateCompareSelects();
renderCompare();
wireEvents();
window.lucide?.createIcons();
loadStandings();
loadRemainingSchedule();