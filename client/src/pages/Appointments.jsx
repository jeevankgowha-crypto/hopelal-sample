import AppointmentForm from "../components/AppointmentForm";

export default function Appointments() {
  return (
    <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h1 className="section-title">Appointments</h1>
        <p className="section-copy">Book online for OPD, diagnostics, follow-up consultations, and specialty care. Emergency cases should call the emergency line immediately.</p>
      </div>
      <AppointmentForm />
    </section>
  );
}
