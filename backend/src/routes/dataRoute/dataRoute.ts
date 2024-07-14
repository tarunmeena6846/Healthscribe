import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./aws-config"; // Ensure you have the correct s3 configuration in aws-config
import { exec } from "child_process";
import { S3Client } from "@aws-sdk/client-s3";
import fetch from "node-fetch"; // Add node-fetch to your dependencies
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
console.log(process.env.AWS_BUCKET_NAME);
const upload = multer({
  storage: multerS3({
    s3: s3 as S3Client,
    bucket: process.env.AWS_BUCKET_NAME || "",
    key: function (
      req: Request,
      file: Express.Multer.File,
      cb: (error: any, key?: string) => void
    ) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.get("/", (req, res) => {
  console.log("herewweww");
});

console.log("data route");

router.post(
  "/upload",
  upload.single("audio"),
  async (req: Request, res: Response) => {
    console.log("here");
    try {
      const s3Key = (req.file as any).key; // Get the S3 key of the uploaded file
      const s3Uri = `s3://${process.env.AWS_BUCKET_NAME}/${s3Key}`; // Construct S3 URI

      const jobName = `medical-scribe-job-${Date.now()}`;
      const roleArn = process.env.AWS_USER_ROLE; // Replace with your actual IAM Role ARN

      exec(
        `python3 process.py start ${jobName} ${s3Uri} ${process.env.AWS_BUCKET_NAME} ${roleArn}`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send("Error starting HealthScribe job");
            return;
          }
          console.log("at upload", jobName, s3Uri);

          const checkJobStatus = (): Promise<{
            completed: boolean;
            url: string;
          }> => {
            return new Promise((resolve, reject) => {
              console.log("at check job status ");
              exec(
                `python3 process.py status ${jobName}`,
                (error, stdout, stderr) => {
                  if (error) {
                    reject(`exec error: ${error}`);
                  } else {
                    const status = JSON.parse(stdout);
                    console.log(status);
                    if (status.status === "COMPLETED") {
                      console.log("resolved true ");
                      resolve({
                        completed: true,
                        url: status.clinical_document_uri,
                      });
                    } else if (status.status === "FAILED") {
                      console.log("resolved failed ");
                      resolve({
                        completed: true,
                        url: status.clinical_document_uri,
                      });
                    } else {
                      resolve({
                        completed: false,
                        url: "",
                      });
                      console.log("resolved false ");
                    }
                  }
                }
              );
            });
          };

          const waitForCompletion = async () => {
            let jobStatus = { completed: false, url: "" };
            while (!jobStatus.completed) {
              jobStatus = await checkJobStatus();
              if (!jobStatus.completed) {
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
              }
            }

            return jobStatus;
          };

          try {
            const jobStatus = await waitForCompletion();
            console.log(jobStatus);
            const response = await fetch(jobStatus.url);
            if (!response.ok) {
              console.error("Network response was not ok");
              return res.status(500).json({ success: false });
            }
            const summaryJson = await response.json();
            console.log(
              "summaryJson",
              summaryJson.ClinicalDocumentation.Sections
            );
            res.status(200).json({
              success: false,
              data: summaryJson.ClinicalDocumentation.Sections,
            });
          } catch (fetchError) {
            console.error(`Fetch error: ${fetchError}`);
            res.status(500).send("Error retrieving summary file");
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: "server error while uploading" });
    }
  }
);

export default router;
