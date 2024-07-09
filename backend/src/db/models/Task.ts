import mongoose, { Document, Schema, Types } from "mongoose";
// A patient is a user that is receiving care.

// A task is a piece of work that needs to be done.
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["in_progress", "complete"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model("TaskModel", TaskSchema);

export default TaskModel;
