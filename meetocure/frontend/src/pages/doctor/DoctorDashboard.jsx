import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/HeroBanners";
import TodayAppointments from "../../components/TodayAppointments";
import SidebarNav from "../../components/SidebarNav";
import BottomNav from "../../components/BottomNav";
import TopIcons from "../../components/TopIcons"; 
import { FaCalendarAlt, FaChartBar, FaHome, FaRegCalendarCheck, FaUser } from "react-icons/fa";
import { DollarSign, Users, CalendarCheck, Target } from "lucide-react";
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

  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsData = await getDoctorStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching doctor stats:", err);
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

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    const doctorInfo = localStorage.getItem("doctorInfo");
    if (!token || !doctorInfo) {
      navigate("/doctor-verify");
      return;
    }
    try {
      const doctor = JSON.parse(doctorInfo);
      if (doctor.registrationStatus !== "verified") {
        if (doctor.registrationStatus === "under review by hospital") {
          navigate("/doctor-verify");
        } else {
          navigate("/hospital-form");
        }
        return;
      }
      fetchStats();
    } catch {
      navigate("/doctor-verify");
      return;
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      {/* Sidebar */}
      <SidebarNav navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-8 lg:px-5 py-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#E8F4F8]">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/logo.png"
              alt="Meetocure"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0A4D68]">
              Meetocure
            </h1>
          </div>
          <TopIcons earnings={stats.totalEarnings} />
        </div>

        {/* Hero Banner */}
        <div className="mb-6 rounded-lg overflow-hidden border-2 border-[#E8F4F8]">
          <HeroCarousel />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatsCard
            title="Total Earnings"
            value={`₹${stats.totalEarnings?.toLocaleString() || "0"}`}
            subtitle={`₹${stats.monthlyEarnings?.toLocaleString() || "0"} this month`}
            icon={<DollarSign className="w-4 h-4" />}
            color="text-[#0A4D68]"
            bg="bg-[#E8F4F8]"
            loading={loading}
          />
          <StatsCard
            title="Total Patients"
            value={stats.uniquePatients || 0}
            subtitle={`${stats.completedAppointments || 0} consultations`}
            icon={<Users className="w-4 h-4" />}
            color="text-[#0A4D68]"
            bg="bg-[#E8F4F8]"
            loading={loading}
          />
          <StatsCard
            title="Today's Appointments"
            value={stats.todayAppointments || 0}
            subtitle={`${stats.pendingAppointments || 0} pending`}
            icon={<CalendarCheck className="w-4 h-4" />}
            color="text-[#0A4D68]"
            bg="bg-[#E8F4F8]"
            loading={loading}
          />
          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate || 0}%`}
            subtitle={`${stats.completedAppointments || 0} completed`}
            icon={<Target className="w-4 h-4" />}
            color="text-[#0A4D68]"
            bg="bg-[#E8F4F8]"
            loading={loading}
          />
        </div>

        {/* Today Appointments Section */}
 
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg font-extrabold text-[#0A4D68]">
              Today's Appointments
            </h2>
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="text-xs md:text-sm text-white font-bold px-4 py-2 rounded-lg bg-[#0A4D68] hover:bg-[#083d52] transition-colors duration-200 border-2 border-[#0A4D68]"
            >
              View All
            </button>
          </div>
          <TodayAppointments />
        </div>  

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <BottomNav navItems={navItems} />
      </div>
    </div>
  );
};

// Enhanced Stats Card Component
const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "text-[#0A4D68]",
  bg = "bg-[#E8F4F8]",
  loading = false
}) => (
  <div className="bg-white border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all duration-200 rounded-lg p-4 group">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="text-sm font-bold text-[#0A4D68] mb-2">
          {title}
        </h3>
        <p className={`text-2xl font-extrabold ${color} mb-0.5`}>
          {loading
            ? <span className="block animate-pulse bg-[#E8F4F8] rounded h-7 w-20"></span>
            : value}
        </p>
        {subtitle && <p className="text-[11px] text-[#0A4D68]/60 font-semibold mt-1">{subtitle}</p>}
      </div>
      <span className={`p-2 rounded-lg ${bg} group-hover:bg-[#0A4D68] transition-colors duration-200 flex-shrink-0`}>
        <span className={`${color} group-hover:text-white transition-colors duration-200 block`}>{icon}</span>
      </span>
    </div>
  </div>
);

export default DoctorDashboard;
