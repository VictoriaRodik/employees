import { Router } from "express";
import orderController from "../controllers/orderController.js";
import orderExportController from "../controllers/orderExportController.js";

import authenticateToken from "../middlewares/authenticateToken.js";

const { getOrders, createOrder, updateOrder, deleteOrder } = orderController;
const { exportOrderDocx } = orderExportController;

const router = Router();

router.get("/", authenticateToken, getOrders);
router.post("/", authenticateToken, createOrder);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);
router.get("/:id/export.docx", authenticateToken, exportOrderDocx);

export default router;
