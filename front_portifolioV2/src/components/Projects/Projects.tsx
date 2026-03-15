import { useState } from "react";
import project from "../../types/project";

export default function Projects() {

    const [showMoreProjects, setShowMoreProjects] = useState(false);
    const projectsData = project.projects;
    const visibleProjects = projectsData.items.slice(0, 2);
    const hiddenProjects = projectsData.items.slice(2);

    function toggleMoreProjects() {
        setShowMoreProjects((prev) => !prev);
    }

    return (
        <section className="py-24" data-purpose="portfolio-projects" id="projects">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{projectsData.title}</h2>
                        <p className="text-gray-400">{projectsData.subtitle}</p>
                    </div>
                    <a className="text-brand-accent border-b border-brand-accent pb-1 font-medium hover:text-white hover:border-white transition-all"
                        href={projectsData.githubButtonHref}>{projectsData.githubButtonText}</a>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {visibleProjects.map((item) => (
                        <div
                            key={item.title}
                            className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                            <div className="relative overflow-hidden aspect-video">
                                <img alt={item.imageAlt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={item.imageSrc} />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={`${item.title}-${tag}`}
                                            className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 mb-6">{item.description}</p>
                                <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                    href={item.href}>
                                    {projectsData.caseStudyButtonText} <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className={`expandable-container ${showMoreProjects ? "show" : ""}`} id="more-projects">
                    <div className="grid md:grid-cols-2 gap-8">
                        {hiddenProjects.map((item) => (
                            <div
                                key={item.title}
                                className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                                <div className="relative overflow-hidden aspect-video">
                                    <img alt={item.imageAlt}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={item.imageSrc} />
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={`${item.title}-${tag}`}
                                                className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 mb-6">{item.description}</p>
                                    <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                        href={item.href}>
                                        {projectsData.caseStudyButtonText} <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {hiddenProjects.length > 0 ? (
                    <div className="mt-12 text-center">
                        <button
                            className="px-8 py-3 bg-brand-dark border border-white/10 text-white font-medium rounded-full hover:border-brand-accent transition-all group"
                            id="btn-ver-mais-projetos" onClick={toggleMoreProjects}>
                            {showMoreProjects ? projectsData.showLessText : projectsData.showMoreText} <i
                                className={`fa-solid ml-2 text-xs transition-transform ${showMoreProjects
                                    ? "fa-chevron-up group-hover:-translate-y-1"
                                    : "fa-chevron-down group-hover:translate-y-1"
                                    }`}
                                id="ver-mais-projetos-icon"></i>
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}