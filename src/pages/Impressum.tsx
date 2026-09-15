import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const Impressum = () => {
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
                    Impressum
                </h1>

                <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
                    {/* Information according to § 5 DDG / TMG */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            Angaben gemäß § 5 DDG
                        </h2>
                        <p className="font-medium text-foreground">Last Cats on Earth</p>
                        <p>Vertreten durch: Antonio Coppola</p>
                        <p>München, Deutschland</p>
                    </section>

                    {/* Contact Information */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            Kontakt
                        </h2>
                        <p>
                            E-Mail:{" "}
                            <a
                                href="mailto:contact@lastcatsonearth.de"
                                className="text-primary hover:underline"
                            >
                                contact@lastcatsonearth.de
                            </a>
                        </p>
                    </section>

                    {/* Responsible for content according to § 18 Abs. 2 MStV */}
                    <section className="space-y-2 border-b border-border/60 pb-6">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                        </h2>
                        <p>Antonio Coppola</p>
                        <p>München, Deutschland</p>
                    </section>

                    {/* Disclaimer / Haftungsausschluss */}
                    <section className="space-y-4 pt-2">
                        <h2 className="text-base font-semibold text-foreground uppercase tracking-wider text-xs">
                            Haftungsausschluss (Disclaimer)
                        </h2>

                        <div className="space-y-2">
                            <h3 className="font-medium text-foreground">Haftung für Inhalte</h3>
                            <p className="text-xs text-foreground/70">
                                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-foreground">Haftung für Links</h3>
                            <p className="text-xs text-foreground/70">
                                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-foreground">Urheberrecht</h3>
                            <p className="text-xs text-foreground/70">
                                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Impressum;