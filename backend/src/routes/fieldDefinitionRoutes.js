import { Router } from "express";
import fieldDefinitionController from "../controllers/fieldDefinitionController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getFieldDefinitions, createFieldDefinition, updateFieldDefinition, deleteFieldDefinition } =
  fieldDefinitionController;

const router = Router();

router.get("/", authenticateToken, getFieldDefinitions);
router.post("/", authenticateToken, createFieldDefinition);
router.put("/:id", authenticateToken, updateFieldDefinition);
router.delete("/:id", authenticateToken, deleteFieldDefinition);

export default router;
