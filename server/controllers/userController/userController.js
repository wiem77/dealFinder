const User = require('../../models/User');
const Store = require('../../models/StoreModel');
const Rating = require('../../models/RatingsModel');

module.exports.newRating = async (req, res) => {
  try {
    const { userId, storeId } = req.params;
    const ratingValue = req.body.ratingValue;
    console.log(ratingValue);

    const rating = await Rating.findOne({ user: userId, store: storeId });

    if (!rating) {
      const newRating = new Rating({
        user: userId,
        store: storeId,
        like: ratingValue,
      });

      await newRating.save();

      return res
        .status(201)
        .json({ message: 'Rating created successfully.', rating: newRating });
    }

    rating.like = ratingValue;
    const updatedRating = await rating.save();

    res.status(200).send({
      success: true,
      msg: 'Rating updated',
      updatedRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create rating.' });
  }
};
module.exports.calculateLikesAndDislikes = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$store',
          likeCount: { $sum: { $cond: [{ $eq: ['$like', true] }, 1, 0] } },
          dislikeCount: { $sum: { $cond: [{ $eq: ['$like', false] }, 1, 0] } },
        },
      },
    ];

    const results = await Rating.aggregate(pipeline);

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate likes and dislikes.' });
  }
};
