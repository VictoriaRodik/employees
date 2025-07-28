import { OrderItemRepository } from '../repositories/orderItemRepository.js';

const orderItemRepository = new OrderItemRepository();

export const getAllOrderItems = async () => {
  return await orderItemRepository.getAll();
};

export const getOrderItemById = async (id) => {
  const orderItem = await orderItemRepository.getById(id);
  if (!orderItem) throw new Error('Order item not found');
  return orderItem;
};

export const createOrderItem = async (data) => {
  return await orderItemRepository.create(data);
};

export const updateOrderItem = async (id, data) => {
  return await orderItemRepository.update(id, data);
};

export const deleteOrderItem = async (id) => {
  return await orderItemRepository.delete(id);
};

