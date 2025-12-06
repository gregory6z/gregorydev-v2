import { getTranslations } from "next-intl/server";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

export async function CTASection() {
  const t = await getTranslations("cta");

  return (
    <section id="contact" className="relative bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="relative rounded-3xl bg-[#141414] border border-white/10 overflow-hidden min-h-[400px] sm:min-h-[500px]">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col md:flex-row h-full min-h-[300px] md:min-h-[500px]">
            {/* Left content */}
            <div className="flex-1 p-6 sm:p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-4 text-center md:text-left">
                {t("title")}
              </h2>
              <p className="text-white/60 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-md text-center md:text-left mx-auto md:mx-0">
                {t("subtitle")}
              </p>
              <div className="flex justify-center md:justify-end">
                <button
                  className="rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-black transition-colors hover:bg-white/90 shadow-lg"
                >
                  {t("button")}
                </button>
              </div>
            </div>

            {/* Right content - Robot (hidden on mobile) */}
            <div className="hidden md:block flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
