import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
    source: { type: String, default: "website" }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
