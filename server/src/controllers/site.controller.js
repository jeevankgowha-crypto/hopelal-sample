import Doctor from "../models/Doctor.js";
import Setting from "../models/Setting.js";

export async function getSettings(req, res) {
  const settings = await Setting.findOne().sort({ createdAt: -1 });
  res.json(settings || {});
}

export async function getDoctors(req, res) {
  const items = await Doctor.find({ active: true }).sort({ createdAt: -1 });
  res.json({ items });
}
