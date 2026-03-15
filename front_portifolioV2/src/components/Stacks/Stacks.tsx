import { useState } from "react";
import project from "../../types/project";

export default function Stacks() {
    const [showMoreTech, setShowMoreTech] = useState(false);
    const stackItems = project.stacks.items;
    const firstFour = stackItems.slice(0, 4);
    const fifthItem = stackItems[4];
    const remainingItems = stackItems.slice(5);
    const hasExpandableItems = stackItems.length > 4;

    function toggleMoreTech() {
        setShowMoreTech((prev) => !prev);
    }

    return (
        <section className="py-24 bg-brand-surface" data-purpose="technology-stack" id="stack">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.stacks.title}</h2>
                    <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {firstFour.map((stack) => (
                        <div
                            key={stack.name}
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                        >
                            <i className={`${stack.icon} text-5xl ${stack.iconColor} mb-4`}></i>
                            <h4 className="text-white font-bold">{stack.name}</h4>
                            <p className="text-xs text-gray-500 mt-2">{stack.helperText}</p>
                        </div>
                    ))}
                    {fifthItem ? (
                        <div
                            key={fifthItem.name}
                            className="hidden md:block tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                        >
                            <i className={`${fifthItem.icon} text-5xl ${fifthItem.iconColor} mb-4`}></i>
                            <h4 className="text-white font-bold">{fifthItem.name}</h4>
                            <p className="text-xs text-gray-500 mt-2">{fifthItem.helperText}</p>
                        </div>
                    ) : null}

                </div>
                <div className={`expandable-container ${showMoreTech ? "show" : ""}`} id="more-tech">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {fifthItem ? (
                            <div
                                key={`${fifthItem.name}-mobile-expanded`}
                                className="md:hidden tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                            >
                                <i className={`${fifthItem.icon} text-5xl ${fifthItem.iconColor} mb-4`}></i>
                                <h4 className="text-white font-bold">{fifthItem.name}</h4>
                                <p className="text-xs text-gray-500 mt-2">{fifthItem.helperText}</p>
                            </div>
                        ) : null}
                        {remainingItems.map((stack) => (
                            <div
                                key={stack.name}
                                className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                            >
                                <i className={`${stack.icon} text-5xl ${stack.iconColor} mb-4`}></i>
                                <h4 className="text-white font-bold">{stack.name}</h4>
                                <p className="text-xs text-gray-500 mt-2">{stack.helperText}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {hasExpandableItems ? (
                    <div className="mt-12 text-center">
                        <button
                            className="px-8 py-3 bg-brand-dark border cursor-pointer border-white/10 text-white font-medium rounded-full hover:border-brand-accent transition-all group"
                            id="btn-ver-mais" onClick={toggleMoreTech}>
                            {showMoreTech ? project.stacks.showLessText : project.stacks.showMoreText} <i
                                className={`fa-solid ml-2 text-xs transition-transform ${showMoreTech
                                    ? "fa-chevron-up group-hover:-translate-y-1"
                                    : "fa-chevron-down group-hover:translate-y-1"
                                    }`}
                                id="ver-mais-icon"></i>
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}