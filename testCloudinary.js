import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader
  .upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
  .then(result => console.log("Connected ✅", result.secure_url))
  .catch(err => console.log("Error ❌", err));