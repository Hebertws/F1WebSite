// ============================================================================
// DADOS DA TEMPORADA
// ============================================================================
// O QUE VOCÊ AINDA EDITA MANUALMENTE:
// 1. Pontuação dos pilotos -> array "drivers" abaixo, campo "points"
//    (também dá pra atualizar "wins" e "podiums" se quiser manter certo)
//
// O QUE JÁ É AUTOMÁTICO (calculado a partir da data de hoje):
// - Qual etapa está "Concluído" / "Atual" / "Próximo" -> array "calendar"
// - Qual é a "próxima corrida" em destaque no dashboard (nome do GP, data,
//   voltas, extensão, descrição, sessões) -> objeto "nextRace"
// - Qual mapa de circuito aparece -> dicionário "circuitMaps"
// - Pontos dos construtores e classificação -> calculados a partir de "drivers"
//
// Se uma data de GP for remarcada oficialmente, atualize o campo "raceDate"
// daquela etapa em "calendar" (formato "AAAA-MM-DD", é a data do domingo de
// corrida) — tudo o resto se ajusta sozinho.
// ============================================================================

const teamColors = {
  McLaren: "#ff8a00",
  Ferrari: "#f5222d",
  Mercedes: "#32d4d8",
  "Red Bull Racing": "#2b5cff",
  Williams: "#4aa3ff",
  "Aston Martin": "#26d978",
  Alpine: "#ff61b6",
  "Racing Bulls": "#f2f5ff",
  "Haas F1 Team": "#d9dde5",
  Audi: "#c9ccd1",
  Cadillac: "#c49a52",
};

const DRIVER_STANDINGS_API = "https://api.jolpi.ca/ergast/f1/current/driverstandings.json";

// Pontuação de cada piloto local. Ela funciona como fallback se a API falhar
// e também guarda textos editoriais que a API não fornece, como "style".
let drivers = [
  {
    name: "Kimi Antonelli",
    number: 12,
    team: "Mercedes",
    country: "Itália",
    points: 156,
    wins: 5,
    podiums: 6,
    style: "Líder do campeonato até o GP da Áustria, combina velocidade pura com uma temporada muito forte em resultados.",
  },
  {
    name: "Lewis Hamilton",
    number: 44,
    team: "Ferrari",
    country: "Reino Unido",
    points: 115,
    wins: 1,
    podiums: 4,
    style: "Experiência absurda em leitura de corrida, pneus e momentos de mudança de condição da pista.",
  },
  {
    name: "George Russell",
    number: 63,
    team: "Mercedes",
    country: "Reino Unido",
    points: 106,
    wins: 1,
    podiums: 3,
    style: "Regular e técnico, chega à Áustria embalado pela pole position em Spielberg.",
  },
  {
    name: "Charles Leclerc",
    number: 16,
    team: "Ferrari",
    country: "Mônaco",
    points: 75,
    wins: 0,
    podiums: 3,
    style: "Especialista em voltas de classificação, costuma extrair tudo do carro quando a pista está no limite.",
  },
  {
    name: "Lando Norris",
    number: 4,
    team: "McLaren",
    country: "Reino Unido",
    points: 73,
    wins: 0,
    podiums: 2,
    style: "Rápido em ritmo de corrida e muito forte quando precisa administrar pneus por vários stints.",
  },
  {
    name: "Oscar Piastri",
    number: 81,
    team: "McLaren",
    country: "Austrália",
    points: 68,
    wins: 0,
    podiums: 2,
    style: "Calmo sob pressão, com ótima capacidade de evoluir durante o fim de semana.",
  },
  {
    name: "Max Verstappen",
    number: 1,
    team: "Red Bull Racing",
    country: "Países Baixos",
    points: 55,
    wins: 0,
    podiums: 1,
    style: "Muito preciso em duelos roda a roda e consistente quando precisa transformar vantagem em resultado.",
  },
  {
    name: "Pierre Gasly",
    number: 10,
    team: "Alpine",
    country: "França",
    points: 41,
    wins: 0,
    podiums: 1,
    style: "Tem aproveitado oportunidades em corridas caóticas e aparece como referência da Alpine.",
  },
  {
    name: "Isack Hadjar",
    number: 6,
    team: "Red Bull Racing",
    country: "França",
    points: 34,
    wins: 0,
    podiums: 0,
    style: "Promovido à Red Bull Racing em 2026, tem mostrado velocidade forte em classificação.",
  },
  {
    name: "Liam Lawson",
    number: 30,
    team: "Racing Bulls",
    country: "Nova Zelândia",
    points: 28,
    wins: 0,
    podiums: 0,
    style: "Combativo e consistente, vem pontuando em corridas de oportunidade.",
  },
  {
    name: "Oliver Bearman",
    number: 87,
    team: "Haas F1 Team",
    country: "Reino Unido",
    points: 18,
    wins: 0,
    podiums: 0,
    style: "Jovem, agressivo e rápido para adaptar o ritmo ao longo do fim de semana.",
  },
  {
    name: "Franco Colapinto",
    number: 43,
    team: "Alpine",
    country: "Argentina",
    points: 16,
    wins: 0,
    podiums: 0,
    style: "Tem colocado a Alpine na zona de pontos com consistência e corridas limpas.",
  },
  {
    name: "Arvid Lindblad",
    number: 7,
    team: "Racing Bulls",
    country: "Reino Unido",
    points: 13,
    wins: 0,
    podiums: 0,
    style: "Rookie da temporada, traz agressividade de base e aprendizado rápido no grid.",
  },
  {
    name: "Carlos Sainz",
    number: 55,
    team: "Williams",
    country: "Espanha",
    points: 6,
    wins: 0,
    podiums: 0,
    style: "Muito bom em estratégia e comunicação, costuma encontrar pontos mesmo em corridas difíceis.",
  },
  {
    name: "Alexander Albon",
    number: 23,
    team: "Williams",
    country: "Tailândia",
    points: 5,
    wins: 0,
    podiums: 0,
    style: "Defensivo e eficiente em corrida, costuma maximizar oportunidades para a Williams.",
  },
  {
    name: "Esteban Ocon",
    number: 31,
    team: "Haas F1 Team",
    country: "França",
    points: 3,
    wins: 0,
    podiums: 0,
    style: "Forte em disputas diretas e em corridas onde consistência vale mais que ritmo puro.",
  },
  {
    name: "Gabriel Bortoleto",
    number: 5,
    team: "Audi",
    country: "Brasil",
    points: 2,
    wins: 0,
    podiums: 0,
    style: "Representante brasileiro no grid, vive fase de construção com a Audi.",
  },
  {
    name: "Fernando Alonso",
    number: 14,
    team: "Aston Martin",
    country: "Espanha",
    points: 1,
    wins: 0,
    podiums: 0,
    style: "Defensivo, criativo e mestre em posicionamento, especialmente quando o carro não é o mais rápido.",
  },
  {
    name: "Nico Hulkenberg",
    number: 27,
    team: "Audi",
    country: "Alemanha",
    points: 0,
    wins: 0,
    podiums: 0,
    style: "Veterano técnico, importante para desenvolver a operação da Audi em seu novo ciclo.",
  },
  {
    name: "Valtteri Bottas",
    number: 77,
    team: "Cadillac",
    country: "Finlândia",
    points: 0,
    wins: 0,
    podiums: 0,
    style: "Experiência e ritmo de classificação ajudam a Cadillac em sua estreia no campeonato.",
  },
  {
    name: "Sergio Perez",
    number: 11,
    team: "Cadillac",
    country: "México",
    points: 0,
    wins: 0,
    podiums: 0,
    style: "Muito experiente em gestão de pneus, lidera a adaptação da Cadillac às corridas.",
  },
  {
    name: "Lance Stroll",
    number: 18,
    team: "Aston Martin",
    country: "Canadá",
    points: 0,
    wins: 0,
    podiums: 0,
    style: "Costuma crescer em largadas, chuva e situações de baixa aderência.",
  },
];

