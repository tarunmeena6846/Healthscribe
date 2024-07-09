import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.
const PatientSchema = new Schema({
  fullName: { type: String, required: true },
  gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  insuranceNumber: { type: String },
  dateOfBirth: { type: Date, required: true },
  address: { type: String },
  medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }], // Using references for many-to-many-like relation
  careTeam: [{ type: Schema.Types.ObjectId, ref: "CareTeam" }],
  allergies: [{ type: String }],
  medications: [{ type: String }],
  referringProvider: { type: Schema.Types.ObjectId, ref: "ReferringProvider" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdAt: { type: Date, default: Date.now },
});

const PatientModel = mongoose.model("PatientModel", PatientSchema);

export default PatientModel;
