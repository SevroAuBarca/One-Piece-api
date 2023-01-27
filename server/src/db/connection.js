import { env } from "../utils/config.js";
import mongoose from "mongoose";

export const connection = async () => {
  console.log(env.password);
  try {
    await mongoose.connect(
      `mongodb+srv://apiAdmin:${env.password}@cluster0.eezrvir.mongodb.net/test`
    );
    console.log("conexion establecida");
  } catch (error) {
    console.log(error);
  }
};
