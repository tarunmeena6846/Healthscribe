import mongoose, { Schema } from "mongoose";

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  admin: [{ type: String }], // Assuming admin can have multiple emails
  specialty: { type: String, required: true },
  medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
  createdAt: { type: Date, default: Date.now },
});

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
