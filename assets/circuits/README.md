# Mapas dos circuitos

Coloque aqui os arquivos `.svg` do traçado de cada pista.

O nome do arquivo precisa ser exatamente o que está definido em `circuitMaps`
dentro do `app.js`. Lista atual esperada:

| Circuito (nextRace.track / calendar.track) | Arquivo esperado |
|---|---|
| Red Bull Ring | red-bull-ring.svg |
| Melbourne | melbourne.svg |
| Shanghai | shanghai.svg |
| Suzuka | suzuka.svg |
| Miami | miami.svg |
| Montreal | montreal.svg |
| Monte Carlo | monte-carlo.svg |
| Barcelona-Catalunya | barcelona.svg |
| Silverstone | silverstone.svg |
| Spa-Francorchamps | spa.svg |
| Budapeste | budapeste.svg |
| Zandvoort | zandvoort.svg |
| Monza | monza.svg |
| Madrid | madrid.svg |
| Baku | baku.svg |
| Marina Bay | marina-bay.svg |
| Austin | austin.svg |
| Cidade do México | cidade-do-mexico.svg |
| São Paulo | sao-paulo.svg |
| Las Vegas | las-vegas.svg |
| Lusail | lusail.svg |
| Yas Marina | yas-marina.svg |

## Onde baixar

**Wikimedia Commons** (melhor opção, de graça): vá em
[commons.wikimedia.org](https://commons.wikimedia.org) e busque por
`[nome do circuito] circuit map` ou `[nome do circuito] track map svg`
(ex: "Monza circuit map", "Silverstone track map svg"). A maioria dos
circuitos atuais tem uma categoria própria, do tipo "[Nome] circuit maps",
reunindo várias versões do traçado.

- Abra o arquivo SVG desejado → clique em "Original file" para baixar a
  versão vetorial (fica nítida em qualquer tamanho de tela).
- Licença: a maior parte é CC BY-SA — de graça para usar, só pedindo crédito
  ao autor original. Para um projeto pessoal/acadêmico isso não é problema,
  mas se quiser, vale colocar os créditos em algum rodapé do site.

**Alternativa rápida**: [freesvg.org](https://freesvg.org) tem diagramas
simples de alguns circuitos, estilo desenho preto e branco, sem exigir
atribuição — bom para um visual mais minimalista.

## Como funciona

- Se o arquivo existir, ele aparece automaticamente no card "Circuito em
  destaque" assim que `nextRace.track` corresponder ao nome.
- Se o arquivo **não** existir (ainda não foi adicionado), o site mostra um
  selo simples com uma bandeira no lugar — nada quebra visualmente.
- Não precisa editar `app.js` para cada corrida: basta ir adicionando os
  SVGs nesta pasta conforme for organizando.
