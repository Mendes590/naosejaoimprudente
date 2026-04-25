import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPinned,
  Pause,
  Play,
  ShieldAlert,
  Timer,
  Users,
} from 'lucide-react'

const number = new Intl.NumberFormat('pt-BR')
const decimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const decimalShort = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const storyData = {
  annual: [
    { year: '2023', accidents: 67767, fatalAccidents: 4858, deaths: 5627 },
    { year: '2024', accidents: 73156, fatalAccidents: 5222, deaths: 6160 },
    { year: '2025', accidents: 72529, fatalAccidents: 5209, deaths: 6043 },
  ],
  totals: {
    involved: 555562,
    seriousInjuries: 59320,
  },
}

const yearlyData = storyData.annual
const totals = {
  accidents: yearlyData.reduce((sum, item) => sum + item.accidents, 0),
  fatalAccidents: yearlyData.reduce((sum, item) => sum + item.fatalAccidents, 0),
  deaths: yearlyData.reduce((sum, item) => sum + item.deaths, 0),
  involved: storyData.totals.involved,
  seriousInjuries: storyData.totals.seriousInjuries,
}

const evolutionModesCompact = {
  accidents: {
    label: 'Acidentes',
    accent: 'gold',
    subtitle: 'Mesmo no recorte federal, o volume segue alto.',
    insight: '2024 sobe. 2025 segue em patamar elevado.',
    outro: 'O problema não parece episódico.',
  },
  fatalAccidents: {
    label: 'Acidentes fatais',
    accent: 'copper',
    subtitle: 'A letalidade continua pesada ano após ano.',
    insight: 'Dois anos seguidos acima de cinco mil casos.',
    outro: 'A morte não aparece como exceção.',
  },
  deaths: {
    label: 'Vítimas fatais',
    accent: 'red',
    subtitle: 'As ausências continuam altas no recorte analisado.',
    insight: '2024 atinge o pico. 2025 segue muito perto.',
    outro: 'O alerta continua.',
  },
}

const panoramaYearBreakdown = yearlyData.map((item, index) => ({
  year: item.year,
  value: item.deaths,
  tone: index === 0 ? 'gold' : index === 1 ? 'copper' : 'steel',
}))

const totalDays = 365 + 366 + 365
const totalMinutes = totalDays * 24 * 60
const fatalShare = totals.fatalAccidents / totals.accidents
const peoplePerAccident = totals.involved / totals.accidents
const seriousShare = totals.seriousInjuries / totals.involved
const seriousVsDeaths = totals.seriousInjuries / totals.deaths
const yearlyTrend = {
  accidents: {
    peakYear: yearlyData.reduce((peak, item) => (item.accidents > peak.accidents ? item : peak), yearlyData[0]).year,
    from2024To2025: ((yearlyData[2].accidents - yearlyData[1].accidents) / yearlyData[1].accidents) * 100,
  },
}

const journey = [
  { id: 'abertura', label: 'Abertura', short: 'Início' },
  { id: 'ritmo', label: 'Ritmo', short: 'Ritmo' },
  { id: 'panorama', label: 'Panorama', short: 'Panorama' },
  { id: 'evolucao', label: 'Evolução', short: 'Evolução' },
  { id: 'riscos', label: 'Padrões', short: 'Padrões' },
  { id: 'colisao', label: 'Colisão', short: 'Colisão' },
  { id: 'fechamento', label: 'Fechamento', short: 'Final' },
]

const heroHighlights = [
  'Dados da PRF',
  'Apenas rodovias federais brasileiras',
  'Não representa todo o trânsito do Brasil',
]

const rhythmCards = [
  {
    id: 'accidents',
    label: 'Acidentes por dia',
    value: Math.round(totals.accidents / totalDays),
    kicker: 'Nas BRs analisadas, o problema não para.',
    microcopy: 'Outra viagem interrompida a cada 7 minutos.',
  },
  {
    id: 'fatal',
    label: 'Acidentes fatais por dia',
    value: Math.round(totals.fatalAccidents / totalDays),
    kicker: 'O risco se repete todos os dias.',
    microcopy: `Um acidente fatal a cada ${formatDuration(totalMinutes / totals.fatalAccidents)}.`,
  },
  {
    id: 'deaths',
    label: 'Mortes por dia',
    value: Math.round(totals.deaths / totalDays),
    kicker: 'Há casas esperando por alguém.',
    microcopy: `Uma morte a cada ${formatDuration(totalMinutes / totals.deaths)}.`,
  },
  {
    id: 'serious',
    label: 'Feridos graves por dia',
    value: Math.round(totals.seriousInjuries / totalDays),
    kicker: 'Nem toda vítima morre. Muitas seguem marcadas.',
    microcopy: 'Trauma grave em média 54 vezes por dia.',
  },
]

const panoramaCards = [
  {
    icon: AlertTriangle,
    label: 'Acidentes registrados',
    value: totals.accidents,
    meta: 'ocorrências',
    insight: 'Pico em 2024. 2025 recua, mas segue alto.',
    type: 'trend',
  },
  {
    icon: ShieldAlert,
    label: 'Acidentes fatais',
    value: totals.fatalAccidents,
    meta: 'casos fatais',
    insight: `${decimal.format(fatalShare * 100)}% do total de acidentes.`,
    type: 'ring',
  },
  {
    icon: Users,
    label: 'Pessoas envolvidas',
    value: totals.involved,
    meta: 'pessoas envolvidas',
    insight: `${decimal.format(peoplePerAccident)} pessoas por ocorrência.`,
    type: 'flow',
  },
  {
    icon: Clock3,
    label: 'Feridos graves',
    value: totals.seriousInjuries,
    meta: 'sobreviventes graves',
    insight: `${decimal.format(seriousVsDeaths)}x o total de vítimas fatais.`,
    type: 'compare',
  },
]

