import { motion } from 'framer-motion'
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionIntro } from '../components/SectionIntro'
import { formatNumber } from '../utils/formatters'

function EvolutionTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-title">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="chart-tooltip-row">
          <span>{entry.name}</span>
          <strong>{formatNumber(entry.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export function YearEvolutionSection({ yearly, highlights }) {
  return (
    <section id="evolucao" className="content-section">
      <div className="section-grid">
        <SectionIntro
          eyebrow="Evolução 2023-2025"
          title="O volume segue alto. A gravidade também."
          text="A leitura abaixo mostra o comportamento anual de acidentes totais, acidentes fatais e vítimas fatais nas rodovias federais registradas pela PRF."
        />

        <motion.div
          className="highlight-stack"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {highlights.map((item) => (
            <div key={item} className="highlight-card">
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="chart-card-head">
          <div>
            <p className="chart-card-title">Acidentes totais, acidentes fatais e vítimas fatais</p>
            <p className="chart-card-note">
              Fonte: PRF | Recorte: rodovias federais brasileiras (BRs) | Período: 2023 a 2025
            </p>
          </div>
          <p className="chart-card-summary">
            O eixo da esquerda mostra acidentes totais. O da direita mostra acidentes fatais e vítimas fatais.
          </p>
        </div>

        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={yearly} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                stroke="rgba(239, 234, 224, 0.62)"
                tickMargin={12}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                stroke="rgba(239, 234, 224, 0.42)"
                width={70}
                tickFormatter={(value) => `${Math.round(value / 1000)} mil`}
                domain={[65000, 75000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                stroke="rgba(239, 234, 224, 0.42)"
                width={62}
                tickFormatter={(value) => `${Math.round(value / 1000)} mil`}
                domain={[4500, 6500]}
              />
              <Tooltip content={<EvolutionTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: 12 }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="acidentes"
                name="Acidentes totais"
                stroke="#ff7a59"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ff7a59', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="fatais"
                name="Acidentes fatais"
                stroke="#ffb36b"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ffb36b', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="vitimas"
                name="Vítimas fatais"
                stroke="#ffe2b1"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ffe2b1', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  )
}
