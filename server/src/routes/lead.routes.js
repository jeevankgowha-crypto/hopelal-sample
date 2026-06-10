import express from "express";
import { createLead, leadValidation } from "../controllers/public.controller.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", leadValidation, validate, createLead);

export default router;
