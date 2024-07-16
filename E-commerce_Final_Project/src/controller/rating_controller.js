const ratingService = require("../services/rating_service");

const createRating = async (req, res) => {
  const user = await req.user;
  try {
    const rating = await ratingService.createRating(req.body, user);

    return res.status(201).send(rating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductRating = async (req, res) => {
  const productId = req.params.productId;
  try {
    const ratings = await ratingService.getProductRating(productId);

    return res.status(201).send(ratings);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createRating,
  getProductRating,
};
