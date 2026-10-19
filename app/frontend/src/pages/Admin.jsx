import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Aperture, Loader2, LogOut, Download } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/api`;

const STATUS_COLORS = {
  pending: "text-amber-400 border-amber-400/40",
  confirmed: "text-emerald-400 border-emerald-400/40",
  cancelled: "text-red-400 border-red-400/40",
};

const DEPOSIT_COLORS = {
  none: "text-zinc-500",
  pending: "text-amber-400",
  paid: "text-emerald-400",
};

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    const { data } = await axios.get(`${API}/bookings`, { withCredentials: true });
    setBookings(data);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/auth/me`, { withCredentials: true });
        setUser(data);
        await loadBookings();
      } catch { setUser(false); }
      setChecking(false);
    })();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
      setUser(data);
      await loadBookings();
    } catch (err) {
      const d = err?.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Login failed");
    } finally { setLoading(false); }
  };

  const setStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(`${API}/bookings/${id}`, { status }, { withCredentials: true });
      setBookings((bs) => bs.map((b) => (b.id === id ? data : b)));
      toast.success(`Marked ${status}`);
    } catch { toast.error("Could not update booking"); }
  };

  const exportCsv = () => {
    const rows = [["Code", "Name", "Email", "Phone", "Category", "Package", "Price", "Date", "Status", "Deposit", "Notes", "Created"]];
    bookings.forEach((b) => rows.push([b.confirmation_code, b.name, b.email, b.phone, b.category, b.package_name, b.package_price, b.preferred_date, b.status, b.deposit, (b.notes || "").replaceAll("\n", " "), b.created_at]));
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "lumen-frame-bookings.csv";
    a.click();
  };

  if (checking) {
    return <div className="min-h-screen bg-[#09090B] flex items-center justify-center"><Loader2 className="w-6 h-6 text-amber-400 animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6" data-testid="admin-login-page">
        <form onSubmit={login} className="w-full max-w-sm bg-[#121216] border border-zinc-800 p-10">
          <Aperture className="w-8 h-8 text-amber-400 mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl font-light text-zinc-100">Studio Access</h1>
          <p className="text-sm text-zinc-500 mt-2 mb-8">Sign in to manage booking requests.</p>
          <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                 data-testid="admin-login-email-input"
                 className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:border-amber-400/70 focus:outline-none transition-colors duration-300" />
          <label className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mt-5 mb-2">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                 data-testid="admin-login-password-input"
                 className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:border-amber-400/70 focus:outline-none transition-colors duration-300" />
          <button type="submit" disabled={loading} data-testid="admin-login-submit-button"
                  className="mt-8 w-full rounded-full bg-amber-400 text-zinc-950 px-5 py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-amber-300 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Sign In
          </button>
          <Link to="/" className="block text-center mt-6 text-xs font-mono text-zinc-600 hover:text-amber-400 transition-colors duration-300" data-testid="admin-back-home-link">
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  const filtered = bookings.filter((b) => filter === "all" || b.status === filter);
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
  const revenue = bookings.filter((b) => b.deposit === "paid").length * 100;

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100" data-testid="admin-dashboard">
      <header className="border-b border-zinc-800 px-6 lg:px-16 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Aperture className="w-5 h-5 text-amber-400" strokeWidth={1.25} />
          <span className="font-display text-lg">LUMEN <span className="italic text-amber-400">&</span> FRAME — Studio</span>
        </Link>
        <button
          onClick={async () => { await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }); setUser(false); }}
          data-testid="admin-logout-button"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-colors duration-300"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </header>

      <main className="px-6 lg:px-16 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[["Total Requests", counts.all], ["Pending", counts.pending], ["Confirmed", counts.confirmed], ["Deposits Collected", `$${revenue}`]].map(([label, val]) => (
            <div key={label} className="bg-[#121216] border border-zinc-800 p-6" data-testid={`admin-metric-${label.toLowerCase().replace(/ /g, "-")}`}>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{label}</p>
              <p className="mt-3 text-3xl font-light font-display text-amber-400">{val}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {["all", "pending", "confirmed", "cancelled"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} data-testid={`admin-filter-${f}`}
                      className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300 ${
                        filter === f ? "bg-amber-400 text-zinc-950" : "border border-zinc-800 text-zinc-400 hover:border-amber-400/60 hover:text-amber-400"
                      }`}>
                {f} ({counts[f]})
              </button>
            ))}
          </div>
          <button onClick={exportCsv} data-testid="admin-export-csv-button"
                  className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-zinc-300 hover:border-amber-400 hover:text-amber-400 transition-colors duration-300">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        <div className="mt-6 border border-zinc-800 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
            <tr className="border-b border-zinc-800 text-left">
              {["Code", "Client", "Package", "Date", "Status", "Deposit", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-medium">{h}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-zinc-600 font-mono text-xs tracking-wider">NO BOOKINGS YET</td></tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-zinc-800/60 hover:bg-[#121216] transition-colors duration-300" data-testid={`admin-booking-row-${b.id}`}>
                <td className="px-5 py-4 font-mono text-amber-400/90 text-xs">{b.confirmation_code}</td>
                <td className="px-5 py-4">
                  <p className="text-zinc-100">{b.name}</p>
                  <p className="text-xs text-zinc-500">{b.email}{b.phone ? ` · ${b.phone}` : ""}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-zinc-300">{b.package_name}</p>
                  <p className="text-xs text-zinc-500">{b.category} · {b.package_price}</p>
                </td>
                <td className="px-5 py-4 text-zinc-300 whitespace-nowrap">{b.preferred_date}</td>
                <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] ${STATUS_COLORS[b.status]}`} data-testid={`admin-status-badge-${b.status}`}>
                      {b.status}
                    </span>
                </td>
                <td className={`px-5 py-4 font-mono text-xs uppercase tracking-wider ${DEPOSIT_COLORS[b.deposit]}`}>
                  {b.deposit === "paid" ? "Paid $100" : b.deposit}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  {b.status === "pending" && (
                    <button onClick={() => setStatus(b.id, "confirmed")} data-testid={`admin-confirm-btn-${b.confirmation_code}`}
                            className="mr-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Confirm</button>
                  )}
                  {b.status !== "cancelled" && (
                    <button onClick={() => setStatus(b.id, "cancelled")} data-testid={`admin-cancel-btn-${b.confirmation_code}`}
                            className="text-xs font-mono text-red-400/80 hover:text-red-300 transition-colors duration-300">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
