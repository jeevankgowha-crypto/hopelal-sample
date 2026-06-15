import {
  Activity,
  Baby,
  Brain,
  FlaskConical,
  HeartPulse,
  Hospital,
  Microscope,
  ShieldPlus,
  Stethoscope,
  Syringe
} from "lucide-react";

export const hospital = {
  name: "Arogya Hospital",
  phone: "+91 8088929007",
  email: "jeevankgowha@gmail.com",
  whatsapp: "918088929007",
  address: "Arogya Hospital, Karnataka, India"
};

export const departments = [
  { name: "Cardiology", icon: HeartPulse, description: "Heart screening, ECG, echo, cardiac risk care, and preventive cardiology." },
  { name: "Neurology", icon: Brain, description: "Stroke, migraine, epilepsy, neuropathy, and movement disorder support." },
  { name: "Orthopedics", icon: Activity, description: "Bone, joint, trauma, sports injury, and rehabilitation care." },
  { name: "Pediatrics", icon: Baby, description: "Newborn care, vaccination, growth monitoring, and pediatric emergencies." },
  { name: "Gynecology", icon: Syringe, description: "Women wellness, maternity care, fertility counseling, and surgical care." },
  { name: "General Medicine", icon: Stethoscope, description: "Primary care, fever clinic, chronic illness management, and checkups." },
  { name: "Emergency Care", icon: ShieldPlus, description: "24/7 emergency response, triage, stabilization, and critical transfer." },
  { name: "ICU", icon: Hospital, description: "Advanced monitoring, ventilator support, and multi-disciplinary critical care." },
  { name: "Radiology", icon: Microscope, description: "X-ray, ultrasound, imaging reports, and guided diagnostics." },
  { name: "Laboratory", icon: FlaskConical, description: "Pathology, biochemistry, hematology, and fast sample reporting." }
];

export const doctors = [
  { name: "Dr. Kavya Rao", role: "Senior Cardiologist", exp: "14 yrs", schedule: "Mon, Wed, Fri", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=720&q=80" },
  { name: "Dr. Arjun Menon", role: "Consultant Neurologist", exp: "12 yrs", schedule: "Tue, Thu, Sat", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=720&q=80" },
  { name: "Dr. Meera Iyer", role: "Gynecologist", exp: "11 yrs", schedule: "Daily OPD", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=720&q=80" },
  { name: "Dr. Nikhil Shetty", role: "Orthopedic Surgeon", exp: "10 yrs", schedule: "Mon-Sat", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=720&q=80" }
];

export const testimonials = [
  { name: "Ananya P.", text: "The emergency team was fast, calm, and deeply reassuring during a stressful night.", rating: 5 },
  { name: "Ramesh G.", text: "Clean hospital, clear communication, and doctors who explained every step.", rating: 5 },
  { name: "Farah K.", text: "Booking online was simple and the follow-up reminders were very helpful.", rating: 5 }
];

export const faqs = [
  { q: "Is emergency care available 24/7?", a: "Yes. Arogya Hospital has round-the-clock emergency triage and stabilization support." },
  { q: "Can I book an appointment online?", a: "Yes. Use the appointment form and our team will confirm your slot by phone or email." },
  { q: "Do you provide diagnostic services?", a: "Yes. Radiology and laboratory services are available for outpatient and inpatient care." },
  { q: "How do appointment reminders work?", a: "The backend includes email automation hooks for confirmations and reminders." }
];

export const blogPosts = [
  { title: "How to Prepare for a Preventive Health Checkup", category: "Wellness", minutes: "4 min read" },
  { title: "Recognizing Early Warning Signs of Stroke", category: "Neurology", minutes: "6 min read" },
  { title: "Keeping Children Safe During Seasonal Fevers", category: "Pediatrics", minutes: "5 min read" }
];
