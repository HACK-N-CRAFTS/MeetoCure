import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/HeroBanners";
import TodayAppointments from "../../components/TodayAppointments";
import SidebarNav from "../../components/SidebarNav";
import BottomNav from "../../components/BottomNav";
import TopIcons from "../../components/TopIcons"; 
import { FaCalendarAlt, FaChartBar, FaHome, FaRegCalendarCheck, FaUser } from "react-icons/fa";
import { DollarSign, Users, CalendarCheck, Target, TrendingUp } from "lucide-react";
import { getDoctorStats } from "../../lib/doctorApi";
const navItems = [
  { icon: <FaChartBar />, label: "Stats", path: "/doctor/stats" },
  { icon: <FaCalendarAlt />, label: "Availability", path: "/doctor/availability" },
  { icon: <FaHome />, label: "Home", path: "/doctor-dashboard" },
  { icon: <FaRegCalendarCheck />, label: "Schedule", path: "/doctor/appointments" },
  { icon: <FaUser />, label: "Profile", path: "/doctor/profile" },
];
const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingAppointments: 0,
    acceptedAppointments: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    uniquePatients: 0,
    completedAppointments: 0,
    completionRate: 0,
    avgEarningsPerPatient: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch doctor stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsData = await getDoctorStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Set default values on error
      setStats({
        todayAppointments: 0,
        pendingAppointments: 0,
        acceptedAppointments: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        uniquePatients: 0,
        completedAppointments: 0,
        completionRate: 0,
        avgEarningsPerPatient: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    const doctorInfo = localStorage.getItem('doctorInfo');
    
    if (!token || !doctorInfo) {
      navigate('/doctor-verify');
      return;
    }

    // Verify the doctor is verified
    try {
      const doctor = JSON.parse(doctorInfo);
      if (doctor.registrationStatus !== 'verified') {
        if (doctor.registrationStatus === 'under review by hospital') {
          navigate('/doctor-verify');
        } else {
          navigate('/hospital-form');
        }
        return;
      }
      fetchStats();
    } catch (error) {
      console.error('Error parsing doctor info:', error);
      navigate('/doctor-verify');
      return;
    }
  }, [navigate]);

  return (
    <div className="flex bg-[#F8FAFC] font-[Poppins]">
      {/* Sidebar */}
      <SidebarNav navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen px-6 py-6 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="Meetocure"
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <h1 className="text-3xl font-bold text-[#0A4D68]">Meetocure</h1>
          </div>
          <TopIcons />
        </div>

        {/* Hero Banner */}
        <div className="mb-10">
          <HeroCarousel />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Earnings"
            value={`₹${stats.totalEarnings?.toLocaleString() || '0'}`}
            subtitle={`₹${stats.monthlyEarnings?.toLocaleString() || '0'} this month`}
            icon={<DollarSign className="w-6 h-6" />}
            color="text-green-600"
            bg="bg-green-100"
            loading={loading}
          />
          <StatsCard
            title="Total Patients"
            value={stats.uniquePatients || 0}
            subtitle={`${stats.completedAppointments || 0} consultations`}
            icon={<Users className="w-6 h-6" />}
            color="text-blue-600"
            bg="bg-blue-100"
            loading={loading}
          />
          <StatsCard
            title="Today's Appointments"
            value={stats.todayAppointments || 0}
            subtitle={`${stats.pendingAppointments || 0} pending`}
            icon={<CalendarCheck className="w-6 h-6" />}
            color="text-indigo-600"
            bg="bg-indigo-100"
            loading={loading}
          />
          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate || 0}%`}
            subtitle={`${stats.completedAppointments || 0} completed`}
            icon={<Target className="w-6 h-6" />}
            color="text-purple-600"
            bg="bg-purple-100"
            loading={loading}
          />
        </div>

        {/* Today Appointments */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#1F2A37]">
            Today Appointments
          </h2>
          <span
            onClick={() => navigate("/doctor/appointments")}
            className="text-sm md:text-base text-[#0A4D68] cursor-pointer hover:underline font-medium"
          >
            See All
          </span>
        </div>
        <TodayAppointments />

      </div>

      {/* Mobile Bottom Nav */}
      <div className="block md:hidden">
        <BottomNav navItems={navItems} />
      </div>
    </div>
  );
};

// Reusable stat card component
const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = "text-blue-600", 
  bg = "bg-blue-100",
  loading = false 
}) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${bg}`}>
        <div className={color}>{icon}</div>
      </div>
    </div>
    <h3 className="font-semibold text-lg text-[#1F2A37] mb-2">
      {title}
    </h3>
    <p className={`text-xl font-bold ${color}`}>
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        value
      )}
    </p>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    )}
  </div>
);

export default DoctorDashboard;
