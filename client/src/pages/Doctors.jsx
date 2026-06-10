import DoctorCards from "../components/DoctorCards";

export default function Doctors() {
  return (
    <section className="container-page py-16">
      <h1 className="section-title">Doctors</h1>
      <p className="section-copy">Meet the specialists supporting Arigya Hospital's clinical departments.</p>
      <div className="mt-8"><DoctorCards /></div>
    </section>
  );
}
