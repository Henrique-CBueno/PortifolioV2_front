import { useEffect, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { setAdminSection } from "../../utils/adminDraft";

interface StackItem {
    id: string;
    name: string;
    icon: string;
    iconColor: string;
    helperText: string;
}

const makeStackId = () => `stack-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function Stacks({ admin }: { admin?: boolean }) {
    const [showMoreTech, setShowMoreTech] = useState(false);
    const [stacksTitle, setStacksTitle] = useState(project.stacks.title);
    const [showMoreText, setShowMoreText] = useState(project.stacks.showMoreText);
    const [showLessText, setShowLessText] = useState(project.stacks.showLessText);
    const [stackItems, setStackItems] = useState<StackItem[]>(
        project.stacks.items.map((stack) => ({
            id: makeStackId(),
            name: stack.name,
            icon: stack.icon,
            iconColor: stack.iconColor,
            helperText: stack.helperText,
        }))
    );

    const firstFour = stackItems.slice(0, 4);
    const fifthItem = stackItems[4];
    const remainingItems = stackItems.slice(5);
    const hasExpandableItems = stackItems.length > 4;

    function toggleMoreTech() {
        setShowMoreTech((prev) => !prev);
    }

    const moveStack = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setStackItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    const updateStack = (id: string, field: keyof Omit<StackItem, "id">, value: string) => {
        setStackItems((prev) => prev.map((stack) => (stack.id === id ? { ...stack, [field]: value } : stack)));
    };

    useEffect(() => {
        if (!admin) return;

        setAdminSection("stacks", {
            title: stacksTitle,
            showLessText,
            showMoreText,
            items: stackItems.map((item) => ({
                name: item.name,
                icon: item.icon,
                iconColor: item.iconColor,
                helperText: item.helperText,
            })),
        });
    }, [admin, stacksTitle, showLessText, showMoreText, stackItems]);

    return (
        <section className="py-24 bg-brand-surface" data-purpose="technology-stack" id="stack">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {admin ? (
                            <AutoSizeInput
                                defaultValue={stacksTitle}
                                className="text-3xl md:text-4xl font-bold text-white"
                                onChange={setStacksTitle}
                            />
                        ) : (
                            project.stacks.title
                        )}
                    </h2>
                    <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                {admin ? (
                    <>
                        <DraggableReorderList
                            items={stackItems}
                            getKey={(stack) => stack.id}
                            onReorder={moveStack}
                            containerClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                            itemClassName={(state) =>
                                `tech-card p-8 bg-brand-dark rounded-2xl border text-center transition-all duration-300 relative overflow-visible z-0 hover:z-20 focus-within:z-30 ${
                                    state.isDragging
                                        ? "border-brand-accent/60 opacity-70"
                                        : state.isDragOver
                                            ? "border-brand-accent/70"
                                            : "border-white/5"
                                }`
                            }
                            renderContent={(stack) => (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setStackItems((prev) => {
                                                if (prev.length <= 1) return prev;
                                                return prev.filter((item) => item.id !== stack.id);
                                            })
                                        }
                                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-brand-dark/95 text-xs text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45"
                                        title="Remover stack"
                                    >
                                        x
                                    </button>
                                    <i className={`${stack.icon} text-5xl ${stack.iconColor} mb-4`}></i>
                                    <h4 className="text-white font-bold">
                                        <AutoSizeInput
                                            defaultValue={stack.name}
                                            className="text-white font-bold"
                                            onChange={(value) => updateStack(stack.id, "name", value)}
                                            extraFields={[
                                                { key: "icon", label: "Icon ClassName", defaultValue: stack.icon },
                                                { key: "iconColor", label: "Icon Color Class", defaultValue: stack.iconColor },
                                            ]}
                                            onExtraFieldsChange={(fields) => {
                                                updateStack(stack.id, "icon", fields.icon ?? stack.icon);
                                                updateStack(stack.id, "iconColor", fields.iconColor ?? stack.iconColor);
                                            }}
                                        />
                                    </h4>
                                    <div className="text-xs text-gray-500 mt-2">
                                        <AutoSizeInput
                                            defaultValue={stack.helperText}
                                            className="text-xs text-gray-500"
                                            onChange={(value) => updateStack(stack.id, "helperText", value)}
                                        />
                                    </div>
                                </>
                            )}
                        />
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setStackItems((prev) => [
                                        ...prev,
                                        {
                                            id: makeStackId(),
                                            name: "Nova Stack",
                                            icon: "fa-solid fa-code",
                                            iconColor: "text-white",
                                            helperText: "Nova descricao",
                                        },
                                    ])
                                }
                                className="h-7 w-7 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                title="Adicionar stack"
                            >
                                +
                            </button>
                            <AutoSizeInput
                                defaultValue={showMoreText}
                                className="text-sm text-gray-400"
                                onChange={setShowMoreText}
                            />
                            <AutoSizeInput
                                defaultValue={showLessText}
                                className="text-sm text-gray-400"
                                onChange={setShowLessText}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {firstFour.map((stack) => (
                                <div
                                    key={stack.id}
                                    className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                                >
                                    <i className={`${stack.icon} text-5xl ${stack.iconColor} mb-4`}></i>
                                    <h4 className="text-white font-bold">{stack.name}</h4>
                                    <p className="text-xs text-gray-500 mt-2">{stack.helperText}</p>
                                </div>
                            ))}
                            {fifthItem ? (
                                <div
                                    key={fifthItem.id}
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
                                        key={`${fifthItem.id}-mobile-expanded`}
                                        className="md:hidden tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300"
                                    >
                                        <i className={`${fifthItem.icon} text-5xl ${fifthItem.iconColor} mb-4`}></i>
                                        <h4 className="text-white font-bold">{fifthItem.name}</h4>
                                        <p className="text-xs text-gray-500 mt-2">{fifthItem.helperText}</p>
                                    </div>
                                ) : null}
                                {remainingItems.map((stack) => (
                                    <div
                                        key={stack.id}
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
                                    {showMoreTech ? showLessText : showMoreText} <i
                                        className={`fa-solid ml-2 text-xs transition-transform ${showMoreTech
                                            ? "fa-chevron-up group-hover:-translate-y-1"
                                            : "fa-chevron-down group-hover:translate-y-1"
                                            }`}
                                        id="ver-mais-icon"></i>
                                </button>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </section>
    );
}