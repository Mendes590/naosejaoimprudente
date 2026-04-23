import { motion } from 'framer-motion'
import { Clock3, MoonStar, Route, SunMoon } from 'lucide-react'
import { SectionIntro } from '../components/ui/SectionIntro'
import { formatNumber, formatPercent } from '../utils/formatters'

const icons = [Clock3, MoonStar, SunMoon, Route]

export function TimeRiskSection({ timeRisk }) {
  const maxRate = Math.max(...timeRisk.roadTypes.map((item) => item.rate))

  return (
    <section id="quando" className="section-stack">
      <SectionIntro
        eyebrow="Quando o risco aumenta"
        title="Domingo pesa. A noite mata mais. A madrugada fica ainda mais letal."
        description="As BRs federais brasileiras revelam um padrão importante: tempo, contexto e tipo de pista mudam o tamanho do perigo. Pista simples, por exemplo, concentra muito mais mortes e taxa fatal do que pista dupla."
        aside="A leitura abaixo continua restrita ao recorte da PRF nas rodovias federais brasileiras. Não é uma descrição total do trânsito nacional."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {timeRisk.cards.map((item, index) => {
          const Icon = icons[index % icons.length]

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              className="metric-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--color-muted)]">{item.title}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">{item.value}</p>
                </div>
                <div className="metric-icon">
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-soft)]">{item.note}</p>
            </motion.article>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="glass-panel p-6">
          <div className="mb-5">
            <p className="section-eyebrow">Dia x período</p>
            <h3 className="text-2xl font-semibold text-white">Mapa de criticidade observada</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-soft)]">
              Escala visual de criticidade observada nas ocorrências analisadas. Não é chance individual exata.
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-[5rem_repeat(4,minmax(0,1fr))] gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <span />
              {timeRisk.periods.map((period) => (
                <span key={period}>{period}</span>
              ))}
            </div>
            {timeRisk.weeklyHeat.map((row) => (
              <div key={row.day} className="grid grid-cols-[5rem_repeat(4,minmax(0,1fr))] gap-2">
                <span className="flex items-center text-sm text-[var(--color-soft)]">{row.day}</span>
                {row.levels.map((level, index) => (
                  <div
                    key={`${row.day}-${timeRisk.periods[index]}`}
                    className="h-14 rounded-2xl border border-white/8"
                    style={{
                      background: `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), rgba(255, 107, 75, ${0.12 + level * 0.72})`,
                      boxShadow: level > 0.8 ? '0 0 24px rgba(255,107,75,0.22)' : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-5">
            <p className="section-eyebrow">Tipo de pista</p>
            <h3 className="text-2xl font-semibold text-white">Pista simples é muito mais letal</h3>
          </div>

          <div className="space-y-5">
            {timeRisk.roadTypes.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-[var(--color-muted)]">{formatNumber(item.deaths)} vítimas fatais</p>
                  </div>
                  <strong className="text-sm text-white">{formatPercent(item.rate)}</strong>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,195,99,0.95),rgba(255,107,75,0.95))]"
                    style={{ width: `${(item.rate / maxRate) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
