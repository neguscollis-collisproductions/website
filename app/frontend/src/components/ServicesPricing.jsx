import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/site";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function ServicesPricing({ onBook }) {
  return (
    <section id="services" className="py-24 sm:py-32 lg:py-40" data-testid="services-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-4">Services & Pricing</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-display text-zinc-100">
              Transparent rates.<br />No surprises.
            </h2>
          </div>
          <p className="text-base text-zinc-400 leading-relaxed max-w-sm">
            Every package includes professional retouching, a private online gallery,
            and print rights guidance. Lock your date with a refundable $100 deposit.
          </p>
        </motion.div>

        {CATEGORIES.map((cat, ci) => (
          <div key={cat.id} className="mt-20 lg:mt-28" data-testid={`category-${cat.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-6 border-t border-zinc-800/80 pt-8 mb-10"
            >
              <span className="text-xs font-mono text-amber-400/80 tracking-[0.2em]">0{ci + 1}</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-light font-display text-zinc-100">{cat.title}</h3>
                <p className="text-sm text-zinc-500 mt-2">{cat.blurb}</p>
              </div>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {cat.packages.map((pkg, pi) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: pi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  data-testid={`package-card-${cat.id}-${slug(pkg.name)}`}
                  className={`relative bg-[#121216] border p-8 flex flex-col transition-colors duration-500 hover:bg-[#1A1A22] ${
                    pkg.popular ? "border-amber-400/50" : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-8 bg-amber-400 text-zinc-950 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1">
                      Most Booked
                    </span>
                  )}
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{pkg.duration}</p>
                  <h4 className="mt-3 text-xl sm:text-2xl font-medium font-display text-zinc-100">{pkg.name}</h4>
                  <p className="mt-4 text-4xl font-light font-display text-amber-400">{pkg.price}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {pkg.deliverables.split("•").map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <Check className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                        {d.trim()}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onBook(cat, pkg)}
                    data-testid={`book-package-btn-${slug(pkg.name)}`}
                    className={`group mt-8 w-full rounded-full px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors duration-300 ${
                      pkg.popular
                        ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                        : "border border-zinc-700 text-zinc-300 hover:border-amber-400 hover:text-amber-400"
                    }`}
                  >
                    Book Package
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
