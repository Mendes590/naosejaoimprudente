export const number = new Intl.NumberFormat('pt-BR')

export const totals = {
  accidents: 213452,
  fatalAccidents: 15290,
  deaths: 17830,
  seriousInjuries: 59320,
}

export const journey = [
  { id: 'abertura', label: 'Abertura', short: 'Início' },
  { id: 'ritmo', label: 'Um dia nas BRs', short: 'Ritmo' },
  { id: 'evolucao', label: 'Evolução', short: 'Evolução' },
  { id: 'mapa', label: 'Mapa do risco', short: 'Mapa' },
  { id: 'colisao', label: 'Cena de colisão', short: 'Colisão' },
  { id: 'fechamento', label: 'Fechamento', short: 'Final' },
]

export const heroHighlights = [
  'Base oficial da PRF',
  'Somente rodovias federais brasileiras',
  'Recorte de 2023 a 2025',
]

export const dailyMetrics = [
  {
    id: 'accidents',
    label: 'Acidentes por dia',
    tabLabel: 'Acidentes',
    value: 195,
    interval: 'A cada 7 minutos',
    intervalMinutes: 7.38,
    accent: 'gold',
    kicker: 'Uma nova ocorrência entra no dia antes que o último susto esfrie.',
    support: 'Nas BRs observadas pela PRF, a recorrência atravessa o dia inteiro. Não depende de um momento excepcional.',
    closing: 'O risco não volta de vez em quando. Ele volta o dia inteiro.',
  },
  {
    id: 'fatalAccidents',
    label: 'Acidentes fatais por dia',
    tabLabel: 'Acidentes fatais',
    value: 14,
    interval: 'A cada 1h43',
    intervalMinutes: 102.86,
    accent: 'copper',
    kicker: 'Mesmo quando o volume cai, a possibilidade de perda não sai da pista.',
    support: 'No recorte federal, a fatalidade reaparece no ritmo de um dia comum.',
    closing: 'A exceção dura pouco. A repetição dura o dia todo.',
  },
  {
    id: 'deaths',
    label: 'Mortes por dia',
    tabLabel: 'Mortes',
    value: 16,
    interval: 'A cada 1h29',
    intervalMinutes: 89.18,
    accent: 'red',
    kicker: 'Uma vida interrompida reaparece antes que o relógio complete outra volta.',
    support: 'Cada marca dessa linha cabe em um dia. Fora dela, cabem casas, famílias e ausências.',
    closing: 'Quando a linha acende, o número deixa de parecer abstrato.',
  },
  {
    id: 'seriousInjuries',
    label: 'Feridos graves por dia',
    tabLabel: 'Feridos graves',
    value: 54,
    interval: 'A cada 27 minutos',
    intervalMinutes: 26.67,
    accent: 'steel',
    kicker: 'Nem toda tragédia termina ali. Muita coisa continua depois da pista.',
    support: 'O impacto imediato passa. A rotina alterada fica.',
    closing: 'Sobreviver não significa sair ileso da história.',
  },
]

export const yearlyModes = {
  accidents: {
    label: 'Acidentes',
    title: 'O volume sobe em 2024 e permanece alto em 2025.',
    text: 'Mesmo olhando só para BRs e rodovias federais, não há alívio consistente.',
    insight: 'Quando o ritmo se sustenta por anos, o problema deixa de parecer episódico.',
    accent: 'gold',
  },
  fatalAccidents: {
    label: 'Acidentes fatais',
    title: 'Dois anos seguidos acima de cinco mil acidentes fatais.',
    text: 'A morte reaparece de forma persistente no recorte federal.',
    insight: 'A recorrência fatal não depende de um ponto fora da curva.',
    accent: 'copper',
  },
  deaths: {
    label: 'Vítimas fatais',
    title: 'Mais de seis mil vidas perdidas em 2024 e novamente em 2025.',
    text: 'Cada barra representa interrupções permanentes fora do asfalto.',
    insight: 'A colisão acontece na pista. A ausência continua em casa.',
    accent: 'red',
  },
}

export const yearlyData = [
  { year: '2023', accidents: 67767, fatalAccidents: 4858, deaths: 5627 },
  { year: '2024', accidents: 73156, fatalAccidents: 5222, deaths: 6160 },
  { year: '2025', accidents: 72529, fatalAccidents: 5209, deaths: 6043 },
]

export const stateNames = {
  AC: 'Acre',
  AL: 'Alagoas',
  AM: 'Amazonas',
  AP: 'Amapá',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MG: 'Minas Gerais',
  MS: 'Mato Grosso do Sul',
  MT: 'Mato Grosso',
  PA: 'Pará',
  PB: 'Paraíba',
  PE: 'Pernambuco',
  PI: 'Piauí',
  PR: 'Paraná',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RO: 'Rondônia',
  RR: 'Roraima',
  RS: 'Rio Grande do Sul',
  SC: 'Santa Catarina',
  SE: 'Sergipe',
  SP: 'São Paulo',
  TO: 'Tocantins',
}

