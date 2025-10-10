import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`w-4 h-4 ${
                        index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    {review.patient.profileImage ? (
                        <img
                            src={review.patient.profileImage}
                            alt={review.patient.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{review.patient.name}</h4>
                        <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="mt-2 text-gray-700">{review.review}</p>
                    {review.images && review.images.length > 0 && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {review.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Review image ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HospitalReviews = ({ hospitalId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/hospital-reviews/${hospitalId}?page=${page}&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                if (page === 1) {
                    setReviews(data.data);
                } else {
                    setReviews(prev => [...prev, ...data.data]);
                }
                setHasMore(page < data.pagination.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [hospitalId, page]);

    if (loading && page === 1) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0c4d6b]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500">No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
            {hasMore && (
                <div className="text-center pt-4">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-4 py-2 bg-[#0c4d6b] text-white rounded-lg hover:bg-[#0a3d56] transition-colors"
                    >
                        Load More Reviews
                    </button>
                </div>
            )}
        </div>
    );
};

export default HospitalReviews;