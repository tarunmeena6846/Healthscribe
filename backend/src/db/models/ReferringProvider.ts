import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.

// The referring provider is an external person or organization that you are collaborating with to take care of a patient.
const ReferringProviderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  createdAt: { type: Date, default: Date.now },
});
const ReferringProviderModel = mongoose.model(
  "ReferringProviderModel",
  ReferringProviderSchema
);

export default ReferringProviderModel;
