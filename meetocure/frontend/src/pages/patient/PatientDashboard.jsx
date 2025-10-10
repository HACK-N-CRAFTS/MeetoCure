import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation as useRouterLocation, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../lib/config";
import PatientTopIcons from "../../components/PatientTopIcons";
import HeroCarousel from "../../components/HeroBanners";
import SidebarNavPatient from "../../components/SidebarNavPatient";
import FloatingContactButton from "../../components/FloatingContactButton";
import CardList from './CardList';
import {HospitalCardList} from './hospitalpages/HospitalCard-hos';
import DoctorCardList from "./DoctorCard";




const PatientDashboard = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [city, setCity] = useState("Vijayawada");
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  // Example static hospitals data (replace with your actual data or fetch from API)
  const allHospitalsData = [
    {
      id: 1,
      name: "City Hospital",
      specialty: "Cardiology",
      type: "Hospital",
      image: "/assets/hospitals/city-hospital.png"
    },
    {
      id: 2,
      name: "Smile Dental Clinic",
      specialty: "Dentistry",
      type: "Clinic",
      image: "/assets/hospitals/smile-dental.png"
    },
    // Add more hospital objects as needed
  ];


  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setCity(storedCity);
  }, [routerLocation]);

  // Category mapping for filtering
  const categoryMapping = {
    'dentistry': ['Dentist', 'Dental', 'Dentistry'],
    'cardiology': ['Cardiologist', 'Cardiology'],
    'pulmonary': ['Pulmonologist', 'Pulmonary', 'Lungs'],
    'general': ['General', 'General Physician', 'Family Medicine', 'General Medicine'],
    'neurology': ['Neurologist', 'Neurology'],
    'gastroen': ['Gastroenterologist', 'Gastroenterology', 'Gastro'],
    'laboratory': ['Laboratory', 'Lab', 'Pathology'],
    'vaccination': ['Vaccination', 'Immunization', 'Vaccine']
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoadingDoctors(true);
    setErrorDoctors(null);
    try {
      // Use backend to fetch doctors matching the category
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor`, {
        params: { category },
        headers: {
        Authorization: `Bearer ${token}`, // send token here
    },
      });
      const mappedDoctors = resp.data.map((doc) => ({
        id: doc.doctorId,
        fullName: doc.fullName,
        primarySpecialization: doc.primarySpecialization || doc.specialization,
        category: doc.category,
        profileImage: doc.profileImage || "/assets/default-doctor.png",
      }));
      setFilteredDoctors(mappedDoctors);
    } catch (err) {
      setErrorDoctors(err.response?.data?.message || err.message);
      setFilteredDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }

    // hospitals filtering stays the same (static data)
    const searchTerms = categoryMapping[category.toLowerCase()] || [category];
    const hospitalsFiltered = allHospitalsData.filter(hospital =>
      searchTerms.some(term =>
        (hospital.specialty || '').toLowerCase().includes(term.toLowerCase()) ||
        (hospital.name || '').toLowerCase().includes(term.toLowerCase()) ||
        (hospital.type || '').toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredHospitals(hospitalsFiltered);
  };

  const handleBackToDashboard = () => {
    setSelectedCategory(null);
    setFilteredDoctors([]);
    setFilteredHospitals([]);
  };

  const getCategoryTitle = (category) => {
    const titles = {
      'dentistry': 'Dentistry',
      'cardiology': 'Cardiology',
      'pulmonary': 'Pulmonary',
      'general': 'General Medicine',
      'neurology': 'Neurology',
      'gastroen': 'Gastroenterology',
      'laboratory': 'Laboratory',
      'vaccination': 'Vaccination',
    };
    return titles[category.toLowerCase()] || category;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No auth token found. Cannot fetch protected routes.");
      navigate("/dual-patient");
      return;
    }

    setLoadingDoctors(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token here
          },
        }
      )
      .then((res) => {
        const mappedDoctors = res.data.map((doc) => ({
          id: doc.doctorId,
          fullName: doc.fullName,
          primarySpecialization: doc.primarySpecialization || doc.specialization,
          category: doc.category,
          profileImage: doc.profileImage || "/assets/default-doctor.png", // fallback if no photo
        }));
        setDoctors(mappedDoctors);
        setErrorDoctors(null);
      })
      .catch((err) => {
        setErrorDoctors(err.response?.data?.message || err.message);
      })
      .finally(() => setLoadingDoctors(false));

  }, []);

  return (
    <div className="flex font-[Inter,system-ui,sans-serif] bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] min-h-screen">
      <SidebarNavPatient
        handleCategoryClick={handleCategoryClick}
      />

      <div className="flex-1 min-h-screen px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-10">
        {/* Enterprise Header */}
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {selectedCategory ? (
                <div className="space-y-3">
                  <button
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-2 text-[#0369A1] hover:text-[#075985] transition-colors font-medium group"
                  >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Dashboard</span>
                  </button>
                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0369A1] to-[#0284C7] rounded-xl flex items-center justify-center shadow-lg">
                      <img
                        src={`/assets/categories/${categories.find(cat => cat.label.toLowerCase() === selectedCategory.toLowerCase())?.icon || 'general.png'}`}
                        alt={getCategoryTitle(selectedCategory)}
                        className="w-10 h-10 filter brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">{getCategoryTitle(selectedCategory)}</h1>
                      <div className="flex items-center gap-2 text-[#64748B] text-sm mt-1">
                        <FaMapMarkerAlt className="text-[#0369A1]" />
                        <span className="font-medium">{city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-sm">
                    <img
                      src="/assets/logo.png"
                      alt="Meetocure"
                      className="w-16 h-16 rounded-xl object-cover shadow-lg ring-4 ring-white"
                    />
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0369A1] to-[#0284C7] bg-clip-text text-transparent tracking-tight">Meetocure</h1>
                      <p className="text-sm text-[#64748B] font-medium mt-1">Your Trusted Healthcare Partner</p>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2 text-[#0369A1] hover:text-[#075985] transition-colors font-medium bg-white/60 px-4 py-2 rounded-lg hover:bg-white/80 w-fit"
                    onClick={() => navigate("/location")}
                  >
                    <FaMapMarkerAlt />
                    <span>{city}</span>
                  </button>
                </div>
              )}
            </div>
            <PatientTopIcons />
          </div>

          {!selectedCategory ? (
            <>
              {/* Hero Section - Enterprise */}
              <div className="mb-12">
                <HeroCarousel height="h-64" />
              </div>

              {/* Categories Section - Enterprise Grid */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight">Browse by Specialty</h2>
                    <p className="text-[#64748B] mt-1">Find the right healthcare professional for your needs</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {categories.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => handleCategoryClick(item.label)}
                      className="group relative bg-white hover:bg-gradient-to-br hover:from-[#0369A1] hover:to-[#0284C7] rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] to-white opacity-0 group-hover:opacity-0 transition-opacity" />
                      <div className="relative p-8 flex flex-col items-center justify-center min-h-[200px]">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-md group-hover:shadow-lg group-hover:scale-110 transform duration-300">
                          <img
                            src={`/assets/categories/${item.icon}`}
                            alt={item.label}
                            className="w-12 h-12 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all"
                          />
                        </div>
                        <p className="text-base font-semibold text-[#0F172A] group-hover:text-white text-center transition-colors">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Providers Section */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Nearby Doctors</h2>
                    <button
                      onClick={() => navigate('/alldoctors')}
                      className="flex items-center gap-2 text-[#0369A1] hover:text-[#075985] transition-colors font-medium bg-white/60 px-4 py-2 rounded-lg hover:bg-white/80"
                    >
                      View All Doctors
                    </button>
                  </div>
                  <DoctorCardList doctors={doctors} type="doctor" />
                </div>
                <HospitalCardList title="Nearby Hospitals" />
              </div>
            </>
          ) : (
         
            <div className="space-y-8">
              {/* Info bar */}
              {loadingDoctors ? (
                <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#0369A1]/20 border-t-[#0369A1] rounded-full animate-spin" />
                    <p className="text-[#64748B] font-medium">Loading healthcare providers...</p>
                  </div>
                </div>
              ) : errorDoctors ? (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <p className="text-red-600 font-medium">{errorDoctors}</p>
                </div>
              ) : null}

              {filteredDoctors.length > 0 && (
                <CardList
                  title={`${getCategoryTitle(selectedCategory)} Doctors`}
                  data={filteredDoctors}
                  type="doctor"
                />
              )}

              {filteredDoctors.length === 0 && filteredHospitals.length === 0 && !loadingDoctors && !errorDoctors && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaMapMarkerAlt className="w-12 h-12 text-[#0369A1]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">No Providers Found</h3>
                    <p className="text-[#64748B] mb-8">
                      We couldn't find any {getCategoryTitle(selectedCategory).toLowerCase()} providers in {city}
                    </p>
                    <button
                      onClick={handleBackToDashboard}
                      className="bg-gradient-to-r from-[#0369A1] to-[#0284C7] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const categories = [
  { label: "Dentistry", icon: "dentist.png" },
  { label: "Cardiology", icon: "cardiology.png" },
  { label: "Pulmonary", icon: "lungs.png" },
  { label: "General", icon: "general.png" },
  { label: "Neurology", icon: "brain.png" },
  { label: "Gastroen", icon: "stomach.png" },
  { label: "Laboratory", icon: "lab.png" },
  { label: "Vaccination", icon: "vaccine.png" }
];

export default PatientDashboard;
