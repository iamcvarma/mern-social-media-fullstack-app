import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

export const uploadToS3 = async (req, res, next) => {
  const newName = nanoid();
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Body: req.file.buffer,
      Key: newName,
      ContentType: req.file.mimetype,
    })
  );
  req.body.picturePath = newName;
  next();
};

export const getPreSignedUrlS3 = async (req, res) => {
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.params.fileName,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  res.redirect(url);
};
