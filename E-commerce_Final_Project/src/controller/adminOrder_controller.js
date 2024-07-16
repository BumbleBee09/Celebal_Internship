const orderService = require("../services/order_service");

const getAllOrder = async (req, res) => {
  try {
    const orders = await orderService.getAllOrder();

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shipOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deliverOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancelOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrder(orderId);

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  getAllOrder,
  deleteOrder,
};
