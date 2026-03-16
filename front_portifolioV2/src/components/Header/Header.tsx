import { useEffect, useState } from "react";
import project from "../../types/project";
import NameTitle from "./ui/NameTitle";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { patchAdminSection } from "../../utils/adminDraft";

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

    const moveSection = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;

        setAdminSections((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    useEffect(() => {
        if (!admin) return;

        patchAdminSection("header", {
            sections: adminSections.map((section) => ({
                name: section.name,
                href: section.href,
            })),
        });
    }, [admin, adminSections]);

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
                    <DraggableReorderList
                        items={adminSections}
                        getKey={(section) => section.id}
                        onReorder={moveSection}
                        containerClassName="flex items-center gap-6"
                        itemClassName={(state) =>
                            `relative flex items-center gap-1.5 transition-all duration-200 ${
                                state.isDragging
                                    ? "opacity-65 scale-105 -rotate-1"
                                    : state.isDragOver
                                        ? "ring-1 ring-brand-accent/40 rounded"
                                        : ""
                            } ${state.isSettled ? "scale-[1.02]" : "scale-100"}`
                        }
                        handleClassName="cursor-grab select-none text-white/40 hover:text-white/70 active:cursor-grabbing"
                        renderContent={(section) => (
                            <>
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
                                    className="h-6 w-6 absolute -top-6 ml-5 rounded-full bg-brand-dark/95 text-xs leading-none text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                                    title="Remover item"
                                >
                                    x
                                </button>
                            </>
                        )}
                    />
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