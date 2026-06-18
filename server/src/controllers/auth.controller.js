import { body } from "express-validator";
import Admin from "../models/Admin.js";
import { signToken } from "../utils/token.js";

export const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 })
];

export async function login(req, res) {
  const admin = await Admin.findOne({ email: req.body.email }).select("+password");
  if (!admin || !(await admin.comparePassword(req.body.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ token: signToken(admin), admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
}

export async function changePassword(req, res) {
  const admin = await Admin.findById(req.admin._id).select("+password");
  const ok = await admin.comparePassword(req.body.currentPassword);
  if (!ok) return res.status(403).json({ message: "Current password is incorrect" });
  admin.password = req.body.newPassword;
  await admin.save();
  res.json({ message: "Password updated" });
}

export async function changeEmail(req, res) {
  const admin = await Admin.findById(req.admin._id).select("+password");
  const ok = await admin.comparePassword(req.body.currentPassword);
  if (!ok) return res.status(403).json({ message: "Current password is incorrect" });
  admin.email = req.body.newEmail;
  await admin.save();
  res.json({ message: "Email updated", email: admin.email });
}
