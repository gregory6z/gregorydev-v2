"use client";

import { useTranslations } from "next-intl";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section id="contact" className="relative bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="relative rounded-3xl bg-[#141414] border border-white/10 overflow-hidden min-h-[400px] sm:min-h-[500px]">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col md:flex-row h-full min-h-[400px] sm:min-h-[500px]">
            {/* Left content */}
            <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-4">
                {t("title")}
              </h2>
              <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md">
                {t("subtitle")}
              </p>
              <div className="flex justify-end">
                <button
                  className="rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-colors hover:bg-white/90 shadow-lg"
                >
                  {t("button")}
                </button>
              </div>
            </div>

            {/* Right content - Robot */}
            <div className="flex-1 relative min-h-[250px] md:min-h-0">
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
