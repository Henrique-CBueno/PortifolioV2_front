import { useEffect, useRef, useState } from "react";

export interface ExtraField {
    key: string;
    label: string;
    defaultValue?: string;
    type?: string;
}

interface AutoSizeInputProps {
    defaultValue?: string;
    className?: string;
    onChange?: (value: string) => void;
    extraFields?: ExtraField[];
    onExtraFieldsChange?: (fields: Record<string, string>) => void;
}

export default function AutoSizeInput({
    defaultValue = "",
    className = "",
    onChange,
    extraFields,
    onExtraFieldsChange,
}: AutoSizeInputProps) {
    const [value, setValue] = useState(defaultValue);
    const [formOpen, setFormOpen] = useState(false);
    const [extraValues, setExtraValues] = useState<Record<string, string>>(
        () => Object.fromEntries((extraFields ?? []).map((f) => [f.key, f.defaultValue ?? ""]))
    );
    const mirrorRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mirrorRef.current && inputRef.current) {
            inputRef.current.style.width = mirrorRef.current.offsetWidth + 4 + "px";
        }
    }, [value]);

    useEffect(() => {
        if (!formOpen) return;
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setFormOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [formOpen]);

    const hasExtraFields = extraFields && extraFields.length > 0;

    return (
        <div
            ref={containerRef}
            className="relative inline-flex items-center"
        >
            <span
                ref={mirrorRef}
                aria-hidden="true"
                className={`invisible absolute whitespace-pre ${className}`}
            >
                {value || " "}
            </span>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange?.(e.target.value);
                }}
                className={`min-w-4 bg-transparent outline-none ${className}`}
            />
            {hasExtraFields && (
                <button
                    type="button"
                    onClick={() => setFormOpen((v) => !v)}
                    className={`absolute left-2 -top-6 h-6 w-6 rounded-full text-white/70 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${formOpen ? "bg-brand-accent/25" : "bg-brand-dark/95"}`}
                    title="Editar campos"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
            )}
            {formOpen && hasExtraFields && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl min-w-48 flex flex-col gap-2">
                    {extraFields!.map((field) => (
                        <label key={field.key} className="flex flex-col gap-1 text-xs text-gray-400">
                            {field.label}
                            <input
                                type={field.type ?? "text"}
                                value={extraValues[field.key] ?? ""}
                                onChange={(e) => {
                                    const updated = { ...extraValues, [field.key]: e.target.value };
                                    setExtraValues(updated);
                                    onExtraFieldsChange?.(updated);
                                }}
                                className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
                            />
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
