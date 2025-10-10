import React, { useEffect, useState } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const HospitalReviews = ({ hospitalId }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, review: '' });
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!hospitalId) return;
      try {
        setLoadingReviews(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospital-reviews/${hospitalId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        console.log(data)
        if (res.ok && data.success) {
          setReviews(Array.isArray(data.data) ? data.data : []);
        } else {
          setReviews([]);
          setReviewError(data.message || "Failed to load reviews");
        }
      } catch (err) {
        console.error(err);
        setReviewError("Failed to load reviews");
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [hospitalId]);

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const existingReview = reviews.find(review => review.patient?._id === localStorage.getItem('userId'));
      if (existingReview) {
        setReviewError("You have already reviewed this hospital. You can update your existing review instead.");
        return;
      }

      setSubmitReviewLoading(true);
      setReviewError(null);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospital-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          hospitalId: hospitalId,
          rating: reviewForm.rating,
          review: reviewForm.review
        })
      });

      const responseData = await res.json();
      if (res.ok && responseData.success) {
        setReviews(prevReviews => [...prevReviews, responseData.data]);
        setReviewForm({ rating: 5, review: '' });
      } else {
        setReviewError(responseData.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      setReviewError("Failed to submit review");
    } finally {
      setSubmitReviewLoading(false);
    }
  };

  // Handle edit review
  const handleEditReview = async (reviewId) => {
    try {
      setReviewError(null);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospital-reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: editForm.rating,
          review: editForm.review
        })
      });

      const responseData = await res.json();
      console.log(responseData)
      if (res.ok && responseData.success) {
        setReviews(prevReviews =>
          prevReviews.map(review =>
            review._id === reviewId ? responseData.data : review
          )
        );
        setEditingReviewId(null);
        setEditForm({ rating: 5, review: '' });
      } else {
        setReviewError(responseData.message || "Failed to update review");
      }
    } catch (err) {
      console.error(err);
      setReviewError("Failed to update review");
    }
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setDeleteLoading(reviewId);
      setReviewError(null);
      const token = localStorage.getItem("token");
      console.log(token)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospital-reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await res.json();
      console.log(responseData)
      if (res.ok && responseData.success) {
        setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      } else {
        setReviewError(responseData.message || "Failed to delete review");
      }
    } catch (err) {
      console.error(err);
      setReviewError("Failed to delete review");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditForm({ rating: review.rating, review: review.review });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditForm({ rating: 5, review: '' });
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-[#0A4D68] mb-4">Reviews</h3>
        
        {/* Review Form */}
        {reviews.some(review => review.patient?._id === localStorage.getItem('userId')) ? (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You have already reviewed this hospital. You can find your review below.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    className={`text-2xl ${
                      star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={reviewForm.review}
                onChange={(e) => setReviewForm(prev => ({ ...prev, review: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
                rows="4"
                placeholder="Share your experience with this hospital..."
                required
              ></textarea>
            </div>

            {reviewError && (
              <div className="mb-4 text-red-500 text-sm">{reviewError}</div>
            )}

            <button
              type="submit"
              disabled={submitReviewLoading}
              className="bg-[#0A4D68] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
            >
              {submitReviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div>
          {loadingReviews ? (
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-gray-100 rounded"></div>
              <div className="h-24 bg-gray-100 rounded"></div>
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => {
                const isEditing = editingReviewId === review._id;

                return (
                  <div key={review._id} className="border-b pb-6 last:border-b-0">
                    {isEditing ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                                className={`text-2xl ${
                                  star <= editForm.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                <FaStar />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                          <textarea
                            value={editForm.review}
                            onChange={(e) => setEditForm(prev => ({ ...prev, review: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
                            rows="4"
                            required
                          ></textarea>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditReview(review._id)}
                            className="bg-[#0A4D68] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-medium">
                              {review.patient?.name || 'Anonymous'}
                            </span>
                            <div className="flex text-yellow-400">
                              {[...Array(review.rating)].map((_, index) => (
                                <FaStar key={index} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.review}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          {localStorage.getItem("patientId") == review?.patient?._id && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEditReview(review)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit review"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review._id)}
                                disabled={deleteLoading === review._id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete review"
                              >
                                {deleteLoading === review._id ? '...' : <FaTrash />}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalReviews;
