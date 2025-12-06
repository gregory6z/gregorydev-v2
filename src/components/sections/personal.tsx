import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Dumbbell,
  Gamepad2,
  Plane,
  Code2,
  Heart,
  Users
} from "lucide-react";

const hobbies = [
  { icon: Users, labelKey: "family" },
  { icon: Dumbbell, labelKey: "fitness" },
  { icon: Plane, labelKey: "travel" },
  { icon: Gamepad2, labelKey: "gaming" },
  { icon: Code2, labelKey: "coding" },
  { icon: Heart, labelKey: "passion" },
];

export async function PersonalSection() {
  const t = await getTranslations("personal");

  return (
    <section id="personal" className="relative bg-black pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-6">
            {t("sectionTitle")}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Photo Container */}
          <div className="relative">
            <div
              className="aspect-[4/5] rounded-[2.5rem] bg-[#141414] border border-white/10 overflow-hidden"
            >
              <Image
                src="/images/family.png"
                alt="Gregory with family"
                fill
                className="object-cover rounded-[2.5rem]"
              />
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="space-y-6">
            {/* Paragraphs */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {t("paragraph3")}
            </p>

            {/* Closing statement */}
            <p className="text-white text-xl sm:text-2xl font-semibold pt-4">
              {t("closing")}
            </p>

            {/* Hobby Badges */}
            <div className="pt-6">
              <div className="flex flex-wrap gap-3">
                {hobbies.map((hobby) => {
                  const Icon = hobby.icon;
                  return (
                    <div
                      key={hobby.labelKey}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-white/60" />
                      <span className="text-white/70 text-sm">
                        {t(`hobbies.${hobby.labelKey}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
