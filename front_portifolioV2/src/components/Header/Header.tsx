import { useState } from "react";
import project from "../../types/project";
import NameTitle from "./ui/NameTitle";
import AutoSizeInput from "../ui/AutoSizeInput";

export default function Header({ admin }: { admin?: boolean }) {
    const [adminSections, setAdminSections] = useState(() =>
        project.header.sections.map((section, index) => ({
            id: `${section.name}-${index}`,
            name: section.name,
            href: section.href,
        }))
    );

    const updateSectionName = (id: string, name: string) => {
        setAdminSections((prev) => prev.map((item) => (item.id === id ? { ...item, name } : item)));
    };

    const updateSectionHref = (id: string, href: string) => {
        setAdminSections((prev) => prev.map((item) => (item.id === id ? { ...item, href } : item)));
    };

    const addSection = () => {
        setAdminSections((prev) => [
            ...prev,
            {
                id: `new-${Date.now()}`,
                name: "Novo",
                href: "#",
            },
        ]);
    };

    const removeSection = (id: string) => {
        setAdminSections((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        !admin ? (
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
        ) : (
            <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10" data-purpose="main-navigation">
                <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <NameTitle admin={true}/>

                <div className="relative hidden md:flex md:items-center space-x-6 font-medium">
                    {adminSections.map((section) => (
                        <div key={section.id} className="flex items-center gap-1.5">
                            <AutoSizeInput
                                defaultValue={section.name}
                                className="hover:text-brand-accent transition-colors"
                                onChange={(value) => updateSectionName(section.id, value)}
                                extraFields={[
                                    { key: "href", label: "Href", defaultValue: section.href },
                                ]}
                                onExtraFieldsChange={(fields) => updateSectionHref(section.id, fields.href ?? section.href)}
                            />
                            <button
                                type="button"
                                onClick={() => removeSection(section.id)}
                                className="h-6 w-6 absolute -top-6 -ml-5 rounded-full bg-brand-dark/95 text-xs leading-none text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                                title="Remover item"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSection}
                        className="h-6 w-6 rounded-full absolute -right-5 bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60"
                        title="Adicionar item"
                    >
                        +
                    </button>
                </div>
                </nav>
            </header>
        )
    )
}