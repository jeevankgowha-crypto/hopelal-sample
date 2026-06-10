import express from "express";
import {
  createResource,
  dashboard,
  deleteResource,
  exportResource,
  listResource,
  updateAppointmentStatus,
  updateResource
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const resources = "appointments|leads|doctors|departments|settings";

router.use(protect);
router.get("/dashboard", dashboard);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.get(`/:resource(${resources})`, listResource);
router.post(`/:resource(${resources})`, createResource);
router.get(`/:resource(${resources})/export`, exportResource);
router.patch(`/:resource(${resources})/:id`, updateResource);
router.delete(`/:resource(${resources})/:id`, deleteResource);

export default router;
