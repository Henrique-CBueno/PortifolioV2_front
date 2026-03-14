import NameTitle from "./ui/NameTitle";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10" data-purpose="main-navigation">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            <NameTitle />

            <div className="hidden md:flex md:items-center space-x-8 font-medium">
                <a className="hover:text-brand-accent transition-colors" href="#home">Inicio</a>
                <a className="hover:text-brand-accent transition-colors" href="#about">Sobre</a>
                <a className="hover:text-brand-accent transition-colors" href="#journey">Jornada</a>
                <a className="hover:text-brand-accent transition-colors" href="#stack">Habilidades</a>
                <a className="hover:text-brand-accent transition-colors" href="#projects">Projetos</a>
                <a className="px-5 py-2 bg-brand-accent text-white rounded-full hover:bg-blue-600 transition-all"
                    href="#contact">Contact</a>
            </div>
        </nav>
        </header>
    )
}