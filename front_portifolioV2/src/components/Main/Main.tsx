export default function Main() {
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
                            System Architect &amp; Cloud Expert
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                            Java Fullstack <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
                                Infrastructure.
                            </span>
                        </h1>
                        <p className="max-w-2xl text-gray-400 text-lg md:text-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                            Designing resilient distributed systems and scalable enterprise backends with Java, Spring Boot, and AWS.
                            Bridging the gap between complex logic and cloud performance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                className="px-8 py-4 bg-brand-accent text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
                                href="#projects"
                            >
                                View Case Studies{" "}
                                <i className="fa-solid fa-chevron-right text-sm group-hover:translate-x-1 transition-transform"></i>
                            </a>
                            <a
                                className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                href="#contact"
                            >
                                Initiate Project
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/3 hidden lg:block relative group">
                        <div className="relative z-10 p-6 bg-brand-surface border border-white/10 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-xs font-mono text-gray-500">CloudArchitecture.java</span>
                            </div>
                            <pre className="text-xs font-mono text-blue-400 leading-relaxed">
                                <span className="text-purple-400">@Service</span>
                                {"\n"}
                                <span className="text-white">public class</span> Deployment {"{"}
                                {"\n  "}
                                <span className="text-gray-500">// AWS Infrastructure</span>
                                {"\n  "}
                                <span className="text-purple-400">@Autowired</span>
                                {"\n  "}
                                private CloudService aws;
                                {"\n\n  "}
                                <span className="text-white">public void</span> deploy() {"{"}
                                {"\n    "}
                                aws.scale(<span className="text-orange-400">"us-east-1"</span>);
                                {"\n    "}
                                <span className="text-gray-500">// 99.9% uptime</span>
                                {"\n  "}
                                {"}"}
                                {"\n"}
                                {"}"}
                            </pre>
                        </div>
                        <div className="absolute -top-10 -right-10 p-6 bg-blue-900/20 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 -z-10">
                            <i className="fa-brands fa-aws text-6xl text-orange-400 opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}