import { motion } from 'framer-motion'
import { UserRound, CarFront, Bike, User } from 'lucide-react'
import { SectionIntro } from '../components/SectionIntro'

const icons = [Bike, CarFront, User, UserRound, UserRound]

export function VictimProfileSection({ content }) {
  return (
    <section className="content-section">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="victim-layout">
        <div className="profile-grid">
          {content.cards.map((card, index) => {
            const Icon = icons[index % icons.length]

            return (
              <motion.article
                key={card.label}
                className="profile-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="profile-card-top">
                  <span>{card.label}</span>
                  <Icon size={18} />
                </div>
                <strong>{card.value}</strong>
                <p>{card.detail}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="victim-notes">
          {content.notes.map((note, index) => (
            <motion.article
              key={note}
              className="victim-note-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
            >
              {note}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
