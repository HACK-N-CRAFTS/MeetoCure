import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TopIcons from "../../../components/PatientTopIcons";
import toast from "react-hot-toast";

const PatientSettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      appointmentReminders: true,
      healthTips: true,
      offers: false,
    },
    privacy: {
      profileVisibility: "public",
      shareData: false,
      analytics: true,
    },
    security: {
      twoFactorAuth: false,
      biometricLogin: false,
      autoLock: true,
    },
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("patientSettings");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          notifications: { ...prev.notifications, ...parsed.notifications },
          privacy: { ...prev.privacy, ...parsed.privacy },
          security: { ...prev.security, ...parsed.security },
        }));
      }
    } catch (_) {}
  }, []);

  const handleNotificationChange = useCallback((key, value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  }, []);

  const SettingSection = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#0A4D68] rounded-lg">{icon}</div>
        <h3 className="text-lg font-semibold text-[#0A4D68]">{title}</h3>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(!enabled);
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-[#0A4D68]" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const SelectOption = ({ value, onChange, options, label, description }) => (
    <div className="py-3">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] to-[#E9F1F8] font-[Poppins] pb-24 md:pb-10">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <FaArrowLeft
            onClick={() => navigate("/patient/profile")}
            className="text-[#0A4D68] text-xl cursor-pointer hover:text-[#08374f]"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A4D68]">
            Settings
          </h1>
        </div>
        <TopIcons />
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* Notifications Settings */}
        <SettingSection
          title="Notifications"
          icon={<FaBell className="text-white" />}
        >
          <div className="space-y-2">
            <ToggleSwitch
              enabled={settings.notifications.email}
              onChange={(value) => handleNotificationChange("email", value)}
              label="Email Notifications"
              description="Receive notifications via email"
            />
            <ToggleSwitch
              enabled={settings.notifications.sms}
              onChange={(value) => handleNotificationChange("sms", value)}
              label="SMS Notifications"
              description="Receive notifications via SMS"
            />
          </div>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-center mt-8 mb-8">
          <Link to="/patient/profile">
            <button
              onClick={() => {
                localStorage.setItem(
                  "patientSettings",
                  JSON.stringify(settings)
                );
                toast.success("Settings saved successfully!");
              }}
              className="px-8 py-3 bg-[#0A4D68] text-white rounded-xl hover:bg-[#08374f] transition-colors font-medium text-lg"
            >
              Save Settings
            </button>
          </Link>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-[#0A4D68] mb-4">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      current: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, new: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A4D68] focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSettings;
