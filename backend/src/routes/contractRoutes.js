import { Router } from "express";
import contractController from "../controllers/contractController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const { getContracts, createContract, updateContract, removeContract } =
  contractController;

const router = Router();

router.get("/", authenticateToken, getContracts);
router.post("/", authenticateToken, createContract);
router.put("/:id", authenticateToken, updateContract);
router.delete("/:id", authenticateToken, removeContract);

export default router;
