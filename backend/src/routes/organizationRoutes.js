import { Router } from "express";
import organizationController from "../controllers/organizationController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const {
  getOrganizations,
  createOrganization,
  editOrganization,
  removeOrganization,
} = organizationController;

const router = Router();

router.get("/", authenticateToken, getOrganizations);
router.post("/", authenticateToken, createOrganization);
router.put("/:id", authenticateToken, editOrganization);
router.delete("/:id", authenticateToken, removeOrganization);

export default router;
