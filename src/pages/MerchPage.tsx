import BandHeader from "@/components/BandHeader";
import shirtImage from "@/assets/black_cat_tshirt.png";

const MerchPage = () => {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-10">
            <BandHeader />

            <section className="max-w-6xl mx-auto mt-10">
                <div className="border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-0">

                        {/* Product Image */}
                        <div className="bg-black flex items-center justify-center p-6">
                            <img
                                src={shirtImage}
                                alt="Last Cats on Earth T-Shirt"
                                className="w-full max-w-md object-contain"
                            />
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
                                Heavy black cotton t-shirt featuring the official
                                Last Cats on Earth cat logo.
                                Screen printed locally in limited quantities.
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-semibold">25€</span>

                                <span className="text-xs uppercase tracking-widest text-white/40">
                                    Limited Run
                                </span>
                            </div>

                            {/* Sizes */}
                            <div className="flex gap-3 mb-8">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 border border-white/20 hover:border-cat-orange transition-colors text-sm"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Buy Button */}
                            <a
                                href="https://buy.stripe.com/dRm3cu35IcBx3YvgRRfUQ01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-cat-orange
                  text-black
                  font-semibold
                  px-8
                  py-4
                  rounded-xl
                  hover:scale-[1.02]
                  hover:brightness-110
                  transition-all
                  duration-200
                  w-full
                  md:w-fit
                "
                            >
                                BUY NOW
                            </a>

                            <p className="text-white/40 text-xs mt-4">
                                Shipping available to Germany and Italy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MerchPage;