const fallbackDrivers = drivers.map((driver) => ({ ...driver }));
let driverDataStatus = {
  label: "Dados locais",
  detail: "Usando dados salvos no projeto.",
};

const nationalityNamesPt = {
  Argentine: "Argentina",
  Australian: "Austrália",
  British: "Reino Unido",
  Canadian: "Canadá",
  Dutch: "Países Baixos",
  Finnish: "Finlândia",
  French: "França",
  German: "Alemanha",
  Italian: "Itália",
  Japanese: "Japão",
  Mexican: "México",
  Monegasque: "Mônaco",
  "New Zealander": "Nova Zelândia",
  Spanish: "Espanha",
  Thai: "Tailândia",
  Brazilian: "Brasil",
};

const constructorNameMap = {
  "Alpine F1 Team": "Alpine",
  "Cadillac F1 Team": "Cadillac",
  "RB F1 Team": "Racing Bulls",
  "Red Bull": "Red Bull Racing",
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeConstructorName(name) {
  return constructorNameMap[name] || name || "Equipe";
}

function findLocalDriverProfile(apiDriver) {
  const apiFullName = normalizeText(`${apiDriver.givenName || ""} ${apiDriver.familyName || ""}`);
  const apiFamilyName = normalizeText(apiDriver.familyName);

  return fallbackDrivers.find((driver) => {
    const localName = normalizeText(driver.name);
    return localName === apiFullName || (apiFamilyName && localName.includes(apiFamilyName));
  });
}

function mapApiStandingToDriver(standing) {
  const apiDriver = standing.Driver || {};
  const apiConstructor = standing.Constructors?.[0] || {};
  const localProfile = findLocalDriverProfile(apiDriver);
  const apiFullName = `${apiDriver.givenName || ""} ${apiDriver.familyName || ""}`.trim();
  const team = normalizeConstructorName(apiConstructor.name || localProfile?.team);

  return {
    name: localProfile?.name || apiFullName || "Piloto",
    number: Number(apiDriver.permanentNumber) || localProfile?.number || 0,
    team,
    country: nationalityNamesPt[apiDriver.nationality] || localProfile?.country || apiDriver.nationality || "",
    points: Number(standing.points) || 0,
    wins: Number(standing.wins) || 0,
    podiums: localProfile?.podiums || 0,
    style:
      localProfile?.style ||
      `Piloto da ${team} na temporada atual. O perfil editorial pode ser completado no array local de pilotos.`,
  };
}

async function fetchDriverStandings() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(DRIVER_STANDINGS_API, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API respondeu com status ${response.status}`);
    }

    const data = await response.json();
    const standingsList = data?.MRData?.StandingsTable?.StandingsLists?.[0];
    const apiStandings = standingsList?.DriverStandings;

    if (!Array.isArray(apiStandings) || apiStandings.length === 0) {
      throw new Error("API não retornou classificação de pilotos.");
    }

    drivers = apiStandings.map(mapApiStandingToDriver);
    driverDataStatus = {
      label: `Ao vivo ${standingsList.season || data?.MRData?.StandingsTable?.season || ""}`.trim(),
      detail: `Classificação carregada da Jolpica F1 em ${new Date().toLocaleString("pt-BR")}.`,
    };
  } catch (error) {
    drivers = fallbackDrivers.map((driver) => ({ ...driver }));
    driverDataStatus = {
      label: "Dados locais",
      detail: `Não foi possível carregar a API. Fallback ativo: ${error.message}`,
    };
    console.warn("F1 Start: usando dados locais de pilotos.", error);
  } finally {
    window.clearTimeout(timeout);
  }
}

// Mapas dos circuitos — coloque os arquivos .svg em assets/circuits/
// usando exatamente os nomes abaixo (o Wikimedia Commons tem o traçado
// oficial em SVG de quase todos os circuitos, de graça).
// Se o arquivo de um circuito ainda não existir, o site mostra
// automaticamente o selo com a bandeira no lugar (sem quebrar nada).
// Para adicionar um novo circuito, só inclua a linha "Nome do circuito": "arquivo.svg".
const circuitMaps = {
  "Red Bull Ring": "assets/circuits/red-bull-ring.svg",
  "Melbourne": "assets/circuits/melbourne.svg",
  "Shanghai": "assets/circuits/shanghai.svg",
  "Suzuka": "assets/circuits/suzuka.svg",
  "Miami": "assets/circuits/miami.svg",
  "Montreal": "assets/circuits/montreal.svg",
  "Monte Carlo": "assets/circuits/monte-carlo.svg",
  "Barcelona-Catalunya": "assets/circuits/barcelona.svg",
  "Silverstone": "assets/circuits/silverstone.svg",
  "Spa-Francorchamps": "assets/circuits/spa.svg",
  "Budapeste": "assets/circuits/budapeste.svg",
  "Zandvoort": "assets/circuits/zandvoort.svg",
  "Monza": "assets/circuits/monza.svg",
  "Madrid": "assets/circuits/madrid.svg",
  "Baku": "assets/circuits/baku.svg",
  "Marina Bay": "assets/circuits/marina-bay.svg",
  "Austin": "assets/circuits/austin.svg",
  "Cidade do México": "assets/circuits/cidade-do-mexico.svg",
  "São Paulo": "assets/circuits/sao-paulo.svg",
  "Las Vegas": "assets/circuits/las-vegas.svg",
  "Lusail": "assets/circuits/lusail.svg",
  "Yas Marina": "assets/circuits/yas-marina.svg",
};

// "nextRace" não é mais editado manualmente — ele é montado automaticamente
// mais abaixo a partir da etapa atual encontrada no "calendar" (usando a
// data de hoje). Veja a seção "CÁLCULO AUTOMÁTICO DA ETAPA ATUAL".
let nextRace = {};

const guideTerms = [
  {
    title: "DRS",
    icon: "wind",
    accent: "#32d4d8",
    description:
      "A asa traseira abre em zonas específicas para reduzir arrasto. O piloto normalmente precisa estar a menos de 1 segundo do carro à frente no ponto de detecção.",
  },
  {
    title: "Bandeira amarela",
    icon: "flag",
    accent: "#f9c846",
    description:
      "Indica perigo na pista. O piloto precisa reduzir a velocidade, ficar atento ao setor afetado e não pode ultrapassar até a liberação.",
  },
  {
    title: "Bandeira vermelha",
    icon: "flag",
    accent: "#f5222d",
    description:
      "Suspende treino, classificação ou corrida por acidente, pista bloqueada ou condição insegura. Os carros voltam aos boxes ou ao grid.",
  },
  {
    title: "Bandeira branca",
    icon: "flag",
    accent: "#f6f7f9",
    description:
      "Avisa que há um veículo lento à frente, como carro de resgate, piloto muito devagar ou outro carro fora do ritmo normal.",
  },
  {
    title: "Bandeira azul",
    icon: "flag",
    accent: "#4aa3ff",
    description:
      "Mostra para um retardatário que um carro mais rápido vai colocá-lo uma volta atrás. Ele deve facilitar a passagem com segurança.",
  },
  {
    title: "Bandeira quadriculada",
    icon: "flag",
    accent: "#d5dae3",
    description:
      "Marca o fim da sessão ou da corrida. Quem cruza a linha primeiro na volta final é o vencedor, respeitando penalidades pendentes.",
  },
  {
    title: "Virtual Safety Car",
    icon: "radio",
    accent: "#f9c846",
    description:
      "Neutraliza a corrida sem juntar o pelotão. Todos seguem um tempo mínimo por setor enquanto a pista é liberada.",
  },
  {
    title: "Safety Car",
    icon: "shield-alert",
    accent: "#f9c846",
    description:
      "Entra quando há perigo na pista. O pelotão se agrupa, a velocidade cai e uma parada nos boxes pode custar menos tempo que o normal.",
  },
  {
    title: "Pit stop",
    icon: "wrench",
    accent: "#f5222d",
    description:
      "Parada nos boxes para troca de pneus ou ajustes. Uma decisão de uma volta pode ganhar posições, mas tráfego e erro no box custam caro.",
  },
  {
    title: "Undercut",
    icon: "corner-down-right",
    accent: "#f9c846",
    description:
      "É parar antes do rival para usar pneus novos e ganhar tempo enquanto ele ainda está com pneus gastos. Funciona quando a diferença de performance é grande.",
  },
  {
    title: "Overcut",
    icon: "corner-up-right",
    accent: "#26d978",
    description:
      "É ficar mais tempo na pista e tentar ganhar posição com ar limpo, pneus ainda bons ou tráfego ruim para quem parou antes.",
  },
  {
    title: "Pneus",
    icon: "circle",
    accent: "#ffffff",
    description:
      "Branco é duro, amarelo é médio e vermelho é macio. Quanto mais macio, mais rápido costuma ser, mas menor é a durabilidade.",
    link: "#guia-pneus",
  },
  {
    title: "Sprint",
    icon: "zap",
    accent: "#f5222d",
    description:
      "Uma corrida curta em alguns fins de semana. Ela distribui pontos e muda o ritmo do evento, com menos treinos e mais momentos valendo resultado.",
  },
];

const tireCompounds = [
  {
    name: "Hard",
    label: "Duro",
    color: "#f6f7f9",
    ring: "#d5dae3",
    tag: "Branco",
    pace: "Ritmo mais baixo",
    life: "Maior durabilidade",
    description:
      "Aguenta mais voltas e degrada menos, mas demora a aquecer e costuma ser mais lento no ritmo puro.",
  },
  {
    name: "Medium",
    label: "Médio",
    color: "#f9c846",
    ring: "#c89a12",
    tag: "Amarelo",
    pace: "Ritmo equilibrado",
    life: "Durabilidade média",
    description:
      "Meio-termo entre velocidade e vida útil. Muito usado em stints longos ou quando a estratégia pede flexibilidade.",
  },
  {
    name: "Soft",
    label: "Macio",
    color: "#f5222d",
    ring: "#ad111b",
    tag: "Vermelho",
    pace: "Ritmo máximo",
    life: "Menor durabilidade",
    description:
      "Entrega a maior aderência e o melhor tempo por volta, mas desgasta rápido — ideal para classificação e stints curtos.",
  },
];

const tireWetCompounds = [
  {
    name: "Intermediate",
    label: "Intermediário",
    color: "#26d978",
    ring: "#129653",
    tag: "Verde",
    description: "Para pista úmida ou chuva fraca. Troca-se quando a pista seca o suficiente para os slicks.",
  },
  {
    name: "Full Wet",
    label: "Chuva",
    color: "#2b5cff",
    ring: "#1a3eb8",
    tag: "Azul",
    description: "Para chuva forte e poças. Remove muita água da pista, mas não aguenta asfalto seco.",
  },
];

const tireTips = [
  {
    icon: "radio",
    title: "Box, box",
    description:
      "Quando a equipe chama o piloto aos boxes, quase sempre é troca de pneu. Observe se ele sobe ou desce no composto.",
  },
  {
    icon: "layers",
    title: "Dois compostos secos",
    description:
      "Em corrida seca, o piloto precisa usar pelo menos dois tipos de pneu slick. Por isso quase todo mundo para no mínimo uma vez.",
  },
  {
    icon: "timer",
    title: "Janela de pneu",
    description:
      "Pneu novo é rápido no começo; depois perde aderência. A equipe tenta parar na hora em que ainda há ritmo sem perder posição.",
  },
  {
    icon: "cloud-rain",
    title: "Bandeira de chuva",
    description:
      "Se chover, os slicks não funcionam. Aí entram o verde (intermediário) ou o azul (chuva), conforme a quantidade de água na pista.",
  },
];

// Calendário da temporada — o campo "raceDate" é a data REAL da corrida
// (domingo, formato "AAAA-MM-DD"). O site usa essa data para descobrir
// automaticamente qual etapa está "Concluído", "Atual" ou "Próximo", troca
// o mapa do circuito e preenche o card "Fim de semana" (nome, voltas, km,
// descrição) sozinho — não precisa editar nada disso manualmente.
// Se uma data mudar (remarcação oficial), só atualize o "raceDate" aqui.
const calendar = [
  { round: 1, race: "Austrália", track: "Melbourne", raceDate: "2026-03-08", focus: "Russell venceu", laps: 58, length: "5,278 km", description: "Corrida em parque urbano em Melbourne, com alta velocidade média e poucas chances de erro perto dos muros." },
  { round: 2, race: "China", track: "Shanghai", raceDate: "2026-03-15", focus: "Antonelli venceu", sprint: true, laps: 56, length: "5,451 km", description: "Circuito com retas longas e a característica curva 13 em espiral, que testa a resistência do pescoço dos pilotos." },
  { round: 3, race: "Japão", track: "Suzuka", raceDate: "2026-03-29", focus: "Antonelli venceu", laps: 53, length: "5,807 km", description: "Traçado clássico em forma de oito, com o setor S muito técnico que recompensa precisão e carro bem equilibrado." },
  { round: 4, race: "Miami", track: "Miami", raceDate: "2026-05-03", focus: "Antonelli venceu", sprint: true, laps: 57, length: "5,412 km", description: "Street circuit construído ao redor do autódromo de Miami, com calor intenso e boa aderência de pista." },
  { round: 5, race: "Canadá", track: "Montreal", raceDate: "2026-05-24", focus: "Antonelli venceu", sprint: true, laps: 70, length: "4,361 km", description: "Pista semi-urbana com freadas pesadas e o famoso 'Muro dos Campeões' na saída da última chicane." },
  { round: 6, race: "Mônaco", track: "Monte Carlo", raceDate: "2026-06-07", focus: "Antonelli venceu", laps: 78, length: "3,337 km", description: "O circuito mais lento e estreito do calendário, onde a classificação costuma decidir o resultado da corrida." },
  { round: 7, race: "Espanha", track: "Barcelona-Catalunya", raceDate: "2026-06-14", focus: "Hamilton venceu", laps: 66, length: "4,675 km", description: "Última edição em Barcelona antes da mudança para Madrid, com uma mistura clássica de curvas técnicas e rápidas." },
  { round: 8, race: "Áustria", track: "Red Bull Ring", raceDate: "2026-06-28", focus: "Russell na pole", laps: 71, length: "4,318 km", description: "A pista é curta, tem subidas fortes, freadas importantes e uma sequência final rápida que costuma punir qualquer erro de trajetória." },
  { round: 9, race: "Grã-Bretanha", track: "Silverstone", raceDate: "2026-07-05", focus: "curvas rápidas", sprint: true, laps: 52, length: "5,891 km", description: "Lar histórico da F1, com a sequência rápida de Maggots-Becketts-Chapel entre as mais desafiadoras do calendário." },
  { round: 10, race: "Bélgica", track: "Spa-Francorchamps", raceDate: "2026-07-19", focus: "alta velocidade", laps: 44, length: "7,004 km", description: "A pista mais longa do calendário, com a icônica subida de Eau Rouge/Raidillon tomada em velocidade máxima." },
  { round: 11, race: "Hungria", track: "Budapeste", raceDate: "2026-07-26", focus: "tração", laps: 70, length: "4,381 km", description: "Traçado apertado e sinuoso, às vezes comparado a um 'Mônaco sem o glamour', onde a estratégia pesa mais que a ultrapassagem." },
  { round: 12, race: "Países Baixos", track: "Zandvoort", raceDate: "2026-08-23", focus: "inclinação", sprint: true, laps: 72, length: "4,259 km", description: "Circuito litorâneo entre dunas, com a curva final em banking de 18° e a torcida laranja de Verstappen lotando as arquibancadas." },
  { round: 13, race: "Itália", track: "Monza", raceDate: "2026-09-06", focus: "velocidade máxima", laps: 53, length: "5,793 km", description: "O 'Templo da Velocidade': cerca de 75% da volta é feita em aceleração máxima, com pouquíssimo downforce no carro." },
  { round: 14, race: "Espanha", track: "Madrid", raceDate: "2026-09-13", focus: "novo circuito", debut: true, laps: 57, length: "5,416 km", description: "Estreia do Madring no calendário, com a curva banked 'La Monumental' de 24° de inclinação como ponto alto do traçado." },
  { round: 15, race: "Azerbaijão", track: "Baku", raceDate: "2026-09-26", focus: "reta longa", street: true, laps: 51, length: "6,003 km", description: "Street circuit com uma reta muito longa junto às muralhas da cidade velha, favorecendo ultrapassagens em alta velocidade." },
  { round: 16, race: "Singapura", track: "Marina Bay", raceDate: "2026-10-11", focus: "calor e muros", sprint: true, laps: 62, length: "4,940 km", description: "Corrida noturna em Marina Bay, com calor e umidade extremos que exigem preparo físico redobrado dos pilotos." },
  { round: 17, race: "Estados Unidos", track: "Austin", raceDate: "2026-10-25", focus: "setores mistos", laps: 56, length: "5,513 km", description: "Circuit of the Americas mistura setores inspirados em curvas clássicas de outros traçados ao redor do mundo." },
  { round: 18, race: "México", track: "Cidade do México", raceDate: "2026-11-01", focus: "altitude", laps: 71, length: "4,304 km", description: "A altitude elevada da Cidade do México rarefaz o ar e altera o comportamento aerodinâmico dos carros." },
  { round: 19, race: "Brasil", track: "São Paulo", raceDate: "2026-11-08", focus: "Interlagos", laps: 71, length: "4,309 km", description: "Interlagos é percorrida em sentido anti-horário, com clima imprevisível que costuma embaralhar a corrida." },
  { round: 20, race: "Las Vegas", track: "Las Vegas", raceDate: "2026-11-21", focus: "retas longas", night: true, laps: 50, length: "6,201 km", description: "Corrida noturna pela Strip de Las Vegas, com retas longas e o ar frio do deserto aumentando a aderência dos pneus." },
  { round: 21, race: "Qatar", track: "Lusail", raceDate: "2026-11-29", focus: "curvas médias", laps: 57, length: "5,380 km", description: "Sequência de curvas de média e alta velocidade encadeadas, disputada à noite sob forte calor do Golfo Pérsico." },
  { round: 22, race: "Abu Dhabi", track: "Yas Marina", raceDate: "2026-12-06", focus: "decisão", final: true, laps: 58, length: "5,281 km", description: "Etapa final da temporada, correndo do fim de tarde para a noite — muitas vezes decisiva para o título." },
];

const pointSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

// ============================================================================
// CÁLCULO AUTOMÁTICO DA ETAPA ATUAL — baseado na data de hoje
// ============================================================================
// Cada GP é tratado como um fim de semana de sexta a domingo, terminando no
// "raceDate" (domingo da corrida, ver array "calendar" acima).
// Regra:
//   - Se hoje está entre sexta-feira (raceDate - 2 dias) e o próprio domingo
//     (até o fim do dia) -> etapa "Atual".
//   - Se o domingo já passou -> "Concluído".
//   - Se ainda não chegou -> "Próximo" (a primeira etapa futura é destacada
//     como a "próxima corrida" sempre que não há nenhuma etapa "Atual").
// Nada disso precisa ser editado manualmente: basta manter "raceDate"
// correto em cada item do calendário.

function getRaceWeekend(item) {
  const raceDay = new Date(`${item.raceDate}T23:59:59`);
  const friday = new Date(raceDay);
  friday.setDate(friday.getDate() - 2);
  friday.setHours(0, 0, 0, 0);
  return { start: friday, end: raceDay };
}

function computeCalendarStatus(today = new Date()) {
  let currentIndex = -1;

  const withStatus = calendar.map((item, index) => {
    const { start, end } = getRaceWeekend(item);
    let type;
    if (today >= start && today <= end) {
      type = "Atual";
      currentIndex = index;
    } else if (today > end) {
      type = "Concluído";
    } else {
      type = "Próximo";
    }
    return { ...item, type };
  });

  // Se nenhuma etapa está "Atual" no momento (semana sem corrida), a
  // próxima corrida futura é a que vai aparecer em destaque no dashboard.
  if (currentIndex === -1) {
    currentIndex = withStatus.findIndex((item) => item.type === "Próximo");
    if (currentIndex === -1) {
      currentIndex = withStatus.length - 1; // temporada terminou
    }
  }

  return { withStatus, currentIndex };
}

// Nome completo de exibição do GP por país — mapeamento explícito porque o
// artigo em português varia ("da Áustria", "do Canadá", "de Mônaco"...).
const gpDisplayName = {
  "Austrália": "GP da Austrália",
  "China": "GP da China",
  "Japão": "GP do Japão",
  "Miami": "GP de Miami",
  "Canadá": "GP do Canadá",
  "Mônaco": "GP de Mônaco",
  "Espanha": "GP da Espanha",
  "Áustria": "GP da Áustria",
  "Grã-Bretanha": "GP da Grã-Bretanha",
  "Bélgica": "GP da Bélgica",
  "Hungria": "GP da Hungria",
  "Países Baixos": "GP dos Países Baixos",
  "Itália": "GP da Itália",
  "Azerbaijão": "GP do Azerbaijão",
  "Singapura": "GP de Singapura",
  "Estados Unidos": "GP dos Estados Unidos",
  "México": "GP do México",
  "Brasil": "GP do Brasil",
  "Las Vegas": "GP de Las Vegas",
  "Qatar": "GP do Catar",
  "Abu Dhabi": "GP de Abu Dhabi",
};

const { withStatus: calendarWithStatus, currentIndex: currentRaceIndex } = computeCalendarStatus();
const currentCalendarEntry = calendarWithStatus[currentRaceIndex];

// Formata "2026-06-28" como "26-28 jun" (sexta a domingo do fim de semana).
const monthNamesPt = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
function formatWeekendRange(item) {
  const { start, end } = getRaceWeekend(item);
  const month = monthNamesPt[end.getMonth()];
  return `${start.getDate()}-${end.getDate()} ${month}`;
}

// Monta os três horários de sessão padrão do fim de semana. Os horários são
// aproximações típicas de um fim de semana de F1 (convencional ou sprint);
// se quiser os horários oficiais exatos de uma etapa específica, edite o
// array "sessions" retornado aqui para aquele item.
function buildSessions(item) {
  const { start, end } = getRaceWeekend(item);
  const saturday = new Date(start);
  saturday.setDate(saturday.getDate() + 1);
  const fmt = (d) => `${d.getDate()} ${monthNamesPt[d.getMonth()]}`;

  if (item.sprint) {
    return [
      ["Sprint Qualifying", `${fmt(start)} 11:30`],
      ["Sprint", `${fmt(saturday)} 11:00`],
      ["Classificação", `${fmt(saturday)} 15:00`],
      ["Corrida", `${fmt(end)} 13:00`],
    ];
  }
  return [
    ["Treino livre 1", `${fmt(start)} 11:30`],
    ["Classificação", `${fmt(saturday)} 14:00`],
    ["Corrida", `${fmt(end)} 13:00`],
  ];
}

// Monta o objeto nextRace inteiro a partir da etapa atual calculada — nome,
// data, país, voltas, extensão, descrição e sessões, tudo automático.
nextRace = {
  name: gpDisplayName[currentCalendarEntry.race] || `GP ${currentCalendarEntry.race}`,
  date: formatWeekendRange(currentCalendarEntry),
  track: currentCalendarEntry.track,
  country: currentCalendarEntry.race,
  laps: currentCalendarEntry.laps,
  length: currentCalendarEntry.length,
  description: currentCalendarEntry.description,
  highlight: currentCalendarEntry.focus,
  sessions: buildSessions(currentCalendarEntry),
};

let activeTermIndex = 0;

const byId = (id) => document.getElementById(id);

function renderHeroRace() {
  byId("hero-race-name").textContent = nextRace.name;
  byId("hero-race-date").textContent = nextRace.date;
  byId("hero-race-track").textContent = nextRace.track;
}

function renderDashboardRace() {
  byId("race-name").textContent = nextRace.name;
  const highlight = nextRace.highlight ? ` ${nextRace.highlight}.` : "";
  byId("race-description").textContent = `${nextRace.description}${highlight}`;

  const meta = [
    ["Local", nextRace.country],
    ["Voltas", nextRace.laps],
    ["Extensão", nextRace.length],
  ];

  byId("race-meta").innerHTML = meta
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");

  byId("session-list").innerHTML = nextRace.sessions
    .map(([name, time]) => `<div class="session-item"><strong>${name}</strong><span>${time}</span></div>`)
    .join("");

  byId("circuit-name").textContent = nextRace.track;
  renderTrackMap();
  byId("circuit-stats").innerHTML = [
    ["Voltas", nextRace.laps],
    ["Traçado", nextRace.length],
    ["Destaque", currentCalendarEntry.focus || "—"],
  ]
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");
}

function renderTrackMap() {
  const img = byId("track-map-img");
  const fallback = byId("track-map-fallback");
  const src = circuitMaps[nextRace.track];

  img.classList.remove("is-loaded");
  fallback.classList.remove("is-hidden");

  if (!src) {
    return;
  }

  img.onload = () => {
    img.classList.add("is-loaded");
    fallback.classList.add("is-hidden");
  };
  img.onerror = () => {
    img.classList.remove("is-loaded");
    fallback.classList.remove("is-hidden");
  };
  img.src = src;
  img.alt = `Traçado do circuito ${nextRace.track}`;
}

function renderTerm() {
  const term = guideTerms[activeTermIndex];
  byId("term-title").textContent = term.title;
  byId("term-description").textContent = term.description;
}

function sortedDrivers() {
  return [...drivers].sort((a, b) => b.points - a.points);
}

function renderDriverDataStatus() {
  const status = byId("driver-data-status");
  if (!status) {
    return;
  }

  status.textContent = driverDataStatus.label;
  status.title = driverDataStatus.detail;
}

function renderStandings() {
  byId("drivers-standings").innerHTML = sortedDrivers()
    .map(
      (driver, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${driver.name}</td>
          <td><span class="team-chip" style="--team-color:${teamColors[driver.team]}">${driver.team}</span></td>
          <td>${driver.points}</td>
        </tr>
      `
    )
    .join("");
}

