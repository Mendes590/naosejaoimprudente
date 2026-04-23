import { SectionBlock } from './SectionBlock'
import { formatMetric } from '../../utils/formatters'

function RankedList({ title, items, tone = 'amber' }) {
  const barClass =
    tone === 'red'
      ? 'from-red-500/80 to-red-400/15'
      : tone === 'orange'
        ? 'from-orange-500/80 to-orange-300/15'
        : 'from-amber-400/80 to-amber-200/15'

  const maxValue = Math.max(...items.map((item) => item.value))

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const width = `${(item.value / maxValue) * 100}%`

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-[75%] text-sm leading-6 text-[var(--color-soft)]">{item.label}</p>
                <span className="text-sm font-semibold text-white">{formatMetric(item.value, item.format)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <div className={`h-full rounded-full bg-gradient-to-r ${barClass}`} style={{ width }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RiskComparisonSection({ data }) {
  return (
    <SectionBlock
      eyebrow="Frequência x letalidade"
      title="Nem sempre o que mais acontece é o que mais mata."
      description={data.intro}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <RankedList title="Causas mais frequentes" items={data.causesFrequent} tone="amber" />
        <RankedList title="Causas mais letais" items={data.causesLethal} tone="red" />
        <RankedList title="Tipos mais comuns" items={data.typesFrequent} tone="orange" />
        <RankedList title="Tipos mais letais" items={data.typesLethal} tone="red" />
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        {data.callouts.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-[var(--color-soft)]">
            {item}
          </div>
        ))}
      </div>
    </SectionBlock>
  )
}
