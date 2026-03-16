import { useEffect, useState } from "react";
import About from "../components/About/About";
import Certifications from "../components/Certifications/Certifications";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Journey from "../components/Journey/Journey";
import Main from "../components/Main/Main";
import MouseGlow from "../components/MouseGlow";
import Projects from "../components/Projects/Projects";
import Stacks from "../components/Stacks/Stacks";
import project from "../types/project";
import {
    clearAdminDraftDirtyFlag,
    getAdminDraftProject,
    isAdminDraftDirty,
} from "../utils/adminDraft";

export default function AdminPage() {
    const [showSaveButton, setShowSaveButton] = useState(false);

    useEffect(() => {
        const syncDirtyState = () => setShowSaveButton(isAdminDraftDirty());

        syncDirtyState();
        window.addEventListener("admin-draft-change", syncDirtyState);

        return () => {
            window.removeEventListener("admin-draft-change", syncDirtyState);
        };
    }, []);

    const handleSaveDraft = () => {
        const fullProjectPayload = getAdminDraftProject(project);
        console.log(fullProjectPayload);
        clearAdminDraftDirtyFlag();
    };

    return (
        <div className="text-gray-300 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
            <MouseGlow />
            <Header admin={true} />
            <Main admin={true} />
            <About admin={true} />
            <Journey admin={true} />
            <Stacks admin={true} />
            <Projects admin={true} />
            <Certifications admin={true} />
            <Contact admin={true} />
            <Footer admin={true} />
            {showSaveButton && (
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="fixed bottom-6 right-6 z-[120] rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/30 transition-all hover:bg-blue-600"
                >
                    Salvar
                </button>
            )}
        </div>
    );
}