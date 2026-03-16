import { useState } from "react";
import project, { post_portifolio } from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";

export default function Contact({ admin }: { admin?: boolean }) {
    const [contactData, setContactData] = useState({
        ...project.contact,
        form: { ...project.contact.form },
    });

    return (
        <section className="py-24 bg-brand-surface" data-purpose="contact-form-section" id="contact">
            <div
                className="max-w-4xl mx-auto px-6 bg-brand-dark border border-white/10 rounded-3xl p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    {admin ? (
                        <AutoSizeInput
                            defaultValue={contactData.title}
                            className="text-3xl md:text-5xl font-bold text-white"
                            onChange={(value) => setContactData((prev) => ({ ...prev, title: value }))}
                        />
                    ) : (
                        contactData.title
                    )}
                </h2>
                <p className="text-gray-400 mb-10 text-lg">
                    {admin ? (
                        <AutoSizeInput
                            defaultValue={contactData.subtitle}
                            className="text-gray-400 text-lg"
                            onChange={(value) => setContactData((prev) => ({ ...prev, subtitle: value }))}
                        />
                    ) : (
                        contactData.subtitle
                    )}
                </p>
                <form className="space-y-6 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={contactData.form.nameLabel}
                                        className="text-sm font-medium text-gray-400"
                                        onChange={(value) =>
                                            setContactData((prev) => ({ ...prev, form: { ...prev.form, nameLabel: value } }))
                                        }
                                    />
                                ) : (
                                    contactData.form.nameLabel
                                )}
                            </label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder={contactData.form.namePlaceholder} type="text" />
                            {admin && (
                                <AutoSizeInput
                                    defaultValue={contactData.form.namePlaceholder}
                                    className="text-xs text-gray-500"
                                    onChange={(value) =>
                                        setContactData((prev) => ({ ...prev, form: { ...prev.form, namePlaceholder: value } }))
                                    }
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={contactData.form.emailLabel}
                                        className="text-sm font-medium text-gray-400"
                                        onChange={(value) =>
                                            setContactData((prev) => ({ ...prev, form: { ...prev.form, emailLabel: value } }))
                                        }
                                    />
                                ) : (
                                    contactData.form.emailLabel
                                )}
                            </label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder={contactData.form.emailPlaceholder} type="email" />
                            {admin && (
                                <AutoSizeInput
                                    defaultValue={contactData.form.emailPlaceholder}
                                    className="text-xs text-gray-500"
                                    onChange={(value) =>
                                        setContactData((prev) => ({ ...prev, form: { ...prev.form, emailPlaceholder: value } }))
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">
                            {admin ? (
                                <AutoSizeInput
                                    defaultValue={contactData.form.detailsLabel}
                                    className="text-sm font-medium text-gray-400"
                                    onChange={(value) =>
                                        setContactData((prev) => ({ ...prev, form: { ...prev.form, detailsLabel: value } }))
                                    }
                                />
                            ) : (
                                contactData.form.detailsLabel
                            )}
                        </label>
                        <textarea
                            className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                            placeholder={contactData.form.detailsPlaceholder} rows={4}></textarea>
                        {admin && (
                            <AutoSizeInput
                                defaultValue={contactData.form.detailsPlaceholder}
                                className="text-xs text-gray-500"
                                onChange={(value) =>
                                    setContactData((prev) => ({ ...prev, form: { ...prev.form, detailsPlaceholder: value } }))
                                }
                            />
                        )}
                    </div>
                    <button
                        className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all transform active:scale-[0.98]"
                        type={admin ? "button" : "submit"}
                        onClick={() => {
                            if (admin) return;
                            post_portifolio(project);
                        }}>
                        {admin ? (
                            <AutoSizeInput
                                defaultValue={contactData.form.submitButtonText}
                                className="text-white font-bold"
                                onChange={(value) =>
                                    setContactData((prev) => ({ ...prev, form: { ...prev.form, submitButtonText: value } }))
                                }
                            />
                        ) : (
                            contactData.form.submitButtonText
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}