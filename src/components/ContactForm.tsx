import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { BOOKING_FORM_ENDPOINT, EMAIL } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
    de: {
        name: "Name",
        email: "E-Mail",
        subject: "Betreff",
        subjectPh: "z. B. Sommerfest 12.06. in München",
        message: "Nachricht",
        messagePh: "Erzählt uns kurz von eurem Event …",
        send: "Anfrage senden",
        sending: "Wird gesendet …",
        successTitle: "Danke – Anfrage ist da!",
        successText: "Wir melden uns per E-Mail bei dir.",
        error: "Da ist etwas schiefgelaufen. Schreib uns bitte direkt an",
        privacy: "Versand über Formspree – siehe Datenschutz.",
        mailSubject: "Booking-Anfrage",
    },
    en: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        subjectPh: "e.g. Summer party, 12 June, Munich",
        message: "Message",
        messagePh: "Tell us a bit about your event …",
        send: "Send request",
        sending: "Sending …",
        successTitle: "Thanks – we got it!",
        successText: "We'll get back to you by email.",
        error: "Something went wrong. Please email us directly at",
        privacy: "Sent via Formspree – see privacy policy.",
        mailSubject: "Booking request",
    },
} as const;

const field =
    "mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm font-normal normal-case tracking-normal text-white outline-none transition placeholder:text-white/30 focus:border-cat-orange";
const label = "block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50";

/**
 * Booking/contact form: name, email, subject, message.
 * Sends straight to our inbox via Formspree (BOOKING_FORM_ENDPOINT in config/site.ts) – no email app needed.
 */
const ContactForm = () => {
    const { lang } = useLanguage();
    const t = copy[lang];
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
        if (data._gotcha) return; // a bot filled the hidden field
        setStatus("sending");
        try {
            const res = await fetch(BOOKING_FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    _subject: `${t.mailSubject}: ${data.subject} – ${data.name}`,
                    _replyto: data.email,
                    page: window.location.pathname,
                }),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="rounded-3xl border border-cat-orange/40 bg-cat-orange/10 p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cat-orange text-black">
                    <Check className="h-6 w-6" />
                </span>
                <p className="mt-4 text-xl font-black uppercase">{t.successTitle}</p>
                <p className="mt-2 text-sm text-white/70">{t.successText}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="grid grid-cols-2 gap-3">
                <label className={label}>
                    {t.name}
                    <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className={label}>
                    {t.email}
                    <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
            </div>
            <label className={label}>
                {t.subject}
                <input name="subject" required placeholder={t.subjectPh} className={field} />
            </label>
            <label className={label}>
                {t.message}
                <textarea name="message" required rows={4} placeholder={t.messagePh} className={`${field} resize-none`} />
            </label>

            {/* Honeypot: invisible to people, bots fill it in */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {status === "error" && (
                <p className="text-sm text-red-400">
                    {t.error} <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>
                </p>
            )}

            <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cat-orange px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white disabled:opacity-60"
            >
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> {t.sending}</> : <>{t.send} <ArrowUpRight className="h-4 w-4" /></>}
            </button>
            <p className="text-center text-[10px] text-white/35">{t.privacy}</p>
        </form>
    );
};

export default ContactForm;
