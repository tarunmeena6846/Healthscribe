import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../db/src/index";

const router = express.Router();

router.post("/create-organization", async (req: Request, res: Response) => {
  console.log("At create org");
  const { name, email, phone, specialty, medicalCenters } = req.body;
  console.log(email, medicalCenters);
  try {
    const createdOrganization = await prisma.organization.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        admin: [email],
        specialty,
        medicalCenters: medicalCenters,
      },
    });
    console.log(createdOrganization);
    res.status(201).json({ organization: createdOrganization });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Could not create organization" });
  }
});

export default router;
