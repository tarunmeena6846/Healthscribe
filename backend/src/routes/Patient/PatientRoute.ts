import express, { Router, Request, Response } from "express";
import ReferringProviderModel from "../../db/models/ReferringProvider";
import medicalCenterModel from "../../db/models/medicalCenter";
import CareTeamModel from "../../db/models/careTeam";
import TaskModel from "../../db/models/Task";
import PatientModel from "../../db/models/patient";
import multer from "multer";
import fs from "fs";
// import {
//   Patient,
//   MedicalCenter,
//   CareTeam,
//   Task,
//   ReferringProvider,
// } from "../models"; // Import Mongoose models

const router = express.Router();

router.post("/add-patient", async (req: Request, res: Response) => {
  const {
    fullName,
    gender,
    email,
    phoneNumber,
    insuranceNumber,
    dateOfBirth,
    address,
    allergies,
    medications,
    referringProviderId,
    medicalCenterIds,
    careTeamIds,
    tasks,
  } = req.body;

  try {
    // Convert date string to Date object
    const dob = new Date(dateOfBirth);

    // Find referring provider if available
    let referringProvider = null;
    if (referringProviderId) {
      referringProvider = await ReferringProviderModel.findById(
        referringProviderId
      );
      if (!referringProvider) {
        return res.status(400).json({ error: "Referring provider not found" });
      }
    }

    // Find medical centers by IDs
    const foundMedicalCenters = await medicalCenterModel.find({
      _id: { $in: medicalCenterIds },
    });
    if (foundMedicalCenters.length !== medicalCenterIds.length) {
      return res
        .status(400)
        .json({ error: "One or more medical centers not found" });
    }

    // Find care teams by IDs
    const foundCareTeams = await CareTeamModel.find({
      _id: { $in: careTeamIds },
    });
    if (foundCareTeams.length !== careTeamIds.length) {
      return res
        .status(400)
        .json({ error: "One or more care teams not found" });
    }

    // Create tasks
    const createdTasks = await TaskModel.create(
      tasks.map((task: any) => ({ description: task.description }))
    );

    // Create patient document
    const newPatient = new PatientModel({
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
    const createdPatient = await newPatient.save();

    res.status(201).json(createdPatient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Could not add patient" });
  }
});
export default router;
