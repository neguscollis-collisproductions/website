import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/site";
import { scrollToId } from "@/components/Navbar";

const line = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.13 },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20" data-testid="hero-section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(212,163,89,0.09), transparent 65%)" }}
      />
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-7 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-8"
            data-testid="hero-tagline"
          >
            Capturing the unseen moment
          </motion.p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] font-display text-zinc-100"
            data-testid="hero-heading"
          >
            {["Light.", "Shadow.", "Authentic"].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-1">
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className="block">
                  {t}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span custom={3} variants={line} initial="hidden" animate="show" className="block italic text-amber-400">
                Emotion.
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-base text-zinc-400 leading-relaxed"
            data-testid="hero-subtext"
          >
            Fine art portraiture, high-velocity sports cinematics, and milestone story
            capturing — in studio and on location.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("#booking")}
              data-testid="hero-cta-button"
              className="group rounded-full bg-amber-400 text-zinc-950 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-amber-300 transition-colors duration-300"
            >
              Book a Session
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("#gallery")}
              data-testid="hero-gallery-button"
              className="rounded-full border border-zinc-700 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 hover:border-amber-400 hover:text-amber-400 transition-colors duration-300"
            >
              View Gallery
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="absolute -inset-3 border border-amber-400/25 translate-x-5 translate-y-5 pointer-events-none" />
          <div className="relative overflow-hidden aspect-[3/4]" data-testid="hero-image-frame">
            <motion.img
              src={IMAGES.hero}
              alt="Editorial portrait in dramatic light"
              style={{ y: imgY }}
              className="w-full h-[120%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs font-mono text-zinc-400 tracking-wider">
              Graduation Photo
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-4 h-4 text-zinc-600 animate-bounce" />
      </motion.div>
    </section>
  );
}
