import s3 from "@/utils/aws";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const signedUrl = async (getObjectParam: GetObjectParam) => {
  return getSignedUrl(s3, new GetObjectCommand(getObjectParam), {
    expiresIn: 3600,
  });
};
