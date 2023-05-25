const Rating = require('../models/RatingsModel');
const Store = require('../models/StoreModel');

const updateStoreRating = async (store) => {
  console.log('storeId', store._id);
  const pipeline = [
    { $match: { store: store._id } },
    {
      $group: {
        _id: null,
        likeCount: { $sum: { $cond: [{ $eq: ['$like', true] }, 1, 0] } },
        dislikeCount: { $sum: { $cond: [{ $eq: ['$like', false] }, 1, 0] } },
      },
    },
  ];

  const result = await Rating.aggregate(pipeline).exec();
  console.log('result', result);
  const { likeCount, dislikeCount } = result[0] || {
    likeCount: 0,
    dislikeCount: 0,
  };
  const totalVotes = likeCount + dislikeCount;
  console.log(totalVotes);
  const rating = totalVotes > 0 ? (likeCount / totalVotes) * 5 : 0;

  await Store.updateOne({ _id: store._id }, { rating });
};

module.exports = updateStoreRating;
