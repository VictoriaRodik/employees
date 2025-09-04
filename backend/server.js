import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import contractRoutes from "./src/routes/contractRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import employmentConditionRoutes from "./src/routes/employmentConditionRoutes.js";
import employmentTypeRoutes from "./src/routes/employmentTypeRoutes.js";
import fieldDefinitionRoutes from "./src/routes/fieldDefinitionRoutes.js";
import gradeSalaryRoutes from "./src/routes/gradeSalaryRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import orderItemRoutes from "./src/routes/orderItemRoutes.js";
import orderTypeRoutes from "./src/routes/orderTypeRoutes.js";
import positionRoutes from "./src/routes/positionRoutes.js";
import qualificationGradeRoutes from "./src/routes/qualificationGradeRoutes.js";
import referenceSourceRoutes from "./src/routes/referenceSourceRoutes.js";
import workScheduleRoutes from "./src/routes/workScheduleRoutes.js";

const app = express();
app.use(json());

const allowedOriginsEnv =
  process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(",").map((s) => s.trim())
  : ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const routes = {
  auth: authRoutes,
  contracts: contractRoutes,
  departments: departmentRoutes,
  employees: employeeRoutes,
  employmentConditions: employmentConditionRoutes,
  employmentTypes: employmentTypeRoutes,
  fieldDefinitions: fieldDefinitionRoutes,
  gradeSalaries: gradeSalaryRoutes,
  orders: orderRoutes,
  orderItems: orderItemRoutes,
  orderTypes: orderTypeRoutes,
  organizations: organizationRoutes,
  positions: positionRoutes,
  qualificationGrades: qualificationGradeRoutes,
  referenceSources: referenceSourceRoutes,
  workSchedules: workScheduleRoutes,
};

Object.entries(routes).forEach(([path, router]) => {
  app.use(`/${path}`, router);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
