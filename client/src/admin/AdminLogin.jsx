import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@arigya.local");
  const [password, setPassword] = useState("ChangeMe@123");
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("arigya_token", data.token);
      navigate("/admin");
    } catch {
      setError("Login failed. Check credentials or API connection.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <form onSubmit={login} className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-soft dark:bg-slate-900">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ocean-600 text-white"><LockKeyhole /></span>
        <h1 className="mt-5 text-center text-2xl font-black text-slate-950 dark:text-white">Arigya Admin</h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">Secure hospital operations dashboard</p>
        <div className="mt-6 grid gap-3">
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950 dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button className="btn-primary mt-5 w-full" type="submit">Login</button>
        {error && <p className="mt-3 text-center text-sm font-semibold text-red-600">{error}</p>}
      </form>
    </main>
  );
}
