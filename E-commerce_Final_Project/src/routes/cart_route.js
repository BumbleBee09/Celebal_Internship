const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart_controller");

const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, cartController.findUserCart);

router.put("/add", authenticate, cartController.addCartItem);

module.exports = router;
