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
const ReferringProvider_1 = __importDefault(require("../../db/models/ReferringProvider"));
const medicalCenter_1 = __importDefault(require("../../db/models/medicalCenter"));
const careTeam_1 = __importDefault(require("../../db/models/careTeam"));
const Task_1 = __importDefault(require("../../db/models/Task"));
const patient_1 = __importDefault(require("../../db/models/patient"));
// import {
//   Patient,
//   MedicalCenter,
//   CareTeam,
//   Task,
//   ReferringProvider,
// } from "../models"; // Import Mongoose models
const router = express_1.default.Router();
router.post("/add-patient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, gender, email, phoneNumber, insuranceNumber, dateOfBirth, address, allergies, medications, referringProviderId, medicalCenterIds, careTeamIds, tasks, } = req.body;
    try {
        // Convert date string to Date object
        const dob = new Date(dateOfBirth);
        // Find referring provider if available
        let referringProvider = null;
        if (referringProviderId) {
            referringProvider = yield ReferringProvider_1.default.findById(referringProviderId);
            if (!referringProvider) {
                return res.status(400).json({ error: "Referring provider not found" });
            }
        }
        // Find medical centers by IDs
        const foundMedicalCenters = yield medicalCenter_1.default.find({
            _id: { $in: medicalCenterIds },
        });
        if (foundMedicalCenters.length !== medicalCenterIds.length) {
            return res
                .status(400)
                .json({ error: "One or more medical centers not found" });
        }
        // Find care teams by IDs
        const foundCareTeams = yield careTeam_1.default.find({
            _id: { $in: careTeamIds },
        });
        if (foundCareTeams.length !== careTeamIds.length) {
            return res
                .status(400)
                .json({ error: "One or more care teams not found" });
        }
        // Create tasks
        const createdTasks = yield Task_1.default.create(tasks.map((task) => ({ description: task.description })));
        // Create patient document
        const newPatient = new patient_1.default({
            fullName,
            gender,
            email,
            phoneNumber,
            insuranceNumber,
            dateOfBirth: dob,
            address,
            allergies,
            medications,
            referringProvider: referringProvider ? referringProvider._id : null,
            medicalCenters: foundMedicalCenters.map((mc) => mc._id),
            careTeam: foundCareTeams,
            tasks: createdTasks,
        });
        // Save patient to MongoDB
        const createdPatient = yield newPatient.save();
        res.status(201).json(createdPatient);
    }
    catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ error: "Could not add patient" });
    }
}));
exports.default = router;
