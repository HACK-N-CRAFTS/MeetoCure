import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import TopIcons from "../../../components/TopIcons";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/config";
import toast, { Toaster } from "react-hot-toast";

const AddAvailability = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [dateError, setDateError] = useState("");
  const [slotsError, setSlotsError] = useState("");

  const allSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const validateDate = (date) => {
    if (!date) {
      return "Date is required";
    }
    
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(selectedDateObj.getTime())) {
      return "Invalid date format";
    }
    
    if (selectedDateObj < today) {
      return "Date cannot be in the past";
    }
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    
    if (selectedDateObj > maxDate) {
      return "Date cannot be more than 6 months in advance";
    }
    
    return "";
  };

  const validateSlots = (slots) => {
    if (slots.length === 0) {
      return "Please select at least one time slot";
    }
    
    return "";
  };

  useEffect(() => {
    if (selectedDate) {
      const error = validateDate(selectedDate);
      setDateError(error);
    }
  }, [selectedDate]);

  useEffect(() => {
    const error = validateSlots(selectedSlots);
    setSlotsError(error);
  }, [selectedSlots]);

  const toggleSlot = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSelectAllSlots = () => {
    if (selectedSlots.length === allSlots.length) {
      setSelectedSlots([]);
    } else {
      setSelectedSlots([...allSlots]);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleConfirm = async () => {
    const dateValidationError = validateDate(selectedDate);
    const slotsValidationError = validateSlots(selectedSlots);
    
    setDateError(dateValidationError);
    setSlotsError(slotsValidationError);
    
    if (dateValidationError || slotsValidationError) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    
    const loadingToast = toast.loading("Adding availability...", {
      position: "top-right",
    });
    
    try {
      const token = localStorage.getItem("doctorToken");
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      
      await axios.post(
        `${base}/api/availability`,
        {
          days: [
            {
              date: selectedDate,
              slots: selectedSlots,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Availability updated successfully!", {
        id: loadingToast,
        position: "top-right",
        duration: 3000,
      });
      
      navigate("/doctor/availability");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add availability";
      toast.error(errorMessage, {
        id: loadingToast,
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Poppins] px-6 py-8">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/doctor/availability")} 
            className="text-[#0A4D68] text-xl hover:text-[#08374f] transition-colors"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-[#0A4D68]">Add Availability</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/doctor")} 
            className="text-[#0A4D68] text-xl hover:text-[#08374f] transition-colors"
            title="Go to Home"
          >
            <FaHome />
          </button>
          <TopIcons />
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Date</h2>
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().slice(0, 10)}
          max={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
          onChange={handleDateChange}
          className={`w-full max-w-xs p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D68] ${
            dateError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {dateError && (
          <p className="text-red-500 text-sm mt-1">{dateError}</p>
        )}
      </div>

      {/* Time Slots */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Select Time Slots</h2>
          <button
            onClick={handleSelectAllSlots}
            className="px-4 py-2 bg-[#0A4D68] text-white rounded-md text-sm font-semibold hover:bg-[#08374f] transition-colors"
          >
            {selectedSlots.length === allSlots.length ? "Deselect All" : "Select All"}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-3">
          {allSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`py-2 border rounded-md text-sm font-semibold transition-colors ${
                selectedSlots.includes(slot)
                  ? "bg-[#0A4D68] text-white border-[#0A4D68]"
                  : "bg-white text-[#0A4D68] border-[#0A4D68] hover:bg-[#0A4D68] hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-gray-600">
          <span>{selectedSlots.length} slots selected</span>
        </div>
        
        {slotsError && (
          <p className="text-red-500 text-sm mt-1">{slotsError}</p>
        )}
      </div>

      {/* Confirm Button */}
      <div className="mt-10">
        <button
          onClick={handleConfirm}
          disabled={!!dateError || !!slotsError || !selectedDate || selectedSlots.length === 0}
          className={`w-full py-3 rounded-full font-semibold transition-colors ${
            dateError || slotsError || !selectedDate || selectedSlots.length === 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#0A4D68] text-white hover:bg-[#08374f]"
          }`}
        >
          Confirm Availability
        </button>
      </div>
    </div>
  );
};

export default AddAvailability;
