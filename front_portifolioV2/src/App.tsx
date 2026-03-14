import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Header from "./components/Header/Header"
import Journey from "./components/Journey/Journey"
import Main from "./components/Main/Main"
import MouseGlow from "./components/MouseGlow"
import Projects from "./components/Projects/Projects"
import Stacks from "./components/Stacks/Stacks"

function App() {

  return (
    <div className="text-gray-300 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
        <MouseGlow />
        <Header />
        <Main />
        <About />
        <Journey />
        <Stacks />
        <Projects />
        <Contact />
    </div>
  )
}

export default App
