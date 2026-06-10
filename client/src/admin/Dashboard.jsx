import { Activity, CalendarCheck, MailQuestion, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../lib/api";

const fallback = {
  totals: { appointments: 128, leads: 64, inquiries: 17 },
  chart: [
    { name: "Mon", appointments: 12, leads: 4 },
    { name: "Tue", appointments: 18, leads: 7 },
    { name: "Wed", appointments: 16, leads: 5 },
    { name: "Thu", appointments: 24, leads: 9 },
    { name: "Fri", appointments: 21, leads: 8 },
    { name: "Sat", appointments: 29, leads: 13 }
  ],
  activity: ["New cardiology appointment requested", "Lead exported by admin", "Doctor schedule updated"]
};

export default function Dashboard() {
  const [stats, setStats] = useState(fallback);

  useEffect(() => {
    api.get("/admin/dashboard").then(({ data }) => setStats(data)).catch(() => setStats(fallback));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-950 dark:text-white">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["Total appointments", stats.totals.appointments, CalendarCheck],
          ["Total leads", stats.totals.leads, Users],
          ["New inquiries", stats.totals.inquiries, MailQuestion],
          ["System activity", "Live", Activity]
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
            <Icon className="text-ocean-700 dark:text-ocean-100" />
            <p className="mt-5 text-3xl font-black">{value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
          <h2 className="font-bold">Analytics</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chart}>
                <defs>
                  <linearGradient id="appointments" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="appointments" stroke="#0891b2" fill="url(#appointments)" />
                <Area type="monotone" dataKey="leads" stroke="#14b8a6" fill="#14b8a622" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
          <h2 className="font-bold">Recent activity</h2>
          <div className="mt-4 grid gap-3">
            {stats.activity.map((item) => <div key={item} className="rounded-2xl bg-slate-100 p-4 text-sm dark:bg-white/10">{item}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
