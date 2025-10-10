import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaVenusMars,
  FaPhone,
} from "react-icons/fa";
import { API_BASE_URL } from "../lib/config";


const AppointmentCard = ({ appt, onStatusUpdate }) => {
  const navigate = useNavigate();

  const patient = appt.patientInfo || {};
  const age = patient.age || "-";
  
  const defaultImage = "https://e7.pngegg.com/pngimages/709/489/png-clipart-computer-icons-physician-desktop-patient-home-monitoring-logo-monochrome.png";

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to accept the appointment with ${patient.name || "this patient"}?`
      );

      if (!confirmed) return;

      const response = await fetch(`${API_BASE_URL}/api/appointments/${appt._id}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Appointment accepted successfully!");
        if (onStatusUpdate) {
          onStatusUpdate(appt._id, "accepted");
        }
      } else {
        throw new Error(data.message || "Failed to accept appointment");
      }
    } catch (err) {
      console.error("Error accepting appointment:", err);
      alert(`Error accepting appointment: ${err.message}`);
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to mark the appointment with ${patient.name || "this patient"} as completed?`
      );

      if (!confirmed) return;

      const response = await fetch(`${API_BASE_URL}/api/appointments/${appt._id}/complete`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Appointment completed successfully!");
        if (onStatusUpdate) {
          onStatusUpdate(appt._id, "completed");
        }
      } else {
        throw new Error(data.message || "Failed to complete appointment");
      }
    } catch (err) {
      console.error("Error completing appointment:", err);
      alert(`Error completing appointment: ${err.message}`);
    }
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("doctorToken") || localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to cancel the appointment with ${patient.name || "this patient"}?`
      );

      if (!confirmed) return;

      const response = await fetch(`${API_BASE_URL}/api/appointments/${appt._id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Appointment cancelled successfully!");
        if (onStatusUpdate) {
          onStatusUpdate(appt._id, "cancelled");
        }
      } else {
        throw new Error(data.message || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert(`Error cancelling appointment: ${err.message}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all duration-300 p-5 w-full">
      {/* Date & Time Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E8F4F8]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#E8F4F8]">
            <FaCalendarAlt className="text-[#0A4D68] text-xs" />
          </span>
          <span className="text-sm text-[#666666] font-semibold">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#E8F4F8]">
            <FaClock className="text-[#0A4D68] text-xs" />
          </span>
          <span className="text-sm text-[#0A4D68] font-bold">{appt.time}</span>
        </div>
      </div>

      {/* Patient Info */}
      <div className="flex gap-3 items-start mb-4">
        <img
          src={defaultImage}
          alt={patient.name || "Patient"}
          className="w-14 h-14 rounded-xl object-cover border-2 border-[#E8F4F8]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-[#0A4D68] mb-2">{patient.name || "Unknown Patient"}</h3>
          <div className="space-y-1 text-xs text-[#666666]">
            <div className="flex items-center gap-2">
              <FaUser className="text-[#888888]" />
              <span className="font-medium">{age} years, {patient.gender || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-[#888888]" />
              <span className="font-medium">{patient.phone || "Not provided"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <div className="bg-[#E8F4F8] rounded-xl p-3">
          <p className="text-xs text-[#666666] font-semibold uppercase tracking-wide mb-1">Consultation Reason</p>
          <p className="text-sm text-[#0A4D68] font-medium">{appt.reason || "Not specified"}</p>
        </div>
      </div>

      {/* Status */}
      {appt.status && appt.status !== "pending" && (
        <div className="mb-4">
          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${
            appt.status === "completed" ? "bg-green-100 text-green-700" :
            appt.status === "cancelled" || appt.status === "patient-cancelled" ? "bg-red-100 text-red-700" :
            appt.status === "accepted" ? "bg-blue-100 text-blue-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {appt.status === "patient-cancelled" ? "Cancelled by Patient" : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
          </span>
          {appt.status === "patient-cancelled" && appt.cancellationReason && (
            <div className="mt-2 text-xs text-[#666666] font-medium">
              <span className="font-semibold">Reason:</span> {appt.cancellationReason}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(appt.status === "pending" || appt.status === "confirmed") && (
          <button
            onClick={handleAccept}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2.5 px-3 rounded-lg font-semibold transition-all duration-200"
          >
            Accept
          </button>
        )}
        {(appt.status === "accepted" || appt.status === "confirmed") && !["cancelled", "completed", "patient-cancelled"].includes(appt.status?.toLowerCase()) && (
          <button
            onClick={handleComplete}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2.5 px-3 rounded-lg font-semibold transition-all duration-200"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => navigate(`/doctor/patient/${appt._id}`, { state: { appt } })}
          className="flex-1 bg-[#0A4D68] hover:bg-[#083e54] text-white text-xs py-2.5 px-3 rounded-lg font-semibold transition-all duration-200"
        >
          View Details
        </button>
        {!["cancelled", "completed", "patient-cancelled"].includes(appt.status?.toLowerCase()) && (
          <button
            onClick={handleCancel}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2.5 px-3 rounded-lg font-semibold transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};


export default AppointmentCard;
