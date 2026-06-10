import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    department: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    preferredDate: { type: Date },
    message: { type: String, trim: true },
    recommendation: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
