import { Link } from "react-router-dom";
import { Aperture, XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6" data-testid="payment-cancel-page">
      <div className="max-w-md w-full bg-[#121216] border border-zinc-800 p-10 text-center">
        <Aperture className="w-8 h-8 text-amber-400 mx-auto mb-6" strokeWidth={1} />
        <XCircle className="w-10 h-10 text-zinc-500 mx-auto" strokeWidth={1.25} />
        <h1 className="mt-6 font-display text-3xl font-light text-zinc-100">Deposit cancelled.</h1>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
          No charge was made. Your booking request is still saved — the studio will
          reach out to confirm your date and arrange the deposit another way.
        </p>
        <Link to="/" data-testid="payment-cancel-home-link"
              className="inline-block mt-8 rounded-full border border-amber-400/60 px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition-colors duration-300">
          Back to site
        </Link>
      </div>
    </div>
  );
}
