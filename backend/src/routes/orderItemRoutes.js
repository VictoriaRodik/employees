import { Router } from "express";
import orderItemController from "../controllers/orderItemController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getOrderItems, createOrderItem, updateOrderItem, deleteOrderItem } =
  orderItemController;

const router = Router();

router.get("/", authenticateToken, getOrderItems);
router.post("/", authenticateToken, createOrderItem);
router.put("/:id", authenticateToken, updateOrderItem);
router.delete("/:id", authenticateToken, deleteOrderItem);

export default router;
