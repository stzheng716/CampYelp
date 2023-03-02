const express = require("express");
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")
const Campground = require("../models/campground");
const Review = require("../models/review")
const reviews = require("../controllers/reviews")

const catchAsync = require("../utils/catchAsync");


router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview))
  
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))
  
module.exports = router;