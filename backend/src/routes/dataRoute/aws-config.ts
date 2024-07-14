import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

// Configure the AWS SDK
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
  },
});
export { s3 };
