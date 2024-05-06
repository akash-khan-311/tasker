
import './App.css'
import Footer from './Footer'
import Header from './Header'
import HeroSection from './HeroSection'
import TaskBoard from './Task/TaskBoard'

function App() {
  

  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Header/>
      <HeroSection/>
      <TaskBoard/>
      <Footer/>
    </div>
  )
}

export default App
