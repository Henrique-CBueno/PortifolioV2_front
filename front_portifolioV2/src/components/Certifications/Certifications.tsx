import { useRef, useState, useEffect } from "react";
import project from "../../types/project";

export default function Certifications() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [activePage, setActivePage] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);
    const certificationsData = project.certifications;

    function getCards() {
        const slider = sliderRef.current;
        if (!slider) return [];
        return Array.from(slider.querySelectorAll<HTMLElement>("[data-card]"));
    }

    function calculateCardsPerView() {
        const width = window.innerWidth;

        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    useEffect(() => {
        function updateCardsPerView() {
            setCardsPerView(calculateCardsPerView());
        }

        updateCardsPerView();

        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    const totalPages = Math.ceil(certificationsData.items.length / cardsPerView);

    function scrollToPage(page: number) {
        const cards = getCards();

        if (!cards.length) return;

        const safePage = Math.max(0, Math.min(page, totalPages - 1));
        const targetIndex = safePage * cardsPerView;

        const targetCard = cards[targetIndex];

        sliderRef.current?.scrollTo({
            left: targetCard.offsetLeft,
            behavior: "smooth",
        });

        setActivePage(safePage);
    }

    function scrollSlider(direction: "left" | "right") {
        const nextPage = direction === "left" ? activePage - 1 : activePage + 1;
        scrollToPage(nextPage);
    }

    function handleSliderScroll() {
        const slider = sliderRef.current;
        const cards = getCards();

        if (!slider || !cards.length) return;

        const viewportCenter = slider.scrollLeft + slider.clientWidth / 2;

        const nearestIndex = cards.reduce((closestIndex, card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const closestCardCenter =
                cards[closestIndex].offsetLeft + cards[closestIndex].offsetWidth / 2;

            const currentDistance = Math.abs(cardCenter - viewportCenter);
            const closestDistance = Math.abs(closestCardCenter - viewportCenter);

            return currentDistance < closestDistance ? index : closestIndex;
        }, 0);

        const page = Math.floor(nearestIndex / cardsPerView);

        if (page !== activePage) {
            setActivePage(page);
        }
    }

    return (
        <section
            className="py-24 bg-brand-dark overflow-hidden"
            id="certifications"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {certificationsData.title}
                    </h2>
                    <div className="h-1.5 w-20 bg-brand-accent rounded-full"></div>
                </div>

                <div className="relative">
                    <div
                        className="flex overflow-x-auto gap-6 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                        ref={sliderRef}
                        onScroll={handleSliderScroll}
                    >
                        {certificationsData.items.map((certification) => (
                            <div
                                key={certification.title}
                                data-card
                                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                            >
                                <div className="p-8 bg-brand-surface border border-white/5 rounded-2xl hover:border-brand-accent/50 transition-all group h-full flex flex-col">
                                    <div
                                        className={`w-16 h-16 ${certification.iconWrapperClassName} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                    >
                                        <i
                                            className={`fa-solid ${certification.icon} text-3xl ${certification.iconClassName}`}
                                        ></i>
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-2">
                                        {certification.title}
                                    </h4>

                                    <p className="text-brand-accent text-sm font-medium mb-4 uppercase tracking-wider">
                                        {certification.issuer}
                                    </p>

                                    <p className="text-gray-400 text-sm leading-relaxed grow">
                                        {certification.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CONTROLES */}
                    <div className="flex flex-col items-center mt-12 gap-6">
                        <div className="flex items-center gap-6">
                            <button
                                className="p-4 rounded-full border border-white/10 hover:border-brand-accent hover:text-brand-accent transition-all disabled:opacity-40"
                                onClick={() => scrollSlider("left")}
                                disabled={activePage === 0}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>

                            <button
                                className="p-4 rounded-full border border-white/10 hover:border-brand-accent hover:text-brand-accent transition-all disabled:opacity-40"
                                onClick={() => scrollSlider("right")}
                                disabled={activePage === totalPages - 1}
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>

                        {/* INDICADORES */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToPage(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activePage === index
                                            ? "w-8 bg-brand-accent"
                                            : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}