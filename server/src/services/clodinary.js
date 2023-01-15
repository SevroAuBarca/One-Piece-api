import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: "wxpcHkkwekVYLf9tzCAtuhZxeTw",
});

export const uploadImage = async (path) => {
  try {
    const res = await cloudinary.v2.uploader.upload(path, {
      public_id: "olympic_flag",
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
