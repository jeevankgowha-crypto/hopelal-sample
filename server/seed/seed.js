import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../src/models/Admin.js";
import Appointment from "../src/models/Appointment.js";
import Department from "../src/models/Department.js";
import Doctor from "../src/models/Doctor.js";
import Lead from "../src/models/Lead.js";
import Setting from "../src/models/Setting.js";

dotenv.config();

const departments = [
  ["Cardiology", "Heart screening, ECG, echo, cardiac risk care, and preventive cardiology."],
  ["Neurology", "Stroke, migraine, epilepsy, neuropathy, and movement disorder support."],
  ["Orthopedics", "Bone, joint, trauma, sports injury, and rehabilitation care."],
  ["Pediatrics", "Newborn care, vaccination, growth monitoring, and pediatric emergencies."],
  ["Gynecology", "Women wellness, maternity care, fertility counseling, and surgical care."],
  ["General Medicine", "Primary care, fever clinic, chronic illness management, and checkups."],
  ["Emergency Care", "24/7 emergency response, triage, stabilization, and critical transfer."],
  ["ICU", "Advanced monitoring, ventilator support, and multi-disciplinary critical care."],
  ["Radiology", "X-ray, ultrasound, imaging reports, and guided diagnostics."],
  ["Laboratory", "Pathology, biochemistry, hematology, and fast sample reporting."]
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/arigya_hospital");
  await Promise.all([Admin.deleteMany(), Department.deleteMany(), Doctor.deleteMany(), Appointment.deleteMany(), Lead.deleteMany(), Setting.deleteMany()]);

  await Admin.create({ name: "Arigya Super Admin", email: "admin@arigya.local", password: "ChangeMe@123", role: "super_admin" });
  await Department.insertMany(departments.map(([name, description]) => ({ name, description })));
  await Doctor.insertMany([
    { name: "Dr. Kavya Rao", role: "Senior Cardiologist", department: "Cardiology", experience: "14 yrs", schedule: "Mon, Wed, Fri", bio: "Preventive cardiology, ECG, echo, and cardiac risk care.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=720&q=80" },
    { name: "Dr. Arjun Menon", role: "Consultant Neurologist", department: "Neurology", experience: "12 yrs", schedule: "Tue, Thu, Sat", bio: "Stroke, migraine, epilepsy, and neuropathy support.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=720&q=80" },
    { name: "Dr. Meera Iyer", role: "Gynecologist", department: "Gynecology", experience: "11 yrs", schedule: "Daily OPD", bio: "Women wellness, maternity care, and fertility counseling.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=720&q=80" },
    { name: "Dr. Nikhil Shetty", role: "Orthopedic Surgeon", department: "Orthopedics", experience: "10 yrs", schedule: "Mon-Sat", bio: "Joint, trauma, sports injury, and rehabilitation care.", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=720&q=80" }
  ]);
  await Appointment.create({ name: "Rahul N", phone: "+91 9888888888", email: "rahul@example.com", department: "Cardiology", preferredDate: new Date(), status: "pending", recommendation: "Cardiology" });
  await Lead.create({ name: "Priya S", phone: "+91 9000000000", email: "priya@example.com", message: "Need pediatric consultation details." });
  await Setting.create({});

  console.log("Seed complete. Admin: admin@arigya.local / ChangeMe@123");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
