"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// A patient is a user that is receiving care.
// A medical center represents a healthcare facility.
const MedicalCenterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    patients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Patient" }],
    providers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Provider" }],
    support: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Support" }],
    createdAt: { type: Date, default: Date.now },
});
const medicalCenterModel = mongoose_1.default.model("medicalCenterModel", MedicalCenterSchema);
exports.default = medicalCenterModel;
