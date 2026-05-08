import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './components/Card'
import './App.css'

const posts = [
  { date: '04.28.2026', title: 'Nitrobrew: Fast, Lossless Distillation for Free', url: 'https://blog.tilderesearch.com/blog/nitrobrew' },
  { date: '07.25.2025', title: 'MoMoE: Memory-optimized Mixture of Experts', url: 'https://blog.tilderesearch.com/blog/momoe' },
  { date: '06.25.2025', title: 'Sparsity is Cool', url: 'https://blog.tilderesearch.com/blog/sparse-attn' },
]

function App() {
  const [view, setView] = useState<'card' | 'work'>('card')

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      <Card expanded={view === 'work'} onCollapse={() => setView('card')} />

      <AnimatePresence>
        {view === 'card' && (
          <motion.button
            key="work-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={() => setView('work')}
            className="fixed left-1/2 -translate-x-1/2 top-[calc(50%+180px)] font-mono text-[12px] text-white/50 hover:text-white tracking-[0.25em] uppercase transition-colors"
          >
            ‹ My Work ›
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'work' && (
          <motion.div
            key="work-list"
            initial={{ y: 80, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1, transition: { delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
            exit={{ y: 80, x: '-50%', opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
            className="fixed left-1/2 top-[180px] px-6"
          >
            <ul className="grid grid-cols-[auto_auto] gap-x-8">
              {posts.map((p) => (
                <li key={p.url} className="contents group">
                  <a href={p.url} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/40 uppercase tracking-[0.08em] py-3 border-b border-white/5 group-hover:text-white/60 transition-colors">
                    {p.date}
                  </a>
                  <a href={p.url} target="_blank" rel="noreferrer" className="font-mono text-[14px] text-white py-3 border-b border-white/5 group-hover:text-white/60 transition-colors">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
