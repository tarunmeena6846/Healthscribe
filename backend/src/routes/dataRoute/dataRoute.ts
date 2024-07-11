import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./aws-config";
import { exec } from "child_process";
import { S3Client } from "@aws-sdk/client-s3";

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3 as S3Client,
    bucket: "avonbucket",
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
  upload.single("video"),
  async (req: Request, res: Response) => {
    console.log("here");
    try {
      const s3Key = (req.file as any).key; // Get the S3 key of the uploaded file
      const s3Uri = `s3://avonbucket/${s3Key}`; // Construct S3 URI

      const jobName = `medical-scribe-job-${Date.now()}`;
      const roleArn = "arn:aws:iam::432096035218:role/testrole1"; // Replace with your actual IAM Role ARN

      exec(
        `python3 process.py start ${jobName} ${s3Uri} "avonbucket" ${roleArn}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send("Error starting HealthScribe job");
            return;
          }
          console.log("at upload", jobName, s3Uri);
          res.status(200).json({ jobId: jobName, s3Uri });
        }
      );
    } catch (error) {
      res.status(400).json({ message: "server error while uploading" });
    }
  }
);

router.get("/job/:jobId", async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  console.log("at jobId", jobId);
  exec(`python3 process.py status ${jobId}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send("Error retrieving HealthScribe job status");
      return;
    }
    console.log(stdout);
    const status = JSON.parse(stdout);
    console.log(status);
    res.json(status);
  });
});

export default router;
