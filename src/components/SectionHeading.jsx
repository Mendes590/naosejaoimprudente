import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <Reveal className={`editorial-section-heading editorial-section-heading-${align}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="editorial-section-title">{title}</h2>
      {text ? <p className="editorial-section-text">{text}</p> : null}
    </Reveal>
  )
}
