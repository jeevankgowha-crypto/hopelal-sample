import { motion } from "framer-motion";
import { Ambulance, ArrowRight, Award, Clock, HeartHandshake, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import DepartmentGrid from "../components/DepartmentGrid";
import DoctorCards from "../components/DoctorCards";
import { faqs, hospital, testimonials } from "../lib/data";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_34%),linear-gradient(135deg,rgba(20,184,166,0.12),transparent_42%)]" />
        <div className="container-page relative grid min-h-[680px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-700 dark:bg-white/10 dark:text-ocean-100">
              <ShieldCheck size={16} /> 24/7 emergency and multispecialty care
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Arigya Hospital
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Premium, compassionate healthcare with emergency response, experienced doctors, smart appointment booking, and modern diagnostics.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/appointments" className="btn-primary">Book Appointment <ArrowRight size={18} /></Link>
              <a href={`tel:${hospital.phone}`} className="btn-secondary">Emergency Call</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[["45k+", "Patients"], ["24/7", "Emergency"], ["98%", "Satisfaction"]].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/70">
                  <p className="text-2xl font-black text-ocean-700 dark:text-ocean-100">{value}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80"
              alt="Modern hospital care team"
              className="h-[520px] w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600"><Ambulance size={28} /></span>
                <div>
                  <p className="font-bold">Emergency services ready</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Rapid triage, critical care, and transfer coordination.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="section-title">Online appointment booking</h2>
          <p className="section-copy">Request a visit, choose a department, and let the smart recommendation workflow route you to the right specialty.</p>
          <div className="mt-8 grid gap-4">
            {[Clock, Users, HeartHandshake].map((Icon, index) => (
              <div key={index} className="flex gap-4 rounded-2xl bg-white p-5 dark:bg-slate-900">
                <Icon className="text-ocean-700 dark:text-ocean-100" />
                <div>
                  <p className="font-bold">{["Fast confirmation", "Doctor matching", "Care continuity"][index]}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{["Email confirmations and admin alerts are built in.", "Symptoms and department choice help route requests.", "Reminders and follow-up workflows are ready for scheduling."][index]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AppointmentForm />
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container-page">
          <h2 className="section-title">Department overview</h2>
          <p className="section-copy">Specialty care, diagnostics, and critical support under one coordinated system.</p>
          <div className="mt-8"><DepartmentGrid /></div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            [Award, "Expert doctors", "Specialists across core medical and surgical departments."],
            [ShieldCheck, "Secure care systems", "Validated forms, protected admin routes, and privacy-aware workflows."],
            [Star, "Patient-first experience", "Clear communication, easy booking, and responsive support."]
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-3xl bg-ocean-50 p-8 dark:bg-white/5">
              <Icon className="text-ocean-700 dark:text-ocean-100" size={30} />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container-page">
          <h2 className="section-title">Doctor highlights</h2>
          <p className="section-copy">Experienced clinicians across critical and family-care specialties.</p>
          <div className="mt-8"><DoctorCards /></div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
              <div className="flex text-amber-400">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}</div>
              <p className="mt-4 text-slate-700 dark:text-slate-200">"{item.text}"</p>
              <p className="mt-5 font-bold">{item.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">FAQ</h2>
            <div className="mt-7 grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
                  <summary className="cursor-pointer font-bold">{faq.q}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title">Find us</h2>
            <p className="section-copy"><MapPin className="mr-2 inline" size={18} /> {hospital.address}</p>
            <iframe title="Arigya Hospital map" src={import.meta.env.VITE_MAP_EMBED_URL || "https://www.google.com/maps?q=Arigya%20Hospital&output=embed"} className="mt-6 h-96 w-full rounded-3xl border-0" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
