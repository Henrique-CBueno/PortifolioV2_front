export default function Contact() {

    return (
        <section className="py-24 bg-brand-surface" data-purpose="contact-form-section" id="contact">
            <div
                className="max-w-4xl mx-auto px-6 bg-brand-dark border border-white/10 rounded-3xl p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start a project.</h2>
                <p className="text-gray-400 mb-10 text-lg">Interested in working together? Let's discuss your next
                    cloud-native architecture or Java backend project.</p>
                <form className="space-y-6 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder="John Doe" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder="john@example.com" type="email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Project Details</label>
                        <textarea
                            className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                            placeholder="Tell me about your project..." rows={4}></textarea>
                    </div>
                    <button
                        className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all transform active:scale-[0.98]"
                        type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}