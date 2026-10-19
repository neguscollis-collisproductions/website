import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Aperture, CheckCircle2, Loader2 } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/api`;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) { setStatus("error"); return; }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") { setStatus("paid"); return; }
      } catch { /* keep polling */ }
      attempts += 1;
      if (attempts < 15) setTimeout(poll, 2000);
      else setStatus("pending");
    };
    poll();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6" data-testid="payment-success-page">
      <div className="max-w-md w-full bg-[#121216] border border-amber-400/40 p-10 text-center">
        <Aperture className="w-8 h-8 text-amber-400 mx-auto mb-6" strokeWidth={1} />
        {status === "checking" && (
          <>
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <h1 className="mt-6 font-display text-2xl font-light text-zinc-100">Confirming your deposit…</h1>
          </>
        )}
        {status === "paid" && (
          <>
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" strokeWidth={1.25} />
            <h1 className="mt-6 font-display text-3xl font-light text-zinc-100">Date secured.</h1>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Your $100 deposit was received. The studio will confirm your session
              details within 24 hours.
            </p>
          </>
        )}
        {(status === "pending" || status === "error") && (
          <>
            <h1 className="font-display text-2xl font-light text-zinc-100">Payment processing</h1>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              We could not confirm the payment yet. If the charge completed, it will
              reflect shortly — the studio will reach out either way.
            </p>
          </>
        )}
        <Link to="/" data-testid="payment-success-home-link"
              className="inline-block mt-8 rounded-full border border-amber-400/60 px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition-colors duration-300">
          Back to site
        </Link>
      </div>
    </div>
  );
}
