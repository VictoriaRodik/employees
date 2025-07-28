import * as orderTypeService from "../services/orderTypeService.js";

const getOrderTypes = async (req, res) => {
  const orderTypes = await orderTypeService.getAllOrderTypes();
  res.json(orderTypes);
};

const getOrderType = async (req, res) => {
  const orderTypes = await orderTypeService.getOrderTypeById(req.params.id);
  if (orderTypes) {
    res.json(orderTypes);
  } else {
    res.status(404).json({ message: "OrderType not found" });
  }
};

const createOrderType = async (req, res) => {
  const newOrderType = await orderTypeService.createOrderType(req.body);
  res.status(201).json(newOrderType);
};

const updateOrderType = async (req, res) => {
  const success = await orderTypeService.updateOrderType(req.params.id, req.body);
  if (success) {
    res.json({ message: "OrderType updated" });
  } else {
    res.status(404).json({ message: "OrderType not found" });
  }
};

const deleteOrderType = async (req, res) => {
  const success = await orderTypeService.deleteOrderType(req.params.id);
  if (success) {
    res.json({ message: "OrderType deleted" });
  } else {
    res.status(404).json({ message: "OrderType not found" });
  }
};

export default {
  getOrderTypes,
  getOrderType,
  createOrderType,
  updateOrderType,
  deleteOrderType,
};
