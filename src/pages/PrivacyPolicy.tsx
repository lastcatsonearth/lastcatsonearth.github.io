import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen relative bg-background text-foreground flex flex-col justify-between">
            <main className="relative max-w-2xl mx-auto px-6 py-12 w-full">
                {/* Back navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    <span>Back to main page</span>
                </Link>

                <h1 className="text-3xl font-serif font-bold tracking-tight mb-8">
                    Datenschutzerklärung
                </h1>

                <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
                    {/* 1. Overview */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            1. Datenschutz auf einen Blick
                        </h2>
                        <p>
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
                            mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website
                            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                            persönlich identifiziert werden können.
                        </p>
                    </section>

                    {/* 2. Responsible Party */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            2. Verantwortlicher
                        </h2>
                        <p>
                            Verantwortlicher für die Datenverarbeitung auf dieser Website im
                            Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                        </p>
                        <div className="pt-2">
                            <p className="font-medium text-foreground">Last Cats on Earth</p>
                            <p>Vertreten durch: Antonio Coppola</p>
                            <p>München, Deutschland</p>
                            <p>
                                E-Mail:{" "}
                                <a
                                    href="mailto:contact@lastcatsonearth.de"
                                    className="text-primary hover:underline"
                                >
                                    contact@lastcatsonearth.de
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* 3. Hosting & Log files */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            3. Datenerfassung auf unserer Website
                        </h2>
                        <h3 className="font-medium text-foreground text-sm pt-2">
                            Server-Log-Dateien
                        </h3>
                        <p className="text-xs text-foreground/70">
                            Der Provider der Seiten erhebt und speichert automatisch
                            Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
                            automatisch an uns übermittelt. Dies sind:
                        </p>
                        <ul className="list-disc list-inside text-xs text-foreground/70 space-y-1 pl-2">
                            <li>Browsertyp und Browserversion</li>
                            <li>Verwendetes Betriebssystem</li>
                            <li>Referrer URL</li>
                            <li>Hostname des zugreifenden Rechners</li>
                            <li>Uhrzeit der Serveranfrage</li>
                            <li>IP-Adresse</li>
                        </ul>
                        <p className="text-xs text-foreground/70 pt-2">
                            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
                            vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1
                            lit. f DSGVO.
                        </p>
                    </section>

                    {/* 4. Contact via Email */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            4. Kontaktaufnahme
                        </h2>
                        <p className="text-xs text-foreground/70">
                            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller
                            daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum
                            Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und
                            verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                        </p>
                    </section>

                    {/* 5. Rights */}
                    <section className="space-y-2 pt-2">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            5. Ihre Rechte
                        </h2>
                        <p className="text-xs text-foreground/70">
                            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
                            Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
                            erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                            Löschung dieser Daten zu verlangen sowie die Einschränkung der
                            Verarbeitung zu fordern.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;