import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaEdit, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../lib/config";
import EnterpriseButton from "../../components/EnterpriseButton";
import EnterpriseInput from "../../components/EnterpriseInput";
import EnterpriseCard, { CardBody } from "../../components/EnterpriseCard";

const DoctorVerify = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const isRegistration = window.location.pathname.includes("register");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [isExistingDoctor, setIsExistingDoctor] = useState(false);

  // Form validation states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    otp: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    mobileNumber: false,
    otp: false,
  });

  // Fixed: removed duplicate showPassword declaration
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [registrationStatus, setRegistrationStatus] = useState("under review by hospital");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^\d{10}$/;
  const otpPattern = /^\d{6}$/;

  // Validation functions
  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!emailPattern.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile.trim()) return "Mobile number is required";
    if (!mobilePattern.test(mobile)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  const validateOtp = (otpValue) => {
    if (!otpValue.trim()) return "OTP is required";
    if (!otpPattern.test(otpValue)) return "Please enter a valid 6-digit OTP";
    return "";
  };

  // Validate single field
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "mobileNumber":
        return validateMobile(value);
      case "otp":
        return validateOtp(value);
      default:
        return "";
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      mobileNumber: validateMobile(formData.mobileNumber),
      otp: otpSent ? validateOtp(otp) : "",
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  // Real-time validation on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleOtpBlur = () => {
    setTouched(prev => ({ ...prev, otp: true }));
    setErrors(prev => ({ ...prev, otp: validateOtp(otp) }));
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("doctorInfo");
      const doctor = stored ? JSON.parse(stored) : null;
      const token = localStorage.getItem("doctorToken");
      if (token && doctor && doctor.registrationStatus) {
        if (doctor.registrationStatus === "verified") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/doctor-verify");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    if (!otpSent || !otpExpiry) return;
    setTimer(Math.max(0, Math.ceil((otpExpiry - Date.now()) / 1000)));

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const remain = Math.max(0, Math.ceil((otpExpiry - Date.now()) / 1000));
      setTimer(remain);
      if (remain <= 0) {
        clearInterval(timerRef.current);
        setOtpSent(false);
        setOtp("");
        setOtpExpiry(null);
        setIsEditMode(false);
        toast.error("OTP expired. Please resend.");
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [otpSent, otpExpiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing (if field was touched)
    if (touched[name] && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    
    // Clear error when user starts typing
    if (touched.otp && errors.otp) {
      setErrors(prev => ({ ...prev, otp: "" }));
    }
    
    setOtp(value);
  };

  // Edit details function
  const handleEditDetails = () => {
    setIsEditMode(true);
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setOtpExpiry(null);
    clearInterval(timerRef.current);
    toast.success("You can now edit your details");
  };

  const handleSendOtp = async () => {
    // Validate required fields
    const mobileError = validateMobile(formData.mobileNumber);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (mobileError || emailError || passwordError) {
      setErrors(prev => ({
        ...prev,
        mobileNumber: mobileError,
        email: emailError,
        password: passwordError
      }));
      setTouched(prev => ({
        ...prev,
        mobileNumber: true,
        email: true,
        password: true
      }));
      toast.error("Please fill in all required fields correctly");
      return;
    }

    const loadingToast = toast.loading("Sending OTP...");
    try {
      let phone = formData.mobileNumber.trim();
      if (/^\d{10}$/.test(phone)) {
        phone = "+91" + phone;
      }

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/doctor/send-otp`,
        { 
          phone,
          email: formData.email,
          isRegistration: window.location.pathname.includes("register") // true for registration, false for login
        }
      );

      toast.dismiss(loadingToast);

      if (res.data.success) {
        if (res.data.isExistingDoctor) {
          if (window.location.pathname.includes("register")) {
            // If trying to register but account exists
            toast.error("Account already exists. Please login instead.");
            navigate("/doctor/login");
            return;
          } else {
            // For login with existing account
            toast.success("OTP sent for login verification");
          }
        } else {
          if (window.location.pathname.includes("login")) {
            // If trying to login but no account exists
            toast.error("No account found. Please register first.");
            navigate("/doctor/register");
            return;
          } else {
            // For new registration
            toast.success("OTP sent for registration");
          }
        }

        // Set OTP expiry (5 minutes)
        const expiryTs = Date.now() + 5 * 60 * 1000;
        setOtpExpiry(expiryTs);
        setTimer(300);
        setOtpSent(true);
        setIsEditMode(false);
        setOtp("");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    // Validate OTP before verification
    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors(prev => ({ ...prev, otp: otpError }));
      setTouched(prev => ({ ...prev, otp: true }));
      return;
    }

    if (!otpExpiry || Date.now() > otpExpiry) {
      setOtpSent(false);
      setOtp("");
      setOtpExpiry(null);
      toast.error("OTP expired. Please request a new code.");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");
    try {
      let phone = formData.mobileNumber.trim();
      if (/^\d{10}$/.test(phone)) {
        phone = "+91" + phone;
      }

      console.log('Sending OTP verification request:', {
        phone,
        otp,
        email: formData.email
      });
      
      const verifyResponse = await axios.post(`${API_BASE_URL}/api/auth/doctor/verify-otp`, {
        phone,
        otp,
        email: formData.email
      });

      console.log('OTP verification response:', verifyResponse.data);

      if (verifyResponse.data.success) {
        setOtpVerified(true);
        clearInterval(timerRef.current);
        setOtpExpiry(null);
        setOtpSent(false);

        toast.dismiss(loadingToast);
        toast.success("OTP Verified!");

        // Check registration status for existing doctors
        if (verifyResponse.data.isExistingDoctor) {
          if (verifyResponse.data.registrationStatus !== "verified") {
            toast.info("Your registration is still under review.");
            navigate("/doctor/registration-status");
            return;
          }
        }

        // If all checks pass, proceed with authentication
        await performAuth();
      } else {
        toast.dismiss(loadingToast);
        toast.error(verifyResponse.data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
      console.error("OTP verification error:", error);
    }
  };

  const performAuth = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const loadingToast = toast.loading("Signing in...");
    try {
      // Add the phone number with +91 prefix for consistency
      let phone = formData.mobileNumber.trim();
      if (/^\d{10}$/.test(phone)) {
        phone = "+91" + phone;
      }

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/doctor/doctor-auth`,
        {
          ...formData,
          mobileNumber: phone
        }
      );

      const { data } = res;

      if (data.token && data.doctor.registrationStatus === "verified") {
        localStorage.setItem("doctorToken", data.token);
        localStorage.setItem("doctorInfo", JSON.stringify(data.doctor));
        toast.dismiss(loadingToast);
        toast.success("Login successful!");
        navigate("/doctor-dashboard");
      } else if (data.isNewlyRegistered) {
        const doctorInfo = {
          doctorId: data.doctorId,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          registrationStatus: data.registrationStatus
        };
        localStorage.setItem("doctorInfo", JSON.stringify(doctorInfo));
        localStorage.setItem("doctorId", data.doctorId);

        toast.dismiss(loadingToast);
        setShowPopup(true);
        toast.success("Registration submitted successfully! Redirecting to hospital verification...");
        setTimeout(() => {
          navigate("/hospital-form");
        }, 1000);
      } else if (data.registrationStatus === "under review by hospital") {
        toast.dismiss(loadingToast);
        setShowPopup(true);
        toast.success("Your registration is under review. Redirecting to verification status...");
        setTimeout(() => {
          navigate("/doctor-verify");
        }, 1000);
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      if (err.response?.data?.message?.includes('duplicate key error') || 
          err.response?.data?.message?.includes('E11000')) {
        toast.error("This mobile number is already registered. Please use a different number or login with your existing account.");
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      setTouched({
        email: true,
        password: true,
        mobileNumber: true,
        otp: otpSent,
      });
      toast.error("Please fix all validation errors");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }
    
    await performAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-[Poppins] px-4 sm:px-6 lg:px-8 pt-6 pb-28">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-slate-600 hover:text-[#004B5C] transition-all duration-200 mb-6"
      >
        <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-[#004B5C] group-hover:shadow-md transition-all duration-200">
          <FaArrowLeft className="text-lg" />
        </div>
        <span className="font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#004B5C] to-[#006B7D] rounded-3xl blur-2xl opacity-20"></div>
          <img src="/assets/logo.png" alt="Logo" className="w-32 h-32 relative rounded-2xl shadow-lg" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <FaShieldAlt className="text-[#004B5C] text-2xl" />
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#004B5C] to-[#006B7D] bg-clip-text text-transparent">
              Doctor Verification
            </h1>
          </div>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            Secure authentication with OTP verification for healthcare professionals
          </p>
        </div>
      </div>

      {/* Form Card */}
      <EnterpriseCard className="max-w-2xl mx-auto">
        <CardBody className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Email */}
            <EnterpriseInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              icon={<FaEnvelope />}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={otpSent && !isEditMode}
              error={touched.email ? errors.email : ""}
              helperText="We'll use this for important account notifications"
            />

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 6 characters"
                  className={`
                    w-full px-4 py-3 pl-12 pr-12
                    border-2 rounded-xl
                    ${touched.password && errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-300 focus:border-[#004B5C] focus:ring-[#004B5C]/10'
                    }
                    focus:ring-4
                    outline-none
                    bg-white
                    text-slate-900
                    placeholder-slate-400
                    text-base
                    transition-all
                    duration-200
                    disabled:bg-slate-50
                    disabled:text-slate-500
                  `}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={otpSent && !isEditMode}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#004B5C] transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <EnterpriseInput
              label="Mobile Number"
              type="tel"
              name="mobileNumber"
              placeholder="10-digit mobile number"
              icon={<FaPhoneAlt />}
              maxLength={10}
              value={formData.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={otpSent && !isEditMode}
              error={touched.mobileNumber ? errors.mobileNumber : ""}
              helperText="OTP will be sent to this number"
            />

            {/* Send OTP / Edit Button */}
            <div className="flex gap-3">
              {!otpSent || isEditMode ? (
                <EnterpriseButton
                  type="button"
                  onClick={handleSendOtp}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<FaPhoneAlt />}
                >
                  Send OTP
                </EnterpriseButton>
              ) : (
                <EnterpriseButton
                  type="button"
                  onClick={handleEditDetails}
                  variant="secondary"
                  size="md"
                  icon={<FaEdit />}
                >
                  Edit Details
                </EnterpriseButton>
              )}
            </div>

            {/* OTP Section */}
            {otpSent && !isEditMode && (
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200/50 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <h3 className="text-sm font-bold text-slate-700">OTP Verification</h3>
                </div>

                <EnterpriseInput
                  label="Enter OTP Code"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  onBlur={handleOtpBlur}
                  placeholder="Enter 6-digit code"
                  error={touched.otp ? errors.otp : ""}
                  containerClassName="mb-4"
                />

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <EnterpriseButton
                    type="button"
                    onClick={handleVerifyOtp}
                    variant="success"
                    size="md"
                  >
                    Verify OTP
                  </EnterpriseButton>

                  <div className="text-sm font-medium text-slate-600">
                    {timer > 0 ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200">
                        <span className="text-xs">Expires in</span>
                        <span className="text-[#004B5C] font-bold tabular-nums">
                          {String(Math.floor(timer / 60)).padStart(2, "0")}:
                          {String(timer % 60).padStart(2, "0")}
                        </span>
                      </div>
                    ) : (
                      <EnterpriseButton
                        type="button"
                        onClick={handleSendOtp}
                        variant="outline"
                        size="sm"
                      >
                        Resend OTP
                      </EnterpriseButton>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <EnterpriseButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue to Dashboard"}
              </EnterpriseButton>
            </div>
          </form>
        </CardBody>
      </EnterpriseCard>

      {/* Enhanced Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl px-8 py-10 max-w-md w-full text-center shadow-2xl transform animate-in fade-in zoom-in duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-30"></div>
              <img
                src="/assets/popups/success.png"
                alt="Success"
                className="w-32 h-32 object-contain mx-auto relative"
              />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Registration Submitted Successfully
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Your registration is under review. Our team will verify your credentials and notify you once approved.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">
                You'll receive an email notification within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorVerify;
