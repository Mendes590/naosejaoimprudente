import { useEffect, useMemo, useState } from 'react'
import brazil from '@svg-maps/brazil'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { AnimatedCount } from '../ui/AnimatedCount'
import { SegmentedMetricTabs } from '../ui/SegmentedMetricTabs'
import { number, stateData, stateMetrics, stateNames } from '../../data/siteContent'

function getTopStates(metricKey) {
  return Object.entries(stateData)
    .map(([uf, metrics]) => ({
      uf,
      name: stateNames[uf],
      value: metrics[metricKey],
    }))
    .sort((a, b) => b.value - a.value)
}

export function BrazilMapSection() {
  const [metricKey, setMetricKey] = useState('fatalVictims')
  const ranking = useMemo(() => getTopStates(metricKey), [metricKey])
  const [selectedState, setSelectedState] = useState(ranking[0]?.uf ?? 'MG')
  const [hoveredState, setHoveredState] = useState(null)

  useEffect(() => {
    setSelectedState(ranking[0]?.uf ?? 'MG')
  }, [metricKey, ranking])

  const activeMetric = stateMetrics[metricKey]
  const activeUf = hoveredState ?? selectedState
  const activeState = ranking.find((item) => item.uf === activeUf) ?? ranking[0]
  const maxValue = ranking[0]?.value ?? 1
  const items = Object.values(stateMetrics).map((metric) => ({ id: metric.id, tabLabel: metric.label }))

  return (
    <section className="story-section" id="mapa">
      <div className="container">
        <SectionHeading
          eyebrow="Mapa do risco"
          title="O impacto não fica abstrato. Ele ocupa território."
          text="Mesmo sem representar todo o trânsito do país, o recorte das rodovias federais já desenha áreas críticas."
        />

        <div className="section-chip-row">
          <span className="section-chip">BRs brasileiras</span>
        </div>

        <div className="map-layout">
          <Reveal className="map-shell">
            <SegmentedMetricTabs
              items={items}
              activeId={metricKey}
              onChange={setMetricKey}
              ariaLabel="Métrica do mapa"
            />

            <div className="map-card">
              <svg className="brazil-map" viewBox={brazil.viewBox} role="img" aria-label="Mapa do Brasil por estado">
                {brazil.locations.map((location) => {
                  const uf = location.id.toUpperCase()
                  const value = stateData[uf]?.[metricKey] ?? 0
                  const intensity = value / maxValue
                  const isActive = activeUf === uf

                  return (
                    <g
                      key={location.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${stateNames[uf]}: ${number.format(value)} ${activeMetric.unit}`}
                      onMouseEnter={() => setHoveredState(uf)}
                      onMouseLeave={() => setHoveredState(null)}
                      onFocus={() => setHoveredState(uf)}
                      onBlur={() => setHoveredState(null)}
                      onClick={() => setSelectedState(uf)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedState(uf)
                        }
                      }}
                    >
                      <path
                        d={location.path}
                        className={isActive ? 'active' : ''}
                        style={{
                          '--fill-alpha': 0.16 + intensity * 0.8,
                          '--stroke-alpha': isActive ? 0.85 : 0.18 + intensity * 0.42,
                        }}
                      />
                    </g>
                  )
                })}
              </svg>

              <motion.div
                key={`${metricKey}-${activeState?.uf ?? 'none'}`}
                className="map-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <span className="micro-label">{activeMetric.label}</span>
                <strong>
                  {activeState?.uf} · {activeState?.name}
                </strong>
                <div className="map-tooltip-value">
                  <AnimatedCount value={activeState?.value ?? 0} />
                  <span>{activeMetric.unit}</span>
                </div>
                <p>{activeMetric.note}</p>
              </motion.div>
            </div>
          </Reveal>

          <Reveal className="map-sidebar" delay={0.08}>
            <div className="map-sidebar-card">
              <span className="micro-label">Estados com maior concentração</span>
              <h3>Quando o mapa acende, o problema deixa de parecer distante.</h3>
              <p>{activeMetric.note}</p>
            </div>

            <div className="ranking-list">
              {ranking.slice(0, 5).map((item, index) => (
                <button
                  key={item.uf}
                  type="button"
                  className={`ranking-item ${activeUf === item.uf ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredState(item.uf)}
                  onMouseLeave={() => setHoveredState(null)}
                  onFocus={() => setHoveredState(item.uf)}
                  onBlur={() => setHoveredState(null)}
                  onClick={() => setSelectedState(item.uf)}
                >
                  <span className="ranking-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="ranking-copy">
                    <strong>
                      {item.uf} · {item.name}
                    </strong>
                    <span>
                      {number.format(item.value)} {activeMetric.unit}
                    </span>
                  </div>
                  <span
                    className="ranking-bar"
                    aria-hidden="true"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
