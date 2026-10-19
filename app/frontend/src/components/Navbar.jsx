import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Aperture } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/data/site";

const LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Services & Pricing", href: "#services" },
  { label: "Gallery", href: "#gallery" },
];

export function scrollToId(href) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={`fixed z-50 top-0 left-0 right-0 backdrop-blur-xl bg-zinc-950/80 border-b px-6 lg:px-16 py-4 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? "border-zinc-800/80" : "border-zinc-800/40"
      }`}
      data-testid="navbar"
    >
      <button
        onClick={() => window.__lenis?.scrollTo(0)}
        className="flex items-center gap-3 group"
        data-testid="nav-brand"
      >
        <Aperture className="w-6 h-6 text-amber-400 transition-transform duration-700 group-hover:rotate-180" strokeWidth={1.25} />
        {/*<span className="font-display text-xl tracking-wide text-zinc-100">*/}
        {/*  LUMEN <span className="text-amber-400/90 italic">&</span> FRAME*/}
        {/*</span>*/}
        <img src="/images/CollisProductionsLogoNoBackground.png" alt="Lumen & Frame" className="h-10 w-auto" />
      </button>
      <nav className="hidden md:flex items-center gap-8">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => scrollToId(l.href)}
            data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-colors duration-300"
          >
            {l.label}
          </button>
        ))}
        <Link
          to="/admin"
          data-testid="nav-link-admin"
          className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-amber-400 transition-colors duration-300"
        >
          Admin
        </Link>
      </nav>
      <button
        onClick={() => scrollToId("#booking")}
        data-testid="nav-book-button"
        className="rounded-full border border-amber-400/60 px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition-colors duration-300"
      >
        Book Session
      </button>
    </motion.header>
  );
}

export { BRAND };
