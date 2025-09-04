import { OrderTypeRepository } from "../repositories/orderTypeRepository.js";

const orderTypeRepository = new OrderTypeRepository();

export const getAllOrderTypes = async () => {
  return await orderTypeRepository.getAll();
};

export const getOrderTypeById = async (id) => {
  const orderType = await orderTypeRepository.getById(id);
  if (!orderType) throw new Error("Order type not found");
  return orderType;
};

export const createOrderType = async (data) => {
  return await orderTypeRepository.create(data);
};

export const updateOrderType = async (id, data) => {
  return await orderTypeRepository.update(id, data);
};

export const deleteOrderType = async (id) => {
  return await orderTypeRepository.delete(id);
};
