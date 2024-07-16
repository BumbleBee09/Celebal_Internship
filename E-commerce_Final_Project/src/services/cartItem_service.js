const userService = require("../services/user_service");
const CartItem = require("../models/cartItem_model");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("Cart Item not found: ", cartItemId);
    }

    const user = await userService.findUserById(userId);

    if (!user) {
      throw new Error("user not found: ", userId);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updateCartItem = await item.save();

      return updateCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(`eror while updating the cart item: ${error.message}`);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }

  throw new Error("You can't remove another user's item");
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId).populate("product");

  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("Cart item not found with id ", cartItemId);
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
