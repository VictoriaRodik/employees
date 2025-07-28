import { Router } from "express";
import orderTypeController from "../controllers/orderTypeController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getOrderTypes, createOrderType, updateOrderType, deleteOrderType } =
  orderTypeController;

const router = Router();

router.get("/", authenticateToken, getOrderTypes);
router.post("/", authenticateToken, createOrderType);
router.put("/:id", authenticateToken, updateOrderType);
router.delete("/:id", authenticateToken, deleteOrderType);

export default router;
