import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaVenusMars,
  FaPhone,
  FaFileAlt,
  FaEllipsisV,
  FaDownload,
  FaEye,
  FaHeartbeat,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";
import TopIcons from "../../components/TopIcons";

const DoctorPatientDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const appt = state?.appt;
  // Extract patient data with fallbacks
  const patient = appt?.patientInfo || appt?.patient || {};
  
  // Use sample user icon for all patients
  const getUserImage = () => {
    return "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  };

  if (!appt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8F4F8] flex items-center justify-center font-['Inter',sans-serif]">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#E8F4F8] rounded-2xl flex items-center justify-center">
            <FaUser className="text-[#0A4D68] text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A4D68] mb-2">No Appointment Data</h2>
          <p className="text-[#666666] mb-6">Appointment information is not available</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#0A4D68] text-white px-6 py-3 rounded-xl hover:bg-[#083e54] transition-colors font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8F4F8] font-['Inter',sans-serif]">
      {/* Header */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl bg-white border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all duration-200"
            >
              <FaArrowLeft className="text-[#0A4D68]" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A4D68] tracking-tight">
                Patient Details
              </h1>
              <p className="text-sm text-[#666666]">View patient information and medical records</p>
            </div>
          </div>
          <TopIcons />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] overflow-hidden mb-6">
            <div className="bg-[#E8F4F8] p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <img
                  src={patient.photo || getUserImage()}
                  alt={patient.name}
                  className="w-28 h-28 rounded-xl object-cover border-2 border-white"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0A4D68] mb-3">
                    {patient.name || appt.name || "Unknown Patient"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-2.5">
                      <span className="p-1.5 rounded-lg bg-[#E8F4F8]">
                        <FaUser className="text-[#0A4D68] text-sm" />
                      </span>
                      <div>
                        <p className="text-xs text-[#666666]">Age</p>
                        <p className="font-semibold text-[#0A4D68]">{patient.age || "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-2.5">
                      <span className="p-1.5 rounded-lg bg-pink-100">
                        <FaVenusMars className="text-pink-600 text-sm" />
                      </span>
                      <div>
                        <p className="text-xs text-[#666666]">Gender</p>
                        <p className="font-semibold text-[#0A4D68]">{patient.gender || "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-2.5">
                      <span className="p-1.5 rounded-lg bg-green-100">
                        <FaPhone className="text-green-600 text-sm" />
                      </span>
                      <div>
                        <p className="text-xs text-[#666666]">Phone</p>
                        <p className="font-semibold text-[#0A4D68] text-sm">{patient.phone || appt.phone || "+91 XXXXXXXX"}</p>
                      </div>
                    </div>
                  </div>
                  {patient.blood_group && (
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                        Blood Group: {patient.blood_group}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all p-5">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-[#E8F4F8]">
                  <FaCalendarAlt className="text-xl text-[#0A4D68]" />
                </span>
                <div>
                  <p className="text-xs text-[#666666] font-semibold uppercase tracking-wide mb-1">Appointment Date</p>
                  <p className="text-base font-bold text-[#0A4D68]">
                    {new Date(appt.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] hover:border-[#0A4D68] transition-all p-5">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-green-100">
                  <FaClock className="text-xl text-green-600" />
                </span>
                <div>
                  <p className="text-xs text-[#666666] font-semibold uppercase tracking-wide mb-1">Appointment Time</p>
                  <p className="text-base font-bold text-green-600">{appt.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            {/* About Patient */}
            <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-lg bg-[#E8F4F8]">
                  <FaNotesMedical className="text-[#0A4D68]" />
                </span>
                <h2 className="text-lg font-bold text-[#0A4D68]">Patient Information</h2>
              </div>
              <div className="space-y-3 text-[#666666]">
                <p className="leading-relaxed text-sm">
                  <strong className="text-[#0A4D68]">{patient.name || appt.name || "Patient"}</strong> is a {patient.age || "unknown"}-year-old {patient.gender || "unknown"} currently
                  seeking medical consultation. This patient has scheduled an appointment for
                  medical evaluation and treatment.
                </p>

                {appt.reason && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800 font-medium">
                      <strong>Appointment Reason:</strong> {appt.reason}
                    </p>
                  </div>
                )}

                {patient.medical_history_summary && (
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 font-medium">
                      <strong>Medical History:</strong> {patient.medical_history_summary}
                    </p>
                  </div>
                )}

                {patient.note && (
                  <div className="bg-[#E8F4F8] rounded-lg p-3">
                    <p className="text-sm text-[#0A4D68] font-medium">
                      <strong>Patient Note:</strong> {patient.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-lg bg-[#E8F4F8]">
                  <FaHeartbeat className="text-[#0A4D68]" />
                </span>
                <h2 className="text-lg font-bold text-[#0A4D68]">Quick Stats</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#E8F4F8]">
                  <span className="text-[#666666] text-sm font-medium">Appointment Status</span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    appt.status === "completed" ? "bg-green-100 text-green-700" :
                    appt.status === "cancelled" ? "bg-red-100 text-red-700" :
                    appt.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {appt.status || "pending"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#E8F4F8]">
                  <span className="text-[#666666] text-sm font-medium">Priority Level</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                    Normal
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#666666] text-sm font-medium">Files Attached</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                    {appt.medicalRecords ? appt.medicalRecords.length : 0} Documents
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Files */}
          <div className="bg-white rounded-2xl border-2 border-[#E8F4F8] p-5">
            <div className="flex items-center gap-2 mb-5">
              <span className="p-2 rounded-lg bg-[#E8F4F8]">
                <FaFileAlt className="text-[#0A4D68]" />
              </span>
              <h2 className="text-lg font-bold text-[#0A4D68]">Patient Files & Documents</h2>
            </div>

            <div className="space-y-3">
              {appt.medicalRecords && appt.medicalRecords.length > 0 ? (
                appt.medicalRecords.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-xl hover:border-2 hover:border-[#0A4D68] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 bg-white rounded-lg">
                        <FaStethoscope className="text-[#0A4D68]" />
                      </span>
                      <div>
                        <p className="font-semibold text-[#0A4D68] text-sm">{record.description || record.record_type || "Medical Record"}</p>
                        <p className="text-xs text-[#666666]">
                          {record.record_type || "Document"} • {new Date(record.upload_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(record.file_url, '_blank')}
                        className="p-2 rounded-lg hover:bg-white transition-colors"
                        title="View file"
                      >
                        <FaEye className="text-[#0A4D68]" />
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = record.file_url;
                          link.download = record.description || 'medical-record';
                          link.click();
                        }}
                        className="p-2 rounded-lg hover:bg-white transition-colors"
                        title="Download file"
                      >
                        <FaDownload className="text-[#0A4D68]" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-3 bg-[#E8F4F8] rounded-2xl flex items-center justify-center">
                    <FaFileAlt className="text-2xl text-[#0A4D68]" />
                  </div>
                  <p className="text-[#0A4D68] font-semibold mb-1">No medical records uploaded</p>
                  <p className="text-sm text-[#888888]">Patient has not uploaded any medical documents for this appointment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetailsPage;

