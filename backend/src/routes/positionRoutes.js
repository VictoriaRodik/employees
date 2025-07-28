import { Router } from "express";
import positionController from "../controllers/positionController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getPositions, createPosition, updatePosition, deletePosition } =
  positionController;

const router = Router();

router.get("/", authenticateToken, getPositions);
router.post("/", authenticateToken, createPosition);
router.put("/:id", authenticateToken, updatePosition);
router.delete("/:id", authenticateToken, deletePosition);

export default router;