function renderConstructors() {
  const totals = drivers.reduce((acc, driver) => {
    acc[driver.team] = (acc[driver.team] || 0) + driver.points;
    return acc;
  }, {});

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max = entries[0][1];

  byId("constructor-list").innerHTML = entries
    .map(([team, points]) => {
      const percent = Math.round((points / max) * 100);
      return `
        <div class="constructor-row" style="--team-color:${teamColors[team] || "#f5222d"}">
          <div>
            <strong>${team}</strong>
            <div class="progress"><span style="--value:${percent}%"></span></div>
          </div>
          <b>${points}</b>
        </div>
      `;
    })
    .join("");
}

function renderGuide() {
  byId("guide-grid").innerHTML = guideTerms
    .map(
      (term) => `
        <article class="guide-card" style="--accent:${term.accent}">
          <div class="guide-icon"><i data-lucide="${term.icon}"></i></div>
          <h3>${term.title}</h3>
          <p>${term.description}</p>
          ${term.link ? `<a class="guide-card-link" href="${term.link}">Ver guia completo</a>` : ""}
        </article>
      `
    )
    .join("");
}

// Efeito sonoro ao passar o mouse sobre o pneu.
// Coloque o arquivo de áudio em assets/sounds/tire-sound.mp3
// (ou troque o caminho abaixo pelo nome real do seu arquivo).
const tireSound = new Audio("assets/sounds/u_dn8ylcpe3v-f1_radio_sound-293747.mp3");
tireSound.volume = 0.4; // ajuste entre 0.0 e 1.0 conforme o volume do arquivo

