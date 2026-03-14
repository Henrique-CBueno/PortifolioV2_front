import fotoHenrique from "../../../public/avatar-2-semBG.png";

export default function About() {
    return (
        <section className="py-24 bg-brand-surface" data-purpose="about-me-details" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-white/10 group">
                            <img alt="Developer Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={fotoHenrique} />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-brand-accent -z-10 rounded-xl"></div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6">Building the backend of tomorrow.</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            I am a software engineer with over 5 years of experience in developing distributed systems and cloud-native applications. My passion lies in solving complex architectural challenges and optimizing performance in high-traffic environments.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Based in the cloud, I leverage AWS services to ensure high availability and scalability for every project I touch, from initial concept to production deployment.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-brand-dark border border-white/5">
                                <span className="block text-brand-accent font-bold text-2xl">5+</span>
                                <span className="text-sm text-gray-500">Years Exp.</span>
                            </div>
                            <div className="p-4 rounded-lg bg-brand-dark border border-white/5">
                                <span className="block text-brand-accent font-bold text-2xl">20+</span>
                                <span className="text-sm text-gray-500">Projects Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}