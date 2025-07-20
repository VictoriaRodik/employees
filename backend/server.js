import express, { json } from "express";
import cors from "cors";
import pool from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import contractRoutes from "./src/routes/contractRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";

const app = express();
app.use(json());
app.use(cors());

const routes = {
  auth: authRoutes,
  employees: employeeRoutes,
  contracts: contractRoutes,
  organizations: organizationRoutes,
};

Object.entries(routes).forEach(([path, router]) => {
  app.use(`/${path}`, router);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
