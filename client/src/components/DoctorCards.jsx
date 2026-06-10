import { CalendarDays } from "lucide-react";
import { useSiteDoctors } from "../lib/siteData";

export default function DoctorCards() {
  const doctors = useSiteDoctors();
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {doctors.map((doctor) => (
        <article key={doctor.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-slate-900">
          <img src={doctor.image} alt={doctor.name} className="h-56 w-full object-cover" loading="lazy" />
          <div className="p-5">
            <h3 className="text-lg font-bold">{doctor.name}</h3>
            <p className="text-sm font-semibold text-ocean-700 dark:text-ocean-100">{doctor.role}</p>
            {doctor.bio && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{doctor.bio}</p>}
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>{doctor.exp}</span>
              <span className="flex items-center gap-1"><CalendarDays size={15} /> {doctor.schedule}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
