import project from "../../types/project";

export default function Footer() {

    const currentYear = new Date().getFullYear();
    const footerData = project.footer;

    return (
        <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm" data-purpose="site-footer">
        <div className="flex justify-center space-x-6 mb-6">
            {footerData.socialLinks.map((social) => (
                <a
                    key={social.ariaLabel}
                    className="hover:text-white transition-colors"
                    href={social.href}
                    aria-label={social.ariaLabel}
                >
                    <i className={`${social.icon} text-xl`}></i>
                </a>
            ))}
        </div>
        <p>© {currentYear} {footerData.portfolioName}. {footerData.rightsText}</p>
    </footer>
    )
}