function playTireScreech() {
  // Reinicia do começo, assim funciona mesmo se o usuário passar
  // o mouse várias vezes seguidas antes do som anterior terminar.
  tireSound.currentTime = 0;
  tireSound.play().catch(() => {
    // Ignora erro silenciosamente — ocorre se o navegador ainda não
    // liberou autoplay (antes de qualquer interação do usuário) ou
    // se o arquivo de áudio não foi encontrado no caminho informado.
  });
}

// Liga o efeito sonoro em todo elemento ".tire-visual" da página
// (compostos secos e de chuva, já que ambos usam a mesma marcação).
function wireTireSounds() {
  document.querySelectorAll(".tire-visual").forEach((tire) => {
    tire.addEventListener("mouseenter", playTireScreech);
  });
}

function tireVisual(compound) {
  return `
    <div class="tire-visual" style="--tire-color:${compound.color};--tire-ring:${compound.ring}" aria-hidden="true">
      <div class="tire-sidewall"></div>
      <div class="tire-tread"></div>
      <span class="tire-brand">P Zero</span>
    </div>
  `;
}

function renderTires() {
  byId("tires-intro-copy").textContent =
    "A Pirelli leva três compostos secos para cada GP — escolhidos da escala C1 (mais duro) a C5 (mais macio), conforme o circuito. Na TV, a faixa colorida na lateral identifica qual está em uso.";

  byId("tires-facts").innerHTML = [
    "Branco, amarelo e vermelho são os três slicks do fim de semana.",
    "Composto mais macio = mais aderência, menos durabilidade.",
    "Equipes montam estratégia com base no desgaste e no tráfego.",
  ]
    .map((fact) => `<li>${fact}</li>`)
    .join("");

  byId("tire-compound-grid").innerHTML = tireCompounds
    .map(
      (compound) => `
        <article class="tire-card" style="--tire-color:${compound.color};--tire-ring:${compound.ring}">
          ${tireVisual(compound)}
          <div class="tire-card-body">
            <div class="tire-card-head">
              <h3>${compound.label}</h3>
              <span class="tire-tag">${compound.tag}</span>
            </div>
            <p class="tire-name-en">${compound.name}</p>
            <dl class="tire-meta">
              <div><dt>Ritmo</dt><dd>${compound.pace}</dd></div>
              <div><dt>Vida útil</dt><dd>${compound.life}</dd></div>
            </dl>
            <p>${compound.description}</p>
          </div>
        </article>
      `
    )
    .join("");

  byId("tire-wet-grid").innerHTML = tireWetCompounds
    .map(
      (compound) => `
        <article class="tire-wet-card" style="--tire-color:${compound.color};--tire-ring:${compound.ring}">
          ${tireVisual(compound)}
          <div>
            <div class="tire-card-head">
              <h4>${compound.label}</h4>
              <span class="tire-tag">${compound.tag}</span>
            </div>
            <p class="tire-name-en">${compound.name}</p>
            <p>${compound.description}</p>
          </div>
        </article>
      `
    )
    .join("");

  byId("tire-tips-grid").innerHTML = tireTips
    .map(
      (tip) => `
        <article class="tire-tip-card">
          <div class="tire-tip-icon"><i data-lucide="${tip.icon}"></i></div>
          <h4>${tip.title}</h4>
          <p>${tip.description}</p>
        </article>
      `
    )
    .join("");

  wireTireSounds();
}

