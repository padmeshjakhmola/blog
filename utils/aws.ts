import config from "@/lib/config";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.env.awsAccessKey,
    secretAccessKey: config.env.awsSecretKey,
  },
  region: config.env.awsRegion,
});

export default s3;
