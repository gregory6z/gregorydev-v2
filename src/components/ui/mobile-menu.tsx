"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Animated Hamburger */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
            isMenuOpen ? "rotate-45 translate-y-1" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
            isMenuOpen ? "-rotate-45 -translate-y-1" : ""
          }`}
        />
      </button>

      {/* Mobile Menu - Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/70 text-base font-medium hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
