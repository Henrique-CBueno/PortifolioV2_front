import { useEffect, useMemo, useRef, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { setAdminSection } from "../../utils/adminDraft";
import { normalizeHref, shouldOpenInNewTab } from "../../utils/url";

interface RotatingWordItem {
    id: string;
    value: string;
}

const createRotatingWordItem = (value: string): RotatingWordItem => ({
    id: `word-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    value,
});

export default function Main({ admin }: { admin?: boolean }) {
    const [heroHelperText, setHeroHelperText] = useState(project.hero.blueHelperText);
    const [heroWhiteTitle, setHeroWhiteTitle] = useState(project.hero.title.whiteTitle);
    const [heroSubtitle, setHeroSubtitle] = useState(project.hero.subtitle);
    const [rotatingWords, setRotatingWords] = useState(
        project.hero.title.rotatingWords.map((word) => createRotatingWordItem(word))
    );
    const [blueButton, setBlueButton] = useState({ ...project.hero.buttons.blueButton });
    const [transparentButton, setTransparentButton] = useState({ ...project.hero.buttons.transparentButton });
    const [heroCode, setHeroCode] = useState({
        ...project.hero.code,
        snippet: { ...project.hero.code.snippet },
    });
    const [wordIndex, setWordIndex] = useState(0);
    const [outgoingWord, setOutgoingWord] = useState<string | null>(null);
    const [transitionId, setTransitionId] = useState(0);
    const [iconEditorOpen, setIconEditorOpen] = useState(false);
    const clearOutgoingTimeoutRef = useRef<number | null>(null);
    const activeRotatingWords = useMemo(
        () => (admin ? rotatingWords.map((word) => word.value) : project.hero.title.rotatingWords),
        [admin, rotatingWords]
    );

    const updateRotatingWord = (id: string, value: string) => {
        setRotatingWords((prev) => prev.map((word) => (word.id === id ? { ...word, value } : word)));
    };

    const addRotatingWord = () => {
        setRotatingWords((prev) => [...prev, createRotatingWordItem("Nova.")]);
    };

    const removeRotatingWord = (id: string) => {
        setRotatingWords((prev) => {
            if (prev.length <= 1) return prev;
            return prev.filter((word) => word.id !== id);
        });
    };

    const moveRotatingWord = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;

        setRotatingWords((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    const updateCodeField = (field: "archiveName" | "icon" | "iconColor", value: string) => {
        setHeroCode((prev) => ({ ...prev, [field]: value }));
    };

    const updateSnippetField = (field: keyof typeof project.hero.code.snippet, value: string) => {
        setHeroCode((prev) => ({
            ...prev,
            snippet: {
                ...prev.snippet,
                [field]: value,
            },
        }));
    };

    useEffect(() => {
        if (activeRotatingWords.length === 0) return;

        const intervalId = window.setInterval(() => {
            setWordIndex((prev) => {
                const next = (prev + 1) % activeRotatingWords.length;
                setOutgoingWord(activeRotatingWords[prev]);
                setTransitionId((id) => id + 1);

                if (clearOutgoingTimeoutRef.current !== null) {
                    window.clearTimeout(clearOutgoingTimeoutRef.current);
                }

                clearOutgoingTimeoutRef.current = window.setTimeout(() => {
                    setOutgoingWord(null);
                }, 620);

                return next;
            });
        }, 2800);

        return () => {
            window.clearInterval(intervalId);
            if (clearOutgoingTimeoutRef.current !== null) {
                window.clearTimeout(clearOutgoingTimeoutRef.current);
            }
        };
    }, [activeRotatingWords]);

    useEffect(() => {
        if (wordIndex >= activeRotatingWords.length) {
            setWordIndex(0);
        }
    }, [wordIndex, activeRotatingWords.length]);

    useEffect(() => {
        if (!admin) return;

        setAdminSection("hero", {
            blueHelperText: heroHelperText,
            title: {
                whiteTitle: heroWhiteTitle,
                rotatingWords: rotatingWords.map((item) => item.value),
            },
            subtitle: heroSubtitle,
            buttons: {
                blueButton,
                transparentButton,
            },
            code: heroCode,
        });
    }, [
        admin,
        heroHelperText,
        heroWhiteTitle,
        heroSubtitle,
        rotatingWords,
        blueButton,
        transparentButton,
        heroCode,
    ]);

    return (
        <section
            className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
            data-purpose="hero-banner"
            id="home"
        >
            <div className="absolute inset-0 bg-grid-pattern -z-10 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[160px] -z-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] -z-20"></div>
            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                    <div className="lg:w-2/3 animate-fade-in">
                        <h2 className="text-brand-accent font-mono mb-4 text-lg tracking-widest uppercase">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={heroHelperText}
                                    className="text-brand-accent font-mono text-lg tracking-widest uppercase"
                                    onChange={setHeroHelperText}
                                />
                            ) : (
                                project.hero.blueHelperText
                            )}
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={heroWhiteTitle}
                                    className="text-5xl md:text-8xl font-black text-white tracking-tight leading-tight"
                                    onChange={setHeroWhiteTitle}
                                />
                            ) : (
                                project.hero.title.whiteTitle
                            )}{" "}
                            <br />
                            <span className="hero-rotating-word-slot align-bottom">
                                {outgoingWord ? (
                                    <span className="hero-word-out text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
                                        {outgoingWord}
                                    </span>
                                ) : null}
                                <span
                                    key={`in-${transitionId}-${activeRotatingWords[wordIndex]}`}
                                    className="hero-word-in text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
                                >
                                    {activeRotatingWords[wordIndex]}
                                </span>
                            </span>
                        </h1>
                        {admin && (
                            <div className="mb-6">
                                <DraggableReorderList
                                    items={rotatingWords}
                                    getKey={(word) => word.id}
                                    onReorder={moveRotatingWord}
                                    containerClassName="flex flex-wrap items-center gap-2"
                                    itemClassName={(state) =>
                                        `flex items-center gap-1 rounded-full border bg-brand-surface/70 px-3 py-1 transition-all duration-200 ${
                                            state.isDragging
                                                ? "border-brand-accent/65 opacity-65 scale-105 -rotate-1 shadow-lg shadow-brand-accent/25"
                                                : state.isDragOver
                                                    ? "border-brand-accent/70 ring-1 ring-brand-accent/45"
                                                    : "border-white/15"
                                        } ${state.isSettled ? "scale-[1.02]" : "scale-100"}`
                                    }
                                    renderContent={(word) => (
                                        <>
                                            <AutoSizeInput
                                                defaultValue={word.value}
                                                className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
                                                onChange={(value) => updateRotatingWord(word.id, value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeRotatingWord(word.id)}
                                                className="h-5 w-5 rounded-full text-xs text-red-300/85 ring-1 ring-white/25 hover:text-red-200"
                                                title="Remover palavra"
                                            >
                                                x
                                            </button>
                                        </>
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={addRotatingWord}
                                    className="h-6 w-6 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                    title="Adicionar palavra"
                                >
                                    +
                                </button>
                            </div>
                        )}
                        <p className="max-w-2xl text-gray-400 text-lg md:text-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                            {admin ? (
                                <textarea
                                    value={heroSubtitle}
                                    onChange={(e) => setHeroSubtitle(e.target.value)}
                                    className="w-full max-w-2xl resize-none rounded-md border border-white/15 bg-brand-surface/60 px-3 py-2 text-gray-300 outline-none focus:border-brand-accent/60"
                                    rows={4}
                                />
                            ) : (
                                project.hero.subtitle
                            )}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {admin ? (
                                <>
                                    <div
                                        className="px-8 py-4 bg-brand-accent text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <AutoSizeInput
                                            defaultValue={blueButton.text}
                                            className="text-white font-bold"
                                            onChange={(value) => setBlueButton((prev) => ({ ...prev, text: value }))}
                                            extraFields={[
                                                { key: "href", label: "Href", defaultValue: blueButton.href },
                                            ]}
                                            onExtraFieldsChange={(fields) => setBlueButton((prev) => ({ ...prev, href: fields.href ?? prev.href }))}
                                        />
                                        <i className="fa-solid fa-chevron-right text-sm"></i>
                                    </div>
                                    <div
                                        className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <AutoSizeInput
                                            defaultValue={transparentButton.text}
                                            className="text-white font-bold"
                                            onChange={(value) => setTransparentButton((prev) => ({ ...prev, text: value }))}
                                            extraFields={[
                                                { key: "href", label: "Href", defaultValue: transparentButton.href },
                                            ]}
                                            onExtraFieldsChange={(fields) => setTransparentButton((prev) => ({ ...prev, href: fields.href ?? prev.href }))}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a
                                        className="px-8 py-4 bg-brand-accent text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
                                        href={normalizeHref(project.hero.buttons.blueButton.href)}
                                        target={shouldOpenInNewTab(project.hero.buttons.blueButton.href) ? "_blank" : undefined}
                                        rel={shouldOpenInNewTab(project.hero.buttons.blueButton.href) ? "noopener noreferrer" : undefined}
                                    >
                                        {project.hero.buttons.blueButton.text}{" "}
                                        <i className="fa-solid fa-chevron-right text-sm group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                    <a
                                        className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                        href={normalizeHref(project.hero.buttons.transparentButton.href)}
                                        target={shouldOpenInNewTab(project.hero.buttons.transparentButton.href) ? "_blank" : undefined}
                                        rel={shouldOpenInNewTab(project.hero.buttons.transparentButton.href) ? "noopener noreferrer" : undefined}
                                    >
                                        {project.hero.buttons.transparentButton.text}
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-1/3 hidden lg:block relative group">
                        <div className="relative z-10 p-6 bg-brand-surface border border-white/10 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-xs font-mono text-gray-500">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.archiveName}
                                            className="text-xs font-mono text-gray-500"
                                            onChange={(value) => updateCodeField("archiveName", value)}
                                        />
                                    ) : (
                                        project.hero.code.archiveName
                                    )}
                                </span>
                            </div>
                            <pre className="text-xs font-mono text-blue-400 leading-relaxed">
                                <span className="text-purple-400">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.serviceAnnotation}
                                            className="text-xs font-mono text-purple-400"
                                            onChange={(value) => updateSnippetField("serviceAnnotation", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.serviceAnnotation
                                    )}
                                </span>
                                {"\n"}
                                <span className="text-white">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.classKeyword}
                                            className="text-xs font-mono text-white"
                                            onChange={(value) => updateSnippetField("classKeyword", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.classKeyword
                                    )}
                                </span>{" "}
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={heroCode.snippet.className}
                                        className="text-xs font-mono text-blue-400"
                                        onChange={(value) => updateSnippetField("className", value)}
                                    />
                                ) : (
                                    project.hero.code.snippet.className
                                )}{" "}
                                {"{"}
                                {"\n  "}
                                <span className="text-gray-500">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.infrastructureComment}
                                            className="text-xs font-mono text-gray-500"
                                            onChange={(value) => updateSnippetField("infrastructureComment", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.infrastructureComment
                                    )}
                                </span>
                                {"\n  "}
                                <span className="text-purple-400">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.autowiredAnnotation}
                                            className="text-xs font-mono text-purple-400"
                                            onChange={(value) => updateSnippetField("autowiredAnnotation", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.autowiredAnnotation
                                    )}
                                </span>
                                {"\n  "}
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={heroCode.snippet.awsField}
                                        className="text-xs font-mono text-blue-400"
                                        onChange={(value) => updateSnippetField("awsField", value)}
                                    />
                                ) : (
                                    project.hero.code.snippet.awsField
                                )}
                                {"\n\n  "}
                                <span className="text-white">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.deploySignature}
                                            className="text-xs font-mono text-white"
                                            onChange={(value) => updateSnippetField("deploySignature", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.deploySignature
                                    )}
                                </span>{" "}
                                {"{"}
                                {"\n    "}
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={heroCode.snippet.deployCallPrefix}
                                        className="text-xs font-mono text-blue-400"
                                        onChange={(value) => updateSnippetField("deployCallPrefix", value)}
                                    />
                                ) : (
                                    project.hero.code.snippet.deployCallPrefix
                                )}
                                <span className="text-orange-400">"{admin ? (
                                    <AutoSizeInput
                                        defaultValue={heroCode.snippet.region}
                                        className="text-xs font-mono text-orange-400"
                                        onChange={(value) => updateSnippetField("region", value)}
                                    />
                                ) : (
                                    project.hero.code.snippet.region
                                )}"</span>
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={heroCode.snippet.deployCallSuffix}
                                        className="text-xs font-mono text-blue-400"
                                        onChange={(value) => updateSnippetField("deployCallSuffix", value)}
                                    />
                                ) : (
                                    project.hero.code.snippet.deployCallSuffix
                                )}
                                {"\n\n  "}
                                <span className="text-gray-500">
                                    {admin ? (
                                        <AutoSizeInput
                                            defaultValue={heroCode.snippet.uptimeComment}
                                            className="text-xs font-mono text-gray-500"
                                            onChange={(value) => updateSnippetField("uptimeComment", value)}
                                        />
                                    ) : (
                                        project.hero.code.snippet.uptimeComment
                                    )}
                                </span>
                                {"\n  "}
                                {"}"}
                                {"\n"}
                                {"}"}
                            </pre>
                        </div>
                        <div className={`absolute -top-10 -right-10 p-6 bg-blue-900/20 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 ${admin ? "z-30" : "-z-10"}`}>
                            <i className={`${admin ? heroCode.icon : project.hero.code.icon} text-6xl ${admin ? heroCode.iconColor : project.hero.code.iconColor} opacity-50`}></i>
                            {admin && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIconEditorOpen((v) => !v)}
                                        className={`absolute -right-2 -top-2 h-6 w-6 rounded-full text-white/70 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${iconEditorOpen ? "bg-brand-accent/25" : "bg-brand-dark/95"}`}
                                        title="Editar classe do icone"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    {iconEditorOpen && (
                                        <div className="absolute top-full right-0 mt-2 z-50 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl min-w-56 flex flex-col gap-2">
                                            <label className="flex flex-col gap-1 text-xs text-gray-400">
                                                Icon ClassName
                                                <input
                                                    type="text"
                                                    value={heroCode.icon}
                                                    onChange={(e) => updateCodeField("icon", e.target.value)}
                                                    className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1 text-xs text-gray-400">
                                                Icon Color Class
                                                <input
                                                    type="text"
                                                    value={heroCode.iconColor}
                                                    onChange={(e) => updateCodeField("iconColor", e.target.value)}
                                                    className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}