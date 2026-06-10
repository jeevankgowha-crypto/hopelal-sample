import express from "express";
import { getDoctors, getSettings } from "../controllers/site.controller.js";

const router = express.Router();

router.get("/settings", getSettings);
router.get("/doctors", getDoctors);

export default router;
