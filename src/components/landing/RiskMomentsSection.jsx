import { Clock3, MoonStar, Route, Sunset, TimerReset } from 'lucide-react'
import { SectionBlock } from './SectionBlock'

const icons = [Clock3, TimerReset, MoonStar, Sunset, Route]

export function RiskMomentsSection({ data }) {
  return (
    <SectionBlock
      eyebrow="Quando o risco aumenta"
      title="Dia, horário, faixa horária e tipo de pista mudam o tamanho do perigo."
      description="O padrão é claro nas BRs brasileiras: domingo pesa, 19h marca o pico, noite concentra mais fatalidades, madrugada é mais letal e pista simples amplia o desfecho fatal."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        {data.highlights.map((item, index) => {
          const Icon = icons[index % icons.length]

          return (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-[var(--color-soft)]">{item.label}</p>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-[var(--color-highlight)]">
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-5 text-2xl font-bold text-white">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{item.note}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-semibold text-white">Dias mais críticos</p>
          <div className="mt-4 space-y-3 text-sm text-[var(--color-soft)]">
            {data.days.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                <span>{item.label}</span>
                <strong className="text-white">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 lg:col-span-2">
          <p className="text-sm font-semibold text-white">Leitura rápida</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {data.periods.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
                <p className="text-sm text-[var(--color-muted)]">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionBlock>
  )
}
