import React from "react";

const AppointmentTabs = ({ active, onChange, counts = {} }) => {
  const tabs = [
    { id: "Upcoming", label: "Upcoming", count: counts.upcoming || 0 },
    { id: "Completed", label: "Completed", count: counts.completed || 0 },
    { id: "Cancelled", label: "Cancelled", count: counts.cancelled || 0 },
    { id: "Patient Cancelled", label: "Patient Cancelled", count: counts.patientCancelled || 0,
      color: "text-red-600 bg-red-50" }
  ];

  return (
    <div className="flex gap-8 border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-3 px-2 text-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            active === tab.id
              ? "text-[#0A4D68] border-b-4 border-[#0A4D68]"
              : "text-gray-400 hover:text-[#0A4D68]"
          }`}
        >
          <span>{tab.label}</span>
          <div className="flex items-center gap-1">
            <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100">
              {tab.count}
            </span>
            {tab.id === "Cancelled" && tab.subCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                {tab.subCount} by patient
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
