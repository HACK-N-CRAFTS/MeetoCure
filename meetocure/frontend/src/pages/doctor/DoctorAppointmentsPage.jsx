import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { Calendar } from "lucide-react";
import AppointmentTabs from "../../components/AppointmentTabs";
import AppointmentCard from "../../components/AppointmentCard";
import TopIcons from "../../components/TopIcons";
import EnterpriseCard from "../../components/EnterpriseCard";
import axios from "axios";
import { API_BASE_URL } from "../../lib/config";

const TABS = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  PATIENT_CANCELLED: "Patient Cancelled"
};

const DoctorAppointmentsPage = () => {
  const [selectedTab, setSelectedTab] = useState(TABS.UPCOMING);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Calculate counts for tabs
  const appointmentCounts = React.useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.reduce((acc, appt) => {
      const status = (appt.status || "").toLowerCase();
      const appointmentDate = new Date(appt.date).toISOString().split('T')[0];
      
      if ((status === "pending" || status === "accepted" || status === "confirmed") && appointmentDate >= today) {
        acc.upcoming = (acc.upcoming || 0) + 1;
      }
      if (status === "completed") {
        acc.completed = (acc.completed || 0) + 1;
      }
      if (status === "cancelled") {
        acc.cancelled = (acc.cancelled || 0) + 1;
      }
      if (status === "patient-cancelled") {
        acc.patientCancelled = (acc.patientCancelled || 0) + 1;
      }
      return acc;
    }, {});
  }, [appointments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("doctorToken");
        
        if (!token) {
          console.error("No doctor token found");
          setAppointments([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_BASE_URL}/api/appointments/doctor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        
        const enrichedAppointments = (res.data.appointments || []).map((appt) => ({
          ...appt,
          age: appt.patientInfo?.age || "-",
          name: appt.patientInfo?.name || appt.name || "N/A",
          gender: appt.patientInfo?.gender || "N/A",
          phone: appt.patientInfo?.phone || appt.patient?.phone || "N/A",
          note: appt.patientInfo?.note || "",
          reason: appt.reason || "Not specified",
          cancellationReason: appt.cancellationReason || "",
          statusDetails: (() => {
            const status = (appt.status || "").toLowerCase();
            if (status === "patient-cancelled") {
              return {
                label: "Patient Cancelled",
                color: "text-red-600 bg-red-50",
                message: appt.cancellationReason ? `Reason: ${appt.cancellationReason}` : "No reason provided"
              };
            }
            return null;
          })()
        }));


        setAppointments(enrichedAppointments);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        console.error("Error details:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appt) => {
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = new Date(appt.date).toISOString().split('T')[0];
    const status = (appt.status || "").toLowerCase();
    
    switch (selectedTab) {
      case "Upcoming":
        return (status === "pending" || status === "accepted" || status === "confirmed") && appointmentDate >= today;
      case "Completed":
        return status === "completed";
      case "Cancelled": {
        // Only show doctor cancellations in this tab
        return status === "cancelled";
      }
      case "Patient Cancelled": {
        // Show only patient cancellations with reason if available
        if (status === "patient-cancelled") {
          appt.displayReason = appt.cancellationReason ? 
            `Reason: ${appt.cancellationReason}` : 
            'No reason provided';
          return true;
        }
        return false;
      }
      default:
        return true;
    }
  });

  const handleStatusUpdate = (appointmentId, newStatus) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt._id === appointmentId ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 font-['Poppins']">
      {/* Enhanced Header */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/doctor-dashboard")}
              className="group p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-[#004B5C] hover:shadow-lg transition-all duration-200"
            >
              <FaArrowLeft className="text-slate-600 group-hover:text-[#004B5C] transition-colors" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-gradient-to-br from-[#004B5C] to-[#006B7D] rounded-lg">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#004B5C] to-[#006B7D] bg-clip-text text-transparent">
                  Appointments
                </h1>
              </div>
              <p className="text-sm text-slate-600 font-medium">Manage and track your patient consultations</p>
            </div>
          </div>
          <TopIcons />
        </div>

        {/* Enhanced Tabs */}
        <EnterpriseCard className="mb-8 overflow-hidden">
          <div className="p-1.5">
            <AppointmentTabs
              active={selectedTab}
              onChange={(tab) => {
                setSelectedTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              counts={appointmentCounts}
            />
          </div>
        </EnterpriseCard>

        {/* Appointment Cards with Enhanced Design */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-slate-200 border-t-[#004B5C] rounded-full animate-spin mx-auto"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#006B7D] rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-slate-600 text-base font-semibold">Loading appointments...</p>
                <p className="text-slate-400 text-sm mt-1">Please wait while we fetch your data</p>
              </div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="col-span-full">
              <EnterpriseCard className="overflow-hidden">
                <div className="p-16 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#004B5C] to-[#006B7D] rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl flex items-center justify-center shadow-lg">
                      <FaCalendarAlt className="text-4xl text-[#004B5C]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    No {selectedTab.toLowerCase()} appointments
                  </h3>
                  <p className="text-base text-slate-500 font-medium max-w-md mx-auto">
                    {selectedTab === "Upcoming"
                      ? "You don't have any upcoming appointments scheduled. New appointments will appear here."
                      : `You don't have any ${selectedTab.toLowerCase()} appointments at the moment.`
                    }
                  </p>
                </div>
              </EnterpriseCard>
            </div>
          ) : (
            filteredAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appt={appt} onStatusUpdate={handleStatusUpdate} />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
