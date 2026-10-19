import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY, GALLERY_FILTERS } from "@/data/site";

export default function ShowcaseGallery() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const items = GALLERY.filter((g) => filter === "all" || g.category === filter);

  return (
    <section id="gallery" className="py-24 sm:py-32 lg:py-40" data-testid="gallery-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-4">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-display text-zinc-100">
            The archive speaks.
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-3" data-testid="gallery-filters">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-testid={`gallery-filter-${f.id}`}
              className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-[0.18em] transition-colors duration-300 ${
                filter === f.id
                  ? "bg-amber-400 text-zinc-950"
                  : "border border-zinc-800 text-zinc-400 hover:border-amber-400/60 hover:text-amber-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(g)}
                data-testid={`gallery-item-${g.id}`}
                className={`group relative overflow-hidden bg-[#121216] border border-zinc-800 text-left ${
                  i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-display text-lg text-zinc-100">{g.title}</p>
                  <p className="text-xs font-mono text-amber-400/80 tracking-wider mt-1">
                    {g.exif.camera} — {g.exif.aperture}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.title} className="w-full max-h-[70vh] object-contain border border-zinc-800" />
              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-zinc-100">{selected.title}</p>
                  <p className="text-xs font-mono text-zinc-500 tracking-wider mt-1">
                    {selected.exif.camera} · {selected.exif.aperture} · {selected.exif.iso} · {selected.exif.focal}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  data-testid="gallery-lightbox-close"
                  className="rounded-full border border-zinc-700 p-2.5 text-zinc-400 hover:border-amber-400 hover:text-amber-400 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
