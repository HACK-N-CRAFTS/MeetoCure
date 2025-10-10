import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCardList from '../DoctorCard';
import { FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SidebarNavPatient from '../../../components/SidebarNavPatient';
import PatientTopIcons from '../../../components/PatientTopIcons';

export default function Alldoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Vijayawada");

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setCity(storedCity);

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No auth token found. Cannot fetch protected routes.");
      navigate("/dual-patient");
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const mappedDoctors = res.data.map((doc) => ({
          id: doc.doctorId,
          fullName: doc.fullName,
          primarySpecialization: doc.primarySpecialization || doc.specialization,
          category: doc.category,
          profileImage: doc.profileImage || "/assets/default-doctor.png",
        }));
        setDoctors(mappedDoctors);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="flex font-[Inter,system-ui,sans-serif] bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] min-h-screen">
      <SidebarNavPatient />
      
      <div className="flex-1 min-h-screen px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Enterprise Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/patient-dashboard')}
                  className="flex items-center gap-2 text-[#0369A1] hover:text-[#075985] transition-colors font-medium group"
                >
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Dashboard</span>
                </button>
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0369A1] to-[#0284C7] rounded-xl flex items-center justify-center shadow-lg">
                    <img
                      src="/assets/logo.png"
                      alt="Meetocure"
                      className="w-10 h-10 filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">All Doctors</h1>
                    <div className="flex items-center gap-2 text-[#64748B] text-sm mt-1">
                      <FaMapMarkerAlt className="text-[#0369A1]" />
                      <span className="font-medium">{city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PatientTopIcons />
          </div>

          {/* Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-[#0369A1]/20 border-t-[#0369A1] rounded-full animate-spin" />
                  <p className="text-[#64748B] font-medium">Loading doctors...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaMapMarkerAlt className="w-12 h-12 text-[#0369A1]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">No Doctors Found</h3>
                <p className="text-[#64748B] mb-8">
                  We couldn't find any doctors in {city} at the moment.
                </p>
              </div>
            ) : (
              <DoctorCardList doctors={doctors} type="doctor" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
