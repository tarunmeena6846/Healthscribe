// // A patient is a user that is receiving care.
// const PatientSchema = new Schema({
//   fullName: { type: String, required: true },
//   gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String },
//   insuranceNumber: { type: String },
//   dateOfBirth: { type: Date, required: true },
//   address: { type: String },
//   medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }], // Using references for many-to-many-like relation
//   careTeam: [{ type: Schema.Types.ObjectId, ref: "CareTeam" }],
//   allergies: [{ type: String }],
//   medications: [{ type: String }],
//   referringProvider: { type: Schema.Types.ObjectId, ref: "ReferringProvider" },
//   tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
//   createdAt: { type: Date, default: Date.now },
// });

// // A provider is a user who is delivering care to the patient.
// const ProviderSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String },
//   admin: {
//     type: String,
//     enum: ["global_admin", "local_admin", "not_admin"],
//     required: true,
//   },
//   specialty: { type: String },
//   medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
//   createdAt: { type: Date, default: Date.now },
// });

// // A support member is an organization member on the support tier.
// const SupportSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String },
//   medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
//   admin: {
//     type: String,
//     enum: ["global_admin", "local_admin", "not_admin"],
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// // A user is a general user in the system.
// const UserSchema = new Schema({
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["PROVIDER", "SUPPORT", "PATIENT"],
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
//   tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
// });

// // A care team is a group of organization members that are working together to provide care to a patient.
// const CareTeamSchema = new Schema({
//   name: { type: String, required: true },
//   patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
//   members: [{ type: String }],
//   createdAt: { type: Date, default: Date.now },
// });

// // A task is a piece of work that needs to be done.
// const TaskSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
//   assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
//   status: { type: String, enum: ["in_progress", "complete"], required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// // The referring provider is an external person or organization that you are collaborating with to take care of a patient.
// const ReferringProviderSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String },
//   patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
//   createdAt: { type: Date, default: Date.now },
// });

// // A medical center represents a healthcare facility.
// const MedicalCenterSchema = new Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
//   providers: [{ type: Schema.Types.ObjectId, ref: "Provider" }],
//   support: [{ type: Schema.Types.ObjectId, ref: "Support" }],
//   createdAt: { type: Date, default: Date.now },
// });

// // A peer group is a grouping of patients that can be used to tailor their experience on the platform.
// const PeerGroupSchema = new Schema({
//   name: { type: String, required: true },
//   members: [{ type: String }],
//   createdAt: { type: Date, default: Date.now },
// });

// const Patient = mongoose.model("Patient", PatientSchema);
// const Provider = mongoose.model("Provider", ProviderSchema);
// const Support = mongoose.model("Support", SupportSchema);
// const User = mongoose.model("User", UserSchema);
// const CareTeam = mongoose.model("CareTeam", CareTeamSchema);
// const Task = mongoose.model("Task", TaskSchema);
// const ReferringProvider = mongoose.model(
//   "ReferringProvider",
//   ReferringProviderSchema
// );
// const MedicalCenter = mongoose.model("MedicalCenter", MedicalCenterSchema);
// const PeerGroup = mongoose.model("PeerGroup", PeerGroupSchema);

// module.exports = {
//   Patient,
//   Provider,
//   Support,
//   User,
//   CareTeam,
//   Task,
//   ReferringProvider,
//   MedicalCenter,
//   PeerGroup,
// };
