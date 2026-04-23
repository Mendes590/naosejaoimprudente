import { SectionIntro } from '../components/SectionIntro'
import { RankingList } from '../components/RankingList'

export function GeographySection({ content }) {
  return (
    <section className="content-section">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="geography-layout">
        <div className="spotlight-card geography-spotlight">
          <span className="mini-label">Corredores de maior peso</span>
          <p>{content.spotlight}</p>
        </div>

        <div className="ranking-grid">
          <RankingList title="UFs com mais vítimas fatais" items={content.states} />
          <RankingList title="BRs com mais vítimas fatais" items={content.roads} />
        </div>
      </div>
    </section>
  )
}
