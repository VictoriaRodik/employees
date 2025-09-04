import * as orderItemService from "../services/orderItemService.js";

const getOrderItems = async (req, res) => {
  const orderItems = await orderItemService.getAllOrderItems();
  res.json(orderItems);
};

const getOrderItem = async (req, res) => {
  const orderItems = await orderItemService.getOrderItemById(req.params.id);
  if (orderItems) {
    res.json(orderItems);
  } else {
    res.status(404).json({ message: "OrderItem not found" });
  }
};

const createOrderItem = async (req, res) => {
  const newOrderItem = await orderItemService.createOrderItem(req.body);
  res.status(201).json(newOrderItem);
};

const updateOrderItem = async (req, res) => {
  const success = await orderItemService.updateOrderItem(req.params.id, req.body);
  if (success) {
    res.json({ message: "OrderItem updated" });
  } else {
    res.status(404).json({ message: "OrderItem not found" });
  }
};

const deleteOrderItem = async (req, res) => {
  const success = await orderItemService.deleteOrderItem(req.params.id);
  if (success) {
    res.json({ message: "OrderItem deleted" });
  } else {
    res.status(404).json({ message: "OrderItem not found" });
  }
};

export default {
  getOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
