const express = require('express');
const router = express.Router();

const userProductController = require("../controller/product_controller");

const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, userProductController.getAllProduct);
router.get("/id/:id", authenticate, userProductController.findProductById);


module.exports = router; 