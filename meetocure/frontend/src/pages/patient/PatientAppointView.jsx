import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  List,
  RefreshCw,
  Star,
  Send,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../lib/config";

// Star Rating Display Component
function StarRating({ rating, size = "sm" }) {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// Feedback Modal Component
function FeedbackModal({ appointment, isOpen, onClose, onSubmit, loading }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || rating === 0) return;
    
    try {
      await onSubmit({
        rating,
        feedback,
        appointmentId: appointment._id
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setFeedback("");
      setHoveredRating(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Rate Your Visit</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How was your experience? *
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-2 transition-all hover:scale-125 active:scale-95"
                    disabled={loading}
                  >
                    <Star
                      className={`w-10 h-10 transition-all ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-gray-600 mt-2 animate-fadeIn">
                  {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Needs Improvement"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Share your feedback (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={4}
                maxLength={500}
                disabled={loading}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {feedback.length}/500 characters
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Cancel Modal Component
function CancelModal({ appointment, isOpen, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    await onConfirm(appointment?._id, reason);
  };

  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600">Cancel Appointment</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800 leading-relaxed">
              <strong>Important:</strong> Cancelling this appointment cannot be undone. 
              Please consider rescheduling instead if you need a different time.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for cancellation (optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Help us improve by sharing why you're cancelling..."
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                rows={3}
                maxLength={200}
                disabled={loading}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {reason.length}/200 characters
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                disabled={loading}
              >
                Keep Appointment
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50 flex items-center justify-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <X className="w-5 h-5" />
                )}
                {loading ? "Cancelling..." : "Cancel Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Main Component
function PatientAppointView() {
  // App States
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Modal states
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, appointment: null });
  const [cancelModal, setCancelModal] = useState({ isOpen: false, appointment: null });
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/appointments/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      
      const data = await response.json();
      setAppointments(data.appointments || []);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle rating submission
  const handleSubmitRating = async ({ rating, feedback, appointmentId }) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/rate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      await fetchAppointments();
      setFeedbackModal({ isOpen: false, appointment: null });
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = async (id, reason = "") => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/appointments/${id}/patient-cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: "patient-cancelled",
          reason: reason ? `[Patient Cancelled] ${reason}` : "[Patient Cancelled] No reason provided",
          cancelledBy: "patient",
          cancellationReason: reason || "No reason provided",
          patientCancelled: true
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      await fetchAppointments();
      setCancelModal({ isOpen: false, appointment: null });
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to cancel appointment");
    } finally {
      setSubmitting(false);
    }
  };

  // Render appointment card
  const renderAppointment = (appointment) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);
    const isPast = appointmentDate < currentDate;
    const status = appointment.status?.toLowerCase() || "";
    
    const canCancel = !isPast && !["cancelled", "completed", "patient-cancelled"].includes(status);
    const canRate = status === "completed" && !appointment.rating;

    const statusConfig = {
      completed: { 
        bg: "bg-emerald-100", 
        text: "text-emerald-800", 
        icon: CheckCircle,
        label: "Completed"
      },
      cancelled: { 
        bg: "bg-red-100", 
        text: "text-red-800", 
        icon: X,
        label: "Cancelled"
      },
      "patient-cancelled": { 
        bg: "bg-orange-100", 
        text: "text-orange-800", 
        icon: X,
        label: "Cancelled by me"
      },
      pending: { 
        bg: "bg-yellow-100", 
        text: "text-yellow-800", 
        icon: Clock,
        label: "Pending"
      },
      confirmed: { 
        bg: "bg-blue-100", 
        text: "text-blue-800", 
        icon: CheckCircle,
        label: "Confirmed"
      },
    };

    const statusInfo = statusConfig[status] || { 
      bg: "bg-gray-100", 
      text: "text-gray-800", 
      icon: Clock,
      label: status || "pending"
    };
    const StatusIcon = statusInfo.icon;

    return (
      <div key={appointment._id} 
           className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
              {appointment.doctorName?.charAt(0) || "D"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                Dr. {appointment.doctorName}
              </h3>
              {appointment.specialization && (
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {appointment.specialization}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {new Date(appointment.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {appointment.time}
                </span>
              </div>
            </div>
          </div>
          <span className={`${statusInfo.bg} ${statusInfo.text} px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusInfo.label}
          </span>
        </div>

        {/* Show rating if it exists */}
        {appointment.rating && (
          <div className="mt-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <StarRating rating={appointment.rating} size="sm" />
              <span className="text-sm font-semibold text-gray-700">
                Your Rating
              </span>
            </div>
            {appointment.feedback && (
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "{appointment.feedback}"
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {(canCancel || canRate) && (
          <div className="mt-5 flex gap-3 pt-4 border-t border-gray-100">
            {canCancel && (
              <button
                onClick={() => setCancelModal({ isOpen: true, appointment })}
                className="flex-1 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-red-200 hover:border-red-300"
              >
                <X className="w-4 h-4" /> 
                Cancel Appointment
              </button>
            )}
            {canRate && (
              <button
                onClick={() => setFeedbackModal({ isOpen: true, appointment })}
                className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-[#0A4D68] to-[#1e6b8a] text-white rounded-xl hover:from-[#083e54] hover:to-[#0A4D68] font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Star className="w-4 h-4" /> 
                Rate Visit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Appointments</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAppointments}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const today = new Date();

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === "all") return true;
    const status = appointment.status?.toLowerCase() || "";
    switch (filterStatus) {
      case "upcoming":
        return !["cancelled", "completed", "patient-cancelled"].includes(status) && new Date(appointment.date) >= today;
      case "completed":
        return status === "completed";
      case "cancelled":
        return ["cancelled", "patient-cancelled"].includes(status);
      default:
        return true;
    }
  });

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(apt => {
      const status = apt.status?.toLowerCase() || "";
      return !["cancelled", "completed", "patient-cancelled"].includes(status) && new Date(apt.date) >= today;
    }).length,
    completed: appointments.filter(apt => apt.status?.toLowerCase() === "completed").length,
    cancelled: appointments.filter(apt => ["cancelled", "patient-cancelled"].includes(apt.status?.toLowerCase())).length,
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    let days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const appointmentsOnDay = appointments.filter(apt => 
        new Date(apt.date).toDateString() === date.toDateString()
      );
      days.push({ day, appointments: appointmentsOnDay });
    }
    
    return days;
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A4D68]/5 via-[#0A4D68]/10 to-[#0A4D68]/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My Appointments
              </h1>
              <p className="text-gray-600">
                Manage and track all your healthcare appointments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setRefreshing(true);
                  fetchAppointments();
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl hover:bg-white/80 bg-white border border-gray-200 font-medium transition-all shadow-sm hover:shadow-md"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <Link 
                to="/patient-dashboard" 
                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white rounded-xl hover:bg-gray-50 border border-gray-200 font-medium transition-all shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Total", value: stats.total, icon: List, color: "blue" },
              { label: "Upcoming", value: stats.upcoming, icon: Clock, color: "yellow" },
              { label: "Completed", value: stats.completed, icon: CheckCircle, color: "green" },
              { label: "Cancelled", value: stats.cancelled, icon: X, color: "red" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Calendar View
                </h2>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleMonthChange("prev")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-semibold px-3">
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button 
                    onClick={() => handleMonthChange("next")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <div key={idx} className="text-center text-xs font-bold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((dayInfo, idx) => {
                  if (!dayInfo) {
                    return <div key={`empty-${idx}`} className="aspect-square" />;
                  }

                  const date = new Date(currentYear, currentMonth, dayInfo.day);
                  const isToday = date.toDateString() === today.toDateString();
                  const hasAppointments = dayInfo.appointments.length > 0;

                  return (
                    <div 
                      key={dayInfo.day}
                      className={`aspect-square flex flex-col items-center justify-center relative rounded-xl transition-all cursor-pointer
                        ${isToday ? 'bg-[#0A4D68] text-white font-bold shadow-md' : ''}
                        ${hasAppointments && !isToday ? 'bg-[#0A4D68]/10 text-[#0A4D68] font-semibold hover:bg-[#0A4D68]/20' : ''}
                        ${!hasAppointments && !isToday ? 'hover:bg-gray-100' : ''}
                      `}
                    >
                      <span className="text-sm">
                        {dayInfo.day}
                      </span>
                      {hasAppointments && !isToday && (
                        <div className="absolute bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Appointments
                </h2>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { id: "all", label: "All Appointments", icon: List },
                  { id: "upcoming", label: "Upcoming", icon: Clock },
                  { id: "completed", label: "Completed", icon: CheckCircle },
                  { id: "cancelled", label: "Cancelled", icon: X }
                ].map(filter => {
                  const Icon = filter.icon;
                  const isActive = filterStatus === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setFilterStatus(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${isActive ? 
                          'bg-gradient-to-r from-[#0A4D68] to-[#1e6b8a] text-white shadow-md' : 
                          'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              {/* Appointments */}
              <div className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No appointments found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {filterStatus === "all" 
                        ? "You don't have any appointments yet." 
                        : `No ${filterStatus} appointments.`}
                    </p>
                    <Link
                      to="/patient-dashboard"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A4D68] text-white rounded-xl hover:bg-[#083e54] transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      <Calendar className="w-5 h-5" />
                      Book New Appointment
                    </Link>
                  </div>
                ) : (
                  filteredAppointments.map(renderAppointment)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <FeedbackModal
          appointment={feedbackModal.appointment}
          isOpen={feedbackModal.isOpen}
          onClose={() => setFeedbackModal({ isOpen: false, appointment: null })}
          onSubmit={handleSubmitRating}
          loading={submitting}
        />

        <CancelModal
          appointment={cancelModal.appointment}
          isOpen={cancelModal.isOpen}
          onClose={() => setCancelModal({ isOpen: false, appointment: null })}
          onConfirm={handleCancelAppointment}
          loading={submitting}
        />
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PatientAppointView;
