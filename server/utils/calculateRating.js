module.exports.calculateRating = async (totalLikes, totalDislikes) => {
  const totalRatings = totalLikes + totalDislikes;
  if (totalRatings === 0) {
    return 0;
  }

  const positiveRatio = totalLikes / totalRatings;
  const rating = positiveRatio * 5;

  return Math.round(rating * 10) / 10;
};