const riskTabs = {
  causes: {
    label: 'Causas',
    title: 'Muito risco começa antes da batida.',
    text: 'Atenção insuficiente, reação tardia e decisões sem margem aparecem de novo e de novo.',
    insight: 'Em muitos casos, o que faltou foi atenção.',
    unit: 'ocorrências',
    data: [
      { label: 'Reação tardia ou ineficiente do condutor', value: 31574, note: 'atenção que chegou tarde' },
      { label: 'Ausência de reação do condutor', value: 31459, note: 'segundos que não voltam' },
      { label: 'Acessar a via sem observar outros veículos', value: 20380, note: 'entrada sem margem' },
      { label: 'Velocidade incompatível', value: 12675, note: 'mais força, menos chance' },
      { label: 'Ingestão de álcool pelo condutor', value: 11138, note: 'risco assumido ao volante' },
    ],
  },
  types: {
    label: 'Tipos',
    title: 'O que mais acontece não é sempre o que mais mata.',
    text: 'Colisão traseira domina o volume. Colisão frontal carrega peso muito maior.',
    insight: 'Frequência e letalidade não contam a mesma história.',
    unit: 'ocorrências',
    data: [
      { label: 'Colisão traseira', value: 41229, note: 'distância e atenção falharam' },
      { label: 'Saída de leito carroçável', value: 31236, note: 'controle perdido' },
      { label: 'Colisão transversal', value: 27161, note: 'trajetos em choque' },
      { label: 'Colisão frontal', value: 14233, note: 'pouca chance de correção' },
      { label: 'Atropelamento de pedestre', value: 9356, note: 'o lado mais vulnerável da via' },
    ],
  },
  lethality: {
    label: 'Letalidade',
    title: 'Há erros que quase não dão segunda chance.',
    text: 'Contramão, colisão frontal e atropelamentos concentram risco extremo de morte.',
    insight: 'Atravessar a faixa pode atravessar uma família.',
    unit: 'letalidade',
    data: [
      { label: 'Pedestre andava na pista', value: 41.44, note: 'exposição total', percent: true },
      { label: 'Colisão frontal', value: 29.81, note: 'impacto direto', percent: true },
      { label: 'Atropelamento de pedestre', value: 28.97, note: 'corpo contra máquina', percent: true },
      { label: 'Transitar na contramão', value: 28.96, note: 'erro que invade a vida do outro', percent: true },
      { label: 'Ultrapassagem indevida', value: 16.62, note: 'segundos de pressa, anos de dor', percent: true },
    ],
  },
  patterns: {
    label: 'Padrões',
    title: 'A repetição mostra comportamento, não acaso.',
    text: 'Atenção, reação e decisão aparecem como núcleo do problema.',
    insight: 'A estrada não perdoa distrações repetidas.',
    unit: 'ocorrências agrupadas',
    data: [
      { label: 'Falha de atenção ou reação', value: 63033, note: 'tempo perdido quando mais importava' },
      { label: 'Decisão sem margem', value: 32955, note: 'escolha que ignora o outro' },
      { label: 'Risco assumido', value: 23813, note: 'álcool, velocidade ou sono' },
    ],
  },
  territory: {
    label: 'Território',
    title: 'O problema se espalha. Alguns corredores pesam ainda mais.',
    text: 'Não é todo o trânsito brasileiro. Ainda assim, o recorte das BRs já desenha áreas críticas.',
    insight: 'Mesmo nas BRs apenas, a escala já é alarmante.',
    unit: 'vítimas fatais',
    data: [
      { label: 'MG', value: 2285, note: 'Minas Gerais' },
      { label: 'BA', value: 1766, note: 'Bahia' },
      { label: 'PR', value: 1761, note: 'Paraná' },
      { label: 'SC', value: 1214, note: 'Santa Catarina' },
      { label: 'RJ', value: 980, note: 'Rio de Janeiro' },
    ],
  },
}

const storyStepsCompact = [
  {
    id: '01',
    title: 'Trajeto comum',
    text: 'Você segue na sua faixa. Tudo parece normal.',
    note: 'Quem está do outro lado do para-brisa também quer chegar em casa.',
  },
  {
    id: '02',
    title: 'Risco no sentido oposto',
    text: 'A ameaça surge no sentido contrário, mas ainda sem impacto.',
    note: 'Nem toda vítima controla o perigo que se aproxima.',
  },
  {
    id: '03',
    title: 'Ultrapassagem indevida',
    text: 'A manobra errada invade sua faixa e deixa a colisão iminente.',
    note: 'Uma decisão errada coloca quem vinha certo em risco extremo.',
  },
  {
    id: '04',
    title: 'Sem tempo',
    text: 'O espaço acaba. O impacto chega antes de qualquer correção.',
    note: 'Na BR, um segundo pode ser tudo.',
  },
  {
    id: '05',
    title: 'Depois da batida',
    text: 'O impacto termina na pista. A consequência continua fora dela.',
    note: 'A imprudência não para em quem a comete.',
  },
]

const COLLISION_STEP_DURATION = 5200

