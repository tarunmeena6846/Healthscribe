import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.

// A medical center represents a healthcare facility.
const MedicalCenterSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  providers: [{ type: Schema.Types.ObjectId, ref: "Provider" }],
  support: [{ type: Schema.Types.ObjectId, ref: "Support" }],
  createdAt: { type: Date, default: Date.now },
});
const medicalCenterModel = mongoose.model(
  "medicalCenterModel",
  MedicalCenterSchema
);

export default medicalCenterModel;
