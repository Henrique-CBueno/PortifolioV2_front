

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        toggleMoreTech?: () => void;
        toggleMoreProjects?: () => void;
    }
}

export default function MouseGlow() {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let rafId = 0;
        const listenerDisposers: Array<() => void> = [];

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            rafId = requestAnimationFrame(animate);
        };

        const clearInteractiveListeners = () => {
            while (listenerDisposers.length > 0) {
                const dispose = listenerDisposers.pop();
                dispose?.();
            }
        };

        const setupCursorListeners = () => {
            clearInteractiveListeners();

            const interactiveElements = document.querySelectorAll<HTMLElement>(
                "a, button, input, textarea"
            );

            interactiveElements.forEach((el) => {
                const onEnter = () => {
                    cursor.style.width = "50px";
                    cursor.style.height = "50px";
                    cursor.style.opacity = "0.3";
                    cursor.style.filter = "blur(15px)";
                };

                const onLeave = () => {
                    cursor.style.width = "20px";
                    cursor.style.height = "20px";
                    cursor.style.opacity = "0.6";
                    cursor.style.filter = "blur(8px)";
                };

                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);

                listenerDisposers.push(() => {
                    el.removeEventListener("mouseenter", onEnter);
                    el.removeEventListener("mouseleave", onLeave);
                });
            });
        };

        const toggleMoreTech = () => {
            const moreTech = document.getElementById("more-tech");
            const btn = document.getElementById("btn-ver-mais");

            if (!moreTech || !btn) return;

            if (moreTech.classList.contains("show")) {
                moreTech.classList.remove("show");
                btn.innerHTML =
                    'Ver mais <i class="fa-solid fa-chevron-down ml-2 text-xs group-hover:translate-y-1 transition-transform" id="ver-mais-icon"></i>';
            } else {
                moreTech.classList.add("show");
                btn.innerHTML =
                    'Ver menos <i class="fa-solid fa-chevron-up ml-2 text-xs group-hover:-translate-y-1 transition-transform" id="ver-mais-icon"></i>';
            }

            setupCursorListeners();
        };

        const toggleMoreProjects = () => {
            const moreProjects = document.getElementById("more-projects");
            const btn = document.getElementById("btn-ver-mais-projetos");

            if (!moreProjects || !btn) return;

            if (moreProjects.classList.contains("show")) {
                moreProjects.classList.remove("show");
                btn.innerHTML =
                    'Ver mais projetos <i class="fa-solid fa-chevron-down ml-2 text-xs group-hover:translate-y-1 transition-transform" id="ver-mais-projetos-icon"></i>';
            } else {
                moreProjects.classList.add("show");
                btn.innerHTML =
                    'Ver menos <i class="fa-solid fa-chevron-up ml-2 text-xs group-hover:-translate-y-1 transition-transform" id="ver-mais-projetos-icon"></i>';
            }

            setupCursorListeners();
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        setupCursorListeners();
        rafId = requestAnimationFrame(animate);

        window.toggleMoreTech = toggleMoreTech;
        window.toggleMoreProjects = toggleMoreProjects;

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
            clearInteractiveListeners();

            if (window.toggleMoreTech === toggleMoreTech) {
                delete window.toggleMoreTech;
            }

            if (window.toggleMoreProjects === toggleMoreProjects) {
                delete window.toggleMoreProjects;
            }
        };
    }, []);

    return <div data-purpose="mouse-glow" id="custom-cursor" ref={cursorRef}></div>;
}