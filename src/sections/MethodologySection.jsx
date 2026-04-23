import { SectionIntro } from '../components/SectionIntro'

export function MethodologySection({ content }) {
  return (
    <section className="content-section">
      <div className="methodology-panel panel">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />

        <div className="methodology-grid">
          {content.items.map((item) => (
            <article key={item} className="methodology-item">
              {item}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
