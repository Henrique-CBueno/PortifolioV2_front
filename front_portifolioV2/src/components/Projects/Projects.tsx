import { useEffect, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { setAdminSection } from "../../utils/adminDraft";

interface ProjectItem {
    id: string;
    imageAlt: string;
    imageSrc: string;
    tags: string[];
    title: string;
    description: string;
    href: string;
}

const makeProjectId = () => `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function Projects({ admin }: { admin?: boolean }) {

    const [showMoreProjects, setShowMoreProjects] = useState(false);
    const [projectsTitle, setProjectsTitle] = useState(project.projects.title);
    const [projectsSubtitle, setProjectsSubtitle] = useState(project.projects.subtitle);
    const [githubButtonText, setGithubButtonText] = useState(project.projects.githubButtonText);
    const [githubButtonHref, setGithubButtonHref] = useState(project.projects.githubButtonHref);
    const [caseStudyButtonText, setCaseStudyButtonText] = useState(project.projects.caseStudyButtonText);
    const [showMoreText, setShowMoreText] = useState(project.projects.showMoreText);
    const [showLessText, setShowLessText] = useState(project.projects.showLessText);
    const [imageEditorOpenId, setImageEditorOpenId] = useState<string | null>(null);
    const [projectsItems, setProjectsItems] = useState<ProjectItem[]>(
        project.projects.items.map((item) => ({
            id: makeProjectId(),
            imageAlt: item.imageAlt,
            imageSrc: item.imageSrc,
            tags: [...item.tags],
            title: item.title,
            description: item.description,
            href: item.href,
        }))
    );

    const projectsData = {
        title: projectsTitle,
        subtitle: projectsSubtitle,
        githubButtonText,
        githubButtonHref,
        caseStudyButtonText,
        showMoreText,
        showLessText,
        items: projectsItems,
    };

    const visibleProjects = projectsData.items.slice(0, 2);
    const hiddenProjects = projectsData.items.slice(2);

    function toggleMoreProjects() {
        setShowMoreProjects((prev) => !prev);
    }

    const moveProject = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setProjectsItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    const updateProject = (id: string, field: keyof Omit<ProjectItem, "id" | "tags">, value: string) => {
        setProjectsItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    useEffect(() => {
        if (!admin) return;

        setAdminSection("projects", {
            title: projectsTitle,
            subtitle: projectsSubtitle,
            githubButtonText,
            githubButtonHref,
            caseStudyButtonText,
            showLessText,
            showMoreText,
            items: projectsItems.map((item) => ({
                imageAlt: item.imageAlt,
                imageSrc: item.imageSrc,
                tags: item.tags,
                title: item.title,
                description: item.description,
                href: item.href,
            })),
        });
    }, [
        admin,
        projectsTitle,
        projectsSubtitle,
        githubButtonText,
        githubButtonHref,
        caseStudyButtonText,
        showLessText,
        showMoreText,
        projectsItems,
    ]);

    return (
        <section className="py-24" data-purpose="portfolio-projects" id="projects">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={projectsTitle}
                                    className="text-3xl md:text-4xl font-bold text-white"
                                    onChange={setProjectsTitle}
                                />
                            ) : (
                                projectsData.title
                            )}
                        </h2>
                        <p className="text-gray-400">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={projectsSubtitle}
                                    className="text-gray-400"
                                    onChange={setProjectsSubtitle}
                                />
                            ) : (
                                projectsData.subtitle
                            )}
                        </p>
                    </div>
                    {admin ? (
                        <AutoSizeInput
                            defaultValue={githubButtonText}
                            className="text-brand-accent border-b border-brand-accent pb-1 font-medium"
                            onChange={setGithubButtonText}
                            extraFields={[
                                { key: "href", label: "GitHub Button Href", defaultValue: githubButtonHref },
                                { key: "caseStudy", label: "Case Study Button Text", defaultValue: caseStudyButtonText },
                                { key: "showMore", label: "Show More Text", defaultValue: showMoreText },
                                { key: "showLess", label: "Show Less Text", defaultValue: showLessText },
                            ]}
                            onExtraFieldsChange={(fields) => {
                                setGithubButtonHref(fields.href ?? githubButtonHref);
                                setCaseStudyButtonText(fields.caseStudy ?? caseStudyButtonText);
                                setShowMoreText(fields.showMore ?? showMoreText);
                                setShowLessText(fields.showLess ?? showLessText);
                            }}
                        />
                    ) : (
                        <a className="text-brand-accent border-b border-brand-accent pb-1 font-medium hover:text-white hover:border-white transition-all"
                            href={projectsData.githubButtonHref}>{projectsData.githubButtonText}</a>
                    )}
                </div>
                {admin ? (
                    <>
                        <DraggableReorderList
                            items={projectsItems}
                            getKey={(item) => item.id}
                            onReorder={moveProject}
                            containerClassName="grid md:grid-cols-2 gap-8"
                            itemClassName={(state) =>
                                `group bg-brand-dark border rounded-3xl overflow-visible hover:border-brand-accent/50 transition-all relative ${
                                    state.isDragging
                                        ? "border-brand-accent/60 opacity-70"
                                        : state.isDragOver
                                            ? "border-brand-accent/70"
                                            : "border-white/5"
                                }`
                            }
                            renderContent={(item) => (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setProjectsItems((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== item.id)))}
                                        className="absolute top-2 right-2 z-20 h-6 w-6 rounded-full bg-brand-dark/95 text-xs text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45"
                                        title="Remover projeto"
                                    >
                                        x
                                    </button>
                                    <div className="relative overflow-hidden aspect-video rounded-t-3xl">
                                        <img
                                            alt={item.imageAlt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={item.imageSrc}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImageEditorOpenId((prev) => (prev === item.id ? null : item.id))}
                                            className={`absolute right-2 top-2 h-6 w-6 rounded-full text-white/70 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/55 ${imageEditorOpenId === item.id ? "bg-brand-accent/25" : "bg-brand-dark/95"}`}
                                            title="Editar imagem"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        {imageEditorOpenId === item.id && (
                                            <div className="absolute top-10 right-2 z-30 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl min-w-72 flex flex-col gap-2">
                                                <label className="flex flex-col gap-1 text-xs text-gray-400">
                                                    URL da imagem
                                                    <input
                                                        type="text"
                                                        value={item.imageSrc}
                                                        onChange={(e) => updateProject(item.id, "imageSrc", e.target.value)}
                                                        className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-1 text-xs text-gray-400">
                                                    Alt da imagem
                                                    <input
                                                        type="text"
                                                        value={item.imageAlt}
                                                        onChange={(e) => updateProject(item.id, "imageAlt", e.target.value)}
                                                        className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-1 text-xs text-gray-400">
                                                    Ou enviar arquivo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            updateProject(item.id, "imageSrc", URL.createObjectURL(file));
                                                        }}
                                                        className="text-xs text-gray-300"
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={`${item.id}-${tag}`}
                                                    className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">
                                            <AutoSizeInput
                                                defaultValue={item.title}
                                                className="text-2xl font-bold text-white"
                                                onChange={(value) => updateProject(item.id, "title", value)}
                                                extraFields={[
                                                    { key: "href", label: "Project Href", defaultValue: item.href },
                                                    { key: "tags", label: "Tags (separadas por virgula)", defaultValue: item.tags.join(", ") },
                                                ]}
                                                onExtraFieldsChange={(fields) => {
                                                    updateProject(item.id, "href", fields.href ?? item.href);
                                                    const nextTags = (fields.tags ?? item.tags.join(","))
                                                        .split(",")
                                                        .map((tag) => tag.trim())
                                                        .filter(Boolean);
                                                    setProjectsItems((prev) =>
                                                        prev.map((p) => (p.id === item.id ? { ...p, tags: nextTags.length ? nextTags : p.tags } : p))
                                                    );
                                                }}
                                            />
                                        </h3>
                                        <p className="text-gray-400 mb-6">
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => updateProject(item.id, "description", e.target.value)}
                                                className="w-full resize-none rounded-md border border-white/10 bg-transparent px-2 py-1 text-gray-300 outline-none focus:border-brand-accent/60"
                                                rows={3}
                                            />
                                        </p>
                                        <a className="inline-flex items-center gap-2 text-white font-medium"
                                            href={item.href}>
                                            {caseStudyButtonText} <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                                        </a>
                                    </div>
                                </>
                            )}
                        />
                        <div className="mt-8 text-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setProjectsItems((prev) => [
                                        ...prev,
                                        {
                                            id: makeProjectId(),
                                            imageAlt: "Novo projeto",
                                            imageSrc: "https://placehold.co/1280x720",
                                            tags: ["Nova"],
                                            title: "Novo projeto",
                                            description: "Descricao do novo projeto",
                                            href: "#",
                                        },
                                    ])
                                }
                                className="h-7 w-7 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                title="Adicionar projeto"
                            >
                                +
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 gap-8">
                            {visibleProjects.map((item) => (
                                <div
                                    key={item.id}
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
                                                    key={`${item.id}-${tag}`}
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
                                        key={item.id}
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
                                                        key={`${item.id}-${tag}`}
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
                    </>
                )}
            </div>
        </section>
    );
}