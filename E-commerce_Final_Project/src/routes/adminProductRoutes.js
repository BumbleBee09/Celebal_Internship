const express = require('express');
const router = express.Router();

const adminProductController = require("../controller/product_controller");

const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, adminProductController.createProduct);
router.post("/creates", authenticate, adminProductController.createMultipleProduct);
router.delete("/:id", authenticate, adminProductController.deleteProduct);
router.put("/:id", authenticate, adminProductController.updateProduct);


module.exports = router;
