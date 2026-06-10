import Appointment from "../models/Appointment.js";
import Department from "../models/Department.js";
import Doctor from "../models/Doctor.js";
import Lead from "../models/Lead.js";
import Setting from "../models/Setting.js";
import { toCsv } from "../utils/csv.js";

const modelMap = { appointments: Appointment, leads: Lead, doctors: Doctor, departments: Department, settings: Setting };

export async function dashboard(req, res) {
  const [appointments, leads, inquiries] = await Promise.all([
    Appointment.countDocuments(),
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" })
  ]);
  res.json({
    totals: { appointments, leads, inquiries },
    chart: [
      { name: "Mon", appointments: 12, leads: 5 },
      { name: "Tue", appointments: 18, leads: 8 },
      { name: "Wed", appointments: 16, leads: 6 },
      { name: "Thu", appointments: 20, leads: 9 },
      { name: "Fri", appointments: 24, leads: 11 },
      { name: "Sat", appointments: 14, leads: 7 }
    ],
    activity: ["Dashboard viewed", "Appointment workflow active", "Lead notification service ready"]
  });
}

export async function listResource(req, res) {
  const Model = modelMap[req.params.resource];
  const items = await Model.find().sort({ createdAt: -1 }).limit(500);
  res.json({ items });
}

export async function createResource(req, res) {
  const Model = modelMap[req.params.resource];
  if (req.params.resource === "settings") {
    const item = await Setting.findOneAndUpdate({}, req.body, { new: true, runValidators: true, upsert: true });
    return res.status(201).json(item);
  }
  const item = await Model.create(req.body);
  res.status(201).json(item);
}

export async function updateResource(req, res) {
  const Model = modelMap[req.params.resource];
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

export async function deleteResource(req, res) {
  const Model = modelMap[req.params.resource];
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
}

export async function exportResource(req, res) {
  const Model = modelMap[req.params.resource];
  const rows = await Model.find().sort({ createdAt: -1 });
  res.header("Content-Type", "text/csv");
  res.attachment(`${req.params.resource}.csv`);
  res.send(toCsv(rows));
}

export async function updateAppointmentStatus(req, res) {
  const item = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Appointment not found" });
  res.json(item);
}
