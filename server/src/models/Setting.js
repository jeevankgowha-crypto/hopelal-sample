import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, default: "Arigya Hospital" },
    phone: { type: String, default: "+91 8088929007" },
    email: { type: String, default: "jeevankgowha@gmail.com" },
    address: { type: String, default: "Arigya Hospital, Karnataka, India" },
    whatsapp: { type: String, default: "918088929007" },
    mapEmbedUrl: { type: String, default: "https://www.google.com/maps?q=Arigya%20Hospital&output=embed" }
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
