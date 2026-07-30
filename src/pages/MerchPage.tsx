import { useState } from "react";

import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";

import shirtImage1 from "@/assets/merch_images/black_tee/back.png";
import shirtImage2 from "@/assets/merch_images/black_tee/front_full.png";
import shirtImage3 from "@/assets/merch_images/black_tee/back_full.png";

const images = [shirtImage1, shirtImage2, shirtImage3];
const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

const FORMSPREE_URL = "https://formspree.io/f/xrejwwzz";
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwupUQXO0fe8ka0U2woDUxWbKel0upWwbzOduugTgAkTXKvuopSGs0UIsNk-AE74Wpp_g/exec";

const MerchPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [cart, setCart] = useState<Record<Size, number>>({
        S: 0, M: 0, L: 0, XL: 0,
    });
    const [showForm, setShowForm] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const prev = () => setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrentImage((i) => (i + 1) % images.length);

    // Touch
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
        setDragOffset(0);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        setDragOffset(e.targetTouches[0].clientX - touchStart);
    };
    const handleTouchEnd = () => {
        if (dragOffset > 50) prev();
        else if (dragOffset < -50) next();
        setDragOffset(0);
        setIsDragging(false);
        setTouchStart(null);
    };

    // Mouse drag
    const handleMouseDown = (e: React.MouseEvent) => {
        setTouchStart(e.clientX);
        setIsDragging(true);
        setDragOffset(0);
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || touchStart === null) return;
        setDragOffset(e.clientX - touchStart);
    };
    const handleMouseUp = () => {
        if (dragOffset > 50) prev();
        else if (dragOffset < -50) next();
        setDragOffset(0);
        setIsDragging(false);
        setTouchStart(null);
    };

    const updateCart = (size: Size, delta: number) => {
        setCart((prev) => ({
            ...prev,
            [size]: Math.max(0, prev[size] + delta),
        }));
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    const cartSummary = SIZES.filter((s) => cart[s] > 0)
        .map((s) => `${cart[s]}x${s}`)
        .join(", ");

    const payload = {
        name,
        email,
        order: cartSummary,
        total: `${totalItems * 25}€`,
    };

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim()) return;
        setStatus("sending");

        try {
            // Fire both in parallel — email via Formspree, row via Apps Script
            const [formspreeRes] = await Promise.all([
                fetch(FORMSPREE_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(payload),
                }),
                // Apps Script requires no-cors because it redirects; we fire and forget
                fetch(SHEETS_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }),
            ]);

            if (formspreeRes.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleClose = () => {
        setShowForm(false);
        setStatus("idle");
        setName("");
        setEmail("");
    };

    return (
        <div className="min-h-screen bg-black text-white px-6 pt-10 pb-12 flex flex-col justify-between">
            <div className="w-full">
                <BandHeader linkToHome />

                <section className="max-w-6xl mx-auto mt-10">
                    <div className="border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="grid md:grid-cols-2 gap-0">

                            {/* Product Image */}
                            <div className="bg-black flex flex-col items-center justify-center p-6 select-none">
                                {/* Image with overlaid arrows */}
                                <div className="w-full max-w-md aspect-square relative group">
                                    {/* Draggable image container */}
                                    <div
                                        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                    >
                                        <img
                                            src={images[currentImage]}
                                            alt="Last Cats on Earth T-Shirt"
                                            className="absolute inset-0 w-full h-full object-contain"
                                            style={{
                                                transform: `translateX(${dragOffset}px)`,
                                                transition: isDragging ? "none" : "transform 0.3s ease",
                                            }}
                                            draggable={false}
                                        />
                                    </div>

                                    {/* Left arrow */}
                                    <button
                                        onClick={prev}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white/0 group-hover:text-white/60 hover:!text-white transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </button>

                                    {/* Right arrow */}
                                    <button
                                        onClick={next}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white/0 group-hover:text-white/60 hover:!text-white transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Dots */}
                                <div className="flex gap-2 mt-4">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImage(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${currentImage === index ? "bg-cat-orange" : "bg-white/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-8 flex flex-col justify-center">
                                <p className="text-cat-orange uppercase tracking-[0.25em] text-xs mb-3">
                                    Merchandise
                                </p>
                                <h2 className="font-sceageus text-4xl md:text-5xl leading-none mb-4">
                                    BLACK CAT TEE
                                </h2>
                                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                                    Heavy black cotton t-shirt featuring the official Last Cats on Earth
                                    cat logo. Screen printed locally in limited quantities.
                                </p>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl font-semibold">25€</span>
                                    <span className="text-xs uppercase tracking-widest text-white/40">Limited Run</span>
                                </div>

                                {/* Size picker */}
                                <div className="flex flex-col gap-2 mb-8">
                                    {SIZES.map((size) => (
                                        <div key={size} className="flex items-center gap-4">
                                            <span className={`w-10 text-sm font-medium transition-colors ${cart[size] > 0 ? "text-cat-orange" : "text-white/50"
                                                }`}>
                                                {size}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateCart(size, -1)}
                                                    disabled={cart[size] === 0}
                                                    className="w-8 h-8 border border-white/20 hover:border-cat-orange disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-lg leading-none flex items-center justify-center"
                                                >−</button>
                                                <span className="w-5 text-center text-sm tabular-nums">{cart[size]}</span>
                                                <button
                                                    onClick={() => updateCart(size, +1)}
                                                    className="w-8 h-8 border border-white/20 hover:border-cat-orange transition-colors text-lg leading-none flex items-center justify-center"
                                                >+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Size guide button */}
                                <button
                                    onClick={() => setShowSizeGuide(true)}
                                    className="text-white/40 hover:text-white text-xs uppercase tracking-widest underline underline-offset-4 transition-colors mb-6 text-left"
                                >
                                    Size guide
                                </button>

                                {/* Cart summary */}
                                {totalItems > 0 && (
                                    <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
                                        Reserving: <span className="text-white">{cartSummary}</span>
                                        {" — "}
                                        <span className="text-cat-orange">{totalItems * 25}€</span>
                                    </p>
                                )}

                                {/* Reserve Button */}
                                <button
                                    onClick={() => setShowForm(true)}
                                    disabled={totalItems === 0}
                                    className="
                                        inline-flex items-center justify-center
                                        bg-cat-orange text-black font-semibold
                                        px-8 py-4 rounded-xl
                                        hover:scale-[1.02] hover:brightness-110
                                        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100
                                        transition-all duration-200
                                        w-full md:w-fit
                                    "
                                >
                                    RESERVE YOUR TEE
                                </button>

                                <p className="text-white/40 text-xs mt-4">
                                    Free pickup at the show — no payment needed now.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="mt-24 w-full max-w-6xl mx-auto">
                <Footer />
            </div>

            {/* Reservation Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
                    onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
                >
                    <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div>
                                <p className="text-cat-orange uppercase tracking-[0.2em] text-xs mb-0.5">
                                    Reserve your tee
                                </p>
                                <p className="text-white font-semibold text-sm">
                                    {cartSummary} — {totalItems * 25}€
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-white/40 hover:text-white transition-colors text-2xl leading-none"
                            >×</button>
                        </div>

                        {/* Form body */}
                        <div className="px-6 py-6">
                            {status === "success" ? (
                                <div className="text-center py-6">
                                    <p className="text-3xl mb-3">🐱</p>
                                    <p className="text-white font-semibold mb-1">Reservation confirmed!</p>
                                    <p className="text-white/50 text-sm">
                                        We'll have your {cartSummary} ready at the show.<br />
                                        See you there!
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="mt-6 text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                                    >Close</button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-4 mb-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-white/50 text-xs uppercase tracking-widest">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="
                                                    bg-white/5 border border-white/10
                                                    focus:border-cat-orange focus:outline-none
                                                    rounded-lg px-4 py-3 text-sm text-white
                                                    placeholder:text-white/20
                                                    transition-colors
                                                "
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-white/50 text-xs uppercase tracking-widest">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="
                                                    bg-white/5 border border-white/10
                                                    focus:border-cat-orange focus:outline-none
                                                    rounded-lg px-4 py-3 text-sm text-white
                                                    placeholder:text-white/20
                                                    transition-colors
                                                "
                                            />
                                        </div>

                                        {/* Order recap — read only */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-white/50 text-xs uppercase tracking-widest">
                                                Order
                                            </label>
                                            <div className="bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/60">
                                                {cartSummary} — {totalItems * 25}€
                                            </div>
                                        </div>
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-400 text-xs mb-4">
                                            Something went wrong. Please try again or contact us directly.
                                        </p>
                                    )}

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!name.trim() || !email.trim() || status === "sending"}
                                        className="
                                            w-full bg-cat-orange text-black font-semibold
                                            py-4 rounded-xl
                                            hover:brightness-110 hover:scale-[1.01]
                                            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100
                                            transition-all duration-200
                                        "
                                    >
                                        {status === "sending" ? "Sending…" : "CONFIRM RESERVATION"}
                                    </button>

                                    <p className="text-white/30 text-xs text-center mt-4">
                                        Pay at the show. We'll hold your size.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Size Guide Modal */}
            {showSizeGuide && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setShowSizeGuide(false); }}
                >
                    <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <div>
                                <p className="text-cat-orange uppercase tracking-[0.2em] text-xs mb-0.5">Black Cat Tee</p>
                                <p className="text-white font-semibold text-sm">Size Guide</p>
                            </div>
                            <button
                                onClick={() => setShowSizeGuide(false)}
                                className="text-white/40 hover:text-white transition-colors text-2xl leading-none"
                            >×</button>
                        </div>

                        {/* Table */}
                        <div className="px-6 py-6 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-white/40 uppercase tracking-widest text-xs">
                                        <th className="text-left pb-4 font-normal">Size</th>
                                        <th className="text-center pb-4 font-normal">DE</th>
                                        <th className="text-center pb-4 font-normal">Bust (cm)</th>
                                        <th className="text-center pb-4 font-normal">Waist (cm)</th>
                                        <th className="text-center pb-4 font-normal">Height (cm)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { size: "S", de: 46, bust: "92–96", waist: "78–82", height: "170–175" },
                                        { size: "M", de: 48, bust: "96–100", waist: "82–86", height: "175–180" },
                                        { size: "L", de: 50, bust: "100–105", waist: "86–91", height: "180–185" },
                                        { size: "XL", de: 52, bust: "105–110", waist: "91–96", height: "185–190" },
                                    ].map((row) => (
                                        <tr key={row.size} className="text-white/70 hover:text-white transition-colors">
                                            <td className="py-3 font-semibold text-cat-orange">{row.size}</td>
                                            <td className="py-3 text-center">{row.de}</td>
                                            <td className="py-3 text-center">{row.bust}</td>
                                            <td className="py-3 text-center">{row.waist}</td>
                                            <td className="py-3 text-center">{row.height}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-white/30 text-xs mt-6">
                                Measurements refer to body size, not garment size. If you're between sizes, size up.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MerchPage;