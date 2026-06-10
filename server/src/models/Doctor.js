import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: String },
    schedule: { type: String },
    image: { type: String },
    bio: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
