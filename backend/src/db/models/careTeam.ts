import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.

// A care team is a group of organization members that are working together to provide care to a patient.
const CareTeamSchema = new Schema({
  name: { type: String, required: true },
  patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});
const CareTeamModel = mongoose.model("CareTeamModel", CareTeamSchema);

export default CareTeamModel;
