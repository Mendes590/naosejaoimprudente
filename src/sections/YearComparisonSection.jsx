import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'
import { SectionIntro } from '../components/ui/SectionIntro'
import { formatNumber } from '../utils/formatters'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-[#0c1016]/92 p-4 text-sm shadow-2xl backdrop-blur">
      <p className="font-semibold text-white">{label}</p>
      <div className="mt-3 space-y-2">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-8">
            <span style={{ color: entry.color }}>{entry.name}</span>
            <strong className="text-white">{formatNumber(entry.value)}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export function YearComparisonSection({ data, callouts }) {
  return (
    <section id="evolucao" className="section-stack">
      <SectionIntro
        eyebrow="Evolução temporal"
        title="2024 agravou o quadro. 2025 recuou pouco e manteve a urgência."
        description="A linha do tempo abaixo compara acidentes totais, acidentes fatais e vítimas fatais registradas pela PRF nas rodovias federais brasileiras. Houve pico em 2024 e manutenção do problema em 2025."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_22rem]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-panel h-[28rem] p-4 sm:p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 24, right: 20, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.52)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.52)" tickLine={false} axisLine={false} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="acidentes" name="Acidentes totais" stroke="#f7c66d" strokeWidth={3.5} dot={{ r: 5 }} activeDot={{ r: 7 }}>
                <LabelList dataKey="acidentes" position="top" formatter={formatNumber} fill="#f2ddd0" fontSize={12} />
              </Line>
              <Line type="monotone" dataKey="fatais" name="Acidentes fatais" stroke="#ff8f5c" strokeWidth={3.2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="vitimas" name="Vítimas fatais" stroke="#ff5f5f" strokeWidth={3.2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="space-y-4">
          {callouts.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="story-card"
            >
              <span className="story-index">0{index + 1}</span>
              <p className="text-sm leading-7 text-[var(--color-soft)]">{item}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="story-card bg-[linear-gradient(180deg,rgba(255,107,75,0.16),rgba(255,255,255,0.04))]"
          >
            <p className="section-eyebrow">Leitura correta</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-soft)]">
              Este gráfico resume apenas ocorrências registradas nas BRs federais pela PRF. Não descreve todo o sistema viário brasileiro.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