const collisionSceneStates = {
  '01': {
    focus: 0.14,
    trail: 0.04,
    invasion: 0.04,
    impact: 0,
    user: { x: 2, y: -8, rotate: -2, scale: 1 },
    lead: { x: 0, y: 28, rotate: 180, scale: 1 },
    risk: { x: 0, y: 4, rotate: 180, scale: 1 },
  },
  '02': {
    focus: 0.2,
    trail: 0.12,
    invasion: 0.2,
    impact: 0,
    user: { x: 0, y: -16, rotate: -2, scale: 1 },
    lead: { x: 4, y: 34, rotate: 180, scale: 1 },
    risk: { x: 22, y: 28, rotate: 177, scale: 1.01 },
  },
  '03': {
    focus: 0.3,
    trail: 0.42,
    invasion: 0.58,
    impact: 0,
    user: { x: -6, y: -30, rotate: -3, scale: 1 },
    lead: { x: 8, y: 42, rotate: 180, scale: 1 },
    risk: { x: 68, y: 92, rotate: 166, scale: 1.02 },
  },
  '04': {
    focus: 0.5,
    trail: 0.78,
    invasion: 0.96,
    impact: 0.96,
    user: { x: -18, y: -58, rotate: -7, scale: 0.995 },
    lead: { x: 10, y: 56, rotate: 180, scale: 1 },
    risk: { x: 132, y: 182, rotate: 146, scale: 1.02 },
  },
  '05': {
    focus: 0.3,
    trail: 0.34,
    invasion: 0.34,
    impact: 0.7,
    user: { x: -24, y: -68, rotate: -10, scale: 0.985 },
    lead: { x: 16, y: 64, rotate: 184, scale: 1 },
    risk: { x: 134, y: 184, rotate: 140, scale: 1 },
  },
}

function formatDuration(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} min`
  const hours = Math.floor(minutes / 60)
  const remaining = Math.round(minutes % 60)
  return `${hours}h${String(remaining).padStart(2, '0')}`
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.2, 0.35, 0.55, 0.72] },
    )

    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}

function usePageProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ value, percent = false, suffix = '', duration = 1400 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [started, setStarted] = useState(Boolean(reduce))
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setStarted(true)
      setDisplay(value)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce, value])

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return undefined
    }

    if (!started) {
      setDisplay(0)
      return undefined
    }

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, reduce, started, value])

  const formatted = percent ? decimal.format(display) : number.format(Math.round(display))

  return (
    <span ref={ref} className="count-up-number">
      {formatted}
      {percent ? '%' : suffix}
    </span>
  )
}

function PanoramaAccidentsTrend({ values }) {
  const reduce = useReducedMotion()
  const max = Math.max(...values.map((item) => item.value))
  const delta2025vs2024 = ((values[2].value - values[1].value) / values[1].value) * 100
  const delta2025vs2023 = ((values[2].value - values[0].value) / values[0].value) * 100

  return (
    <div className="panorama-accident-trend">
      <div className="panorama-accident-chips" aria-hidden="true">
        <span className="panorama-inline-chip is-peak">Pico em {yearlyTrend.accidents.peakYear}</span>
        <span className="panorama-inline-chip is-down">
          {delta2025vs2024 >= 0 ? '+' : '−'}
          {decimalShort.format(Math.abs(delta2025vs2024))}% vs 2024
        </span>
      </div>

      <div className="panorama-mini-bars panorama-mini-bars-analytic" aria-hidden="true">
        {values.map((item, index) => (
          <div key={item.label} className={`panorama-mini-bar${index === 1 ? ' is-peak' : ''}`}>
            <strong className="panorama-mini-value">{number.format(item.value)}</strong>
            <div className="panorama-mini-bar-shell">
              <motion.span
                className="panorama-mini-bar-fill"
                initial={reduce ? false : { height: 0, opacity: 0.55 }}
                whileInView={reduce ? undefined : { height: `${(item.value / max) * 100}%`, opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.7, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={reduce ? { height: `${(item.value / max) * 100}%` } : undefined}
              />
            </div>
            <div className="panorama-mini-caption">
              <span>{item.label}</span>
              {index === 1 ? <em>pico</em> : null}
              {index === 2 ? (
                <small>
                  {delta2025vs2024 >= 0 ? '+' : '−'}
                  {decimalShort.format(Math.abs(delta2025vs2024))}%
                </small>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p className="panorama-accident-note">
        2025 recua {decimalShort.format(Math.abs(delta2025vs2024))}% em relação a 2024, mas segue{' '}
        {delta2025vs2023 >= 0 ? 'acima' : 'abaixo'} de 2023.
      </p>
    </div>
  )
}

function PanoramaRing({ progress, valueLabel, detail }) {
  const reduce = useReducedMotion()
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="panorama-ring">
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <circle className="panorama-ring-track" cx="70" cy="70" r={radius} />
        <motion.circle
          className="panorama-ring-progress"
          cx="70"
          cy="70"
          r={radius}
          pathLength="1"
          strokeDasharray={circumference}
          initial={reduce ? false : { strokeDashoffset: circumference }}
          whileInView={reduce ? undefined : { strokeDashoffset: dashOffset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? { strokeDashoffset: dashOffset } : undefined}
        />
      </svg>
      <div className="panorama-ring-copy">
        <strong>{valueLabel}</strong>
        <span>{detail}</span>
      </div>
    </div>
  )
}

function PanoramaFlow({ ratio }) {
  const reduce = useReducedMotion()
  const width = `${Math.min((ratio / 3) * 100, 100)}%`
  const marker = `${Math.min((ratio / 3) * 100, 100)}%`

  return (
    <div className="panorama-flow">
      <span className="panorama-flow-label">média de pessoas por ocorrência</span>
      <div className="panorama-flow-track">
        <motion.span
          className="panorama-flow-fill"
          initial={reduce ? false : { width: 0 }}
          whileInView={reduce ? undefined : { width }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? { width } : undefined}
        />
        <span className="panorama-flow-marker" style={{ left: marker }}>
          <strong>{decimal.format(ratio)}</strong>
          <small>pessoas</small>
        </span>
      </div>
      <div className="panorama-flow-points">
        {[1, 2, 3].map((step) => (
          <span key={step}>
            {step} {step === 1 ? 'pessoa' : 'pessoas'}
          </span>
        ))}
      </div>
      <p className="panorama-flow-note">
        Em média, cada ocorrência envolve {decimal.format(ratio)} pessoas.
      </p>
    </div>
  )
}

function PanoramaCompare({ primary, secondary }) {
  const reduce = useReducedMotion()
  const max = Math.max(primary.value, secondary.value)

  return (
    <div className="panorama-compare" aria-hidden="true">
      {[primary, secondary].map((item, index) => {
        const width = `${(item.value / max) * 100}%`
        return (
          <div key={item.label} className="panorama-compare-row">
            <div className="panorama-compare-head">
              <span>{item.label}</span>
              <strong>{item.display}</strong>
            </div>
            <div className="panorama-compare-track">
              <motion.span
                className={item.tone === 'muted' ? 'is-muted' : ''}
                initial={reduce ? false : { width: 0, opacity: 0.45 }}
                whileInView={reduce ? undefined : { width, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={reduce ? { width } : undefined}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PanoramaCardVisual({ item }) {
  if (item.type === 'trend') {
    return <PanoramaAccidentsTrend values={yearlyData.map(({ year, accidents }) => ({ label: year, value: accidents }))} />
  }

  if (item.type === 'ring') {
    return <PanoramaRing progress={fatalShare} valueLabel={`${decimal.format(fatalShare * 100)}%`} detail="do total" />
  }

  if (item.type === 'flow') {
    return <PanoramaFlow ratio={peoplePerAccident} />
  }

  return (
    <PanoramaCompare
      primary={{ label: 'Feridos graves', value: totals.seriousInjuries, display: number.format(totals.seriousInjuries) }}
      secondary={{ label: 'Vítimas fatais', value: totals.deaths, display: number.format(totals.deaths), tone: 'muted' }}
    />
  )
}

function PanoramaMetricCard({ item, index }) {
  const emphasisClass = item.type === 'trend' || item.type === 'ring' ? ' panorama-metric-card-emphasis' : ''

  return (
    <Reveal key={item.label} className={`panorama-metric-card${emphasisClass}`} delay={0.08 + index * 0.06}>
      <div className="panorama-metric-head">
        <div className="panorama-metric-label">
          <item.icon size={18} />
          <span>{item.label}</span>
        </div>
        <strong>
          <CountUp value={item.value} duration={1500} />
        </strong>
      </div>
      <p>{item.meta}</p>
      <PanoramaCardVisual item={item} />
      {item.insight ? <small>{item.insight}</small> : null}
    </Reveal>
  )
}

function PanoramaTotalVisual() {
  const reduce = useReducedMotion()
  const total = panoramaYearBreakdown.reduce((sum, item) => sum + item.value, 0)
  const gap = 0.018
  let cursor = 0

  const segments = panoramaYearBreakdown.map((item) => {
    const share = item.value / total
    const normalized = Math.max(share - gap, 0.08)
    const segment = {
      ...item,
      share,
      dasharray: `${normalized} ${1 - normalized}`,
      dashoffset: `${0.25 - cursor}`,
    }
    cursor += normalized + gap
    return segment
  })

  return (
    <div className="panorama-total-card">
      <div className="panorama-total-ring-shell">
        <div className="panorama-total-ring">
          <svg viewBox="0 0 260 260" aria-hidden="true">
            <circle className="panorama-total-track" cx="130" cy="130" r="98" pathLength="1" />
            {segments.map((segment, index) => (
              <motion.circle
                key={segment.year}
                className={`panorama-total-segment is-${segment.tone}`}
                cx="130"
                cy="130"
                r="98"
                pathLength="1"
                strokeDasharray={segment.dasharray}
                strokeDashoffset={segment.dashoffset}
                initial={reduce ? false : { opacity: 0, pathLength: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, pathLength: 1 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.72, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </svg>

            <motion.div
              className="panorama-total-core"
            initial={reduce ? false : { opacity: 0, scale: 0.92, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>2023-2025</span>
              <strong>
                <CountUp value={totals.deaths} duration={1700} />
              </strong>
              <p>mortes no recorte</p>
            </motion.div>
          </div>
        </div>

      <div className="panorama-total-years">
        {panoramaYearBreakdown.map((item, index) => (
          <motion.article
            key={item.year}
            className={`panorama-total-year is-${item.tone}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.5, delay: 0.16 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{item.year}</span>
            <strong>{number.format(item.value)}</strong>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