function renderDrivers() {
  const [spotlight, ...rest] = sortedDrivers();
  byId("spotlight-name").textContent = spotlight.name;
  byId("spotlight-copy").textContent = spotlight.style;
  byId("spotlight-stats").innerHTML = [
    ["Equipe", spotlight.team],
    ["Vitórias", spotlight.wins],
    ["Pódios", spotlight.podiums],
  ]
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");

  byId("driver-grid").innerHTML = rest
    .slice(0, 6)
    .map(
      (driver) => `
        <article class="driver-card" style="--team-color:${teamColors[driver.team] || "#f5222d"}">
          <div class="driver-number">${driver.number}</div>
          <h3>${driver.name}</h3>
          <p>${driver.team} · ${driver.country}</p>
          <div class="driver-card-footer">
            <span>${driver.points} pts</span>
            <span>${driver.podiums} pódios</span>
          </div>
        </article>
      `
    )
    .join("");
}

// Rótulo extra do card (Sprint, Estreia, Rua, Noite, Final) — null quando
// a etapa não tem nenhuma característica especial.
function calendarSpecialLabel(item) {
  if (item.sprint) return "Sprint";
  if (item.debut) return "Estreia";
  if (item.street) return "Rua";
  if (item.night) return "Noite";
  if (item.final) return "Final";
  return null;
}

