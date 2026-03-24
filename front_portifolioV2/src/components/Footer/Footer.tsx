import { useEffect, useState } from "react";
import project from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import DraggableReorderList from "../ui/DraggableReorderList";
import { setAdminSection } from "../../utils/adminDraft";
import { normalizeHref, shouldOpenInNewTab } from "../../utils/url";

interface SocialLinkItem {
    id: string;
    icon: string;
    href: string;
    ariaLabel: string;
}

interface SocialLinkSeedItem {
    icon?: string;
    href?: string;
    ariaLabel?: string;
}

const makeSocialId = () => `social-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const defaultFooterData = {
    portfolioName: "",
    rightsText: "",
    socialLinks: [] as SocialLinkSeedItem[],
};

export default function Footer({ admin }: { admin?: boolean }) {

    const currentYear = new Date().getFullYear();
    const footer = project?.footer ?? defaultFooterData;
    const [portfolioName, setPortfolioName] = useState(footer.portfolioName ?? "");
    const [rightsText, setRightsText] = useState(footer.rightsText ?? "");
    const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>(
        (footer.socialLinks ?? []).map((social: SocialLinkSeedItem) => ({
            id: makeSocialId(),
            icon: social.icon ?? "",
            href: social.href ?? "",
            ariaLabel: social.ariaLabel ?? "",
        }))
    );

    const moveSocial = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setSocialLinks((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    };

    const updateSocial = (id: string, field: keyof Omit<SocialLinkItem, "id">, value: string) => {
        setSocialLinks((prev) => prev.map((social) => (social.id === id ? { ...social, [field]: value } : social)));
    };

    useEffect(() => {
        if (!admin) return;

        setAdminSection("footer", {
            portfolioName,
            rightsText,
            socialLinks: socialLinks.map((social) => ({
                icon: social.icon,
                href: social.href,
                ariaLabel: social.ariaLabel,
            })),
        });
    }, [admin, portfolioName, rightsText, socialLinks]);

    return (
        <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm" data-purpose="site-footer">
            {admin ? (
                <>
                    <DraggableReorderList
                        items={socialLinks}
                        getKey={(social) => social.id}
                        onReorder={moveSocial}
                        containerClassName="flex justify-center gap-4 mb-6"
                        itemClassName={(state) =>
                            `relative rounded-full p-2 transition-all duration-200 ${
                                state.isDragging
                                    ? "opacity-70 ring-1 ring-brand-accent/50"
                                    : state.isDragOver
                                        ? "ring-1 ring-brand-accent/50"
                                        : ""
                            }`
                        }
                        renderContent={(social) => (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setSocialLinks((prev) => (prev.length <= 1 ? prev : prev.filter((item) => item.id !== social.id)))}
                                    className="absolute right-7 -top-3 h-5 w-5 rounded-full bg-brand-dark/95 text-[10px] text-red-300/85 ring-1 ring-white/25 transition-all hover:text-red-200 hover:ring-white/45 z-20"
                                    title="Remover social"
                                >
                                    x
                                </button>
                                <a
                                    className="hover:text-white transition-colors"
                                    href={normalizeHref(social.href)}
                                    target={shouldOpenInNewTab(social.href) ? "_blank" : undefined}
                                    rel={shouldOpenInNewTab(social.href) ? "noopener noreferrer" : undefined}
                                    aria-label={social.ariaLabel}
                                >
                                    <i className={`${social.icon} text-xl`}></i>
                                </a>
                                <AutoSizeInput
                                    defaultValue={social.ariaLabel}
                                    className="text-xs text-gray-400"
                                    onChange={(value) => updateSocial(social.id, "ariaLabel", value)}
                                    extraFields={[
                                        { key: "icon", label: "Icon Class", defaultValue: social.icon },
                                        { key: "href", label: "Href", defaultValue: social.href },
                                    ]}
                                    onExtraFieldsChange={(fields) => {
                                        updateSocial(social.id, "icon", fields.icon ?? social.icon);
                                        updateSocial(social.id, "href", fields.href ?? social.href);
                                    }}
                                />
                            </>
                        )}
                    />
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() =>
                                setSocialLinks((prev) => [
                                    ...prev,
                                    {
                                        id: makeSocialId(),
                                        icon: "fa-brands fa-github",
                                        href: "#",
                                        ariaLabel: "Novo",
                                    },
                                ])
                            }
                            className="h-7 w-7 rounded-full bg-brand-dark/95 text-sm text-white/75 ring-1 ring-white/25 transition-all hover:text-white hover:ring-white/45"
                            title="Adicionar social"
                        >
                            +
                        </button>
                    </div>
                    <p>
                        © {currentYear}{" "}
                        <AutoSizeInput
                            defaultValue={portfolioName}
                            className="text-sm text-gray-500"
                            onChange={setPortfolioName}
                        />
                        .{" "}
                        <AutoSizeInput
                            defaultValue={rightsText}
                            className="text-sm text-gray-500"
                            onChange={setRightsText}
                        />
                    </p>
                </>
            ) : (
                <>
                    <div className="flex justify-center space-x-6 mb-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.id}
                                className="hover:text-white transition-colors"
                                href={normalizeHref(social.href)}
                                target={shouldOpenInNewTab(social.href) ? "_blank" : undefined}
                                rel={shouldOpenInNewTab(social.href) ? "noopener noreferrer" : undefined}
                                aria-label={social.ariaLabel}
                            >
                                <i className={`${social.icon} text-xl`}></i>
                            </a>
                        ))}
                    </div>
                    <p>© {currentYear} {portfolioName}. {rightsText}</p>
                </>
            )}
        </footer>
    );
}