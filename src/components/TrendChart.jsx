import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { formatNumber } from '../utils/formatters'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      <span>{formatNumber(payload[0].value)}</span>
      <p>Ocorrências registradas pela PRF em rodovias federais brasileiras.</p>
    </div>
  )
}

export function TrendChart({ tab }) {
  return (
    <div className="trend-chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={tab.data} margin={{ top: 18, right: 10, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`trend-${tab.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tab.accent} stopOpacity={0.48} />
              <stop offset="100%" stopColor={tab.accent} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.07)" />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="year"
            tick={{ fill: 'rgba(244, 240, 234, 0.78)', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fill: 'rgba(244, 240, 234, 0.48)', fontSize: 12 }}
            width={72}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: tab.accent, strokeOpacity: 0.28 }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={tab.accent}
            fill={`url(#trend-${tab.id})`}
            strokeWidth={3}
            dot={{ r: 4, fill: tab.accent, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#fff', stroke: tab.accent, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
