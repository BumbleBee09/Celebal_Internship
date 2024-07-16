const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {

    return res.status(200).send({message : "Welcome to ecommerce api", status:true});
})

const authRouters = require("./routes/auth_route.js");
app.use("/auth", authRouters);

const userRouters= require("./routes/user_route.js");
app.use("/api/users", userRouters);

const userProductRoutes = require("./routes/userProductRoutes.js");
app.use("/api/products", userProductRoutes);

const adminProductRoutes = require("./routes/adminProductRoutes.js");
app.use("/api/admin/products", adminProductRoutes);

const cartRouter = require("./routes/cart_route.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem_route.js");
app.use("/api/cart_item", cartItemRouter);

const userOrderRouter = require("./routes/userOrderRoutes.js");
app.use("/api/orders", userOrderRouter);

const adminOrderRoutes = require("./routes/adminOrderRoutes.js");
app.use("/api/admin/orders", adminOrderRoutes);

const reviewRouter = require("./routes/review_route.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating_route.js");
app.use("/api/ratings", ratingRouter);

module.exports = app;