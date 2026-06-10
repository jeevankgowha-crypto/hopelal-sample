import { Menu, Moon, PhoneCall, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { hospital } from "../lib/data";
import { useSiteSettings } from "../lib/siteData";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Departments", "/departments"],
  ["Doctors", "/doctors"],
  ["Appointments", "/appointments"],
  ["Contact", "/contact"],
  ["Health Blog", "/health-blog"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const settings = useSiteSettings();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-slate-950/85">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Arigya Hospital home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ocean-600 text-lg font-black text-white">A</span>
          <span>
            <span className="block text-lg font-bold leading-tight">{settings.name}</span>
            <span className="text-xs font-medium text-ocean-700 dark:text-ocean-100">Multispecialty Care</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-ocean-50 text-ocean-700 dark:bg-white/10 dark:text-ocean-100" : "text-slate-600 hover:text-ocean-700 dark:text-slate-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a className="btn-secondary" href={`tel:${settings.phone || hospital.phone}`}>
            <PhoneCall size={17} /> Emergency
          </a>
          <button className="btn-secondary !rounded-full !px-3" onClick={() => setDark((value) => !value)} aria-label="Toggle dark mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button className="btn-secondary !px-3 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950 lg:hidden">
          <nav className="container-page grid gap-2 py-4">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-ocean-50 dark:hover:bg-white/10">
                {label}
              </NavLink>
            ))}
            <button className="btn-secondary justify-start" onClick={() => setDark((value) => !value)}>
              {dark ? <Sun size={18} /> : <Moon size={18} />} Toggle mode
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
