"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/auth/index"));
const orgRoute_1 = __importDefault(require("./routes/OrgRoute/orgRoute"));
const PatientRoute_1 = __importDefault(require("./routes/Patient/PatientRoute"));
const dataRoute_1 = __importDefault(require("./routes/dataRoute/dataRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let cachedDb = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedDb && cachedDb.readyState === 1) {
        console.log("Using existing MongoDB connection");
        return cachedDb;
    }
    console.log("Creating new MongoDB connection");
    console.log(process.env.MONGODB_URL);
    try {
        const mongooseInstance = yield mongoose_1.default.connect(process.env.MONGODB_URL || "", {
            dbName: "avon",
            serverSelectionTimeoutMS: 30000, // Increase timeout
        });
        cachedDb = mongooseInstance.connection;
        console.log("Connected to MongoDB");
        return cachedDb;
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with failure
    }
});
// Middleware to ensure the MongoDB connection is established
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        next();
    }
    catch (err) {
        res.status(500).json({ error: "Failed to connect to the database" });
    }
}));
app.use("/auth", index_1.default);
app.use("/org", orgRoute_1.default);
app.use("/patient", PatientRoute_1.default);
app.use("/data", dataRoute_1.default);
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
