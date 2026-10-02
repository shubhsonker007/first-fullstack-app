import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

console.log("connected to MongoDB");
console.log(process.env.DB_URL);