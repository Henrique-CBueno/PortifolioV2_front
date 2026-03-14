import { useState } from "react";

export default function Stacks() {
    const [showMoreTech, setShowMoreTech] = useState(false);

    function toggleMoreTech() {
        setShowMoreTech((prev) => !prev);
    }

    return (
        <section className="py-24 bg-brand-surface" data-purpose="technology-stack" id="stack">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Technology Stack</h2>
                    <div className="h-1.5 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div
                        className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                        <i className="fa-brands fa-java text-5xl text-brand-accent mb-4"></i>
                        <h4 className="text-white font-bold">Java</h4>
                        <p className="text-xs text-gray-500 mt-2">Enterprise Logic</p>
                    </div>

                    <div
                        className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                        <i className="fa-brands fa-aws text-5xl text-orange-400 mb-4"></i>
                        <h4 className="text-white font-bold">AWS</h4>
                        <p className="text-xs text-gray-500 mt-2">Cloud Infrastructure</p>
                    </div>

                    <div
                        className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                        <i className="fa-solid fa-leaf text-5xl text-green-500 mb-4"></i>
                        <h4 className="text-white font-bold">Spring Boot</h4>
                        <p className="text-xs text-gray-500 mt-2">Microservices</p>
                    </div>

                    <div
                        className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                        <i className="fa-brands fa-docker text-5xl text-blue-400 mb-4"></i>
                        <h4 className="text-white font-bold">Docker</h4>
                        <p className="text-xs text-gray-500 mt-2">Containerization</p>
                    </div>

                    <div
                        className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                        <i className="fa-brands fa-react text-5xl text-cyan-400 mb-4"></i>
                        <h4 className="text-white font-bold">React</h4>
                        <p className="text-xs text-gray-500 mt-2">Modern Frontend</p>
                    </div>

                </div>
                <div className={`expandable-container ${showMoreTech ? "show" : ""}`} id="more-tech">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-database text-5xl text-blue-500 mb-4"></i>
                            <h4 className="text-white font-bold">PostgreSQL</h4>
                            <p className="text-xs text-gray-500 mt-2">Relational DB</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-bolt text-5xl text-red-500 mb-4"></i>
                            <h4 className="text-white font-bold">Redis</h4>
                            <p className="text-xs text-gray-500 mt-2">Caching Layer</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-dharmachakra text-5xl text-blue-600 mb-4"></i>
                            <h4 className="text-white font-bold">Kubernetes</h4>
                            <p className="text-xs text-gray-500 mt-2">Orchestration</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-brands fa-github-alt text-5xl text-white mb-4"></i>
                            <h4 className="text-white font-bold">Jenkins</h4>
                            <p className="text-xs text-gray-500 mt-2">Automation CI/CD</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-layer-group text-5xl text-purple-500 mb-4"></i>
                            <h4 className="text-white font-bold">Terraform</h4>
                            <p className="text-xs text-gray-500 mt-2">IaC Management</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-server text-5xl text-orange-600 mb-4"></i>
                            <h4 className="text-white font-bold">Hibernate</h4>
                            <p className="text-xs text-gray-500 mt-2">ORM Framework</p>
                        </div>
                        <div
                            className="tech-card p-8 bg-brand-dark rounded-2xl border border-white/5 text-center transition-all duration-300">
                            <i className="fa-solid fa-terminal text-5xl text-gray-400 mb-4"></i>
                            <h4 className="text-white font-bold">SQL</h4>
                            <p className="text-xs text-gray-500 mt-2">Data Querying</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <button
                        className="px-8 py-3 bg-brand-dark border cursor-pointer border-white/10 text-white font-medium rounded-full hover:border-brand-accent transition-all group"
                        id="btn-ver-mais" onClick={toggleMoreTech}>
                        {showMoreTech ? "Ver menos" : "Ver mais"} <i
                            className={`fa-solid ml-2 text-xs transition-transform ${showMoreTech
                                ? "fa-chevron-up group-hover:-translate-y-1"
                                : "fa-chevron-down group-hover:translate-y-1"
                                }`}
                            id="ver-mais-icon"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}