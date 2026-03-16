import About from '../components/About/About'
import Certifications from '../components/Certifications/Certifications'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Journey from '../components/Journey/Journey'
import Main from '../components/Main/Main'
import MouseGlow from '../components/MouseGlow'
import Projects from '../components/Projects/Projects'
import Stacks from '../components/Stacks/Stacks'

export default function HomePage() {
  return (
    <div className="text-gray-300 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <MouseGlow />
      <Header />
      <Main />
      <About />
      <Journey />
      <Stacks />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}
