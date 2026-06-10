import { body } from "express-validator";
import { answerPatientQuestion, recommendDepartment } from "../services/ai.service.js";

export const aiValidation = [body("message").trim().isLength({ min: 2, max: 1000 })];

export function chat(req, res) {
  res.json({
    answer: answerPatientQuestion(req.body.message),
    recommendedDepartment: recommendDepartment(req.body.message)
  });
}
