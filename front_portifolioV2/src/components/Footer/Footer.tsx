export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm" data-purpose="site-footer">
        <div className="flex justify-center space-x-6 mb-6">
            <a className="hover:text-white transition-colors" href="#"><i className="fa-brands fa-github text-xl"></i></a>
            <a className="hover:text-white transition-colors" href="#"><i className="fa-brands fa-linkedin text-xl"></i></a>
            <a className="hover:text-white transition-colors" href="#"><i className="fa-brands fa-twitter text-xl"></i></a>
        </div>
        <p>© {currentYear} Henrique Bueno Portifolio. All rights reserved.</p>
    </footer>
    )
}