const express = require("express");
const router = express.Router();

const userOrderController = require("../controller/userOrder_controller");

const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, userOrderController.createOrder);

router.get("/user", authenticate, userOrderController.userOrderHistory);

router.get("/:id", authenticate, userOrderController.findOrderById);

module.exports = router;