export const stateMetrics = {
  fatalVictims: {
    id: 'fatalVictims',
    label: 'Vítimas fatais',
    unit: 'vítimas',
    note: 'Vidas perdidas nas BRs observadas pela PRF.',
  },
  fatalAccidents: {
    id: 'fatalAccidents',
    label: 'Acidentes fatais',
    unit: 'acidentes',
    note: 'Casos em que a viagem terminou em morte.',
  },
  seriousInjuries: {
    id: 'seriousInjuries',
    label: 'Feridos graves',
    unit: 'pessoas',
    note: 'Sobreviventes com impacto severo depois da batida.',
  },
}

export const stateData = {
  AC: { fatalVictims: 73, fatalAccidents: 63, seriousInjuries: 234 },
  AL: { fatalVictims: 257, fatalAccidents: 232, seriousInjuries: 744 },
  AM: { fatalVictims: 63, fatalAccidents: 53, seriousInjuries: 133 },
  AP: { fatalVictims: 37, fatalAccidents: 31, seriousInjuries: 165 },
  BA: { fatalVictims: 1766, fatalAccidents: 1395, seriousInjuries: 4043 },
  CE: { fatalVictims: 493, fatalAccidents: 451, seriousInjuries: 1454 },
  DF: { fatalVictims: 132, fatalAccidents: 119, seriousInjuries: 609 },
  ES: { fatalVictims: 500, fatalAccidents: 429, seriousInjuries: 2442 },
  GO: { fatalVictims: 895, fatalAccidents: 739, seriousInjuries: 2705 },
  MA: { fatalVictims: 812, fatalAccidents: 698, seriousInjuries: 1447 },
  MG: { fatalVictims: 2285, fatalAccidents: 1895, seriousInjuries: 8488 },
  MS: { fatalVictims: 516, fatalAccidents: 427, seriousInjuries: 1561 },
  MT: { fatalVictims: 758, fatalAccidents: 610, seriousInjuries: 2030 },
  PA: { fatalVictims: 647, fatalAccidents: 565, seriousInjuries: 1142 },
  PB: { fatalVictims: 408, fatalAccidents: 369, seriousInjuries: 1827 },
  PE: { fatalVictims: 926, fatalAccidents: 835, seriousInjuries: 3284 },
  PI: { fatalVictims: 488, fatalAccidents: 439, seriousInjuries: 1708 },
  PR: { fatalVictims: 1761, fatalAccidents: 1515, seriousInjuries: 5774 },
  RJ: { fatalVictims: 980, fatalAccidents: 899, seriousInjuries: 3565 },
  RN: { fatalVictims: 328, fatalAccidents: 298, seriousInjuries: 1381 },
  RO: { fatalVictims: 314, fatalAccidents: 269, seriousInjuries: 1251 },
  RR: { fatalVictims: 84, fatalAccidents: 70, seriousInjuries: 180 },
  RS: { fatalVictims: 969, fatalAccidents: 829, seriousInjuries: 3329 },
  SC: { fatalVictims: 1214, fatalAccidents: 1057, seriousInjuries: 6209 },
  SE: { fatalVictims: 148, fatalAccidents: 134, seriousInjuries: 525 },
  SP: { fatalVictims: 680, fatalAccidents: 633, seriousInjuries: 2397 },
  TO: { fatalVictims: 296, fatalAccidents: 236, seriousInjuries: 693 },
}

export const collisionSteps = [
  {
    id: '01',
    title: 'Trajeto comum',
    text: 'Você segue na sua faixa. Tudo parece normal.',
    note: 'Do outro lado do para-brisa também existe alguém querendo voltar para casa.',
  },
  {
    id: '02',
    title: 'Risco no sentido oposto',
    text: 'O erro ainda parece distante, mas a margem de correção já encolheu.',
    note: 'Em pista simples, um segundo pode definir toda a história.',
  },
  {
    id: '03',
    title: 'Invasão de faixa',
    text: 'Outra decisão invade a sua rota e leva o perigo até quem não provocou o risco.',
    note: 'A imprudência pode atingir quem fez tudo certo.',
  },
  {
    id: '04',
    title: 'Sem tempo',
    text: 'A colisão chega antes de qualquer ajuste possível.',
    note: 'Na BR, um segundo pode ser tudo.',
  },
  {
    id: '05',
    title: 'Depois da batida',
    text: 'O impacto termina na pista. A consequência continua fora dela.',
    note: 'A imprudência não para em quem a comete.',
  },
]
