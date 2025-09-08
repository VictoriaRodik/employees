import { OrderRepository } from '../repositories/orderRepository.js';
import { OrderItemRepository } from '../repositories/orderItemRepository.js';
import { EmployeeRepository } from '../repositories/employeeRepository.js';

const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const employeeRepository = new EmployeeRepository();

export const getAllOrders = async () => {
  return await orderRepository.getAll();
};

export const getOrderById = async (id) => {
  const order = await orderRepository.getById(id);
  if (!order) throw new Error('Order not found');
  return order;
};

export const getOrderWithItems = async (id) => {
  const order = await getOrderById(id);
  const items = await orderItemRepository.getByOrderId(id);
  const firstItem = items?.[0] || null;
  let employee = null;
  let currentPosition = null;
  if (firstItem?.employee_id) {
    employee = await employeeRepository.getById(firstItem.employee_id);
    const latestPositionRef = await orderItemRepository.getLatestReferenceByEmployeeIdAndTable(
      firstItem.employee_id,
      'positions'
    );
    if (latestPositionRef) {
      currentPosition = {
        id: latestPositionRef.reference_id,
        name: latestPositionRef.reference_name,
        asOfOrder: {
          id: latestPositionRef.order_id,
          number: latestPositionRef.order_number,
          date: latestPositionRef.order_date,
        },
      };
    }
  }
  return { order, items, employee, currentPosition };
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

