import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaArrowLeft, FaCheckCircle, FaShieldAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const OTP_VALIDITY_SECONDS = 120; // 2 minutes

const PatientLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(OTP_VALIDITY_SECONDS);
  const [loading, setLoading] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const otpRefs = useRef([]);

  useEffect(() => {
    let id;
    if (otpSent && otpExpiry) {
      id = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((otpExpiry - Date.now()) / 1000));
        setTimer(remaining);
        if (remaining <= 0) {
          clearInterval(id);
          setOtpSent(false);
          setOtp(Array(6).fill(""));
          setOtpExpiry(null);
          toast.error("OTP expired. Please request a new code.");
        }
      }, 1000);
    }
    return () => clearInterval(id);
  }, [otpSent, otpExpiry]);

  const normalized = (p) => p.replace(/\D/g, "").slice(-10);

  const sendCode = async () => {
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      setLoading(true);
      toast.loading("Sending OTP...", { id: "otp" });
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/patient/send-otp`,
        { phone }
      );
      toast.success("OTP Sent!", { id: "otp" });

      setOtpSent(true);
      setOtp(Array(6).fill(""));
      setTimer(OTP_VALIDITY_SECONDS);
      const expiryTs = Date.now() + OTP_VALIDITY_SECONDS * 1000;
      setOtpExpiry(expiryTs);

      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    } catch (e) {
      console.error("Send OTP error:", e.response?.data || e.message);
      toast.error("Failed to send OTP", { id: "otp" });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const otpString = otp.join("");
    console.log("Verifying with:", { phone, otp: otpString });

    if (!/^\d{6}$/.test(otpString)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!otpExpiry || Date.now() > otpExpiry) {
      toast.error("OTP expired. Please request a new code.");
      setOtpSent(false);
      setOtp(Array(6).fill(""));
      setOtpExpiry(null);
      return;
    }

    try {
      setLoading(true);
      toast.loading("Verifying OTP...", { id: "verify" });

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/patient/verify-otp`,
        { phone, otp: otpString }
      );

      console.log("Verify OTP Response:", res.data);
      toast.success("OTP Verified!", { id: "verify" });

      const { token, patient } = res.data;
      if (token) localStorage.setItem("token", token);
      if (patient) {
        localStorage.setItem("user", JSON.stringify(patient._id));
        const pid = patient._id || patient.id || patient.patientId || null;
        if (pid) {
          localStorage.setItem("patientId", pid);
        }
      }

      setOtpExpiry(null);
      navigate("/patient-dashboard");
    } catch (e) {
      console.error("Verification error:", e.response?.data || e.message);
      toast.error("OTP verification failed", { id: "verify" });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;

    const arr = [...otp];
    arr[idx] = val;
    setOtp(arr);

    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!val && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) sendCode();
    else verifyCode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-['Inter','system-ui','sans-serif'] flex">
      <Toaster position="top-right" toastOptions={{
        style: { fontFamily: 'Inter, system-ui, sans-serif' }
      }} />

      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#004B5C] via-[#006B7D] to-[#008B9E] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Meetocure Logo" className="w-12 h-12 brightness-0 invert" />
            <span className="text-2xl font-bold tracking-tight">Meetocure</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8 max-w-lg">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Secure Healthcare Access
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Experience seamless, enterprise-grade healthcare management with advanced security and privacy.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Bank-Level Security</h4>
                  <p className="text-white/70 text-sm">Your data is encrypted and protected with industry-leading security protocols.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">HIPAA Compliant</h4>
                  <p className="text-white/70 text-sm">We adhere to strict healthcare privacy regulations to protect your information.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FaLock className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Two-Factor Authentication</h4>
                  <p className="text-white/70 text-sm">Enhanced security with OTP verification for every login.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white/60 text-sm">
            © 2024 Meetocure. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 lg:top-8 lg:left-8 p-3 rounded-full hover:bg-slate-200 transition-all duration-200 text-slate-700 hover:text-slate-900 group"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-200" />
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 right-6">
          <img src="/assets/logo.png" alt="Meetocure" className="w-10 h-10" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                {otpSent ? "Verify Your Identity" : "Welcome Back"}
              </h1>
              <p className="text-lg text-slate-600">
                {otpSent
                  ? "We've sent a 6-digit code to your mobile number."
                  : "Sign in to access your healthcare dashboard."}
              </p>
            </div>

            {/* Phone Input Section */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Mobile Number
              </label>
              <div
                className={`flex items-center border-2 rounded-xl px-5 py-4 transition-all duration-200 ${
                  otpSent
                    ? "bg-slate-50 border-slate-200"
                    : "border-slate-300 hover:border-[#004B5C] focus-within:border-[#004B5C] focus-within:ring-4 focus-within:ring-[#004B5C]/10 bg-white"
                }`}
              >
                <FaPhoneAlt className={`mr-4 text-lg ${otpSent ? "text-slate-400" : "text-[#004B5C]"}`} />
                <span className="text-slate-600 mr-2">+91</span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(normalized(e.target.value))}
                  className="w-full outline-none bg-transparent text-slate-900 placeholder-slate-400 text-lg font-medium"
                  disabled={otpSent}
                />
              </div>
              {!otpSent && phone && !/^\d{10}$/.test(phone) && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  Please enter a valid 10-digit number
                </p>
              )}
            </div>

            {/* Conditional Rendering */}
            {!otpSent ? (
              // SEND OTP Button
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                  /^\d{10}$/.test(phone)
                    ? "bg-[#004B5C] text-white hover:bg-[#003846] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                disabled={!/^\d{10}$/.test(phone) || loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            ) : (
              <>
                {/* OTP Inputs */}
                <div className="space-y-4">
                  <div className="flex justify-between gap-2 lg:gap-3">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[i]}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        ref={(el) => (otpRefs.current[i] = el)}
                        className="w-12 h-14 lg:w-14 lg:h-16 border-2 border-slate-300 rounded-xl text-center text-2xl font-bold outline-none focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 transition-all duration-200 bg-white hover:border-[#004B5C]"
                      />
                    ))}
                  </div>

                  {/* Timer Display */}
                  {timer > 0 && (
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-100 py-3 rounded-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Code expires in <span className="font-semibold text-[#004B5C]">{String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}</span>
                    </div>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                    /^\d{6}$/.test(otp.join(""))
                      ? "bg-[#004B5C] text-white hover:bg-[#003846] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                  disabled={!/^\d{6}$/.test(otp.join("")) || loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Verify & Continue
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Resend / Change Number */}
                <div className="flex flex-col items-center gap-3 pt-4">
                  <div className="text-sm text-slate-600">
                    Didn't receive the code?{" "}
                    {timer > 0 ? (
                      <span className="text-slate-400">Wait {timer}s to resend</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => !loading && sendCode()}
                        className="font-semibold text-[#004B5C] hover:text-[#003846] underline underline-offset-2"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp(Array(6).fill(""));
                      setTimer(OTP_VALIDITY_SECONDS);
                      setPhone("");
                      setOtpExpiry(null);
                    }}
                    className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
                  >
                    Use a different number
                  </button>
                </div>
              </>
            )}

            {/* Trust Badge */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-center gap-3 text-slate-500">
                <FaShieldAlt className="text-lg" />
                <span className="text-sm">Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
