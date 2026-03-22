import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import project, { post_contact_email } from "../../types/project";
import AutoSizeInput from "../ui/AutoSizeInput";
import { setAdminSection } from "../../utils/adminDraft";

export default function Contact({ admin }: { admin?: boolean }) {
    const [contactData, setContactData] = useState({
        ...project.contact,
        form: { ...project.contact.form },
    });
    const [visitorForm, setVisitorForm] = useState({
        name: "",
        email: "",
        details: "",
    });
    const [isSending, setIsSending] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        if (!admin) return;

        setAdminSection("contact", contactData);
    }, [admin, contactData]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (admin || isSending) return;

        setSubmitMessage("");
        setIsSending(true);

        try {
            await post_contact_email(visitorForm);
            setSubmitMessage("Mensagem enviada com sucesso.");
            setVisitorForm({ name: "", email: "", details: "" });
        } catch {
            setSubmitMessage("Nao foi possivel enviar sua mensagem. Tente novamente.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="py-24 bg-brand-surface" data-purpose="contact-form-section" id="contact">
            <div
                className="max-w-4xl mx-auto px-6 bg-brand-dark border border-white/10 rounded-3xl p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    {admin ? (
                        <AutoSizeInput
                            defaultValue={contactData.title}
                            className="text-3xl md:text-5xl font-bold text-white"
                            onChange={(value) => setContactData({ ...contactData, title: value })}
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
                            onChange={(value) => setContactData({ ...contactData, subtitle: value })}
                        />
                    ) : (
                        contactData.subtitle
                    )}
                </p>
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">
                                {admin ? (
                                    <AutoSizeInput
                                        defaultValue={contactData.form.nameLabel}
                                        className="text-sm font-medium text-gray-400"
                                        onChange={(value) =>
                                            setContactData({ ...contactData, form: { ...contactData.form, nameLabel: value } })
                                        }
                                    />
                                ) : (
                                    contactData.form.nameLabel
                                )}
                            </label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder={contactData.form.namePlaceholder}
                                type="text"
                                value={visitorForm.name}
                                onChange={(event) => setVisitorForm((prev) => ({ ...prev, name: event.target.value }))}
                                required={!admin}
                            />
                            {admin && (
                                <AutoSizeInput
                                    defaultValue={contactData.form.namePlaceholder}
                                    className="text-xs text-gray-500"
                                    onChange={(value) =>
                                        setContactData({ ...contactData, form: { ...contactData.form, namePlaceholder: value } })
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
                                            setContactData({ ...contactData, form: { ...contactData.form, emailLabel: value } })
                                        }
                                    />
                                ) : (
                                    contactData.form.emailLabel
                                )}
                            </label>
                            <input
                                className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                                placeholder={contactData.form.emailPlaceholder}
                                type="email"
                                value={visitorForm.email}
                                onChange={(event) => setVisitorForm((prev) => ({ ...prev, email: event.target.value }))}
                                required={!admin}
                            />
                            {admin && (
                                <AutoSizeInput
                                    defaultValue={contactData.form.emailPlaceholder}
                                    className="text-xs text-gray-500"
                                    onChange={(value) =>
                                        setContactData({ ...contactData, form: { ...contactData.form, emailPlaceholder: value } })
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
                                        setContactData({ ...contactData, form: { ...contactData.form, detailsLabel: value } })
                                    }
                                />
                            ) : (
                                contactData.form.detailsLabel
                            )}
                        </label>
                        <textarea
                            className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-white transition-all"
                            placeholder={contactData.form.detailsPlaceholder}
                            rows={4}
                            value={visitorForm.details}
                            onChange={(event) => setVisitorForm((prev) => ({ ...prev, details: event.target.value }))}
                            required={!admin}
                        ></textarea>
                        {admin && (
                            <AutoSizeInput
                                defaultValue={contactData.form.detailsPlaceholder}
                                className="text-xs text-gray-500"
                                onChange={(value) =>
                                    setContactData({ ...contactData, form: { ...contactData.form, detailsPlaceholder: value } })
                                }
                            />
                        )}
                    </div>
                    <button
                        className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all transform active:scale-[0.98]"
                        type={admin ? "button" : "submit"}
                        disabled={!admin && isSending}
                    >
                        {admin ? (
                            <AutoSizeInput
                                defaultValue={contactData.form.submitButtonText}
                                className="text-white font-bold"
                                onChange={(value) =>
                                    setContactData({ ...contactData, form: { ...contactData.form, submitButtonText: value } })
                                }
                            />
                        ) : (
                            isSending ? "Enviando..." : contactData.form.submitButtonText
                        )}
                    </button>
                    {!admin && submitMessage && <p className="text-sm text-gray-300">{submitMessage}</p>}
                </form>
            </div>
        </section>
    );
}