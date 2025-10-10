import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaUserMd } from 'react-icons/fa';
import HospitalReviews from '../../../components/HospitalReviews';

const HospitalDetailView = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/hospitals/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch hospital details');
                }

                const data = await response.json();
                setHospital(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHospital();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0c4d6b]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                {hospital.name || hospital.hospitalName}
                            </h1>
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <FaMapMarkerAlt className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                    {hospital.address}
                                </div>
                                {hospital.contactNumber && (
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <FaPhone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        {hospital.contactNumber}
                                    </div>
                                )}
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <FaUserMd className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                    {hospital.doctors?.length || 0} Doctors
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`${
                                activeTab === 'overview'
                                    ? 'border-[#0c4d6b] text-[#0c4d6b]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`${
                                activeTab === 'reviews'
                                    ? 'border-[#0c4d6b] text-[#0c4d6b]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('doctors')}
                            className={`${
                                activeTab === 'doctors'
                                    ? 'border-[#0c4d6b] text-[#0c4d6b]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Doctors
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {activeTab === 'overview' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">About {hospital.name}</h2>
                        <p className="text-gray-600">
                            {hospital.description || 'No description available.'}
                        </p>
                        {hospital.specialties && hospital.specialties.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Specialties</h3>
                                <div className="flex flex-wrap gap-2">
                                    {hospital.specialties.map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Reviews</h2>
                            <button
                                onClick={() => {
                                    // Add review logic
                                }}
                                className="px-4 py-2 bg-[#0c4d6b] text-white rounded-lg hover:bg-[#0a3d56] transition-colors"
                            >
                                Write a Review
                            </button>
                        </div>
                        <HospitalReviews hospitalId={id} />
                    </div>
                )}

                {activeTab === 'doctors' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Doctors</h2>
                        {hospital.doctors && hospital.doctors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hospital.doctors.map((doctor) => (
                                    <div
                                        key={doctor._id}
                                        className="border border-gray-200 rounded-lg p-4"
                                    >
                                        <h3 className="font-medium text-lg">Dr. {doctor.name}</h3>
                                        <p className="text-gray-600">{doctor.specialization}</p>
                                        {doctor.experience && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {doctor.experience} years experience
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No doctors available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HospitalDetailView;