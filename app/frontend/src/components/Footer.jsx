import { Aperture, Instagram, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToId } from "@/components/Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 pt-20 pb-10" data-testid="footer">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Aperture className="w-8 h-8 text-amber-400" strokeWidth={1} />
              <p className="font-display text-4xl sm:text-5xl text-zinc-100 tracking-wide">
                LUMEN <span className="italic text-amber-400">&</span> FRAME
              </p>
            </div>
            <p className="mt-4 text-sm text-zinc-500 max-w-sm leading-relaxed">
              Fine art portraiture, athlete cinematics, and milestone coverage.
              In studio and on location.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <a href="mailto:hello@lumenframe.studio" data-testid="footer-email-link"
               className="flex items-center gap-3 hover:text-amber-400 transition-colors duration-300">
              <Mail className="w-4 h-4 text-amber-400/70" /> hello@lumenframe.studio
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-400/70" /> Studio 12 — Austin, TX & Worldwide
            </span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram-link"
               className="flex items-center gap-3 hover:text-amber-400 transition-colors duration-300">
              <Instagram className="w-4 h-4 text-amber-400/70" /> @lumenandframe
            </a>
          </div>
        </div>
        <div className="mt-14 border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-600 tracking-wider">© 2026 LUMEN & FRAME PHOTOGRAPHY — ALL FRAMES RESERVED</p>
          <Link to="/admin" data-testid="footer-admin-link"
                className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 hover:text-amber-400 transition-colors duration-300">
            Studio Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
