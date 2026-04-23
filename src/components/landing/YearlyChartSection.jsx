import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionBlock } from './SectionBlock'
import { formatNumber } from '../../utils/formatters'

function YearTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f1218]/95 p-4 shadow-2xl backdrop-blur">
      <p className="text-sm font-semibold text-white">{label}</p>
      <div className="mt-3 space-y-2">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6 text-sm">
            <span style={{ color: entry.color }}>{entry.name}</span>
            <span className="font-semibold text-white">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function YearlyChartSection({ data }) {
  return (
    <SectionBlock
      eyebrow="Evolução por ano"
      title="2024 foi o pior ano do recorte, e 2025 manteve o problema em patamar muito alto."
      description="O gráfico compara acidentes totais, acidentes fatais e vítimas fatais nas rodovias federais brasileiras registradas pela PRF."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="h-[360px] rounded-[1.75rem] border border-white/10 bg-black/20 p-4 sm:p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 8, right: 8, top: 16, bottom: 4 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="year" stroke="rgba(237,230,220,0.62)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(237,230,220,0.62)" tickLine={false} axisLine={false} tickFormatter={formatNumber} />
              <Tooltip content={<YearTooltip />} />
              <Legend wrapperStyle={{ color: '#f7f1e6' }} />
              <Line
                type="monotone"
                dataKey="acidentes"
                name="Acidentes totais"
                stroke="#f6c16a"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="fatais"
                name="Acidentes fatais"
                stroke="#ff875c"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="vitimas"
                name="Vítimas fatais"
                stroke="#ff5f5f"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.year} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-highlight)]">{item.year}</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--color-soft)]">
                <div className="flex items-center justify-between gap-4">
                  <span>Acidentes totais</span>
                  <strong className="text-white">{formatNumber(item.acidentes)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Acidentes fatais</span>
                  <strong className="text-white">{formatNumber(item.fatais)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Vítimas fatais</span>
                  <strong className="text-white">{formatNumber(item.vitimas)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  )
}
