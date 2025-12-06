import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-8 pb-24 sm:pb-8">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-4">
          <a
            href="https://www.linkedin.com/in/gregory-praxedes-2189b4207/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Linkedin className="w-5 h-5 text-white/60" />
          </a>
          <a
            href="https://instagram.com/prax6z"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white/60" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-white/40">
          © {currentYear} Gregory Praxedes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
