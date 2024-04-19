import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    semester: { type: String },
    image: { type: String },
  },
  { collection: "courses" }
);
export default courseSchema;
