import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHAPTERS, IMAGES } from "@/data/site";

export default function Manifesto() {
  const [active, setActive] = useState(null);

  return (
    <section id="manifesto" className="py-24 sm:py-32 lg:py-40 relative" data-testid="manifesto-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-4">The Manifesto</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-display text-zinc-100 max-w-xl">
            Four chapters. One obsession with the frame.
          </h2>
        </motion.div>
        <div className="mt-16 lg:mt-20">
          {CHAPTERS.map((c, idx) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              data-testid={`manifesto-chapter-${c.number}`}
              className="group relative grid grid-cols-12 gap-4 lg:gap-8 items-start border-t border-zinc-800/80 py-10 lg:py-14 cursor-default"
            >
              <span className="col-span-2 sm:col-span-1 text-xs font-mono text-amber-400/80 tracking-[0.2em] pt-2">
                {c.number}
              </span>
              <h3 className="col-span-10 sm:col-span-5 text-2xl sm:text-3xl lg:text-4xl font-light font-display text-zinc-100 transition-colors duration-500 group-hover:text-amber-400">
                {c.title}
              </h3>
              <p className="col-span-12 sm:col-span-6 text-base text-zinc-400 leading-relaxed max-w-md">
                {c.text}
              </p>
              <AnimatePresence>
                {active === idx && (
                  <motion.img
                    key={c.number}
                    src={IMAGES[c.image]}
                    alt={c.title}
                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    exit={{ opacity: 0, scale: 0.92, rotate: -3 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden xl:block absolute right-24 -top-10 w-52 aspect-[3/4] object-cover border border-zinc-700 shadow-2xl shadow-black/60 pointer-events-none z-10"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-zinc-800/80" />
        </div>
      </div>
    </section>
  );
}
