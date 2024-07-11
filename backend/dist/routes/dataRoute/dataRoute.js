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
const aws_config_1 = require("./aws-config");
const child_process_1 = require("child_process");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: aws_config_1.s3,
        bucket: "avonbucket",
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
router.get("/", (req, res) => {
    console.log("herewweww");
});
console.log("data route");
router.post("/upload", upload.single("video"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    try {
        const s3Key = req.file.key; // Get the S3 key of the uploaded file
        const s3Uri = `s3://avonbucket/${s3Key}`; // Construct S3 URI
        const jobName = `medical-scribe-job-${Date.now()}`;
        const roleArn = "arn:aws:iam::432096035218:role/testrole1"; // Replace with your actual IAM Role ARN
        (0, child_process_1.exec)(`python3 process.py start ${jobName} ${s3Uri} "avonbucket" ${roleArn}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                res.status(500).send("Error starting HealthScribe job");
                return;
            }
            console.log("at upload", jobName, s3Uri);
            res.status(200).json({ jobId: jobName, s3Uri });
        });
    }
    catch (error) {
        res.status(400).json({ message: "server error while uploading" });
    }
}));
router.get("/job/:jobId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    console.log("at jobId", jobId);
    (0, child_process_1.exec)(`python3 process.py status ${jobId}`, (error, stdout, stderr) => {
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
}));
exports.default = router;
