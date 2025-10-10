import React, { useState } from "react";
import { FaUserMd, FaUser, FaShieldAlt, FaCheckCircle, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChooseRoleScreen = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const navigate = useNavigate();

  const handleSOSClick = () => {
    setShowSOSModal(true);
  };

  const handleEmergencyCall = () => {
    navigate("/patient/emergency-contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex font-['Inter','system-ui','sans-serif']">
      {/* SOS Floating Button - Enhanced */}
      <button
        onClick={handleSOSClick}
        className="fixed top-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        style={{
          boxShadow: "0 8px 24px rgba(239, 68, 68, 0.4)",
        }}
        aria-label="Emergency SOS"
      >
        <div className="relative">
          <span className="text-base font-bold tracking-wide">SOS</span>
          <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping"></span>
        </div>
      </button>

      {/* Left Section - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#004B5C] via-[#006B7D] to-[#008B9E] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-white/20">
                <img src="/assets/logo.png" alt="Meetocure Logo" className="w-12 h-12 brightness-0 invert" />
              </div>
              <div>
                <span className="text-3xl font-bold tracking-tight">Meetocure</span>
                <p className="text-white/70 text-sm">Healthcare Reimagined</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 max-w-lg">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Welcome to the Future of Healthcare
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Connect with certified doctors, book appointments instantly, and manage your health journey with enterprise-grade security.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/15 transition-all">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Secure & Private</h4>
                  <p className="text-white/70 text-sm">End-to-end encrypted consultations with HIPAA compliance</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/15 transition-all">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Verified Professionals</h4>
                  <p className="text-white/70 text-sm">All doctors are verified and certified healthcare providers</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/15 transition-all">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">24/7 Support</h4>
                  <p className="text-white/70 text-sm">Round-the-clock customer support and emergency assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white/50 text-sm">
            © 2024 Meetocure. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Section - Role Selection */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Meetocure" className="w-10 h-10" />
            <span className="text-xl font-bold text-[#004B5C]">Meetocure</span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-md mt-20 lg:mt-0">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Get Started
              </h1>
              <p className="text-lg text-slate-600">
                Choose how you'd like to use Meetocure
              </p>
            </div>

            {/* Role Cards */}
            <div className="space-y-4">
              {/* Patient Card */}
              <button
                onClick={() => navigate("/dual-patient")}
                className="group w-full bg-white hover:bg-gradient-to-br hover:from-[#004B5C] hover:to-[#006B7D] border-2 border-slate-200 hover:border-transparent rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                    <FaUser className="w-10 h-10 text-[#004B5C] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                      I'm a Patient
                    </h3>
                    <p className="text-slate-600 group-hover:text-white/80 transition-colors">
                      Book appointments, consult doctors, manage health records
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-slate-400 group-hover:text-white transition-all group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Doctor Card */}
              <button
                onClick={() => navigate("/dual-doctor")}
                className="group w-full bg-white hover:bg-gradient-to-br hover:from-[#004B5C] hover:to-[#006B7D] border-2 border-slate-200 hover:border-transparent rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                    <FaUserMd className="w-10 h-10 text-[#004B5C] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                      I'm a Doctor
                    </h3>
                    <p className="text-slate-600 group-hover:text-white/80 transition-colors">
                      Manage appointments, connect with patients, grow practice
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-slate-400 group-hover:text-white transition-all group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Trust Badge */}
            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-center gap-3 text-slate-500">
                <FaShieldAlt className="text-lg" />
                <span className="text-sm">Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Modal - Enhanced */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] px-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-slideUp">
            <div className="text-center">
              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Emergency Assistance
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                You're about to contact emergency services. Please use this feature only for genuine medical emergencies requiring immediate attention.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEmergencyCall}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaPhone className="w-5 h-5" />
                  Call Emergency Services
                </button>

                <button
                  onClick={() => setShowSOSModal(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-base transition-all duration-300"
                >
                  Cancel
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                  <FaShieldAlt />
                  Your location may be shared with emergency services
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseRoleScreen;