import { useEffect, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { setAdminSection } from "../../utils/adminDraft";

interface DescriptionItem {
    id: string;
    value: string;
}

interface AboutCardItem {
    id: string;
    emphasis: string;
    helperText: string;
}

const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function About({ admin }: { admin?: boolean }) {
    const [aboutTitle, setAboutTitle] = useState(project.about.title);
    const [aboutImg, setAboutImg] = useState(project.about.img);
    const [imageEditorOpen, setImageEditorOpen] = useState(false);
    const [descriptions, setDescriptions] = useState<DescriptionItem[]>(
        project.about.description.map((value) => ({ id: makeId("desc"), value }))
    );
    const [cards, setCards] = useState<AboutCardItem[]>(
        project.about.cards.map((card) => ({ id: makeId("card"), emphasis: card.emphasis, helperText: card.helperText }))
    );

    const reorderDescriptions = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setDescriptions((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    const reorderCards = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setCards((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    useEffect(() => {
        if (!admin) return;

        setAdminSection("about", {
            ...project.about,
            title: aboutTitle,
            img: aboutImg,
            description: descriptions.map((item) => item.value),
            cards: cards.map((item) => ({
                emphasis: item.emphasis,
                helperText: item.helperText,
            })),
        });
    }, [admin, aboutTitle, aboutImg, descriptions, cards]);

    return (
        <section className="py-24 bg-brand-surface" data-purpose="about-me-details" id={project.about.id}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-white/10 group">
                            <img alt="Developer Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={admin ? aboutImg : project.about.img} />
                        </div>
                        {admin && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setImageEditorOpen((v) => !v)}
                                    className={`absolute -right-2 -top-2 h-6 w-6 rounded-full text-white/70 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${imageEditorOpen ? "bg-brand-accent/25" : "bg-brand-dark/95"}`}
                                    title="Editar imagem"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                {imageEditorOpen && (
                                    <div className="absolute top-full right-0 mt-2 z-50 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl min-w-72 flex flex-col gap-2">
                                        <label className="flex flex-col gap-1 text-xs text-gray-400">
                                            URL da imagem
                                            <input
                                                type="text"
                                                value={aboutImg}
                                                onChange={(e) => setAboutImg(e.target.value)}
                                                className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                                                placeholder="https://..."
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
                                                    setAboutImg(URL.createObjectURL(file));
                                                }}
                                                className="text-xs text-gray-300"
                                            />
                                        </label>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-brand-accent -z-10 rounded-xl"></div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={aboutTitle}
                                    className="text-3xl font-bold text-white"
                                    onChange={setAboutTitle}
                                />
                            ) : (
                                project.about.title
                            )}
                        </h3>

                        {admin ? (
                            <div className="mb-8">
                                <DraggableReorderList
                                    items={descriptions}
                                    getKey={(item) => item.id}
                                    onReorder={reorderDescriptions}
                                    containerClassName="flex flex-col gap-3"
                                    itemClassName={(state) =>
                                        `flex items-start gap-2 rounded-lg border bg-brand-dark/40 px-3 py-2 transition-all duration-200 ${
                                            state.isDragging
                                                ? "border-brand-accent/60 opacity-70"
                                                : state.isDragOver
                                                    ? "border-brand-accent/70"
                                                    : "border-white/10"
                                        }`
                                    }
                                    renderContent={(item) => (
                                        <>
                                            <textarea
                                                value={item.value}
                                                onChange={(e) => {
                                                    const nextValue = e.target.value;
                                                    setDescriptions((prev) =>
                                                        prev.map((desc) => (desc.id === item.id ? { ...desc, value: nextValue } : desc))
                                                    );
                                                }}
                                                className="w-full resize-none rounded-md border border-white/10 bg-transparent px-2 py-1 text-gray-300 outline-none focus:border-brand-accent/60"
                                                rows={3}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setDescriptions((prev) => prev.filter((desc) => desc.id !== item.id))}
                                                className="mt-1 h-6 w-6 rounded-full text-xs text-red-300/85 ring-1 ring-white/25 hover:text-red-200"
                                                title="Remover descricao"
                                            >
                                                x
                                            </button>
                                        </>
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setDescriptions((prev) => [...prev, { id: makeId("desc"), value: "Nova descricao" }])}
                                    className="mt-3 h-6 w-6 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                    title="Adicionar descricao"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <>
                                {project.about.description.map((desc, index) => (
                                    <p
                                        key={`about-desc-${index}`}
                                        className={`text-gray-400 leading-relaxed ${index !== project.about.description.length - 1 ? "mb-6" : "mb-8"}`}
                                    >
                                        {desc}
                                    </p>
                                ))}
                            </>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {admin ? (
                                <>
                                    <DraggableReorderList
                                        items={cards}
                                        getKey={(card) => card.id}
                                        onReorder={reorderCards}
                                        containerClassName="col-span-2 grid grid-cols-2 gap-4"
                                        itemClassName={(state) =>
                                            `p-4 rounded-lg bg-brand-dark border transition-all duration-200 flex items-start gap-2 ${
                                                state.isDragging
                                                    ? "border-brand-accent/60 opacity-70"
                                                    : state.isDragOver
                                                        ? "border-brand-accent/70"
                                                        : "border-white/5"
                                            }`
                                        }
                                        renderContent={(card) => (
                                            <div className="flex-1">
                                                <AutoSizeInput
                                                    defaultValue={card.emphasis}
                                                    className="block text-brand-accent font-bold text-2xl"
                                                    onChange={(value) => {
                                                        setCards((prev) => prev.map((item) => (item.id === card.id ? { ...item, emphasis: value } : item)));
                                                    }}
                                                />
                                                <AutoSizeInput
                                                    defaultValue={card.helperText}
                                                    className="text-sm text-gray-500"
                                                    onChange={(value) => {
                                                        setCards((prev) => prev.map((item) => (item.id === card.id ? { ...item, helperText: value } : item)));
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setCards((prev) => prev.filter((item) => item.id !== card.id))}
                                                    className="mt-2 h-5 w-5 rounded-full text-xs text-red-300/85 ring-1 ring-white/25 hover:text-red-200"
                                                    title="Remover card"
                                                >
                                                    x
                                                </button>
                                            </div>
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCards((prev) => [...prev, { id: makeId("card"), emphasis: "0+", helperText: "Novo card" }])
                                        }
                                        className="h-6 w-6 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                        title="Adicionar card"
                                    >
                                        +
                                    </button>
                                </>
                            ) : (
                                <>
                                    {project.about.cards.map((card, index) => (
                                        <div key={`about-card-${index}`} className="p-4 rounded-lg bg-brand-dark border border-white/5">
                                            <span className="block text-brand-accent font-bold text-2xl">{card.emphasis}</span>
                                            <span className="text-sm text-gray-500">{card.helperText}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}