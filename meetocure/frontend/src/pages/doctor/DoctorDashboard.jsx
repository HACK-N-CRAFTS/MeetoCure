import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/HeroBanners";
import TodayAppointments from "../../components/TodayAppointments";
import SidebarNav from "../../components/SidebarNav";
import BottomNav from "../../components/BottomNav";
import TopIcons from "../../components/TopIcons";
import { FaCalendarAlt, FaChartBar, FaHome, FaRegCalendarCheck, FaUser } from "react-icons/fa";
import { DollarSign, Users, CalendarCheck, Target, TrendingUp, Activity } from "lucide-react";
import { getDoctorStats } from "../../lib/doctorApi";
import EnterpriseCard, { CardBody } from "../../components/EnterpriseCard";
import EnterpriseButton from "../../components/EnterpriseButton";

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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 font-['Poppins']">
      {/* Sidebar */}
      <SidebarNav navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-8 lg:px-6 py-6 pb-24 md:pb-8">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#004B5C] to-[#006B7D] rounded-xl blur-md opacity-30"></div>
              <img
                src="/assets/logo.png"
                alt="Meetocure"
                className="w-11 h-11 rounded-xl object-cover relative shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-[#004B5C] to-[#006B7D] bg-clip-text text-transparent">
                Meetocure
              </h1>
              <p className="text-xs text-slate-500 font-medium">Doctor Portal</p>
            </div>
          </div>
          <TopIcons earnings={stats.totalEarnings} />
        </div>

        {/* Hero Banner with Enhanced Styling */}
        <EnterpriseCard className="mb-8 overflow-hidden" hoverable={false}>
          <HeroCarousel />
        </EnterpriseCard>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <EnterpriseStatsCard
            title="Total Earnings"
            value={`₹${stats.totalEarnings?.toLocaleString() || "0"}`}
            subtitle={`₹${stats.monthlyEarnings?.toLocaleString() || "0"} this month`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="+12.5%"
            loading={loading}
            gradient="from-emerald-500 to-teal-600"
          />
          <EnterpriseStatsCard
            title="Total Patients"
            value={stats.uniquePatients || 0}
            subtitle={`${stats.completedAppointments || 0} consultations`}
            icon={<Users className="w-5 h-5" />}
            trend="+8.3%"
            loading={loading}
            gradient="from-blue-500 to-indigo-600"
          />
          <EnterpriseStatsCard
            title="Today's Appointments"
            value={stats.todayAppointments || 0}
            subtitle={`${stats.pendingAppointments || 0} pending`}
            icon={<CalendarCheck className="w-5 h-5" />}
            loading={loading}
            gradient="from-purple-500 to-pink-600"
          />
          <EnterpriseStatsCard
            title="Completion Rate"
            value={`${stats.completionRate || 0}%`}
            subtitle={`${stats.completedAppointments || 0} completed`}
            icon={<Target className="w-5 h-5" />}
            trend="+5.2%"
            loading={loading}
            gradient="from-orange-500 to-red-600"
          />
        </div>

        {/* Today Appointments Section with Enhanced Design */}
        <EnterpriseCard className="mb-6">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#004B5C] to-[#006B7D] rounded-xl">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800">
                    Today's Appointments
                  </h2>
                  <p className="text-sm text-slate-500">Manage your daily schedule</p>
                </div>
              </div>
              <EnterpriseButton
                onClick={() => navigate("/doctor/appointments")}
                variant="primary"
                size="sm"
              >
                View All
              </EnterpriseButton>
            </div>
            <TodayAppointments />
          </CardBody>
        </EnterpriseCard>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <BottomNav navItems={navItems} />
      </div>
    </div>
  );
};

// Enterprise Stats Card Component
const EnterpriseStatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  loading = false,
  gradient = "from-[#004B5C] to-[#006B7D]"
}) => (
  <EnterpriseCard className="group overflow-hidden relative">
    <CardBody className="p-5">
      {/* Gradient Background Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-300`}></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">
              {title}
            </h3>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded-lg w-24 mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-32"></div>
              </div>
            ) : (
              <>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                  {value}
                </p>
                {subtitle && (
                  <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
                )}
              </>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-white block">{icon}</span>
          </div>
        </div>

        {trend && !loading && (
          <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600">{trend}</span>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        )}
      </div>
    </CardBody>
  </EnterpriseCard>
);

export default DoctorDashboard;
