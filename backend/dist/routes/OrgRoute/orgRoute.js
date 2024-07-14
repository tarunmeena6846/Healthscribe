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
const organization_1 = __importDefault(require("../../db/models/organization"));
const router = express_1.default.Router();
router.post("/create-organization", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("At create org");
    const { name, email, phone, specialty, medicalCenters } = req.body;
    try {
        // // Find medical centers by IDs (assuming medicalCenters is an array of MedicalCenter IDs)
        // const foundMedicalCenters = await medicalCenterModel.find({
        //   _id: { $in: medicalCenters },
        // });
        // if (foundMedicalCenters.length !== medicalCenters.length) {
        //   return res
        //     .status(400)
        //     .json({ error: "One or more medical centers not found" });
        // }
        // Create new organization document
        const newOrganization = new organization_1.default({
            name,
            email,
            phoneNumber: phone,
            admin: [email],
            specialty,
            // medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
            medicalCenters: [medicalCenters],
        });
        // Save organization to MongoDB
        const createdOrganization = yield newOrganization.save();
        res.status(201).json({ organization: createdOrganization });
    }
    catch (error) {
        console.error("Error creating organization:", error);
        res.status(500).json({ error: "Could not create organization" });
    }
}));
exports.default = router;
