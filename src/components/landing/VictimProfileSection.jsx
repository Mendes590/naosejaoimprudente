import { SectionBlock } from './SectionBlock'
import { formatMetric } from '../../utils/formatters'

function ProfileCard({ title, items }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <span className="text-sm text-[var(--color-soft)]">{item.label}</span>
            <strong className="text-white">{typeof item.value === 'number' ? formatMetric(item.value, item.format) : item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export function VictimProfileSection({ data }) {
  return (
    <SectionBlock
      eyebrow="Perfil das vítimas fatais"
      title="Motociclistas, ocupantes de automóveis e condutores aparecem com força no retrato final."
      description="O objetivo não é rotular pessoas, mas mostrar padrões recorrentes no recorte da PRF para reforçar a urgência de atenção, prudência e direção responsável."
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <ProfileCard title="Tipo de veículo" items={data.vehicleType} />
        <ProfileCard title="Tipo de envolvido" items={data.involvement} />
        <ProfileCard title="Sexo" items={data.gender} />
        <ProfileCard title="Faixa etária" items={data.age} />
      </div>
    </SectionBlock>
  )
}
