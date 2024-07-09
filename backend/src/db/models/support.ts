import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.

// A provider is a user who is delivering care to the patient.
const SupportSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
  admin: {
    type: String,
    enum: ["global_admin", "local_admin", "not_admin"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const SupportModel = mongoose.model("SupportModel", SupportSchema);

export default SupportModel;
