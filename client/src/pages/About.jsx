export default function About() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="section-title">About Arigya Hospital</h1>
          <p className="section-copy">Arigya Hospital is designed as a modern multispecialty care destination combining emergency readiness, specialty consultations, diagnostics, and patient-friendly digital access.</p>
          <p className="mt-5 text-slate-600 dark:text-slate-300">Our care model focuses on fast triage, clear communication, clinical quality, and continuity from first contact through follow-up.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80" alt="Hospital corridor" className="h-96 w-full rounded-3xl object-cover shadow-soft" />
      </div>
    </section>
  );
}
