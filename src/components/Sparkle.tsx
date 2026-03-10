export default function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sparkle-animate ${className}`}
    >
      {/* Four-pointed star */}
      <path
        d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
