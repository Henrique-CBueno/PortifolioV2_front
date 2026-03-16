import { useEffect, useState } from "react";
import project from "../../../types/project";
import AutoSizeInput from "../../ui/AutoSizeInput";
import { patchAdminSection } from "../../../utils/adminDraft";

export default function NameTitle({ admin }: { admin?: boolean }) {
    const [boingId, setBoingId] = useState(0);
    const [whiteTitle, setWhiteTitle] = useState(project.header.whiteTitle.trim());

    useEffect(() => {
        if (!admin) return;

        patchAdminSection("header", { whiteTitle });
    }, [admin, whiteTitle]);

    return (
        !admin ? (
            <div
                className="flex cursor-default select-none items-center justify-center gap-2 text-2xl font-bold tracking-tighter text-white"
                onMouseEnter={() => setBoingId((id) => id + 1)}
            >
                <span key={`left-${boingId}`} className="name-title-bracket-left inline-block text-brand-accent">
                    &lt;
                </span>
                {project.header.whiteTitle.trim()}
                <span key={`right-${boingId}`} className="name-title-bracket-right inline-block text-brand-accent">
                    /&gt;
                </span>
            </div>
        ) : (
            <div
                className="flex cursor-default select-none items-center justify-center gap-2 text-2xl font-bold tracking-tighter text-white"
                onMouseEnter={() => setBoingId((id) => id + 1)}
            >
                <span key={`left-${boingId}`} className="name-title-bracket-left inline-block text-brand-accent">
                    &lt;
                </span>
                <AutoSizeInput
                    defaultValue={whiteTitle}
                    className="text-2xl font-bold tracking-tighter"
                    onChange={setWhiteTitle}
                />
                <span key={`right-${boingId}`} className="name-title-bracket-right inline-block text-brand-accent">
                    /&gt;
                </span>
            </div>
        )
    );
}