import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import AppointmentTabs from "../../components/AppointmentTabs";
import AppointmentCard from "../../components/AppointmentCard";
import TopIcons from "../../components/TopIcons";
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8F4F8] font-['Inter',sans-serif]">
      {/* Header */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/doctor-dashboard")}
              className="p-2.5 rounded-xl bg-white border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all duration-200"
            >
              <FaArrowLeft className="text-[#0A4D68]" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A4D68] tracking-tight">Appointments</h1>
              <p className="text-sm text-[#666666]">Manage your patient appointments</p>
            </div>
          </div>
          <TopIcons />
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white rounded-2xl border-2 border-[#E8F4F8] p-1">
          <AppointmentTabs
            active={selectedTab}
            onChange={(tab) => {
              setSelectedTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            counts={appointmentCounts}
          />
        </div>

        {/* Appointment Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-3 border-[#E8F4F8] border-t-[#0A4D68] rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-[#666666] text-sm font-medium">Loading appointments...</p>
              </div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E8F4F8] rounded-2xl flex items-center justify-center">
                  <FaCalendarAlt className="text-3xl text-[#0A4D68]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A4D68] mb-2">
                  No {selectedTab.toLowerCase()} appointments
                </h3>
                <p className="text-sm text-[#888888] font-medium">
                  {selectedTab === "Upcoming"
                    ? "You don't have any upcoming appointments scheduled."
                    : `You don't have any ${selectedTab.toLowerCase()} appointments.`
                  }
                </p>
              </div>
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