function renderCalendar() {
  byId("calendar-list").innerHTML = calendarWithStatus
    .map((item) => {
      const special = calendarSpecialLabel(item);
      return `
        <article
          class="calendar-card${item.type === "Atual" ? " is-current" : ""}"
          role="button"
          tabindex="0"
          data-track="${item.track}"
          aria-haspopup="dialog"
          aria-label="Ver mapa do circuito de ${item.track}"
        >
          <div>
            <span class="round-badge">${item.round}</span>
            <h3>${item.race}</h3>
            <p>${item.track}</p>
          </div>
          <div class="calendar-meta">
            <span>${item.type}</span>
            ${special ? `<span>${special}</span>` : ""}
            <span>${item.focus}</span>
          </div>
          <span class="calendar-card-zoom-hint">
            <i data-lucide="maximize-2"></i>
            Ver mapa
          </span>
        </article>
      `;
    })
    .join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderSimulatorControls() {
  const ordered = sortedDrivers();
  byId("position-grid").innerHTML = pointSystem
    .map((points, index) => {
      const options = ordered
        .map((driver, optionIndex) => {
          const selected = optionIndex === index ? "selected" : "";
          return `<option value="${driver.name}" ${selected}>${driver.name}</option>`;
        })
        .join("");

      return `
        <div class="position-control">
          <label for="position-${index}">P${index + 1} · ${points} pts</label>
          <select id="position-${index}" data-position="${index}">${options}</select>
        </div>
      `;
    })
    .join("");

  byId("position-grid").addEventListener("change", renderProjection);
}

function selectedRaceResult() {
  return [...document.querySelectorAll("#position-grid select")].map((select) => select.value);
}

// Técnica FLIP (First, Last, Invert, Play): como cada renderização recria
// as <tr> do zero (innerHTML), o navegador não tem "memória" de onde a
// linha estava antes — então uma transition CSS comum não anima nada.
// Por isso medimos a posição ANTES de re-renderizar, comparamos com a
// posição DEPOIS, e aplicamos um transform que "engana" o navegador
// fazendo-o animar a diferença.
function animateRowReorder(tbody, previousPositions) {
  const rows = [...tbody.querySelectorAll("tr")];

  rows.forEach((row) => {
    const driverName = row.dataset.driver;
    const previousTop = previousPositions.get(driverName);
    if (previousTop === undefined) return; // linha nova, sem posição antiga: não anima

    const newTop = row.getBoundingClientRect().top;
    const delta = previousTop - newTop;
    if (Math.abs(delta) < 1) return; // não mudou de posição, não precisa animar

    // Invert: posiciona a linha visualmente onde ela estava antes,
    // sem transição (senão o "salto" para o lugar antigo também animaria).
    row.style.transition = "none";
    row.style.transform = `translateY(${delta}px)`;

    // Force reflow para garantir que o navegador "registre" o estado
    // invertido antes de soltarmos a transição abaixo.
    row.getBoundingClientRect();

    // Play: solta a transição e zera o transform — a linha desliza
    // suavemente da posição antiga até a posição real na nova ordem.
    requestAnimationFrame(() => {
      row.style.transition = "transform 0.5s ease";
      row.style.transform = "translateY(0)";
    });
  });
}

function renderProjection() {
  const tbody = byId("projection-standings");

  // First: mede a posição de cada linha atual antes de jogar tudo fora.
  const previousPositions = new Map();
  tbody.querySelectorAll("tr").forEach((row) => {
    previousPositions.set(row.dataset.driver, row.getBoundingClientRect().top);
  });

  const result = selectedRaceResult();
  const projected = drivers.map((driver) => {
    const racePosition = result.indexOf(driver.name);
    const gained = racePosition >= 0 ? pointSystem[racePosition] : 0;
    return { ...driver, gained, projectedPoints: driver.points + gained };
  });

  const currentOrder = sortedDrivers().map((driver) => driver.name);
  const newOrder = projected.sort((a, b) => b.projectedPoints - a.projectedPoints);

  // Last: re-renderiza normalmente, com a nova ordem.
  tbody.innerHTML = newOrder
    .map((driver, index) => {
      const oldPosition = currentOrder.indexOf(driver.name) + 1;
      const change = oldPosition - (index + 1);
      const className =
        change > 0 ? "change-positive" : change < 0 ? "change-negative" : "change-neutral";
      const label = change > 0 ? `+${change}` : `${change}`;
      return `
        <tr data-driver="${driver.name}">
          <td>${index + 1}</td>
          <td>${driver.name}</td>
          <td>${driver.projectedPoints}</td>
          <td class="${className}">${label}</td>
        </tr>
      `;
    })
    .join("");

  // Invert + Play: aplica o truque visual para cada linha que mudou de lugar.
  animateRowReorder(tbody, previousPositions);
}

function randomizeSimulator() {
  const shuffled = [...drivers];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  document.querySelectorAll("#position-grid select").forEach((select, index) => {
    select.value = shuffled[index]?.name || drivers[index].name;
  });
  renderProjection();
}

// Modal do mapa do circuito: usa a mesma técnica FLIP das outras animações
// do site — mede o tamanho/posição do card pequeno e anima a partir dali,
// em vez de um modal genérico que só aparece "do nada" no centro da tela.
//
// "circuit" aceita qualquer objeto com { track, laps, length, localLabel },
// e "trigger" é o elemento clicado (de onde a animação "nasce") — assim a
// mesma função serve tanto para o card fixo do dashboard quanto para
// qualquer card de etapa no calendário.
// Guarda o elemento que abriu o modal por último, para devolver o foco
// a ele ao fechar (pode ser o card fixo do dashboard ou um card do calendário).
let trackModalTrigger = null;

function openTrackModal(circuit, trigger) {
  trackModalTrigger = trigger;
  const overlay = byId("track-modal-overlay");
  const modal = byId("track-modal");

  // Preenche o conteúdo do modal com os dados do circuito clicado.
  byId("track-modal-title").textContent = circuit.track || "Circuito";

  const modalImg = byId("track-modal-img");
  const src = circuitMaps[circuit.track];
  modalImg.classList.remove("is-loaded");
  if (src) {
    modalImg.onload = () => modalImg.classList.add("is-loaded");
    modalImg.src = src;
    modalImg.alt = `Traçado do circuito ${circuit.track}`;
  }

  byId("track-modal-stats").innerHTML = [
    ["Voltas", circuit.laps],
    ["Traçado", circuit.length],
    ["Local", circuit.localLabel],
  ]
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value || "—"}</dd></div>`)
    .join("");

  // First: posição/tamanho do elemento clicado, de onde a animação "nasce".
  const startRect = trigger.getBoundingClientRect();

  overlay.hidden = false;
  document.body.style.overflow = "hidden";

  // Last: posição/tamanho que o modal vai ocupar quando totalmente aberto.
  // Lemos no próximo frame porque o navegador precisa primeiro calcular o
  // layout do modal agora visível (senão o rect viria zerado).
  requestAnimationFrame(() => {
    const endRect = modal.getBoundingClientRect();

    const scaleX = startRect.width / endRect.width;
    const scaleY = startRect.height / endRect.height;
    const originX = startRect.left + startRect.width / 2 - (endRect.left + endRect.width / 2);
    const originY = startRect.top + startRect.height / 2 - (endRect.top + endRect.height / 2);

    // Invert: encaixa o modal visualmente no exato lugar/tamanho do card.
    modal.style.transition = "none";
    modal.style.transform = `translate(${originX}px, ${originY}px) scale(${scaleX}, ${scaleY})`;
    modal.style.opacity = "0";

    requestAnimationFrame(() => {
      overlay.classList.add("is-visible");

      // Play: solta a transição e volta ao tamanho real — o modal "cresce"
      // a partir do card até ocupar seu lugar definitivo na tela.
      modal.style.transition = "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease";
      modal.style.transform = "translate(0, 0) scale(1, 1)";
      modal.style.opacity = "1";
    });
  });

  byId("track-modal-close").focus();
}

function closeTrackModal() {
  const overlay = byId("track-modal-overlay");
  const modal = byId("track-modal");

  overlay.classList.remove("is-visible");
  document.body.style.overflow = "";

  // Espera a transição de saída (definida no CSS) terminar antes de
  // esconder de fato, senão o fade/scale de fechamento não seria visível.
  const onTransitionEnd = () => {
    overlay.hidden = true;
    modal.style.transition = "";
    modal.style.transform = "";
    modal.style.opacity = "";
    overlay.removeEventListener("transitionend", onTransitionEnd);
  };
  overlay.addEventListener("transitionend", onTransitionEnd);

  if (trackModalTrigger) {
    trackModalTrigger.focus();
  }
}

function wireTrackModal() {
  byId("track-map").addEventListener("click", (event) => {
    openTrackModal(nextRace, event.currentTarget);
  });
  byId("track-modal-close").addEventListener("click", closeTrackModal);

  byId("track-modal-overlay").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeTrackModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !byId("track-modal-overlay").hidden) {
      closeTrackModal();
    }
  });

  // Delegação de evento no container: como os 22 cards do calendário são
  // recriados via innerHTML, ligar o listener no pai (que nunca é recriado)
  // evita ter que reanexar o evento card por card a cada renderização.
  const calendarList = byId("calendar-list");

  const openFromCalendarCard = (card) => {
    const item = calendarWithStatus.find((entry) => entry.track === card.dataset.track);
    if (!item) return;
    openTrackModal(
      { track: item.track, laps: item.laps, length: item.length, localLabel: item.race },
      card
    );
  };

  calendarList.addEventListener("click", (event) => {
    const card = event.target.closest(".calendar-card");
    if (card) {
      openFromCalendarCard(card);
    }
  });

  calendarList.addEventListener("keydown", (event) => {
    const card = event.target.closest(".calendar-card");
    if (!card) return;
    // Enter e Espaço replicam o comportamento nativo de um <button>,
    // já que o card é um <article> com role="button" customizado.
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFromCalendarCard(card);
    }
  });
}

function wireEvents() {
  byId("next-term").addEventListener("click", () => {
    activeTermIndex = (activeTermIndex + 1) % guideTerms.length;
    renderTerm();
  });

  byId("randomize-grid").addEventListener("click", randomizeSimulator);
  wireTrackModal();
}

async function boot() {
  await fetchDriverStandings();

  renderHeroRace();
  renderDashboardRace();
  renderTerm();
  renderStandings();
  renderDriverDataStatus();
  renderConstructors();
  renderGuide();
  renderTires();
  renderDrivers();
  renderCalendar();
  renderSimulatorControls();
  renderProjection();
  wireEvents();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

boot();