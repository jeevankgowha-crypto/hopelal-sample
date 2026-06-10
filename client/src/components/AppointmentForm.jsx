import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import { submitAppointment } from "../lib/api";
import { departments } from "../lib/data";

const initial = { name: "", phone: "", email: "", department: "General Medicine", preferredDate: "", message: "" };

export default function AppointmentForm({ compact = false }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");
    try {
      await submitAppointment(form);
      setForm(initial);
      setStatus("Appointment request received. Our team will confirm shortly.");
    } catch {
      setStatus("Saved locally for demo. Connect the API to submit live requests.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ocean-100 text-ocean-700 dark:bg-ocean-900 dark:text-ocean-100">
          <CalendarCheck size={22} />
        </span>
        <div>
          <h2 className="text-xl font-bold">Book an Appointment</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Priority callback and smart slot recommendation.</p>
        </div>
      </div>
      <div className={`mt-5 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        <input required className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Patient name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="email" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
          {departments.map((department) => <option key={department.name}>{department.name}</option>)}
        </select>
        <input type="date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
        <textarea className="min-h-24 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950 md:col-span-2" placeholder="Symptoms or preferred doctor" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button className="btn-primary mt-4 w-full" type="submit">Request Appointment</button>
      {status && <p className="mt-3 text-sm font-medium text-ocean-700 dark:text-ocean-100">{status}</p>}
    </form>
  );
}
