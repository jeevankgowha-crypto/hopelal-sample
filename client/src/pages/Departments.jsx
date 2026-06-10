import DepartmentGrid from "../components/DepartmentGrid";

export default function Departments() {
  return (
    <section className="container-page py-16">
      <h1 className="section-title">Departments</h1>
      <p className="section-copy">Comprehensive specialty services for emergency, outpatient, diagnostic, and inpatient care.</p>
      <div className="mt-8"><DepartmentGrid /></div>
    </section>
  );
}
