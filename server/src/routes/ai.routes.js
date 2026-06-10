import express from "express";
import { aiValidation, chat } from "../controllers/ai.controller.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/chat", aiValidation, validate, chat);

export default router;
