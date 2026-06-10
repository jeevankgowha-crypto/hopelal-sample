import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useState } from "react";
import { submitLead } from "../lib/api";
import { hospital } from "../lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");
    try {
      await submitLead(form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus("Thank you. The hospital team will contact you soon.");
    } catch {
      setStatus("Demo mode: connect the API to store this inquiry.");
    }
  }

  return (
    <section className="container-page grid gap-10 py-16 lg:grid-cols-2">
      <div>
        <h1 className="section-title">Contact</h1>
        <p className="section-copy">Reach Arigya Hospital for appointments, emergency coordination, diagnostics, and general inquiries.</p>
        <div className="mt-8 grid gap-4">
          <a className="flex items-center gap-3 rounded-2xl bg-white p-5 dark:bg-slate-900" href={`tel:${hospital.phone}`}><PhoneCall className="text-ocean-700" /> {hospital.phone}</a>
          <a className="flex items-center gap-3 rounded-2xl bg-white p-5 dark:bg-slate-900" href={`mailto:${hospital.email}`}><Mail className="text-ocean-700" /> {hospital.email}</a>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-5 dark:bg-slate-900"><MapPin className="text-ocean-700" /> {hospital.address}</div>
        </div>
        <iframe title="Arigya Hospital map" src={import.meta.env.VITE_MAP_EMBED_URL || "https://www.google.com/maps?q=Arigya%20Hospital&output=embed"} className="mt-8 h-80 w-full rounded-3xl border-0" loading="lazy" />
      </div>
      <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-6">
        <h2 className="text-2xl font-bold">Send inquiry</h2>
        <div className="mt-5 grid gap-3">
          <input required className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input required className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea required className="min-h-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>
        <button className="btn-primary mt-4 w-full" type="submit">Send Message</button>
        {status && <p className="mt-3 text-sm font-semibold text-ocean-700 dark:text-ocean-100">{status}</p>}
      </form>
    </section>
  );
}
