import express, { Router, Request, Response } from "express";
import medicalCenterModel from "../../db/models/medicalCenter"; // Assuming you have defined Mongoose models for Organization and MedicalCenter
import org from "../../db/models/medicalCenter"; // Assuming you have defined Mongoose models for Organization and MedicalCenter
import Organization from "../../db/models/organization";

const router = express.Router();

router.post("/create-organization", async (req: Request, res: Response) => {
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
    const newOrganization = new Organization({
      name,
      email,
      phoneNumber: phone,
      admin: [email], // Assuming the creator's email is the admin
      specialty,
      // medicalCenters: [{ type: Schema.Types.ObjectId, ref: "MedicalCenter" }],
      medicalCenters: [medicalCenters],
    });

    // Save organization to MongoDB
    const createdOrganization = await newOrganization.save();

    res.status(201).json({ organization: createdOrganization });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Could not create organization" });
  }
});

export default router;
