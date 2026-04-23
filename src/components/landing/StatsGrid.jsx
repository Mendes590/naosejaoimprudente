import { AlertTriangle, Gauge, HeartPulse, ShieldAlert, TriangleAlert, Waves } from 'lucide-react'
import { SectionBlock } from './SectionBlock'
import { AnimatedMetric } from './AnimatedMetric'

const icons = [TriangleAlert, ShieldAlert, AlertTriangle, Waves, HeartPulse, Gauge]

export function StatsGrid({ items }) {
  return (
    <SectionBlock
      eyebrow="Indicadores principais"
      title="Os números mostram frequência alta e consequência grave nas BRs."
      description="Os cartões abaixo concentram o essencial para esta primeira versão: volume, gravidade e a proporção de acidentes fatais no recorte PRF."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length]

          return (
            <div
              key={item.title}
              className="group rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-soft)]">{item.title}</p>
                  <AnimatedMetric value={item.value} format={item.format} className="mt-3 block text-4xl font-bold text-white" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-[var(--color-highlight)]">
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{item.description}</p>
            </div>
          )
        })}
      </div>
    </SectionBlock>
  )
}
