const mongoose = require('mongoose');

const hospitalReviewSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    images: [{
        type: String  // URLs to review images if any
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

// Compound index to ensure one review per hospital per patient
hospitalReviewSchema.index({ hospital: 1, patient: 1 }, { unique: true });

module.exports = mongoose.model('HospitalReview', hospitalReviewSchema);