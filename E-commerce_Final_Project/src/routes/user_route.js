const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");

router.get("/profile", userController.getUSerProfile);

router.get("/", userController.getAllUsers);

module.exports = router;