import { useEffect, useRef, useState } from "react";
import project from "../../types/project";

export default function Journey() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [lineProgress, setLineProgress] = useState(0);

    useEffect(() => {
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
    }, []);

    return (
        <section className="py-24" data-purpose="career-milestones" id="journey" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.journey.title}</h2>
                    <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block"></div>
                    <div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-brand-accent hidden md:block"
                        style={{ height: `${lineProgress * 100}%` }}
                    ></div>
                    <div className="space-y-16">

                        {project.journey.jobs.map((job, index) => {
                            const isLeft = index % 2 === 0;
                            const isActive = index === 0;
                            const period = `${job.startTime} - ${job.endTime ?? "Presente"}`;
                            const dotClassName = isActive
                                ? "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-accent rounded-full border-4 border-brand-dark z-10 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                                : "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-brand-dark z-10 hidden md:block";

                            return (
                                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 relative" key={`${job.whiteTitle}-${index}`}>
                                    {isLeft ? (
                                        <>
                                            <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                                                <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold rounded-full mb-2">
                                                    {period}
                                                </span>
                                                <h4 className="text-xl font-bold text-white">{job.whiteTitle}</h4>
                                                <p className="text-brand-accent font-medium mb-2">{job.enterprise}</p>
                                                <p className="text-sm text-gray-400 leading-relaxed">{job.description}</p>
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
                                                    {period}
                                                </span>
                                                <h4 className="text-xl font-bold text-white">{job.whiteTitle}</h4>
                                                <p className="text-brand-accent font-medium mb-2">{job.enterprise}</p>
                                                <p className="text-sm text-gray-400 leading-relaxed">{job.description}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        
                    </div>
                </div>
            </div>
        </section>

    )
}