import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SectionIntro } from '../components/SectionIntro'
import { TrendChart } from '../components/TrendChart'

export function TrendSection({ content }) {
  const [activeTab, setActiveTab] = useState(content.tabs[2].id)
  const currentTab = content.tabs.find((tab) => tab.id === activeTab)

  return (
    <section className="content-section">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} text={content.text} />

      <div className="chart-panel panel">
        <div className="chart-panel-top">
          <div className="chart-panel-meta">
            <div className="segmented-control">
              {content.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={tab.id === currentTab.id ? 'segment-active' : ''}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="chart-panel-highlights">
              {currentTab.highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="chart-panel-copy">
            <span className="mini-label">Leitura guiada</span>
            <h3>{currentTab.label}</h3>
            <p>{currentTab.description}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <TrendChart tab={currentTab} />
          </motion.div>
        </AnimatePresence>

        <div className="footnote-row">
          <span>Fonte: PRF</span>
          <span>Recorte: rodovias federais brasileiras (BRs)</span>
          <span>Período: 2023 a 2025</span>
          <span>Não representa todo o trânsito do Brasil</span>
        </div>
      </div>
    </section>
  )
}
