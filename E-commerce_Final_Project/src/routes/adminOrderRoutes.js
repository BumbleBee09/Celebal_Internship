const express = require("express");
const router = express.Router();

const adminOrderController = require("../controller/adminOrder_controller");

const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, adminOrderController.getAllOrder);

router.put(
  "/:orderId/confirm",
  authenticate,
  adminOrderController.confirmOrder
);

router.put("/:orderId/ship", authenticate, adminOrderController.shipOrder);

router.put(
  "/:orderId/deliver",
  authenticate,
  adminOrderController.deliverOrder
);

router.put("/:orderId/cancel", authenticate, adminOrderController.cancelOrder);

router.put("/:orderId/delete", authenticate, adminOrderController.deleteOrder);

module.exports = router;
