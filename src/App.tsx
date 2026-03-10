import Card from './components/Card'
import NavigationDots from './components/NavigationDots'
import './App.css'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#f5f0e6] flex flex-col items-center justify-center relative">
      {/* Main card */}
      <div className="flex items-center justify-center">
        <Card />
      </div>

      {/* Navigation dots at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <NavigationDots />
      </div>
    </div>
  )
}

export default App
