import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import Navbar, { scrollToId } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import EditorialMarquee from "@/components/EditorialMarquee";
import ServicesPricing from "@/components/ServicesPricing";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [selection, setSelection] = useState(null);
  const formKey = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  const handleBook = useCallback((cat, pkg) => {
    setSelection({ categoryId: cat.id, packageName: pkg.name });
    formKey.current += 1;
    requestAnimationFrame(() => scrollToId("#booking"));
  }, []);

  return (
    <main className="bg-[#09090B] text-zinc-100 min-h-screen">
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <EditorialMarquee />
      <Manifesto />
      <ServicesPricing onBook={handleBook} />
      <ShowcaseGallery />
      <BookingForm key={formKey.current} selection={selection} />
      <Footer />
    </main>
  );
}
