import { SectionHeading } from '../components/SectionHeading'
import { StatCard } from '../components/StatCard'
import { Reveal } from '../components/Reveal'

export function SummarySection({ content }) {
  return (
    <section id="panorama" className="content-section editorial-section">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="editorial-stats-grid">
        {content.cards.map((card, index) => (
          <StatCard key={card.label} card={card} delay={index * 0.05} />
        ))}
      </div>

      <Reveal className="editorial-footnotes" delay={0.08}>
        {content.footnotes.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </Reveal>
    </section>
  )
}
