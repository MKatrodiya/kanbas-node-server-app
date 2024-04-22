import mongoose from "mongoose";
import quizzSchema from "./schema.js";

const model = new mongoose.model("quizzesModel", quizzSchema);
export default model;
