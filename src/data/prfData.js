export const prfData = {
  hero: {
    eyebrow: 'Polícia Rodoviária Federal · Rodovias federais brasileiras · 2023, 2024 e 2025',
    title: 'Mais de 17 mil vidas perdidas em três anos nas BRs brasileiras.',
    subtitle:
      'Dados da PRF sobre acidentes registrados em rodovias federais brasileiras entre 2023 e 2025.',
    body:
      'Este projeto não representa todo o trânsito do Brasil. São ocorrências registradas pela PRF nas rodovias federais.',
    quote: 'Uma viagem comum pode mudar tudo.',
    ctaPrimary: 'Ver a experiência',
    ctaSecondary: 'O que mais mata',
    badges: ['Fonte oficial: PRF', 'Recorte: apenas BRs', 'Não representa todo o trânsito nacional'],
    highlights: [
      { value: '213.452', label: 'acidentes registrados' },
      { value: '15.290', label: 'acidentes fatais' },
      { value: '17.830', label: 'vítimas fatais' },
    ],
    asideTitle: 'Recorte deste projeto',
    asideText:
      'Ocorrências registradas pela Polícia Rodoviária Federal em rodovias federais brasileiras. O foco aqui é conscientização pública, com leitura clara e impacto humano.',
    narrative: ['Isso é sério.', 'Isso acontece muito.', 'Isso pode acontecer com pessoas inocentes.'],
  },
  impactNumbers: {
    eyebrow: 'Escala humana',
    title: 'Poucos números já bastam para mostrar que o problema é recorrente, grave e devastador.',
    text:
      'Entre 2023 e 2025, a PRF registrou 213.452 acidentes nas rodovias federais brasileiras. Em 15.290 deles, pelo menos uma vida foi perdida.',
    spotlight: {
      kicker: 'Peso humano do recorte',
      title: '17.830 vidas perdidas.',
      text:
        'Este recorte mostra apenas ocorrências registradas pela PRF nas BRs. Ainda assim, a escala já é suficiente para expor um problema contínuo e profundamente humano.',
    },
    cards: [
      {
        label: 'Acidentes totais',
        value: 213452,
        detail: 'ocorrências registradas pela PRF nas rodovias federais brasileiras',
      },
      {
        label: 'Acidentes fatais',
        value: 15290,
        detail: 'casos em que pelo menos uma pessoa morreu',
      },
      {
        label: 'Vítimas fatais',
        value: 17830,
        detail: 'vidas interrompidas no período analisado',
      },
      {
        label: 'Feridos graves',
        value: 59320,
        detail: 'pessoas que sobreviveram com consequências severas',
      },
      {
        label: '% de acidentes fatais',
        value: 7.16,
        format: 'percent',
        detail: 'uma parcela menor no volume, mas devastadora no efeito',
      },
    ],
    footnotes: [
      'Feridos leves: 187.220.',
      'Pessoas envolvidas: 555.562.',
      'Média de 1,17 vítima fatal por acidente fatal.',
      'Fonte: Polícia Rodoviária Federal. Recorte: BRs brasileiras, 2023 a 2025.',
    ],
  },
  trends: {
    eyebrow: 'Evolução 2023–2025',
    title: 'O problema não aparece como exceção. Ele volta todos os anos em nível alto demais.',
    text:
      'O gráfico mantém o recorte explícito: são registros da PRF em rodovias federais brasileiras. Não é um retrato de todo o trânsito do país.',
    tabs: [
      {
        id: 'accidents',
        label: 'Acidentes totais',
        accent: '#d8a46a',
        description: 'O volume sobe em 2024 e permanece muito alto em 2025.',
        highlights: ['2023: 67.767', '2024: 73.156', '2025: 72.529'],
        data: [
          { year: '2023', value: 67767 },
          { year: '2024', value: 73156 },
          { year: '2025', value: 72529 },
        ],
      },
      {
        id: 'fatal-accidents',
        label: 'Acidentes fatais',
        accent: '#c97257',
        description: '2024 e 2025 ultrapassam cinco mil acidentes fatais nas BRs.',
        highlights: ['2023: 4.858', '2024: 5.222', '2025: 5.209'],
        data: [
          { year: '2023', value: 4858 },
          { year: '2024', value: 5222 },
          { year: '2025', value: 5209 },
        ],
      },
      {
        id: 'fatal-victims',
        label: 'Vítimas fatais',
        accent: '#a84c3f',
        description: 'Mais de seis mil vidas perdidas em 2024 e novamente em 2025.',
        highlights: ['2023: 5.627', '2024: 6.160', '2025: 6.043'],
        data: [
          { year: '2023', value: 5627 },
          { year: '2024', value: 6160 },
          { year: '2025', value: 6043 },
        ],
      },
    ],
  },
  frequencyVsLethality: {
    eyebrow: 'O que mais acontece x o que mais mata',
    title: 'Volume e letalidade não contam a mesma história.',
    text:
      'Separar frequência de letalidade muda a leitura. Algumas ocorrências dominam a rotina das BRs. Outras aparecem menos, mas concentram risco muito maior de morte.',
    sections: [
      {
        id: 'causas',
        label: 'Causas',
        frequentTitle: 'Causas mais frequentes',
        lethalTitle: 'Causas mais letais',
        frequentUnit: 'ocorrências',
        lethalUnit: '% de letalidade',
        intro:
          'Reação tardia, ausência de reação e acesso indevido à via aparecem muito. Contramão e ultrapassagem indevida carregam risco muito maior de morte.',
        frequent: [
          { label: 'Reação tardia ou ineficiente do condutor', value: 31574 },
          { label: 'Ausência de reação do condutor', value: 31459 },
          { label: 'Acessar a via sem observar outros veículos', value: 20380 },
          { label: 'Velocidade incompatível', value: 12675 },
          { label: 'Ingestão de álcool pelo condutor', value: 11138 },
          { label: 'Transitar na contramão', value: 7300 },
        ],
        lethal: [
          { label: 'Pedestre andava na pista', value: 41.44 },
          { label: 'Entrada inopinada do pedestre', value: 29.51 },
          { label: 'Transitar na contramão', value: 28.96 },
          { label: 'Ultrapassagem indevida', value: 16.62 },
        ],
        takeaway:
          'Contramão não lidera o volume, mas está entre as causas mais letais de todo o recorte.',
      },
      {
        id: 'tipos',
        label: 'Tipos de acidente',
        frequentTitle: 'Tipos mais comuns',
        lethalTitle: 'Tipos mais letais',
        frequentUnit: 'ocorrências',
        lethalUnit: '% de letalidade',
        intro:
          'Colisão traseira domina o volume. Colisão frontal e atropelamento de pedestre aparecem menos, mas matam muito mais.',
        frequent: [
          { label: 'Colisão traseira', value: 41229 },
          { label: 'Saída de leito carroçável', value: 31236 },
          { label: 'Colisão transversal', value: 27161 },
          { label: 'Colisão frontal', value: 14233 },
          { label: 'Atropelamento de pedestre', value: 9356 },
        ],
        lethal: [
          { label: 'Colisão frontal', value: 29.81 },
          { label: 'Atropelamento de pedestre', value: 28.97 },
        ],
        takeaway: 'Colisão traseira acontece muito. Colisão frontal mata muito mais.',
      },
    ],
  },
  riskMoments: {
    eyebrow: 'Quando o risco aumenta',
    title: 'Há contextos em que a rodovia fica ainda menos tolerante ao erro.',
    text:
      'Domingo, 19h, noite, madrugada e pista simples são sinais claros de atenção dentro do recorte da PRF nas BRs.',
    panels: [
      {
        label: 'Dia mais crítico',
        title: 'Domingo',
        description: 'É o dia com mais vítimas fatais registradas pela PRF no período analisado.',
      },
      {
        label: 'Horário mais crítico',
        title: '19h',
        description: 'É a hora com mais vítimas fatais. O fim do dia exige atenção máxima.',
      },
      {
        label: 'Período com mais fatalidades',
        title: 'Noite',
        description: 'A noite concentra mais fatalidades do que os demais períodos do dia.',
      },
      {
        label: 'Maior taxa fatal',
        title: 'Madrugada',
        description: 'Mesmo com menos fluxo, a taxa fatal cresce quando a margem de reação encolhe.',
      },
    ],
    roadType: {
      title: 'Pista simples é muito mais letal que pista dupla.',
      text:
        'Sem separação física entre os fluxos, uma distração, uma contramão ou uma ultrapassagem indevida podem se transformar em tragédia com muito mais facilidade.',
      bars: [
        { label: 'Pista simples', value: 9.89, support: '12.372 vítimas fatais registradas' },
        { label: 'Pista dupla', value: 4.71, support: '4.558 vítimas fatais registradas' },
      ],
    },
    second: {
      title: 'Um segundo pode ser tudo.',
      text:
        'Curto demais para parecer importante. Longo o bastante para eliminar qualquer chance de correção em uma BR à noite.',
      labels: ['Trajeto comum', 'Visibilidade cai', 'Outro motorista invade a faixa', 'Pode ser tarde demais'],
    },
  },
  geography: {
    eyebrow: 'Onde a perda pesa mais',
    title: 'Alguns estados e corredores concentram parte relevante das mortes registradas.',
    text:
      'Aqui o foco é clareza: quais UFs e quais BRs concentram mais vítimas fatais no recorte da PRF para rodovias federais brasileiras.',
    spotlight: 'BR-116 e BR-101 somam 4.425 vítimas fatais no período analisado.',
    states: [
      { label: 'MG', support: 'Minas Gerais', value: 2285 },
      { label: 'BA', support: 'Bahia', value: 1766 },
      { label: 'PR', support: 'Paraná', value: 1761 },
      { label: 'SC', support: 'Santa Catarina', value: 1214 },
      { label: 'RJ', support: 'Rio de Janeiro', value: 980 },
    ],
    roads: [
      { label: 'BR-116', support: 'maior número de vítimas fatais', value: 2270 },
      { label: 'BR-101', support: 'segundo corredor mais crítico', value: 2155 },
      { label: 'BR-153', support: 'terceira maior concentração', value: 793 },
      { label: 'BR-163', support: 'quarta maior concentração', value: 698 },
      { label: 'BR-316', support: 'quinta maior concentração', value: 628 },
    ],
  },
  victims: {
    eyebrow: 'Perfil das vítimas fatais',
    title: 'Muitas vítimas eram pessoas comuns, em trajetos comuns, em dias aparentemente comuns.',
    text:
      'O perfil abaixo reforça a dimensão humana do problema nas BRs: motociclistas, ocupantes de automóvel, condutores, homens e pessoas entre 45 e 59 anos aparecem com mais frequência entre as vítimas fatais.',
    notes: [
      'Motociclistas aparecem entre os grupos mais vulneráveis.',
      'A maioria das vítimas fatais era do sexo masculino.',
      'Muitos mortos eram condutores em deslocamentos comuns.',
    ],
    cards: [
      { label: 'Motocicleta', value: '5.312', detail: 'vítimas fatais estavam em motocicletas' },
      { label: 'Automóvel', value: '4.994', detail: 'vítimas fatais estavam em automóveis' },
      { label: 'Condutor', value: '11.228', detail: 'mortos eram condutores' },
      { label: 'Masculino', value: '81,55%', detail: 'das vítimas fatais eram homens' },
      { label: '45–59 anos', value: 'Faixa crítica', detail: 'faixa etária com mais vítimas fatais' },
    ],
  },
  story: {
    eyebrow: 'Narrativa visual',
    title: 'Você seguia corretamente. O risco veio do erro de outro motorista.',
    text:
      'Uma leitura visual curta sobre como a imprudência de outra pessoa pode invadir a sua trajetória em uma rodovia federal à noite.',
    beats: [
      {
        id: 'start',
        label: '01',
        title: 'Trajeto comum',
        text: 'Você mantém a faixa, dirige com prudência e segue normalmente por uma BR à noite.',
        reflection: 'Uma viagem comum deveria terminar como começou: sem trauma, sem perda, sem ruptura.',
        caption: 'Você seguia corretamente.',
        emphasis: 'Rotina comum em uma rodovia federal brasileira.',
      },
      {
        id: 'approach',
        label: '02',
        title: 'Risco no sentido oposto',
        text: 'Outro veículo aparece no fluxo contrário. O ambiente ainda parece normal, mas o tempo de reação já é curto.',
        reflection: 'Noite, velocidade e pista simples reduzem a margem de correção.',
        caption: 'O perigo ainda parece distante.',
        emphasis: 'Basta um erro para a distância desaparecer.',
      },
      {
        id: 'intrusion',
        label: '03',
        title: 'Invasão de faixa',
        text: 'O outro motorista assume um risco indevido, invade a sua faixa e transforma o seu trajeto em zona de impacto.',
        reflection: 'Nem sempre o erro é seu. A consequência, porém, pode chegar até você.',
        caption: 'A imprudência atravessa a sua trajetória.',
        emphasis: 'Uma ultrapassagem indevida ou uma contramão pode destruir vidas inocentes.',
      },
      {
        id: 'impact',
        label: '04',
        title: 'Colisão e consequência',
        text: 'A colisão atinge o carro que seguia corretamente. Depois do impacto, a vida não volta para a pista como se nada tivesse acontecido.',
        reflection: 'A imprudência não atinge só quem a comete. Ela destrói a vida de outras pessoas.',
        caption: 'Você sofreu um acidente por imprudência de outra pessoa.',
        emphasis: 'NÃO SEJA O IMPRUDENTE.',
      },
    ],
    finalTitle: 'Dirigir com atenção é proteger quem você nem conhece.',
    finalText:
      'Os dados da PRF mostram um recorte de rodovias federais brasileiras entre 2023 e 2025. Mesmo nesse recorte específico, a repetição é grave demais para ser tratada como acaso.',
  },
  finalReflection: {
    eyebrow: 'Reflexão final',
    title: 'Sua pressa não vale uma vida.',
    text:
      'Os dados da PRF em rodovias federais brasileiras mostram algo duro e simples: isso acontece muito, isso pode atingir pessoas inocentes e isso poderia ser evitado em muitos casos com mais prudência.',
    statements: [
      'Isso é sério.',
      'Isso acontece muito.',
      'O erro de uma pessoa pode destruir a vida de outras.',
      'NÃO SEJA O IMPRUDENTE.',
    ],
    note:
      'Dados da Polícia Rodoviária Federal sobre acidentes registrados em rodovias federais brasileiras entre 2023 e 2025. Este projeto não representa todo o trânsito do Brasil.',
  },
  methodology: {
    eyebrow: 'Metodologia',
    title: 'O recorte precisa ficar claro do início ao fim.',
    items: [
      'Fonte: Polícia Rodoviária Federal (PRF).',
      'Recorte: ocorrências registradas em rodovias federais brasileiras (BRs).',
      'Período analisado: 2023, 2024 e 2025.',
      'Este projeto não representa todo o trânsito do Brasil.',
      'São ocorrências registradas pela PRF nas rodovias federais.',
      'A proposta é conscientização pública com curadoria de poucos dados centrais.',
    ],
  },
  footer: {
    title: 'Não são só números. São pessoas.',
    text:
      'Projeto editorial de conscientização com base em registros da Polícia Rodoviária Federal sobre acidentes em rodovias federais brasileiras, entre 2023 e 2025. Este projeto não representa todo o trânsito do Brasil.',
  },
}
