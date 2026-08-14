import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Globe, Github } from 'lucide-react'
import Card from './components/Card'
import './App.css'

interface Post {
  date: string
  title: string
  blog?: string
  github?: string
  website?: string
  primary: string
}

const posts: Post[] = [
  {
    date: '08.11.2026',
    title: 'Popcorn: Democratized Fast Kernel Dispatching',
    blog: 'https://blog.tilderesearch.com/blog/popcorn',
    github: 'https://github.com/tilde-research/popcorn',
    website: 'https://tilde-research.github.io/popcorn/',
    primary: 'https://tilde-research.github.io/popcorn/',
  },
  {
    date: '06.02.2026',
    title: 'Wall Attention: Length Generalization With Diagonal Gates',
    blog: 'https://blog.tilderesearch.com/blog/wall-attn',
    github: 'https://github.com/fla-org/flash-linear-attention/tree/main/fla/ops/wall_attn',
    primary: 'https://blog.tilderesearch.com/blog/wall-attn',
  },
  {
    date: '04.28.2026',
    title: 'Nitrobrew: Fast, Lossless Distillation for Free',
    blog: 'https://blog.tilderesearch.com/blog/nitrobrew',
    github: 'https://github.com/tilde-research/nitrobrew-release',
    primary: 'https://blog.tilderesearch.com/blog/nitrobrew',
  },
  {
    date: '07.25.2025',
    title: 'MoMoE: Memory-optimized Mixture of Experts',
    blog: 'https://blog.tilderesearch.com/blog/momoe',
    github: 'https://github.com/tilde-research/momoe-release',
    primary: 'https://blog.tilderesearch.com/blog/momoe',
  },
  {
    date: '06.25.2025',
    title: 'Sparsity is Cool',
    blog: 'https://blog.tilderesearch.com/blog/sparse-attn',
    github: 'https://github.com/tilde-research/nsa-release',
    primary: 'https://blog.tilderesearch.com/blog/sparse-attn',
  },
]

const viewFromPath = (): 'card' | 'work' =>
  window.location.pathname.replace(/\/$/, '') === '/work' ? 'work' : 'card'

const iconClass = "text-white/40 hover:text-white transition-colors"

function App() {
  const [view, setViewState] = useState<'card' | 'work'>(viewFromPath)

  const setView = useCallback((v: 'card' | 'work') => {
    setViewState(v)
    const path = v === 'work' ? '/work' : '/'
    if (window.location.pathname !== path) window.history.pushState(null, '', path)
  }, [])

  useEffect(() => {
    const onPopState = () => setViewState(viewFromPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0 && view === 'card') setView('work')
    else if (e.deltaY < 0 && view === 'work') setView('card')
  }, [view, setView])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

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
            <ul className="grid grid-cols-[auto_auto_auto] gap-x-8">
              {posts.map((p) => (
                <li key={p.primary} className="contents group">
                  <a href={p.primary} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/40 uppercase tracking-[0.08em] py-3 border-b border-white/5 group-hover:text-white/60 transition-colors">
                    {p.date}
                  </a>
                  <a href={p.primary} target="_blank" rel="noreferrer" className="font-mono text-[14px] text-white py-3 border-b border-white/5 group-hover:text-white/60 transition-colors">
                    {p.title}
                  </a>
                  <span className="flex items-center gap-3 py-3 border-b border-white/5">
                    {p.blog && (
                      <a href={p.blog} target="_blank" rel="noreferrer" aria-label="Blog post" title="Blog post" className={iconClass}>
                        <FileText size={14} />
                      </a>
                    )}
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noreferrer" aria-label="Website" title="Website" className={iconClass}>
                        <Globe size={14} />
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className={iconClass}>
                        <Github size={14} />
                      </a>
                    )}
                  </span>
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
