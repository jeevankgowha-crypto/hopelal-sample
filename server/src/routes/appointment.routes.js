import express from "express";
import { appointmentValidation, createAppointment } from "../controllers/public.controller.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", appointmentValidation, validate, createAppointment);

export default router;
