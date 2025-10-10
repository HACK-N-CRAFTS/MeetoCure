const HospitalLogin = require('../models/HospitalLogin');
const HospitalReview = require('../models/HospitalReview');
const mongoose = require('mongoose');

// Create a new review
const createReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { hospitalId, rating, review, images } = req.body;
        
        if (!hospitalId) {
            throw new Error('Hospital ID is required');
        }

        const patientId = req.user.id; // Assuming this comes from auth middleware

        // Check if patient has already reviewed this hospital
        const existingReview = await HospitalReview.findOne({
            hospital: hospitalId,
            patient: patientId
        });

        if (existingReview) {
            throw new Error('You have already reviewed this hospital. You can update your existing review instead.');
        }

        // Verify the hospital exists
        const hospitalExists = await HospitalLogin.findById(hospitalId);
        if (!hospitalExists) {
            throw new Error('Hospital not found');
        }

        // Create the review
        const newReview = await HospitalReview.create([{
            hospital: hospitalId, // This maps to the hospital field in the schema
            patient: patientId,
            rating,
            review,
            images: images || [],
            status: 'approved' // Since we're using HospitalLogin, we can approve by default
        }], { session });

        // Update hospital's reviews and rating
        hospitalExists.reviews.push(newReview[0]._id);
        hospitalExists.totalReviews += 1;
        
        // Calculate new average rating
        const allReviews = await HospitalReview.find({ hospital: hospitalId });
        const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
        hospitalExists.rating = totalRating / hospitalExists.totalReviews;

        await hospitalExists.save({ session });
        await session.commitTransaction();

        res.status(201).json({
            success: true,
            data: newReview[0]
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
};

// Get all reviews for a hospital
const getHospitalReviews = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reviews = await HospitalReview.find({ hospital: hospitalId })
            .populate('patient').populate('hospital')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit); 
        // console.log(reviews)        
        const total = await HospitalReview.countDocuments({ hospital: hospitalId });

        res.json({
            success: true,
            data: reviews,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalReviews: total
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        
        // Create an update object with only the provided fields
        const updateFields = {};
        if (req.body.rating !== undefined) updateFields.rating = req.body.rating;
        if (req.body.review !== undefined) updateFields.review = req.body.review;
        if (req.body.images !== undefined) updateFields.images = req.body.images;

        // Only perform update if there are fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update provided'
            });
        }
        
        const updatedReview = await HospitalReview.findOneAndUpdate(
            { _id: reviewId, patient: req.user.id },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        // Only recalculate hospital rating if rating was updated
        if (updateFields.rating !== undefined) {
            const hospital = await HospitalLogin.findById(updatedReview.hospital);
            if (hospital) {
                const allReviews = await HospitalReview.find({ hospital: updatedReview.hospital });
                const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
                hospital.rating = totalRating / hospital.totalReviews;
                await hospital.save();
            }
        }

        res.json({
            success: true,
            data: updatedReview
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { reviewId } = req.params;
        
        const review = await HospitalReview.findOneAndDelete(
            { _id: reviewId, patient: req.user.id },
            { session }
        );

        if (!review) {
            throw new Error('Review not found or unauthorized');
        }

        // Update hospital's reviews and rating
        const hospital = await HospitalLogin.findById(review.hospital);
        if (hospital) {
            hospital.reviews = hospital.reviews.filter(r => r.toString() !== reviewId);
            hospital.totalReviews -= 1;

            if (hospital.totalReviews > 0) {
                const allReviews = await HospitalReview.find({ hospital: review.hospital });
                const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
                hospital.rating = totalRating / hospital.totalReviews;
            } else {
                hospital.rating = 0;
            }

            await hospital.save({ session });
        }
        await session.commitTransaction();

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
};

module.exports = {
    createReview,
    getHospitalReviews,
    updateReview,
    deleteReview
};