import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";

mongoose.connect("mongodb://localhost:27017/kanbas");
const app = express();
app.use(cors());
app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
