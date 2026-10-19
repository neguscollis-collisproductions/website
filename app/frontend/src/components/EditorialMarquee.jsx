import { MARQUEE_TEXT } from "@/data/site";

export default function EditorialMarquee() {
  const items = MARQUEE_TEXT.split("—").map((s) => s.trim()).filter(Boolean);
  const strip = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="font-display italic text-2xl sm:text-3xl text-zinc-700 whitespace-nowrap px-6">{t}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 shrink-0" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative py-10 border-y border-zinc-800/60 overflow-hidden" data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee">
        {strip("a")}
        {strip("b")}
      </div>
    </div>
  );
}
