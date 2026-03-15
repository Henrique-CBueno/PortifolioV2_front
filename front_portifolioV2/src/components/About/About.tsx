import project from "../../types/project";

export default function About() {
    return (
        <section className="py-24 bg-brand-surface" data-purpose="about-me-details" id={project.about.id}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-white/10 group">
                            <img alt="Developer Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={project.about.img} />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-brand-accent -z-10 rounded-xl"></div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6">{project.about.title}</h3>

                        {project.about.description.map((desc, index) => (
                            <p
                                className={`text-gray-400 leading-relaxed ${index !== project.about.description.length - 1 ? "mb-6" : "mb-8"}`}
                            >
                                {desc}
                            </p>
                        ))}

                        <div className="grid grid-cols-2 gap-4">

                            {
                                project.about.cards.map((card) => (
                                    <div className="p-4 rounded-lg bg-brand-dark border border-white/5">
                                        <span className="block text-brand-accent font-bold text-2xl">{card.emphasis}</span>
                                        <span className="text-sm text-gray-500">{card.helperText}</span>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}