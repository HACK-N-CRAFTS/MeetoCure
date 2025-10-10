import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUser, FaVenusMars } from "react-icons/fa";
import { API_BASE_URL } from "../lib/config";

const TodayAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const url = `${API_BASE_URL}/api/appointments/doctor`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 404) {
            setAppointments([]);
          } else if (response.status === 401) {
            setError("Authentication failed. Please log in again.");
          } else if (response.status === 403) {
            setError("Access denied. You may not have permission to view appointments.");
          } else {
            setError(`Server error: ${response.status} - ${errorText}`);
          }
        } else {
          const data = await response.json();

          if (data.appointments && Array.isArray(data.appointments)) {
            setAppointments(data.appointments);
          } else if (Array.isArray(data)) {
            setAppointments(data);
          } else {
            setAppointments([]);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleView = (appt) => {
    navigate(`/doctor/patient/${appt._id}`, { state: { appt: appt } });
  };

  const handleCancel = async (appt) => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to cancel the appointment with ${
          appt.patientInfo?.name || appt.name
        } on ${appt.date} at ${appt.time}?`
      );

      if (!confirmed) return;
      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${appt._id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((apt) =>
            apt._id === appt._id ? { ...apt, status: "cancelled" } : apt
          )
        );
        alert("Appointment cancelled successfully!");
      } else {
        throw new Error(data.message || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert(`Error cancelling appointment: ${err.message}`);
    }
  };

  const handleAccept = async (appt) => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to accept the appointment with ${
          appt.patientInfo?.name || appt.name
        } on ${appt.date} at ${appt.time}?`
      );

      if (!confirmed) return;
      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${appt._id}/accept`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((apt) =>
            apt._id === appt._id ? { ...apt, status: "accepted" } : apt
          )
        );
        alert("Appointment accepted successfully!");
      } else {
        throw new Error(data.message || "Failed to accept appointment");
      }
    } catch (err) {
      console.error("Error accepting appointment:", err);
      alert(`Error accepting appointment: ${err.message}`);
    }
  };

  const handleComplete = async (appt) => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to mark the appointment with ${
          appt.patientInfo?.name || appt.name
        } on ${appt.date} at ${appt.time} as completed?`
      );

      if (!confirmed) return;
      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${appt._id}/complete`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((apt) =>
            apt._id === appt._id ? { ...apt, status: "completed" } : apt
          )
        );
        alert("Appointment completed successfully!");
      } else {
        throw new Error(data.message || "Failed to complete appointment");
      }
    } catch (err) {
      console.error("Error completing appointment:", err);
      alert(`Error completing appointment: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#E8F4F8] border-t-[#0A4D68] rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-[#666666] text-sm font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border-2 border-red-200 p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 bg-red-500 rounded-lg"></div>
        </div>
        <h3 className="text-base font-bold text-[#0A4D68] mb-1">Error Loading Appointments</h3>
        <p className="text-red-600 text-sm font-medium">{error}</p>
      </div>
    );
  }

  const isToday = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return date.startsWith(today);
  };

  // Filter only today's appointments
  const todayAppointments = appointments
    .filter(appt => isToday(appt.date))
    .sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    })
    .slice(0, 6);

  if (todayAppointments.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-[#E8F4F8] p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-[#E8F4F8] rounded-xl flex items-center justify-center">
          <FaCalendarAlt className="text-xl text-[#0A4D68]" />
        </div>
        <h3 className="text-base font-bold text-[#0A4D68] mb-1">
          No Appointments Today
        </h3>
        <p className="text-sm text-[#888888] font-medium">
          You have no appointments scheduled for today. Enjoy your day!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {todayAppointments.map((appt) => (
        <div
          key={appt._id}
          className="bg-white rounded-xl border-2 border-[#E8F4F8] p-3 sm:p-4 hover:border-[#0A4D68] transition-all duration-200 hover:shadow-md"
        >
          {/* Header with Time and Date */}
          <div className="flex justify-between items-center mb-2 sm:mb-3 pb-2 sm:pb-3 border-b-2 border-[#E8F4F8]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                <FaClock className="text-xs sm:text-sm text-[#0A4D68]" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#0A4D68]">{appt.time}</span>
            </div>
            <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap ${
              appt.status === "completed" ? "bg-green-100 text-green-700" :
              appt.status === "cancelled" ? "bg-red-100 text-red-700" :
              appt.status === "accepted" ? "bg-blue-100 text-blue-700" :
              "bg-yellow-100 text-yellow-700"
            }`}>
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </span>
          </div>

          {/* Patient Info */}
          <div className="mb-3">
            <h3 className="font-bold text-sm text-[#0A4D68] mb-2">
              {appt.patientInfo?.name || appt.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-[#666666]">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                  <FaUser className="text-xs text-[#0A4D68]" />
                </div>
                <span className="font-semibold">{appt.patientInfo?.age || "N/A"} yrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                  <FaVenusMars className="text-xs text-[#0A4D68]" />
                </div>
                <span className="font-semibold">{appt.patientInfo?.gender || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Reason */}
          {appt.reason && (
            <div className="mb-3">
              <div className="bg-[#E8F4F8] rounded-lg p-2 border-2 border-[#E8F4F8]">
                <p className="text-xs text-[#0A4D68] font-medium">
                  <span className="font-bold">Reason:</span> {appt.reason}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {appt.status === "pending" && (
              <button
                onClick={() => handleAccept(appt)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded-lg font-bold transition-colors duration-200"
              >
                Accept
              </button>
            )}
            {appt.status === "accepted" && (
              <button
                onClick={() => handleComplete(appt)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg font-bold transition-colors duration-200"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => handleView(appt)}
              className="flex-1 bg-[#0A4D68] hover:bg-[#083e54] text-white text-xs py-2 rounded-lg font-bold transition-colors duration-200"
            >
              View
            </button>
            {appt.status !== "completed" && appt.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(appt)}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200 text-xs py-2 rounded-lg font-bold transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodayAppointments;
