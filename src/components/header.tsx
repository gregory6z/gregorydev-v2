import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GPLogoWhite } from "@/components/ui/gp-logo";
import { MobileMenu } from "@/components/ui/mobile-menu";

export async function Header() {
  const t = await getTranslations("header");

  const navLinks = [
    { href: "#projects", label: t("projects") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Server Component */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <GPLogoWhite className="h-9 w-9" />
          </Link>

          {/* Desktop Navigation - Server Component */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu - Client Component */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
