import { Router } from "express";
import organizationController from "../controllers/organizationController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = organizationController;

const router = Router();

router.get("/", authenticateToken, getOrganizations);
router.post("/", authenticateToken, createOrganization);
router.put("/:id", authenticateToken, updateOrganization);
router.delete("/:id", authenticateToken, deleteOrganization);

export default router;
