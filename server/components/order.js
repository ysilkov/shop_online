import OrderMongoDB from "./orderMongoDB.js";

class Order {
  static async createOrder(id, email, fullName, phone, delivery, address, order, timeCreate) {
    try {
      const createOrder = await OrderMongoDB.create({
        id,
        email,
        fullName,
        phone,
        delivery,
        address,
        order,
        timeCreate
      });
      return createOrder;
    } catch (e) {
      throw new ErrorMessage(e);
    }
  }
}

export default Order;
