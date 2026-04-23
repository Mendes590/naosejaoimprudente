import { SectionBlock } from './SectionBlock'
import { formatMetric } from '../../utils/formatters'

function RankingColumn({ title, items }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-[var(--color-highlight)]">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[var(--color-muted)]">{item.detail}</p>
              </div>
            </div>
            <strong className="text-white">{formatMetric(item.value, item.format)}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export function GeographySection({ data }) {
  return (
    <SectionBlock
      eyebrow="Geografia do risco"
      title="Alguns trechos e estados concentram perdas em volume ou em letalidade proporcional."
      description="Sem complicar o mapa nesta etapa, a leitura mais útil é o ranking das UFs e BRs que mais concentram vítimas fatais no recorte PRF."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr_1fr]">
        <RankingColumn title="UFs com mais vítimas fatais" items={data.volumeUFs} />

        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,122,73,0.14),rgba(255,255,255,0.04))] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-highlight)]">Rodovias federais brasileiras</p>
          <h3 className="mt-3 text-2xl font-bold text-white">O recorte é nacional, mas o problema se espalha por corredores específicos.</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--color-soft)]">
            BR-116 e BR-101 lideram em vítimas fatais no consolidado. Entre as UFs, Minas Gerais, Bahia e Paraná aparecem
            no topo em volume. Maranhão e Pará se destacam pela letalidade proporcional.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {['BR-116', 'BR-101', 'MG', 'BA', 'PR', 'MA'].map((tag) => (
              <div key={tag} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-4 text-center text-sm font-semibold text-white">
                {tag}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[var(--color-soft)]">
            Leitura importante: estes rankings são das BRs monitoradas pela PRF. Não são rankings de todo o trânsito do Brasil.
          </div>
        </div>

        <div className="space-y-4">
          <RankingColumn title="UFs mais letais proporcionalmente" items={data.lethalUFs} />
          <RankingColumn title="BRs com mais vítimas fatais" items={data.roads} />
        </div>
      </div>
    </SectionBlock>
  )
}
