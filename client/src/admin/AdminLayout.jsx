import { BarChart3, CalendarCheck, LogOut, Settings, Stethoscope, Users } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const nav = [
  ["Dashboard", "/admin", BarChart3],
  ["Leads", "/admin/leads", Users],
  ["Appointments", "/admin/appointments", CalendarCheck],
  ["Doctors", "/admin/doctors", Stethoscope],
  ["Settings", "/admin/settings", Settings]
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("arigya_token");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 lg:block">
        <div className="text-xl font-black text-slate-950 dark:text-white">Arigya Admin</div>
        <nav className="mt-8 grid gap-2">
          {nav.map(([label, href, Icon]) => (
            <NavLink key={href} to={href} end={href === "/admin"} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold ${isActive ? "bg-ocean-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600 dark:border-white/10 dark:text-slate-300">
          <LogOut size={17} /> Logout
        </button>
      </aside>
      <main className="lg:pl-72">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-900/90 lg:hidden">
          <span className="font-black">Arigya Admin</span>
          <button onClick={logout} className="text-sm font-bold text-red-600">Logout</button>
        </div>
        <div className="container-page py-8"><Outlet /></div>
      </main>
    </div>
  );
}