function EvolutionTrendChart({ data, mode, accent }) {
  const reduce = useReducedMotion()
  const values = data.map((item) => item[mode])
  const max = Math.max(...values)
  const min = Math.min(...values)
  const chartWidth = 640
  const chartHeight = 272
  const left = 54
  const right = chartWidth - 44
  const top = 30
  const bottom = chartHeight - 42
  const barWidth = 84
  const peak = Math.max(...values)
  const domainMin = Math.max(0, min - (max - min) * 0.4)
  const domainMax = max + (max - min) * 0.2
  const visualRange = Math.max(domainMax - domainMin, 1)
  const guides = [0.18, 0.48, 0.78]
  const bars = data.map((item, index) => {
    const x = left + 34 + index * ((right - left - 68) / Math.max(data.length - 1, 1))
    const usableHeight = bottom - top
    const normalized = (item[mode] - domainMin) / visualRange
    const height = Math.max(usableHeight * normalized, 22)
    const y = bottom - height
    return {
      ...item,
      x,
      y,
      height,
      width: barWidth,
      centerX: x + barWidth / 2,
      isPeak: item[mode] === peak,
    }
  })
  const linePath = bars.map((bar, index) => `${index === 0 ? 'M' : 'L'} ${bar.centerX} ${bar.y}`).join(' ')
  const peakBar = bars.find((bar) => bar.isPeak) ?? bars[1]

  return (
    <div className={`evolution-chart-surface evolution-chart-surface-${accent}`}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`evolution-bar-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.96" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.24" />
          </linearGradient>
        </defs>
        {guides.map((guide) => {
          const y = top + (bottom - top) * guide
          return <line key={guide} className="evolution-chart-guide" x1={left} x2={right} y1={y} y2={y} />
        })}
        <line className="evolution-chart-baseline" x1={left} x2={right} y1={bottom} y2={bottom} />
        {bars.map((bar, index) => (
          <g key={bar.year}>
            <motion.rect
              className={bar.isPeak ? 'evolution-bar is-peak' : 'evolution-bar'}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx="22"
              fill={`url(#evolution-bar-${accent})`}
              initial={reduce ? false : { opacity: 0, y: bottom, height: 0 }}
              whileInView={reduce ? undefined : { opacity: 1, y: bar.y, height: bar.height }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
            <text className={bar.isPeak ? 'evolution-chart-value is-peak' : 'evolution-chart-value'} x={bar.centerX} y={bar.y - 10} textAnchor="middle">
              {number.format(bar[mode])}
            </text>
            <text className="evolution-chart-year" x={bar.centerX} y={chartHeight - 9} textAnchor="middle">
              {bar.year}
            </text>
          </g>
        ))}
        <motion.path
          className="evolution-chart-line"
          d={linePath}
          pathLength="1"
          initial={reduce ? false : { pathLength: 0, opacity: 0.38 }}
          whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        />
        {bars.map((bar, index) => (
          <motion.circle
            key={`${bar.year}-dot`}
            className={bar.isPeak ? 'evolution-chart-dot is-peak' : 'evolution-chart-dot'}
            cx={bar.centerX}
            cy={bar.y}
            r={bar.isPeak ? '6.5' : '5'}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.3, delay: 0.18 + index * 0.08 }}
          />
        ))}
        <g className="evolution-chart-peak-tag" transform={`translate(${peakBar.centerX}, ${peakBar.y - 34})`}>
          <rect x="-22" y="-12" width="44" height="20" rx="10" />
          <text x="0" y="2" textAnchor="middle">
            pico
          </text>
        </g>
      </svg>
    </div>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </Reveal>
  )
}

