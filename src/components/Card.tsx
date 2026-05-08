import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

interface Props {
  expanded?: boolean
  onCollapse?: () => void
}

export default function Card({ expanded = false, onCollapse }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    const update = () => setIsNarrow(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    if (expanded) setIsFlipped(false)
  }, [expanded])

  const handleClick = () => {
    if (expanded) onCollapse?.()
    else setIsFlipped(!isFlipped)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isFlipped || expanded) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const stop = (e: React.MouseEvent) => e.stopPropagation()
  const linkClass = "font-mono text-[11px] tracking-[0.08em] text-[#5c4a3d]/70 hover:text-[#5c4a3d] transition-colors dotted-underline uppercase"

  const cardTransition = { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: expanded ? 0 : 0.4 }

  return (
    <motion.div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={
        expanded
          ? { width: 'calc(100vw - 32px)', height: isNarrow ? 140 : 96, top: 16, left: 16, x: 0, y: 0 }
          : { width: 380, height: 280, top: '50%', left: '50%', x: '-50%', y: '-50%' }
      }
      transition={cardTransition}
      className="fixed cursor-pointer select-none"
      style={{
        rotateX: isFlipped || expanded ? 0 : rotateX,
        rotateY: isFlipped || expanded ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className={`flipper ${isFlipped && !expanded ? 'flipped' : ''}`}>
        <div className="front paper-card">
          <div className="paper-texture" />
          <div className="gradient-overlay" />

          <motion.div
            className="absolute"
            initial={false}
            animate={expanded ? { top: 28, left: 32 } : { top: 220, left: 20 }}
            transition={cardTransition}
          >
            <p className="font-mono text-[14px] font-bold text-[#5c4a3d] uppercase tracking-[0.12em] mb-1">TIMOR AVERBUCH</p>
            <p className="font-mono text-[11px] text-[#5c4a3d]/70 uppercase tracking-[0.08em]">SCALING intelligence</p>
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="socials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute flex flex-wrap gap-x-5 gap-y-2 left-8 bottom-5 sm:left-auto sm:bottom-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2"
              >
                <a href="https://www.linkedin.com/in/timorea2/" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>LINKEDIN</a>
                <a href="https://github.com/tea-more" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>GITHUB</a>
                <a href="https://x.com/timorchik" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>X</a>
                <a href="mailto:timoreran.averbuch@gmail.com" onClick={stop} className={linkClass}>EMAIL</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="back paper-card">
          <div className="paper-texture" />
          <div className="gradient-overlay-back" />
          <div className="card-content-center">
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/timorea2/" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>LINKEDIN</a>
              <a href="https://github.com/tea-more" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>GITHUB</a>
              <a href="https://x.com/timorchik" target="_blank" rel="noreferrer" onClick={stop} className={linkClass}>X</a>
              <a href="mailto:timoreran.averbuch@gmail.com" onClick={stop} className={linkClass}>EMAIL</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
