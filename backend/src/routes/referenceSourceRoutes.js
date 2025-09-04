import { Router } from "express";
import referenceSourceController from "../controllers/referenceSourceController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getReferenceSources, createReferenceSource, updateReferenceSource, deleteReferenceSource, getReferenceSourceItems } =
  referenceSourceController;

const router = Router();

router.get("/", authenticateToken, getReferenceSources);
router.get("/:id/items", authenticateToken, getReferenceSourceItems);
router.post("/", authenticateToken, createReferenceSource);
router.put("/:id", authenticateToken, updateReferenceSource);
router.delete("/:id", authenticateToken, deleteReferenceSource);

export default router;
