import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { AnimatedCount } from '../ui/AnimatedCount'
import { SegmentedMetricTabs } from '../ui/SegmentedMetricTabs'
import { dailyMetrics } from '../../data/siteContent'

function buildEvents(intervalMinutes) {
  const minutesPerDay = 24 * 60
  const count = Math.floor(minutesPerDay / intervalMinutes)

  return Array.from({ length: count }, (_, index) => {
    const minute = index * intervalMinutes
    return {
      id: `${intervalMinutes}-${index}`,
      left: `${(minute / minutesPerDay) * 100}%`,
      size: 0.58 + ((index % 5) * 0.08),
      delay: (index % 9) * 0.11,
    }
  })
}

export function DayOnBRsSection() {
  const [activeMetricId, setActiveMetricId] = useState(dailyMetrics[0].id)
  const reduceMotion = useReducedMotion()
  const activeMetric = dailyMetrics.find((item) => item.id === activeMetricId) ?? dailyMetrics[0]
  const events = useMemo(() => buildEvents(activeMetric.intervalMinutes), [activeMetric.intervalMinutes])

  return (
    <section className="story-section story-section-soft" id="ritmo">
      <div className="container">
        <SectionHeading
          eyebrow="Um dia nas BRs"
          title="Em um dia comum, o risco volta o tempo todo."
          text="Nas BRs observadas pela PRF, a recorrência atravessa o dia inteiro. Não depende de um momento excepcional."
        />

        <div className="section-chip-row">
          <span className="section-chip">Somente BRs e rodovias federais</span>
        </div>

        <div className="day-layout">
          <Reveal className="day-copy">
            <SegmentedMetricTabs
              items={dailyMetrics}
              activeId={activeMetric.id}
              onChange={setActiveMetricId}
              ariaLabel="Métricas do ritmo diário"
            />

            <div className={`day-hero-card accent-${activeMetric.accent}`}>
              <div className="day-hero-head">
                <span className="micro-label">{activeMetric.label}</span>
                <span className="day-hero-dot" aria-hidden="true" />
              </div>
              <strong className="day-hero-number">
                <AnimatedCount value={activeMetric.value} />
              </strong>
              <div className="day-hero-interval">
                <Clock3 size={16} />
                <span>{activeMetric.interval}</span>
              </div>
              <p>{activeMetric.kicker}</p>
            </div>

            <div className="day-support-card">
              <strong>{activeMetric.support}</strong>
              <span>{activeMetric.closing}</span>
            </div>
          </Reveal>

          <Reveal className={`day-timeline-card accent-${activeMetric.accent}`} delay={0.08}>
            <div className="timeline-head">
              <div>
                <span className="micro-label">Ritmo distribuído em 24 horas</span>
                <h3>{activeMetric.interval}</h3>
              </div>
              <p>{activeMetric.label}</p>
            </div>

            <div className="timeline-stage" aria-label={`Timeline de 24 horas para ${activeMetric.label}`}>
              <div className="timeline-grid" aria-hidden="true">
                {[0, 6, 12, 18, 24].map((hour) => (
                  <span key={hour} style={{ left: `${(hour / 24) * 100}%` }} />
                ))}
              </div>

              <div className="timeline-axis" aria-hidden="true" />

              <div className="timeline-events" aria-hidden="true">
                {events.map((event) => (
                  <motion.span
                    key={event.id}
                    className="timeline-event"
                    style={{ left: event.left, '--event-scale': event.size }}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.35, 1, 0.45],
                            scale: [0.8, event.size, 0.92],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 2.6,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            delay: event.delay,
                            ease: 'easeInOut',
                          }
                    }
                  />
                ))}
              </div>

              {!reduceMotion ? (
                <motion.span
                  className="timeline-cursor"
                  initial={{ left: '0%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
              ) : null}

              <div className="timeline-labels" aria-hidden="true">
                <span>00h</span>
                <span>06h</span>
                <span>12h</span>
                <span>18h</span>
                <span>24h</span>
              </div>
            </div>

            <div className="timeline-footer">
              <p>{activeMetric.support}</p>
              <strong>{activeMetric.closing}</strong>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
