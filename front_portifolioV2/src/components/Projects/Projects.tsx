import { useState } from "react";

export default function Projects() {

    const [showMoreProjects, setShowMoreProjects] = useState(false);

    function toggleMoreProjects() {
        setShowMoreProjects((prev) => !prev);
    }

    return (
        <section className="py-24" data-purpose="portfolio-projects" id="projects">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Selected Works</h2>
                        <p className="text-gray-400">A collection of cloud-native enterprise solutions.</p>
                    </div>
                    <a className="text-brand-accent border-b border-brand-accent pb-1 font-medium hover:text-white hover:border-white transition-all"
                        href="#">View All Github</a>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    
                    <div
                        className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                        <div className="relative overflow-hidden aspect-video">
                            <img alt="Project 1"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Dud-Q5vv6DW_a8NdIasLu1t-wJ13v__sjdRy7y1kK3yEohnfpt7zL8aFG0ZLXK2YzY2QwFFZJwCkULbffQG4qknAz7QO4e9SISOfbVAQFl_T9NsE_GynHkrsQzS57dDSgFb4qYKkTMBvyeT-4V6GLkxfdDUtw41NOsqZwN7Tk5scl1CjhXyX_gXqHjz3gPbxR9Di8q_e_Gd-qVbj2ouLp3DucSqWXL8J7EyZYEdrPN3Kc64KKtUq0PwSlARbjrEASszmV061Hq8" />
                        </div>
                        <div className="p-8">
                            <div className="flex gap-2 mb-4">
                                <span
                                    className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">Java</span>
                                <span
                                    className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">AWS
                                    Lambda</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Serverless E-Commerce API</h3>
                            <p className="text-gray-400 mb-6">A high-performance backend processing millions of transactions
                                daily using AWS Lambda and DynamoDB.</p>
                            <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                href="#">
                                Case Study <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div
                        className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                        <div className="relative overflow-hidden aspect-video">
                            <img alt="Project 2"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9_r_nwDRSDiFIILb4YDvFBy0WmiOO1CcufpfjIklB6oewR9S17e0NyofEZa0wduE8mms_WvkUuWE23beBXct0ICA9C9VIKpx3NlPv3a-quK4Nd7IYx_EVrxfktxb_-BnW7nhTDKb42ENgDzRBJEz6QKq7ZyvHF9K3feJ57H2S8e1DfnxPfHjM7VoYiSJ6M1s8fqhCNZ4mCf9UfndWtTvO6LxFO-9v-qJ83Fjv6PQZv1DmkGNUI3-AsoeeWy0QoKPV2r_5uxcApKM" />
                        </div>
                        <div className="p-8">
                            <div className="flex gap-2 mb-4">
                                <span
                                    className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">Spring
                                    Boot</span>
                                <span
                                    className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">Docker</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Real-time Data Pipeline</h3>
                            <p className="text-gray-400 mb-6">Real-time data visualization tool for monitoring Kubernetes
                                cluster health and resource allocation.</p>
                            <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                href="#">
                                Case Study <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className={`expandable-container ${showMoreProjects ? "show" : ""}`} id="more-projects">
                    <div className="grid md:grid-cols-2 gap-8">
                        
                        <div
                            className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                            <div className="relative overflow-hidden aspect-video">
                                <img alt="Project 3"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn-K3qV_8Q5J0K8_H8X-l5V5zX8O5TzQ7B8I0Y5L9P-M9N9K8J7I6H5G4F3E2D1C0B9A8-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A" />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span
                                        className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">AWS
                                        Glue</span>
                                    <span
                                        className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">React</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Cloud-Native Analytics Dashboard</h3>
                                <p className="text-gray-400 mb-6">A comprehensive analytics engine processing large datasets
                                    via AWS Glue with a dynamic React dashboard.</p>
                                <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                    href="#">
                                    Case Study <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div
                            className="group bg-brand-dark border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all">
                            <div className="relative overflow-hidden aspect-video">
                                <img alt="Project 4"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7-H9G8F7E6D5C4B3A2Z1Y0X9W8V7U6T5S4R3Q2P1O0N9M8L7K6J5I4H3G2F1E0D9C8B7A6-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A" />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span
                                        className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">GitHub
                                        Actions</span>
                                    <span
                                        className="text-[10px] uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">Terraform</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Automated CI/CD Pipeline</h3>
                                <p className="text-gray-400 mb-6">Standardized DevOps infrastructure across 15+
                                    microservices, reducing deployment time by 60%.</p>
                                <a className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all"
                                    href="#">
                                    Case Study <i className="fa-solid fa-arrow-right text-brand-accent"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <button
                        className="px-8 py-3 bg-brand-dark border border-white/10 text-white font-medium rounded-full hover:border-brand-accent transition-all group"
                        id="btn-ver-mais-projetos" onClick={toggleMoreProjects}>
                        {showMoreProjects ? "Ver menos" : "Ver mais projetos"} <i
                            className={`fa-solid ml-2 text-xs transition-transform ${showMoreProjects
                                ? "fa-chevron-up group-hover:-translate-y-1"
                                : "fa-chevron-down group-hover:translate-y-1"
                                }`}
                            id="ver-mais-projetos-icon"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}