import { Download, Edit3, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const endpoints = {
  leads: "/admin/leads",
  appointments: "/admin/appointments",
  doctors: "/admin/doctors",
  settings: "/admin/settings"
};

const emptyDoctor = {
  name: "",
  role: "",
  department: "",
  experience: "",
  schedule: "",
  image: "",
  bio: "",
  active: true
};

const emptySettings = {
  hospitalName: "Arigya Hospital",
  phone: "+91 8088929007",
  email: "jeevankgowha@gmail.com",
  address: "Arigya Hospital, Karnataka, India",
  whatsapp: "918088929007",
  mapEmbedUrl: "https://www.google.com/maps?q=Arigya%20Hospital&output=embed"
};

const fallbackRows = {
  leads: [{ _id: "1", name: "Priya", phone: "+91 9000000000", email: "patient@example.com", status: "new", message: "Need pediatric appointment" }],
  appointments: [{ _id: "2", name: "Rahul", phone: "+91 9888888888", department: "Cardiology", status: "pending", preferredDate: "2026-06-12" }],
  doctors: [{ _id: "3", ...emptyDoctor, name: "Dr. Kavya Rao", role: "Senior Cardiologist", department: "Cardiology", experience: "14 yrs", schedule: "Mon, Wed, Fri" }],
  settings: [{ _id: "4", ...emptySettings }]
};

export default function Manager({ type }) {
  const [rows, setRows] = useState(fallbackRows[type] || []);
  const [query, setQuery] = useState("");
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [settings, setSettings] = useState(emptySettings);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("");
    api.get(endpoints[type]).then(({ data }) => {
      const items = data.items || data;
      setRows(items);
      if (type === "settings") setSettings({ ...emptySettings, ...(items[0] || {}) });
    }).catch(() => {
      setRows(fallbackRows[type] || []);
      if (type === "settings") setSettings(fallbackRows.settings[0]);
    });
  }, [type]);

  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())), [query, rows]);

  function exportCsv() {
    const keys = Object.keys(filtered[0] || {});
    const csv = [keys.join(","), ...filtered.map((row) => keys.map((key) => `"${String(row[key] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function remove(id) {
    setRows((items) => items.filter((item) => item._id !== id));
    await api.delete(`${endpoints[type]}/${id}`).catch(() => {});
  }

  async function saveDoctor(event) {
    event.preventDefault();
    setStatus("Saving doctor...");
    const payload = { ...editingDoctor };
    try {
      const { data } = payload._id
        ? await api.patch(`${endpoints.doctors}/${payload._id}`, payload)
        : await api.post(endpoints.doctors, payload);
      setRows((items) => payload._id ? items.map((item) => item._id === data._id ? data : item) : [data, ...items]);
      setEditingDoctor(null);
      setStatus("Doctor saved successfully.");
    } catch {
      setStatus("Could not save doctor. Check backend login/API connection.");
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    setStatus("Saving hospital details...");
    try {
      const { data } = settings._id
        ? await api.patch(`${endpoints.settings}/${settings._id}`, settings)
        : await api.post(endpoints.settings, settings);
      setSettings({ ...emptySettings, ...data });
      setRows([data]);
      setStatus("Hospital details saved successfully.");
    } catch {
      setStatus("Could not save hospital details. Check backend login/API connection.");
    }
  }

  if (type === "settings") {
    return (
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Website Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Edit the hospital name and contact details shown on the website.</p>
        <form onSubmit={saveSettings} className="mt-6 grid gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:grid-cols-2">
          <Field label="Hospital name" value={settings.hospitalName} onChange={(value) => setSettings({ ...settings, hospitalName: value })} />
          <Field label="Phone" value={settings.phone} onChange={(value) => setSettings({ ...settings, phone: value })} />
          <Field label="Email" value={settings.email} onChange={(value) => setSettings({ ...settings, email: value })} />
          <Field label="WhatsApp number" value={settings.whatsapp} onChange={(value) => setSettings({ ...settings, whatsapp: value })} />
          <Field label="Address" value={settings.address} onChange={(value) => setSettings({ ...settings, address: value })} className="md:col-span-2" />
          <Field label="Google map embed URL" value={settings.mapEmbedUrl} onChange={(value) => setSettings({ ...settings, mapEmbedUrl: value })} className="md:col-span-2" />
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit"><Save size={17} /> Save Hospital Details</button>
          </div>
        </form>
        {status && <p className="mt-4 text-sm font-bold text-ocean-700 dark:text-ocean-100">{status}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black capitalize text-slate-950 dark:text-white">{type}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, update, delete, and export operational data.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={exportCsv}><Download size={17} /> Export CSV</button>
          {type === "doctors" && <button className="btn-primary" onClick={() => setEditingDoctor(emptyDoctor)}><Plus size={17} /> Add Doctor</button>}
        </div>
      </div>

      {type === "doctors" && editingDoctor && (
        <form onSubmit={saveDoctor} className="mt-6 grid gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:grid-cols-[180px_1fr_1fr]">
          <div className="md:row-span-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100 dark:bg-white/10">
              {editingDoctor.image ? <img src={editingDoctor.image} alt={editingDoctor.name || "Doctor preview"} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm text-slate-400">Photo preview</div>}
            </div>
          </div>
          <Field label="Doctor name" value={editingDoctor.name} onChange={(value) => setEditingDoctor({ ...editingDoctor, name: value })} required />
          <Field label="Doctor information / title" value={editingDoctor.role} onChange={(value) => setEditingDoctor({ ...editingDoctor, role: value })} required />
          <Field label="Department" value={editingDoctor.department} onChange={(value) => setEditingDoctor({ ...editingDoctor, department: value })} required />
          <Field label="Experience" value={editingDoctor.experience} onChange={(value) => setEditingDoctor({ ...editingDoctor, experience: value })} />
          <Field label="Schedule" value={editingDoctor.schedule} onChange={(value) => setEditingDoctor({ ...editingDoctor, schedule: value })} />
          <Field label="Photo URL" value={editingDoctor.image} onChange={(value) => setEditingDoctor({ ...editingDoctor, image: value })} />
          <Field label="Doctor bio" value={editingDoctor.bio} onChange={(value) => setEditingDoctor({ ...editingDoctor, bio: value })} textarea className="md:col-span-2" />
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={editingDoctor.active} onChange={(event) => setEditingDoctor({ ...editingDoctor, active: event.target.checked })} />
            Show doctor on website
          </label>
          <div className="flex gap-2 md:col-span-2">
            <button className="btn-primary" type="submit"><Save size={17} /> Save Doctor</button>
            <button className="btn-secondary" type="button" onClick={() => setEditingDoctor(null)}><X size={17} /> Cancel</button>
          </div>
        </form>
      )}

      {status && <p className="mt-4 text-sm font-bold text-ocean-700 dark:text-ocean-100">{status}</p>}

      <label className="mt-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
        <Search size={18} className="text-slate-400" />
        <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder={`Search ${type}`} value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500 dark:bg-white/10 dark:text-slate-300">
              <tr>
                {Object.keys(filtered[0] || { name: "", status: "" }).filter((key) => !["_id", "__v", "createdAt", "updatedAt"].includes(key)).map((key) => <th key={key} className="px-4 py-3">{key}</th>)}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row._id} className="border-t border-slate-100 dark:border-white/10">
                  {Object.entries(row).filter(([key]) => !["_id", "__v", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => (
                    <td key={key} className="max-w-xs truncate px-4 py-4">{String(value)}</td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-4">
                    {type === "doctors" && <button onClick={() => setEditingDoctor({ ...emptyDoctor, ...row })} className="rounded-full p-2 text-ocean-700 hover:bg-ocean-50 dark:text-ocean-100 dark:hover:bg-white/10" aria-label="Edit"><Edit3 size={17} /></button>}
                    <button onClick={() => remove(row._id)} className="rounded-full p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950" aria-label="Delete"><Trash2 size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, required = false, className = "" }) {
  const inputClass = "mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950";
  return (
    <label className={`block text-sm font-semibold text-slate-700 dark:text-slate-200 ${className}`}>
      {label}
      {textarea ? (
        <textarea required={required} className={`${inputClass} min-h-28`} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input required={required} className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
