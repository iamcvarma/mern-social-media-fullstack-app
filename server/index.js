import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { getPreSignedUrlS3, uploadToS3 } from "./middleware/awsUpload.js";
// Configuration
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// fileStore

const storage = multer.memoryStorage()

const upload = multer({ storage }); //to upload user files to disk

//auth routes
app.get('/',(req,res)=>{
  res.status(200).json({github:"https://github.com/iamcvarma"})
})
app.post("/auth/register", upload.single("picture"), uploadToS3, register);
app.post(
  "/posts",
  verifyToken,
  upload.single("picture"),
  uploadToS3,
  createPost
);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

app.use("/assets/:fileName", getPreSignedUrlS3);

//mongoose

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server PORT: ${PORT}(running...)`);
    });
  })
  .catch((err) => {
    console.log(`Database connection failed. PORT${PORT}`);
    console.log(err);
  });
