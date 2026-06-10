import { body } from "express-validator";
import Appointment from "../models/Appointment.js";
import Lead from "../models/Lead.js";
import { recommendDepartment } from "../services/ai.service.js";
import { notifyAppointmentCreated, notifyLeadCreated } from "../services/email.service.js";

export const appointmentValidation = [
  body("name").trim().isLength({ min: 2, max: 80 }),
  body("phone").trim().isLength({ min: 8, max: 20 }),
  body("email").optional({ values: "falsy" }).isEmail().normalizeEmail(),
  body("department").trim().isLength({ min: 2, max: 80 }),
  body("message").optional({ values: "falsy" }).trim().isLength({ max: 1000 })
];

export const leadValidation = [
  body("name").trim().isLength({ min: 2, max: 80 }),
  body("phone").trim().isLength({ min: 8, max: 20 }),
  body("email").optional({ values: "falsy" }).isEmail().normalizeEmail(),
  body("message").trim().isLength({ min: 3, max: 1000 })
];

export async function createAppointment(req, res) {
  const appointment = await Appointment.create({
    ...req.body,
    recommendation: recommendDepartment(`${req.body.department} ${req.body.message || ""}`)
  });
  notifyAppointmentCreated(appointment).catch(console.error);
  res.status(201).json({ message: "Appointment request created", appointment });
}

export async function createLead(req, res) {
  const lead = await Lead.create(req.body);
  notifyLeadCreated(lead).catch(console.error);
  res.status(201).json({ message: "Lead created", lead });
}
