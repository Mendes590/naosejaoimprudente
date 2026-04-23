import { useState } from 'react'
import { SectionIntro } from '../components/SectionIntro'
import { ComparisonBars } from '../components/ComparisonBars'

export function FrequencyVsLethalitySection({ content }) {
  const [activeSection, setActiveSection] = useState(content.sections[0].id)
  const current = content.sections.find((section) => section.id === activeSection)

  return (
    <section className="content-section" id="nao-parece-mas-mata">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="comparison-shell panel">
        <div className="comparison-top">
          <div className="segmented-control">
            {content.sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={section.id === current.id ? 'segment-active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          <p className="comparison-summary">{current.takeaway}</p>
        </div>

        <div className="comparison-intro-card">
          <span className="mini-label">Leitura central</span>
          <p>{current.intro}</p>
        </div>

        <div className="comparison-grid">
          <ComparisonBars
            title={current.frequentTitle}
            items={current.frequent}
            unit={current.frequentUnit}
            tone="soft"
          />
          <ComparisonBars
            title={current.lethalTitle}
            items={current.lethal}
            unit={current.lethalUnit}
            tone="hot"
            format="percent"
          />
        </div>

        <div className="spotlight-card">
          <span className="mini-label">O ponto que importa</span>
          <p>{current.takeaway}</p>
        </div>
      </div>
    </section>
  )
}