function TopProgress({ active, progress }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))

  return (
    <header className="topbar">
      <div className="topbar-progress" style={{ width: `${progress}%` }} />
      <div className="container topbar-inner">
        <a href="#abertura" className="brand">
          <span className="brand-dot" />
          BRs em risco
        </a>

        <nav className="topbar-nav" aria-label="Navegação da experiência">
          {journey.map((item, itemIndex) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={item.id === active ? 'active' : itemIndex < index ? 'done' : ''}
            >
              {item.short}
            </a>
          ))}
        </nav>

        <span className="topbar-step">
          {String(index + 1).padStart(2, '0')} / {journey.length}
        </span>
      </div>
    </header>
  )
}

function SideRail({ active }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))

  return (
    <nav className="side-rail" aria-label="Atalhos da experiência">
      <span className="side-rail-line" style={{ height: `${((index + 1) / journey.length) * 100}%` }} />
      {journey.map((item, itemIndex) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={item.id === active ? 'active' : itemIndex < index ? 'done' : ''}
          aria-label={`Ir para ${item.label}`}
        >
          <span className="side-rail-dot" />
          <span className="side-rail-label">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

function JourneyControls({ active }) {
  const index = Math.max(0, journey.findIndex((item) => item.id === active))
  const previous = journey[index - 1]
  const next = journey[index + 1]

  return (
    <nav className="journey-controls" aria-label="Controles da jornada">
      {previous ? (
        <a href={`#${previous.id}`} className="journey-control">
          <ChevronLeft size={15} />
          Voltar
        </a>
      ) : null}
      {next ? (
        <a href={`#${next.id}`} className="journey-control primary">
          Continuar
          <ChevronRight size={15} />
        </a>
      ) : null}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="abertura">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-glow hero-glow-a" />
        <span className="hero-glow hero-glow-b" />
        <span className="hero-road" />
        <span className="hero-road-line" />
      </div>

      <div className="container hero-layout">
        <Reveal className="hero-copy">
          <span className="eyebrow">PRF · rodovias federais brasileiras · 2023 a 2025</span>
          <h1>Nas BRs, um erro pode mudar várias vidas.</h1>
          <p>
            Dados da Polícia Rodoviária Federal sobre acidentes em rodovias federais brasileiras.
            Não é todo o trânsito do Brasil. E já é grave o bastante.
          </p>

          <div className="hero-pill-row">
            {heroHighlights.map((item) => (
              <span key={item} className="hero-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <a href="#ritmo" className="button button-primary">
              Sentir o ritmo
              <ArrowRight size={16} />
            </a>
            <a href="#colisao" className="button button-secondary">
              Entender a colisão
            </a>
          </div>

          <div className="hero-note">
            <Clock3 size={18} />
            <span>Em média, 16 pessoas morreram por dia nesse recorte das BRs.</span>
          </div>
        </Reveal>

        <Reveal className="hero-panel" delay={0.08}>
          <span className="panel-kicker">Vidas interrompidas</span>
          <strong className="hero-number">
            <CountUp value={totals.deaths} />
          </strong>
          <p>mortes registradas pela PRF nas rodovias federais brasileiras.</p>

          <div className="hero-panel-grid">
            <article>
              <span>Acidentes</span>
              <strong>
                <CountUp value={totals.accidents} duration={1500} />
              </strong>
            </article>
            <article>
              <span>Fatais</span>
              <strong>
                <CountUp value={totals.fatalAccidents} duration={1500} />
              </strong>
            </article>
          </div>

          <div className="hero-panel-footer">
            <strong>Recorte: BRs brasileiras.</strong>
            <span>Mesmo assim, o cenário já assusta.</span>
          </div>
        </Reveal>

        <a href="#ritmo" className="scroll-cue" aria-label="Ir para o ritmo do problema">
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  )
}

function RhythmSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = rhythmCards[active]

  useEffect(() => {
    if (paused) return undefined

    const timer = setInterval(() => {
      setActive((value) => (value + 1) % rhythmCards.length)
    }, 3600)

    return () => clearInterval(timer)
  }, [paused])

  return (
    <section className="story-section" id="ritmo">
      <div className="container">
        <SectionHeading
          eyebrow="Ritmo do problema"
          title="Isso não acontece às vezes. Acontece todos os dias."
          text="Transformar volume em tempo deixa a repetição mais clara. Nas BRs analisadas, o risco segue rodando."
        />

        <div className="rhythm-layout">
          <Reveal className="feature-panel feature-panel-large">
            <span className="metric-label">{current.label}</span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={current.id}
                className="feature-number"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                <CountUp value={current.value} />
              </motion.strong>
            </AnimatePresence>
            <p className="feature-kicker">{current.kicker}</p>
            <div className="feature-inline">
              <Timer size={16} />
              {current.microcopy}
            </div>
          </Reveal>

          <Reveal className="rhythm-sidebar" delay={0.08}>
            <button
              type="button"
              className="toggle-button"
              aria-pressed={paused}
              aria-label={paused ? 'Retomar animação do ritmo' : 'Pausar animação do ritmo'}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
              {paused ? 'Retomar' : 'Pausar'}
            </button>

            {rhythmCards.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? 'rhythm-card active' : 'rhythm-card'}
                onClick={() => {
                  setActive(index)
                  setPaused(true)
                }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.microcopy}</p>
              </button>
            ))}
          </Reveal>
        </div>

      </div>
    </section>
  )
}

function PanoramaSectionCompact() {
  return (
    <section className="story-section story-section-muted" id="panorama">
      <div className="container">
        <SectionHeading
          eyebrow="Panorama geral"
          title="Poucos números mostram o peso."
          text="BRs federais brasileiras · 2023 a 2025"
        />

        <div className="panorama-stage panorama-stage-compact">
          <Reveal className="panorama-hero panorama-hero-compact">
            <div className="panorama-hero-copy panorama-hero-copy-compact">
              <span className="impact-kicker">Vítimas fatais</span>
              <h3 className="panorama-hero-title panorama-hero-title-compact">Total consolidado no recorte.</h3>
              <p className="panorama-hero-text panorama-hero-text-compact">O total aparece no centro, distribuído em três anos seguidos de perdas.</p>
            </div>

            <div className="panorama-hero-visual panorama-hero-visual-compact">
              <PanoramaTotalVisual />
            </div>
          </Reveal>

          <div className="panorama-side-grid panorama-side-grid-compact">
            {panoramaCards.map((item, index) => (
              <PanoramaMetricCard key={item.label} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EvolutionSectionCompact() {
  const [mode, setMode] = useState('accidents')
  const current = {
    accidents: {
      label: 'Acidentes',
      title: 'Acidentes registrados',
      short: 'Acidentes',
      accent: 'gold',
      note2025: 'segue alto',
      takeaway: 'Patamar ainda elevado.',
    },
    fatalAccidents: {
      label: 'Acidentes fatais',
      title: 'Acidentes fatais',
      short: 'Fatais',
      accent: 'copper',
      note2025: 'quase no mesmo nível',
      takeaway: 'Sem alívio consistente.',
    },
    deaths: {
      label: 'Vítimas fatais',
      title: 'Vítimas fatais',
      short: 'Vítimas',
      accent: 'red',
      note2025: 'permanece perto do pico',
      takeaway: 'O alerta continua.',
    },
  }[mode]
  const values = yearlyData.map((item) => item[mode])
  const delta = ((values[2] - values[0]) / values[0]) * 100
  const deltaPrefix = delta >= 0 ? '+' : ''
  const peakValue = Math.max(...values)
  const peakYear = yearlyData.find((item) => item[mode] === peakValue)?.year
  const trendLabel = values[2] > values[0] ? 'acima de 2023' : 'abaixo de 2023'
  const quickTitle = `${peakYear} marca o pico.`

  return (
    <section className="story-section evolution-section" id="evolucao">
      <div className="container">
        <SectionHeading
          eyebrow="Evolução"
          title="Os anos mudam. O alerta continua."
          text="O volume segue alto no recorte federal."
        />

        <Reveal className="evolution-panel evolution-panel-compact">
          <div className="tab-row evolution-tabs" role="tablist" aria-label="Métricas anuais">
            {Object.entries(evolutionModesCompact).map(([key, item]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-label={item.label}
                aria-selected={key === mode}
                className={`evolution-tab${key === mode ? ' is-active' : ''}`}
                onClick={() => setMode(key)}
              >
                {key === 'fatalAccidents' ? 'Fatais' : key === 'deaths' ? 'Vítimas' : 'Acidentes'}
              </button>
            ))}
          </div>

          <div className="evolution-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-chart`}
                className="evolution-chart-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="evolution-chart-head">
                  <div>
                    <span className="eyebrow">{current.title}</span>
                    <h3>{quickTitle}</h3>
                  </div>
                  <div className={`evolution-peak is-${current.accent}`}>
                    <span>Variação 2023→2025</span>
                    <strong>
                      {deltaPrefix}
                      {decimal.format(delta)}%
                    </strong>
                  </div>
                </div>

                <EvolutionTrendChart data={yearlyData} mode={mode} accent={current.accent} />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.aside
                key={`${mode}-brief`}
                className="evolution-brief"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura rápida</span>
                <strong>{quickTitle}</strong>
                <div className="evolution-brief-grid">
                  <article>
                    <span>Pico</span>
                    <strong>{peakYear}</strong>
                  </article>
                  <article>
                    <span>Tendência</span>
                    <strong>{trendLabel}</strong>
                  </article>
                  <article>
                    <span>2025</span>
                    <strong>{current.note2025}</strong>
                  </article>
                  <article>
                    <span>Variação</span>
                    <strong>
                      {deltaPrefix}
                      {decimal.format(delta)}%
                    </strong>
                  </article>
                </div>
                <p>Nível ainda elevado.</p>
              </motion.aside>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Ranking({ data, unit }) {
  const max = Math.max(...data.map((item) => item.value))

  return (
    <div className="ranking-list">
      {data.map((item, index) => (
        <article key={item.label} className="ranking-item">
          <div className="ranking-copy">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.label}</strong>
              <p>{item.note}</p>
            </div>
            <em>{item.percent ? `${decimal.format(item.value)}%` : number.format(item.value)}</em>
          </div>
          <div className="ranking-track" aria-label={`${item.label}: ${item.value} ${unit}`}>
            <span style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </article>
      ))}
    </div>
  )
}

function RiskSection() {
  const [active, setActive] = useState('causes')
  const current = riskTabs[active]

  return (
    <section className="story-section story-section-muted" id="riscos">
      <div className="container">
        <SectionHeading
          eyebrow="O que mais pesa"
          title="Ver padrões ajuda a entender onde o risco cresce."
          text="Causas, tipos, letalidade, padrões e território. Tudo em leitura curta e direta."
        />

        <Reveal className="risk-panel">
          <div className="tab-row tab-row-wrap" role="tablist" aria-label="Leituras de risco">
            {Object.entries(riskTabs).map(([key, item]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={key === active}
                className={key === active ? 'active' : ''}
                onClick={() => setActive(key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="risk-layout">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="risk-copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura ativa</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.insight}</strong>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-ranking`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.24 }}
              >
                <Ranking data={current.data} unit={current.unit} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TopViewCar({ tone }) {
  return (
    <svg className={`top-car top-car-${tone}`} viewBox="0 0 70 112" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`body-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--car-top)" />
          <stop offset="48%" stopColor="var(--car-mid)" />
          <stop offset="100%" stopColor="var(--car-bottom)" />
        </linearGradient>
        <linearGradient id={`glass-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fb4c4" />
          <stop offset="100%" stopColor="#314554" />
        </linearGradient>
      </defs>
      <path className="top-car-shadow" d="M20 5h30c6 0 11 4 12 10l5 25v32l-5 25c-1 6-6 10-12 10H20c-6 0-11-4-12-10L3 72V40l5-25C9 9 14 5 20 5Z" />
      <path className="top-car-body" fill={`url(#body-${tone})`} d="M20 4h30c6 0 10 4 12 10l5 25v34l-5 25c-2 6-6 10-12 10H20c-6 0-10-4-12-10L3 73V39l5-25C10 8 14 4 20 4Z" />
      <path className="top-car-belt" d="M20 10h30c4 0 7 3 8 7l4 22v34l-4 22c-1 4-4 7-8 7H20c-4 0-7-3-8-7L8 73V39l4-22c1-4 4-7 8-7Z" />
      <path className="top-car-hood" d="M19 13h32c3 0 5 2 6 5l3 16H10l3-16c1-3 3-5 6-5Z" />
      <path className="top-car-trunk" d="M10 78h50l-3 16c-1 3-3 5-6 5H19c-3 0-5-2-6-5l-3-16Z" />
      <path className="top-car-cabin" d="M20 36h30l5 14c1 2-1 4-3 4H18c-2 0-4-2-3-4l5-14Z" fill={`url(#glass-${tone})`} />
      <path className="top-car-rear-glass" d="M18 59h34c2 0 4 2 3 4l-5 14H20l-5-14c-1-2 1-4 3-4Z" fill={`url(#glass-${tone})`} />
      <path className="top-car-roof" d="M23 50h24c3 0 5 2 5 5v7c0 3-2 5-5 5H23c-3 0-5-2-5-5v-7c0-3 2-5 5-5Z" />
      <rect className="top-car-wheel" x="3" y="24" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="61" y="24" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="3" y="70" width="6" height="18" rx="3" />
      <rect className="top-car-wheel" x="61" y="70" width="6" height="18" rx="3" />
      <path className="top-car-contour" d="M17 30h36M17 82h36M13 40c5 4 12 6 22 6s17-2 22-6M13 72c5-4 12-6 22-6s17 2 22 6" />
      <rect className="top-car-mirror" x="0" y="43" width="7" height="10" rx="3" />
      <rect className="top-car-mirror" x="63" y="43" width="7" height="10" rx="3" />
      <path className="top-car-headlight" d="M17 12h13c2 0 3 1 3 3v1c0 2-1 3-3 3l-13 2c-2 0-3-1-3-3v-1c0-3 1-5 3-5Z" />
      <path className="top-car-headlight" d="M40 12h13c2 0 3 2 3 5v1c0 2-1 3-3 3l-13-2c-2 0-3-1-3-3v-1c0-2 1-3 3-3Z" />
      <path className="top-car-taillight" d="M17 91l13 2c2 0 3 1 3 3v1c0 2-1 3-3 3H17c-2 0-3-2-3-5v-1c0-2 1-3 3-3Z" />
      <path className="top-car-taillight" d="M53 91c2 0 3 1 3 3v1c0 3-1 5-3 5H40c-2 0-3-1-3-3v-1c0-2 1-3 3-3l13-2Z" />
    </svg>
  )
}

function CollisionSection() {
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(0)
  const current = storyStepsCompact[active]
  const sceneState = collisionSceneStates[current.id]

  useEffect(() => {
    if (!started || active >= storyStepsCompact.length - 1) return undefined
    const timer = setTimeout(() => setActive((value) => value + 1), COLLISION_STEP_DURATION)
    return () => clearTimeout(timer)
  }, [active, started])

  return (
    <section className="story-section story-section-muted" id="colisao">
      <div className="container">
        <SectionHeading
          eyebrow="Experiência narrativa"
          title="Nem toda vítima errou."
          text="Uma cena curta para lembrar algo simples: a imprudência de alguém pode atingir quem estava no caminho certo."
        />

        <Reveal className="collision-layout">
          <motion.div
            className="drive-scene drive-scene-premium"
            data-started={started}
            data-step={current.id}
            data-impact={current.id === '05' ? 'aftershock' : current.id === '04' ? 'impact' : 'none'}
            animate={
              current.id === '05'
                ? { x: [0, -3, 4, -2, 1, 0], y: [0, 1, -2, 1, 0, 0] }
                : { x: 0, y: 0 }
            }
            transition={
              current.id === '05'
                ? { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
            }
            style={{
              '--scene-focus': sceneState.focus,
              '--scene-trail': sceneState.trail,
              '--scene-invasion': sceneState.invasion,
              '--scene-impact': sceneState.impact,
            }}
          >
            <div className="scene-road" />
            <div className="scene-divider" />
            <div className="scene-glow scene-glow-a" />
            <div className="scene-glow scene-glow-b" />
            <div className="scene-focus" />
            <div className="scene-risk-trail" />
            <div className="scene-invasion" />
            <div className="scene-impact scene-impact-premium">
              <span className="impact-core" />
              <span className="impact-wave" />
              <span className="impact-wave impact-wave-b" />
            </div>
            <div className="lane-tag lane-tag-left">Fluxo oposto</div>
            <div className="lane-tag lane-tag-right">Sua faixa</div>
            <motion.div
              className="car car-user"
              animate={started ? sceneState.user : collisionSceneStates['01'].user}
              transition={{ duration: current.id === '04' ? 0.42 : 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              <TopViewCar tone="user" />
            </motion.div>
            <motion.div
              className="car car-lead"
              animate={started ? sceneState.lead : collisionSceneStates['01'].lead}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <TopViewCar tone="lead" />
            </motion.div>
            <motion.div
              className="car car-risk"
              animate={started ? sceneState.risk : collisionSceneStates['01'].risk}
              transition={{ duration: current.id === '04' ? 0.38 : 0.64, ease: [0.22, 1, 0.36, 1] }}
            >
              <TopViewCar tone="risk" />
            </motion.div>

            {!started ? (
              <button type="button" className="scene-start" onClick={() => setStarted(true)}>
                <Play size={18} />
                Iniciar cena
              </button>
            ) : null}

            <div className="scene-caption">
              <span>Etapa {current.id}</span>
              <strong>{current.title}</strong>
            </div>
          </motion.div>

          <div className="collision-copy">
            <div className="story-progress" aria-label={`Etapa ${active + 1} de ${storyStepsCompact.length}`}>
              <span style={{ width: `${((active + 1) / storyStepsCompact.length) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                className="story-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <span className="eyebrow">Leitura da cena</span>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <strong>{current.note}</strong>
              </motion.article>
            </AnimatePresence>

            <div className="story-step-buttons">
              {storyStepsCompact.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? 'active' : ''}
                  aria-label={`${item.id} ${item.title}`}
                  title={`${item.id} ${item.title}`}
                  onClick={() => {
                    setStarted(true)
                    setActive(index)
                  }}
                >
                  <span>{item.id}</span>
                  <em className="story-step-label">{item.title}</em>
                </button>
              ))}
            </div>

            <div className="story-cta">
              <button
                type="button"
                className="button button-secondary"
                disabled={active === 0}
                onClick={() => setActive((value) => Math.max(0, value - 1))}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              <button
                type="button"
                className="button button-primary"
                disabled={active === storyStepsCompact.length - 1}
                onClick={() => {
                  setStarted(true)
                  setActive((value) => Math.min(storyStepsCompact.length - 1, value + 1))
                }}
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            </div>

            <div className={active === storyStepsCompact.length - 1 ? 'manifesto manifesto-final' : 'manifesto'}>
              <p>Uma ultrapassagem indevida pode atingir quem fez tudo certo.</p>
              <strong>{active === storyStepsCompact.length - 1 ? 'NÃO SEJA O IMPRUDENTE.' : 'Dirigir com prudência protege mais do que a sua rota.'}</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="story-section" id="fechamento">
      <div className="container">
        <Reveal className="closing-panel">
          <span className="eyebrow">Fechamento</span>
          <h2>Dirija com mais prudência.</h2>
          <p>Nas BRs, um erro pode mudar várias vidas. Não seja o imprudente.</p>

          <div className="closing-statements">
            <article>
              <strong>Em casa, sempre tem alguém esperando.</strong>
              <span>Voltar em segurança também é um ato de cuidado.</span>
            </article>
            <article>
              <strong>Não é todo o trânsito brasileiro.</strong>
              <span>É apenas o recorte das BRs monitoradas pela PRF. E já é grave o bastante.</span>
            </article>
          </div>

          <details className="methodology">
            <summary>
              <MapPinned size={16} />
              Fonte e recorte
            </summary>
            <div className="methodology-content">
              <p>Fonte: Polícia Rodoviária Federal.</p>
              <p>Recorte: acidentes em rodovias federais brasileiras entre 2023 e 2025.</p>
              <p>Este site não representa todo o trânsito do Brasil.</p>
              <p>A narrativa visual resume padrões observados nos dados oficiais.</p>
            </div>
          </details>

          <a href="#abertura" className="button button-primary closing-button">
            Voltar ao início
            <ArrowUp size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const ids = useMemo(() => journey.map((item) => item.id), [])
  const active = useActiveSection(ids)
  const progress = usePageProgress()

  return (
    <div className="site-shell">
      <TopProgress active={active} progress={progress} />
      <SideRail active={active} />
      <JourneyControls active={active} />

      <HeroSection />

      <main>
        <RhythmSection />
        <PanoramaSectionCompact />
        <EvolutionSectionCompact />
        <RiskSection />
        <CollisionSection />
        <ClosingSection />
      </main>
    </div>
  )
}












