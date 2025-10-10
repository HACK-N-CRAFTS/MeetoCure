const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    createReview,
    getHospitalReviews,
    updateReview,
    deleteReview
} = require('../controllers/hospitalReviewController');

// Create a new review - only patients can create reviews
router.post('/', protect(['patient']), createReview);

// Get all reviews for a hospital - public route
router.get('/:hospitalId', getHospitalReviews);

// Update a review - only the review creator can update
router.put('/:reviewId', protect(['patient']), updateReview);

// Delete a review - only the review creator can delete
router.delete('/:reviewId', protect(['patient']), deleteReview);

module.exports = router;