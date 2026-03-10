import { useState } from 'react'

export default function NavigationDots() {
  const [activeIndex, setActiveIndex] = useState(1)
  const dots = [0, 1, 2]

  return (
    <div className="flex items-center gap-2">
      {dots.map((index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            activeIndex === index
              ? 'bg-[#5c4a3d]/60'
              : 'bg-[#5c4a3d]/20 hover:bg-[#5c4a3d]/40'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
