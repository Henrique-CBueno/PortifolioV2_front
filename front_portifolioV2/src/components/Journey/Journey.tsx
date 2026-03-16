import { useEffect, useRef, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";

interface JourneyJobItem {
    id: string;
    startTime: string;
    endTime: string;
    whiteTitle: string;
    enterprise: string;
    description: string;
}

const makeJobId = () => `journey-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function Journey({ admin }: { admin?: boolean }) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [lineProgress, setLineProgress] = useState(0);
    const [journeyTitle, setJourneyTitle] = useState(project.journey.title);
    const [jobs, setJobs] = useState<JourneyJobItem[]>(
        project.journey.jobs.map((job) => ({
            id: makeJobId(),
            startTime: job.startTime,
            endTime: job.endTime ?? "",
            whiteTitle: job.whiteTitle,
            enterprise: job.enterprise,
            description: job.description,
        }))
    );

    const updateJob = (id: string, field: keyof Omit<JourneyJobItem, "id">, value: string) => {
        setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, [field]: value } : job)));
    };

    const addJob = () => {
        setJobs((prev) => [
            ...prev,
            {
                id: makeJobId(),
                startTime: "Novo",
                endTime: "",
                whiteTitle: "Novo cargo",
                enterprise: "Nova empresa",
                description: "Nova descricao",
            },
        ]);
    };

    const removeJob = (id: string) => {
        setJobs((prev) => {
            if (prev.length <= 1) return prev;
            return prev.filter((job) => job.id !== id);
        });
    };

    useEffect(() => {
        if (admin) return;

        const updateProgress = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const start = viewportHeight * 0.8;
            const end = viewportHeight * 0.2;
            const total = rect.height + (start - end);
            const traveled = start - rect.top;
            const progress = Math.min(Math.max(traveled / total, 0), 1);

            setLineProgress(progress);
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [admin]);

    return (
        <section className="py-24" data-purpose="career-milestones" id="journey" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {admin ? (
                            <AutoSizeInput
                                defaultValue={journeyTitle}
                                className="text-3xl md:text-4xl font-bold text-white"
                                onChange={setJourneyTitle}
                            />
                        ) : (
                            project.journey.title
                        )}
                    </h2>
                    <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block"></div>
                        <div
                            className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-brand-accent hidden md:block"
                            style={{ height: `${lineProgress * 100}%` }}
                        ></div>
                        <div className="space-y-16">

                            {(admin ? jobs : project.journey.jobs).map((job, index) => {
                                const isLeft = index % 2 === 0;
                                const isActive = index === 0;
                                const period = `${job.startTime} - ${(job.endTime || "").trim() || "Presente"}`;
                                const dotClassName = isActive
                                    ? "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-accent rounded-full border-4 border-brand-dark z-10 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                                    : "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-brand-dark z-10 hidden md:block";

                                return (
                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 relative" key={`${job.whiteTitle}-${index}`}>
                                        {admin && (
                                            <button
                                                type="button"
                                                onClick={() => removeJob((job as JourneyJobItem).id)}
                                                className={`absolute -top-3 h-6 w-6 rounded-full bg-brand-dark/95 text-xs text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45 ${isLeft ? "left-0" : "right-0"}`}
                                                title="Remover item da linha do tempo"
                                            >
                                                x
                                            </button>
                                        )}
                                        {isLeft ? (
                                            <>
                                                <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                                                    <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold rounded-full mb-2">
                                                        {admin ? (
                                                            <span className="inline-flex items-center gap-1">
                                                                <AutoSizeInput
                                                                    defaultValue={job.startTime}
                                                                    className="text-xs font-bold text-brand-accent"
                                                                    onChange={(value) => updateJob((job as JourneyJobItem).id, "startTime", value)}
                                                                />
                                                                <span>-</span>
                                                                <AutoSizeInput
                                                                    defaultValue={(job.endTime || "")}
                                                                    className="text-xs font-bold text-brand-accent"
                                                                    onChange={(value) => updateJob((job as JourneyJobItem).id, "endTime", value)}
                                                                />
                                                            </span>
                                                        ) : (
                                                            period
                                                        )}
                                                    </span>
                                                    <h4 className="text-xl font-bold text-white">
                                                        {admin ? (
                                                            <AutoSizeInput
                                                                defaultValue={job.whiteTitle}
                                                                className="text-xl font-bold text-white"
                                                                onChange={(value) => updateJob((job as JourneyJobItem).id, "whiteTitle", value)}
                                                            />
                                                        ) : (
                                                            job.whiteTitle
                                                        )}
                                                    </h4>
                                                    <p className="text-brand-accent font-medium mb-2">
                                                        {admin ? (
                                                            <AutoSizeInput
                                                                defaultValue={job.enterprise}
                                                                className="text-base font-medium text-brand-accent"
                                                                onChange={(value) => updateJob((job as JourneyJobItem).id, "enterprise", value)}
                                                            />
                                                        ) : (
                                                            job.enterprise
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-400 leading-relaxed">
                                                        {admin ? (
                                                            <textarea
                                                                value={job.description}
                                                                onChange={(e) => updateJob((job as JourneyJobItem).id, "description", e.target.value)}
                                                                className="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 text-sm text-gray-300 outline-none focus:border-brand-accent/60 resize-none"
                                                                rows={4}
                                                            />
                                                        ) : (
                                                            job.description
                                                        )}
                                                    </p>
                                                </div>
                                                <div className={dotClassName}></div>
                                                <div className="md:w-1/2 md:pl-12"></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="md:w-1/2 md:pr-12"></div>
                                                <div className={dotClassName}></div>
                                                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                                                    <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold rounded-full mb-2">
                                                        {admin ? (
                                                            <span className="inline-flex items-center gap-1">
                                                                <AutoSizeInput
                                                                    defaultValue={job.startTime}
                                                                    className="text-xs font-bold text-brand-accent"
                                                                    onChange={(value) => updateJob((job as JourneyJobItem).id, "startTime", value)}
                                                                />
                                                                <span>-</span>
                                                                <AutoSizeInput
                                                                    defaultValue={(job.endTime || "")}
                                                                    className="text-xs font-bold text-brand-accent"
                                                                    onChange={(value) => updateJob((job as JourneyJobItem).id, "endTime", value)}
                                                                />
                                                            </span>
                                                        ) : (
                                                            period
                                                        )}
                                                    </span>
                                                    <h4 className="text-xl font-bold text-white">
                                                        {admin ? (
                                                            <AutoSizeInput
                                                                defaultValue={job.whiteTitle}
                                                                className="text-xl font-bold text-white"
                                                                onChange={(value) => updateJob((job as JourneyJobItem).id, "whiteTitle", value)}
                                                            />
                                                        ) : (
                                                            job.whiteTitle
                                                        )}
                                                    </h4>
                                                    <p className="text-brand-accent font-medium mb-2">
                                                        {admin ? (
                                                            <AutoSizeInput
                                                                defaultValue={job.enterprise}
                                                                className="text-base font-medium text-brand-accent"
                                                                onChange={(value) => updateJob((job as JourneyJobItem).id, "enterprise", value)}
                                                            />
                                                        ) : (
                                                            job.enterprise
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-400 leading-relaxed">
                                                        {admin ? (
                                                            <textarea
                                                                value={job.description}
                                                                onChange={(e) => updateJob((job as JourneyJobItem).id, "description", e.target.value)}
                                                                className="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 text-sm text-gray-300 outline-none focus:border-brand-accent/60 resize-none"
                                                                rows={4}
                                                            />
                                                        ) : (
                                                            job.description
                                                        )}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}

                        </div>
                        {admin && (
                            <div className="mt-6 flex justify-center">
                                <button
                                    type="button"
                                    onClick={addJob}
                                    className="h-7 w-7 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                                    title="Adicionar item na linha do tempo"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
            </div>
        </section>

    );
}