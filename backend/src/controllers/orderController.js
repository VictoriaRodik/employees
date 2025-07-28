import * as orderService from "../services/orderService.js";

const getOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

const getOrder = async (req, res) => {
  const orders = await orderService.getOrderById(req.params.id);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

const createOrder = async (req, res) => {
  const newOrder = await orderService.createOrder(req.body);
  res.status(201).json(newOrder);
};

const updateOrder = async (req, res) => {
  const success = await orderService.updateOrder(req.params.id, req.body);
  if (success) {
    res.json({ message: "Order updated" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

const deleteOrder = async (req, res) => {
  const success = await orderService.deleteOrder(req.params.id);
  if (success) {
    res.json({ message: "Order deleted" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
