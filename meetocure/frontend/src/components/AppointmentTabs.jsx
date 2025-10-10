import React from "react";

const AppointmentTabs = ({ active, onChange, counts = {} }) => {
  const tabs = [
    { id: "Upcoming", label: "Upcoming", count: counts.upcoming || 0 },
    { id: "Completed", label: "Completed", count: counts.completed || 0 },
    { id: "Cancelled", label: "Cancelled", count: counts.cancelled || 0 },
    { id: "Patient Cancelled", label: "Patient Cancelled", count: counts.patientCancelled || 0 }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 rounded-xl ${
            active === tab.id
              ? "text-white bg-[#0A4D68]"
              : "text-[#666666] hover:bg-[#E8F4F8] hover:text-[#0A4D68]"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
