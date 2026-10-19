import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { CATEGORIES } from "@/data/site";

const API = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/api`;

const inputCls =
  "w-full bg-[#121216] border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400/70 focus:outline-none transition-colors duration-300";

function formatErr(e) {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x.msg).filter(Boolean).join(" ");
  return "Something went wrong. Please try again.";
}

export default function BookingForm({ selection }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    category: selection?.categoryId || CATEGORIES[0].id,
    package_name: selection?.packageName || "",
    preferred_date: "", notes: "", wants_deposit: true,
  });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const category = CATEGORIES.find((c) => c.id === form.category) || CATEGORIES[0];
  const packages = category.packages;
  const pkg = packages.find((p) => p.name === form.package_name) || packages[0];

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name, email: form.email, phone: form.phone,
        category: category.title, package_name: pkg.name, package_price: pkg.price,
        preferred_date: form.preferred_date, notes: form.notes, wants_deposit: form.wants_deposit,
      };
      const { data: booking } = await axios.post(`${API}/bookings`, payload);
      if (form.wants_deposit) {
        const { data: pay } = await axios.post(`${API}/payments/checkout`, {
          booking_id: booking.id, origin_url: window.location.origin,
        });
        toast.success("Booking saved — redirecting to secure deposit checkout…");
        window.location.href = pay.checkout_url;
        return;
      }
      setConfirmation(booking);
    } catch (err) {
      toast.error(formatErr(err));
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-24 sm:py-32 lg:py-40 relative" data-testid="booking-section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(212,163,89,0.07), transparent 60%)" }}
      />
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid lg:grid-cols-12 gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-4">Booking</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-display text-zinc-100">
            Reserve<br />your date.
          </h2>
          <p className="mt-6 text-base text-zinc-400 leading-relaxed max-w-sm">
            Tell us about your session. We reply within 24 hours to confirm
            availability and tailor the details. A refundable $100 deposit locks
            your date on the studio calendar.
          </p>
          <div className="mt-10 border-t border-zinc-800/80 pt-6 space-y-4">
            {[
              ["01", "Request received instantly"],
              ["02", "Studio confirms within 24h"],
              ["03", "Deposit secures the date"],
            ].map(([n, t]) => (
              <div key={n} className="flex items-center gap-4">
                <span className="text-xs font-mono text-amber-400/80">{n}</span>
                <span className="text-sm text-zinc-400">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[#121216] border border-zinc-800 p-8 sm:p-10 space-y-6"
          data-testid="booking-form"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Full Name</label>
              <input required value={form.name} onChange={set("name")} placeholder="Jordan Avery" className={inputCls} data-testid="booking-form-input-name" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Email</label>
              <input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} data-testid="booking-form-input-email" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Phone</label>
              <input value={form.phone} onChange={set("phone")} placeholder="(555) 010-2233" className={inputCls} data-testid="booking-form-input-phone" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Preferred Date</label>
              <input required type="date" min={today} value={form.preferred_date} onChange={set("preferred_date")} className={`${inputCls} [color-scheme:dark]`} data-testid="booking-form-input-date" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value, package_name: "" }))}
                className={inputCls}
                data-testid="booking-form-input-category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Package</label>
              <select value={pkg.name} onChange={set("package_name")} className={inputCls} data-testid="booking-form-input-package">
                {packages.map((p) => (
                  <option key={p.name} value={p.name}>{p.name} — {p.price}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Location / Vision Notes</label>
            <textarea
              rows={4} value={form.notes} onChange={set("notes")}
              placeholder="Tell us about the people, the place, and the feeling you want to keep…"
              className={`${inputCls} resize-none`}
              data-testid="booking-form-input-notes"
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer group" data-testid="booking-form-deposit-toggle">
            <input
              type="checkbox" checked={form.wants_deposit}
              onChange={(e) => setForm((f) => ({ ...f, wants_deposit: e.target.checked }))}
              className="mt-1 h-4 w-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
              Lock my date now with a refundable <span className="text-amber-400">$100 deposit</span> via secure card checkout
            </span>
          </label>
          <button
            type="submit" disabled={loading}
            data-testid="booking-form-submit-button"
            className="w-full rounded-full bg-amber-400 text-zinc-950 px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] hover:bg-amber-300 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Processing…" : form.wants_deposit ? `Request Booking & Pay $100 Deposit` : "Send Booking Request"}
          </button>
        </motion.form>
      </div>

      <AnimatePresence>
        {confirmation && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-6"
            data-testid="booking-confirmation-modal"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-md w-full bg-[#121216] border border-amber-400/40 p-10 text-center"
            >
              <button onClick={() => setConfirmation(null)} data-testid="booking-confirmation-close"
                      className="absolute top-4 right-4 text-zinc-500 hover:text-amber-400 transition-colors duration-300">
                <X className="w-4 h-4" />
              </button>
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" strokeWidth={1.25} />
              <h3 className="mt-6 text-2xl font-light font-display text-zinc-100">Request received.</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                {confirmation.package_name} on {confirmation.preferred_date}. The studio has been
                notified and will confirm within 24 hours.
              </p>
              <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Confirmation code</p>
              <p className="mt-1 text-2xl font-mono text-amber-400 tracking-[0.2em]" data-testid="booking-confirmation-code">
                {confirmation.confirmation_code}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
