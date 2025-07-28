import { Router } from "express";
import orderController from "../controllers/orderController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getOrders, createOrder, updateOrder, deleteOrder } =
  orderController;

const router = Router();

router.get("/", authenticateToken, getOrders);
router.post("/", authenticateToken, createOrder);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
