import mongoose from "mongoose";
import questionSchema from "./schema.js";

const model = new mongoose.model("questionsModel", questionSchema);
export default model;
