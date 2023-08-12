import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connection = async () => {
  try {
    const conc = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("<--- Connection Establised Successfully --->");
  } catch (error) {
    console.log("Error ", error.message);
  }
};
