import { Download, Edit3, Key, Mail, Plus, Save, Search, Trash2, X } from "lucide-react";
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

        <AccountSettings />
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

function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwStatus, setPwStatus] = useState("");
  const [pwError, setPwError] = useState(false);

  const [emailPassword, setEmailPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emStatus, setEmStatus] = useState("");
  const [emError, setEmError] = useState(false);

  async function handleChangePassword(event) {
    event.preventDefault();
    setPwStatus("");
    setPwError(false);
    if (newPassword.length < 8) {
      setPwStatus("New password must be at least 8 characters.");
      setPwError(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwStatus("New passwords do not match.");
      setPwError(true);
      return;
    }
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      setPwStatus("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwStatus(err.response?.data?.message || "Failed to change password.");
      setPwError(true);
    }
  }

  async function handleChangeEmail(event) {
    event.preventDefault();
    setEmStatus("");
    setEmError(false);
    if (!newEmail || !newEmail.includes("@")) {
      setEmStatus("Please enter a valid email address.");
      setEmError(true);
      return;
    }
    try {
      await api.post("/auth/change-email", { currentPassword: emailPassword, newEmail });
      setEmStatus("Login email changed successfully! Use this email next time you log in.");
      setEmailPassword("");
      setNewEmail("");
    } catch (err) {
      setEmStatus(err.response?.data?.message || "Failed to change email.");
      setEmError(true);
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-black text-slate-950 dark:text-white">Account Security</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Change your admin login password and email address.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Change Password */}
        <form onSubmit={handleChangePassword} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ocean-50 text-ocean-700 dark:bg-white/10 dark:text-ocean-100"><Key size={20} /></span>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Change Password</h3>
          </div>
          <div className="grid gap-3">
            <Field label="Current password" value={currentPassword} onChange={setCurrentPassword} type="password" required />
            <Field label="New password (min 8 chars)" value={newPassword} onChange={setNewPassword} type="password" required />
            <Field label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} type="password" required />
          </div>
          <button className="btn-primary mt-4" type="submit"><Save size={17} /> Update Password</button>
          {pwStatus && <p className={`mt-3 text-sm font-bold ${pwError ? "text-red-600" : "text-green-600"}`}>{pwStatus}</p>}
        </form>

        {/* Change Email */}
        <form onSubmit={handleChangeEmail} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ocean-50 text-ocean-700 dark:bg-white/10 dark:text-ocean-100"><Mail size={20} /></span>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Change Login Email</h3>
          </div>
          <div className="grid gap-3">
            <Field label="Current password (for verification)" value={emailPassword} onChange={setEmailPassword} type="password" required />
            <Field label="New login email" value={newEmail} onChange={setNewEmail} required />
          </div>
          <button className="btn-primary mt-4" type="submit"><Save size={17} /> Update Email</button>
          {emStatus && <p className={`mt-3 text-sm font-bold ${emError ? "text-red-600" : "text-green-600"}`}>{emStatus}</p>}
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, required = false, className = "", type = "text" }) {
  const inputClass = "mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-500 dark:border-white/10 dark:bg-slate-950";
  return (
    <label className={`block text-sm font-semibold text-slate-700 dark:text-slate-200 ${className}`}>
      {label}
      {textarea ? (
        <textarea required={required} className={`${inputClass} min-h-28`} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input type={type} required={required} className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
