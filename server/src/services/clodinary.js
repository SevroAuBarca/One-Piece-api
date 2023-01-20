import cloudinary from "cloudinary";
import { env } from "../utils/config.js";

cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: env.cloudinarySecret,
});

export const uploadImage = async (path, name) => {
  try {
    const {
      secure_url: url,
      public_id,
      original_filename,
    } = await cloudinary.v2.uploader.upload(path, {
      public_id: name,
    });
    return { url, public_id, original_filename };
  } catch (error) {
    console.log(error);
  }
};
