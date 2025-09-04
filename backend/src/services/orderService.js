import { OrderRepository } from '../repositories/orderRepository.js';

const orderRepository = new OrderRepository();

export const getAllOrders = async () => {
  return await orderRepository.getAll();
};

export const getOrderById = async (id) => {
  const order = await orderRepository.getById(id);
  if (!order) throw new Error('Order not found');
  return order;
};

export const createOrder = async (data) => {
  return await orderRepository.create(data);
};

export const updateOrder = async (id, data) => {
  return await orderRepository.update(id, data);
};

export const deleteOrder = async (id) => {
  return await orderRepository.delete(id);
};

