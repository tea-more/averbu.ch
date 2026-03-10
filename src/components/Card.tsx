import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Card() {
  const [isFlipped, setIsFlipped] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring config for smooth animation
  const springConfig = { stiffness: 150, damping: 15 }
  
  // Map mouse position to rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isFlipped) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height
    
    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div 
      className="flip-container"
      ref={containerRef}
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isFlipped ? 0 : rotateX,
        rotateY: isFlipped ? 0 : rotateY,
        transformPerspective: 1000,
      }}
    >
      <div className={`flipper ${isFlipped ? 'flipped' : ''}`}>
        {/* Front side */}
        <div className="front paper-card">
          {/* Paper texture overlay */}
          <div className="paper-texture" />

          {/* Subtle gradient overlay */}
          <div className="gradient-overlay" />

          {/* Centered text content */}
          <div className="card-content-center">
            <div className="text-center">
              <p className="font-mono text-[14px] font-bold text-[#5c4a3d] uppercase tracking-[0.12em] mb-2">TIMOR AVERBUCH</p>
              <p className="font-mono text-[11px] font-bold text-[#5c4a3d] uppercase tracking-[0.08em]">SCALING INTELLIGENCE</p>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="back paper-card">
          {/* Paper texture overlay */}
          <div className="paper-texture" />
          
          {/* Subtle gradient overlay */}
          <div className="gradient-overlay-back" />
          
          {/* Back content */}
          <div className="card-content-center">
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/timorea2/" 
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] tracking-[0.08em] text-[#5c4a3d]/70 hover:text-[#5c4a3d] transition-colors dotted-underline uppercase"
              >
                LINKEDIN
              </a>
              <a 
                href="https://github.com/tea-more" 
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] tracking-[0.08em] text-[#5c4a3d]/70 hover:text-[#5c4a3d] transition-colors dotted-underline uppercase"
              >
                GITHUB
              </a>
              <a 
                href="https://x.com/timorchik" 
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] tracking-[0.08em] text-[#5c4a3d]/70 hover:text-[#5c4a3d] transition-colors dotted-underline uppercase"
              >
                X
              </a>
              <a 
                href="mailto:timoerean.averbuch@gmail.com" 
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] tracking-[0.08em] text-[#5c4a3d]/70 hover:text-[#5c4a3d] transition-colors dotted-underline uppercase"
              >
                EMAIL
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
