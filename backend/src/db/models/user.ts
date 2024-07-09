import mongoose, { Document, Schema, Types } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["PROVIDER", "SUPPORT", "PATIENT"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
