import About from "./components/About/About"
import Header from "./components/Header/Header"
import Journey from "./components/Journey/Journey"
import Main from "./components/Main/Main"
import MouseGlow from "./components/MouseGlow"

function App() {

  return (
    <div className="text-gray-300 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
        <MouseGlow />
        <Header />
        <Main />
        <About />
        <Journey />
    </div>
  )
}

export default App
