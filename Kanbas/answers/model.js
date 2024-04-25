import mongoose from "mongoose";
import answerSchema from "./schema.js";

const model = new mongoose.model("answersModel", answerSchema);
export default model;
