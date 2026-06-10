import { Mail, MapPin, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { departments, hospital } from "../lib/data";
import { useSiteSettings } from "../lib/siteData";

export default function Footer() {
  const settings = useSiteSettings();
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ocean-600 text-xl font-black text-white">A</span>
            <div>
              <p className="text-lg font-bold">{settings.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Compassionate multispecialty healthcare.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            Built for fast access to doctors, diagnostics, emergency care, and trusted medical information.
          </p>
        </div>
        <div>
          <p className="font-semibold">Departments</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            {departments.slice(0, 5).map((department) => (
              <Link key={department.name} to="/departments" className="hover:text-ocean-700">{department.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <a href={`tel:${settings.phone || hospital.phone}`} className="flex items-center gap-2"><PhoneCall size={16} /> {settings.phone}</a>
            <a href={`mailto:${settings.email || hospital.email}`} className="flex items-center gap-2"><Mail size={16} /> {settings.email}</a>
            <span className="flex items-center gap-2"><MapPin size={16} /> {settings.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500 dark:border-white/10">
        © {new Date().getFullYear()} Arigya Hospital. All rights reserved.
      </div>
    </footer>
  );
}
