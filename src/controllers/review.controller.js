const Review = require("../models/review.model");

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create({
      user_id: req.user.id,
      shelter_id: req.body.shelter_id,
      pet_id: req.body.pet_id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
