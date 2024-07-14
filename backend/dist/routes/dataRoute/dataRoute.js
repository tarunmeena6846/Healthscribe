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
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_config_1 = require("./aws-config"); // Ensure you have the correct s3 configuration in aws-config
const child_process_1 = require("child_process");
const node_fetch_1 = __importDefault(require("node-fetch")); // Add node-fetch to your dependencies
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
dotenv_1.default.config();
console.log(process.env.AWS_BUCKET_NAME);
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: aws_config_1.s3,
        bucket: process.env.AWS_BUCKET_NAME || "",
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
router.get("/", (req, res) => {
    console.log("herewweww");
});
console.log("data route");
router.post("/upload", upload.single("audio"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    try {
        const s3Key = req.file.key; // Get the S3 key of the uploaded file
        const s3Uri = `s3://${process.env.AWS_BUCKET_NAME}/${s3Key}`; // Construct S3 URI
        const jobName = `medical-scribe-job-${Date.now()}`;
        const roleArn = process.env.AWS_USER_ROLE; // Replace with your actual IAM Role ARN
        (0, child_process_1.exec)(`python3 process.py start ${jobName} ${s3Uri} ${process.env.AWS_BUCKET_NAME} ${roleArn}`, (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(`exec error: ${error}`);
                res.status(500).send("Error starting HealthScribe job");
                return;
            }
            console.log("at upload", jobName, s3Uri);
            const checkJobStatus = () => {
                return new Promise((resolve, reject) => {
                    console.log("at check job status ");
                    (0, child_process_1.exec)(`python3 process.py status ${jobName}`, (error, stdout, stderr) => {
                        if (error) {
                            reject(`exec error: ${error}`);
                        }
                        else {
                            const status = JSON.parse(stdout);
                            console.log(status);
                            if (status.status === "COMPLETED") {
                                console.log("resolved true ");
                                resolve({
                                    completed: true,
                                    url: status.clinical_document_uri,
                                });
                            }
                            else if (status.status === "FAILED") {
                                console.log("resolved failed ");
                                resolve({
                                    completed: true,
                                    url: status.clinical_document_uri,
                                });
                            }
                            else {
                                resolve({
                                    completed: false,
                                    url: "",
                                });
                                console.log("resolved false ");
                            }
                        }
                    });
                });
            };
            const waitForCompletion = () => __awaiter(void 0, void 0, void 0, function* () {
                let jobStatus = { completed: false, url: "" };
                while (!jobStatus.completed) {
                    jobStatus = yield checkJobStatus();
                    if (!jobStatus.completed) {
                        yield new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
                    }
                }
                return jobStatus;
            });
            try {
                const jobStatus = yield waitForCompletion();
                console.log(jobStatus);
                const response = yield (0, node_fetch_1.default)(jobStatus.url);
                if (!response.ok) {
                    console.error("Network response was not ok");
                    return res.status(500).json({ success: false });
                }
                const summaryJson = yield response.json();
                console.log("summaryJson", summaryJson.ClinicalDocumentation.Sections);
                res.status(200).json({
                    success: false,
                    data: summaryJson.ClinicalDocumentation.Sections,
                });
            }
            catch (fetchError) {
                console.error(`Fetch error: ${fetchError}`);
                res.status(500).send("Error retrieving summary file");
            }
        }));
    }
    catch (error) {
        res.status(400).json({ message: "server error while uploading" });
    }
}));
exports.default = router;
