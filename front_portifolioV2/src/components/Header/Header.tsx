import project from "../../types/project";
import NameTitle from "./ui/NameTitle";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10" data-purpose="main-navigation">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            <NameTitle />

            <div className="hidden md:flex md:items-center space-x-8 font-medium">
                {project.header.sections.map((section) => (
                    <a className="hover:text-brand-accent transition-colors" 
                    href={section.href}
                    key={section.name}>
                        {section.name}
                    </a>
                ))}
            </div>
        </nav>
        </header>
    )
}