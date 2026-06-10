import express from "express";
import { changePassword, login, loginValidation } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/login", loginValidation, validate, login);
router.post("/change-password", protect, changePassword);
router.post("/logout", protect, (req, res) => res.json({ message: "Logged out" }));

export default router;
