const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviewsOnTour = (req, res, next) => {
  req.filterOptions = {};
  if (req.params.tourId) req.filterOptions = { tour: req.params.tourId };

  next();
};

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user._id;

  next();
};

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
