import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt, FaUserMd, FaClock, FaPhone } from 'react-icons/fa';

const StarRating = ({ rating, reviewCount = 0 }) => {
    const totalStars = 5;
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating - fullStars >= 0.5;
    
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: totalStars }, (_, index) => (
                    <FaStar 
                        key={index} 
                        className={`w-3 h-3 ${
                            index < fullStars 
                                ? 'text-yellow-400' 
                                : index === fullStars && hasHalfStar
                                ? 'text-yellow-400 opacity-50'
                                : 'text-gray-300'
                        }`} 
                    />
                ))}
            </div>
            <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">
                    {numRating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                    ({reviewCount})
                </span>
            </div>
        </div>
    );
};

const HospitalCard = React.memo(({ hospital, onClick, onToggleFavorite }) => {

    console.log(hospital);
    const [isFavorite, setIsFavorite] = useState(hospital?.isFavorite);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    // kept console for debugging
    // console.log(hospital);
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent card click when clicking favorite
        setIsFavorite(!isFavorite);
        if (onToggleFavorite) {
            onToggleFavorite(hospital._id || hospital.id);
        }
    };

    const handleImageError = () => {
        if (!imageError) {
            setImageError(true);
            setImageLoading(false);
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Use rating and review count from the normalized data
    const rating = hospital.averageRating || hospital.rating || 0;
    const reviewCount = hospital.reviewCount || hospital.totalReviews || 0;

    return (
        // make card full-height flex column with a minimum height so all cards match
        <div 
            className="w-full h-full min-h-[420px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col"
            onClick={onClick}
        >
            {/* Hospital Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden flex-shrink-0">
                {/* Loading placeholder */}
                {imageLoading && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#0c4d6b] rounded-full animate-spin"></div>
                    </div>
                )}
                
                {/* Default hospital icon for failed images */}
                {imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <div className="text-6xl text-gray-400">🏥</div>
                    </div>
                ) : (
                    hospital.hospitalImage && (
                        <img
                            src={hospital.hospitalImage}
                            alt={hospital.hospitalName || hospital.name || "Hospital"}
                            className={`block w-full h-full object-cover transition-opacity duration-200 ${
                                imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                        />
                    )
                )}
                
                {/* If no image URL provided */}
                {!hospital.hospitalImage && !imageError && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <div className="text-6xl text-gray-400">🏥</div>
                    </div>
                )}
                
                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all z-10"
                >
                    {isFavorite ? (
                        <FaHeart className="w-4 h-4 text-red-500" />
                    ) : (
                        <FaRegHeart className="w-4 h-4 text-gray-600" />
                    )}
                </button>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-medium bg-[#0c4d6b] text-white rounded-full">
                        Hospital
                    </span>
                </div>

                {/* Online Status */}
                <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Available
                    </span>
                </div>
            </div>

            {/* Card Content: make this area flexible so buttons stick to bottom */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="mb-2">
                    {/* Reserve fixed space for variable content so all cards align */}
                    <div className="min-h-[150px] flex flex-col justify-start gap-3">
                        {/* Hospital Name - reserve two lines height */}
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-[#0c4d6b] transition-colors min-h-[48px]">
                            {hospital.hospitalName || hospital.name || "Unnamed Hospital"}
                        </h3>

                        {/* Location - keep consistent height */}
                        <div className="flex items-start gap-2">
                            <FaMapMarkerAlt className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600 line-clamp-2 break-words min-h-[36px]">
                                {hospital.address || hospital.location || "Address not available"}
                            </span>
                        </div>

                        {/* Contact */}
                        {hospital.contact && (
                            <div className="flex items-center gap-2">
                                <FaPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{hospital.contact}</span>
                            </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center justify-between">
                            <StarRating rating={rating} reviewCount={reviewCount} />
                            {hospital.reviews && hospital.reviews.length > 0 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onClick) onClick();
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    View Reviews
                                </button>
                            )}
                        </div>

                        {/* Services/Specialties (reserve single line height) */}
                        {hospital.specialties && (
                            <div className="mt-1">
                                <div className="flex flex-wrap gap-1 items-center min-h-[28px]">
                                    {hospital.specialties.slice(0, 2).map((specialty, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                    {hospital.specialties.length > 2 && (
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                            +{hospital.specialties.length - 2} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onClick) onClick();
                        }}
                        className="flex-1 px-3 py-2 bg-[#0c4d6b] text-white text-sm font-medium rounded-lg hover:bg-[#0a3d56] transition-colors"
                    >
                        View Details
                    </button>
                    <button 
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
});

const HospitalCardList = ({ title = "Nearby Hospitals" }) => {
    const navigate = useNavigate();
    const initialVisibleCount = 8;
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Authentication token not found");
                }
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals/hospitallogins`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setHospitals(data);
                setError(null);
            } catch {
                setError("Failed to fetch hospitals");
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 8);
    const itemsToShow = hospitals?.slice(0, visibleCount);

    const handleToggleFavorite = (hospitalId) => {
        console.log('Toggle favorite for hospital:', hospitalId);
    };

    if (loading) {
        return (
            <div className="mb-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                                <div className="h-8 bg-gray-200 rounded mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-10">
                {/* <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button> */}
                </div>
        );
    }

    if (!hospitals || hospitals.length === 0) {
        return (
            <div className="mb-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">🏥</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hospitals found</h3>
                    <p className="text-gray-600">We couldn't find any hospitals at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
                <span className="text-sm text-gray-500">
                    Showing {Math.min(visibleCount, hospitals.length)} of {hospitals.length} hospitals
                </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 items-stretch">
                {itemsToShow?.map((hospital) => (
                    <div key={hospital._id} className="w-full min-w-0 h-full">
                        <HospitalCard 
                            hospital={hospital} 
                            onClick={() => navigate(`/hospital/${hospital._id}`)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </div>
                ))}
            </div>
            
            {visibleCount < hospitals?.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-3 bg-[#0A4D68] text-white rounded-lg hover:bg-[#083c52] transition-colors font-medium"
                    >
                        Load More Hospitals
                    </button>
                </div>
            )}
        </div>
    );
};

export  {HospitalCard, HospitalCardList};

