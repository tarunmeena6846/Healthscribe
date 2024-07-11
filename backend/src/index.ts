import express from "express";
import cors from "cors";
import index from "./routes/auth/index";
import orgRoute from "./routes/OrgRoute/orgRoute";
import PatientRoute from "./routes/Patient/PatientRoute";
import dataRoute from "./routes/dataRoute/dataRoute";
import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let cachedDb: Connection | null = null;

const connectDB = async () => {
  if (cachedDb && cachedDb.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return cachedDb;
  }
  console.log("Creating new MongoDB connection");
  console.log(process.env.MONGODB_URL);
  try {
    const mongooseInstance = await mongoose.connect(
      process.env.MONGODB_URL || "",
      {
        dbName: "avon",
        serverSelectionTimeoutMS: 30000, // Increase timeout
      }
    );

    cachedDb = mongooseInstance.connection;
    console.log("Connected to MongoDB");
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

// Middleware to ensure the MongoDB connection is established
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to the database" });
  }
});
app.use("/auth", index);
app.use("/org", orgRoute);
app.use("/patient", PatientRoute);
app.use("/data", dataRoute);
// app.use("/stripe", stripeRoutes);
// app.use("/post", postRoute);
// app.use("/swot", swotRoute);
// app.use("/event", eventRoute);
app.get("/", (req, res) => {
  res.status(200).json("server is healthy");
});
app.listen(3001, () => {
  console.log("listeing to server at port", 3001);
});
