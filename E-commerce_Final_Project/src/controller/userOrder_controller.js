const orderService = require("../services/order_service");

const createOrder = async (req, res) => {
  const user = await req.user;

  try {
    let createdOrder = await orderService.createOrder(user, req.body);

    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  const user = await req.user;

  try {
    let foundOrder = await orderService.findOrderById(req.params.id);

    return res.status(201).send(foundOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const userOrderHistory = async (req, res) => {
  const user = await req.user;

  try {
    let userHistory = await orderService.userOrderHistory(user._id);

    return res.status(201).send(userHistory);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  userOrderHistory,
};
