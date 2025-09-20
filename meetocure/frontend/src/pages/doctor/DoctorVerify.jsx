import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../lib/config";

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
    <div className="min-h-screen bg-white font-[Poppins] px-6 pt-6 pb-28">
      <button onClick={() => navigate(-1)} className="text-xl mb-4">
        <FaArrowLeft />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <img src="/assets/logo.png" alt="Logo" className="w-28 h-28 mb-4" />
        <h1 className="text-3xl font-extrabold text-[#004B5C]">
          Doctor Verification
        </h1>
        <p className="text-base text-gray-700 mt-1">
          Enter details to Register/Login with OTP
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-6"
        autoComplete="off"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <div className={`flex items-center border rounded-xl px-3 py-2 ${
            touched.email && errors.email ? 'border-red-500' : 'border-[#7A869A]'
          }`}>
            <FaEnvelope className="text-[#7A869A] mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={otpSent && !isEditMode}
            />
          </div>
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password with Show/Hide functionality */}
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <div className={`flex items-center border rounded-xl px-3 py-2 ${
            touched.password && errors.password ? 'border-red-500' : 'border-[#7A869A]'
          }`}>
            <FaLock className="text-[#7A869A] mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password (min 6 chars)"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={otpSent && !isEditMode}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#7A869A] ml-2 hover:text-[#004B5C] transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Mobile + OTP */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Mobile Number
          </label>
          <div className={`flex items-center border rounded-xl px-3 py-2 ${
            touched.mobileNumber && errors.mobileNumber ? 'border-red-500' : 'border-[#7A869A]'
          }`}>
            <FaPhoneAlt className="text-[#7A869A] mr-2" />
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter 10-digit Mobile Number"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              maxLength={10}
              value={formData.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={otpSent && !isEditMode}
            />
          </div>
          {touched.mobileNumber && errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}

          {/* Send OTP Button or Edit Details Button */}
          {!otpSent || isEditMode ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-2 px-4 py-2 bg-[#004B5C] text-white rounded-full font-medium hover:bg-[#003246] transition"
            >
              Send OTP
            </button>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleEditDetails}
                className="px-4 py-2 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FaEdit className="text-sm" />
                Edit Details
              </button>
            </div>
          )}

          {/* OTP Section */}
          {otpSent && !isEditMode && (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                onBlur={handleOtpBlur}
                className={`w-full border px-4 py-2 rounded-xl outline-none placeholder-gray-500 ${
                  touched.otp && errors.otp ? 'border-red-500' : 'border-[#7A869A]'
                }`}
                placeholder="6-digit OTP"
              />
              {touched.otp && errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}

              <div className="flex items-center justify-between mt-2">
                <button 
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>

                <div className="text-sm text-gray-600">
                  {timer > 0 ? (
                    <span>
                      Expires in{" "}
                      {String(Math.floor(timer / 60)).padStart(2, "0")}:
                      {String(timer % 60).padStart(2, "0")}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-sm text-[#004B5C] underline hover:text-[#003246]"
                    >
                      Resend
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full font-semibold bg-[#004B5C] text-white hover:bg-[#003246] transition disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </button>
        </div>
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] px-10 py-8 max-w-sm w-full text-center shadow-2xl">
            <img
              src="/assets/popups/success.png"
              alt="Success"
              className="w-28 h-28 object-contain mx-auto mb-6"
            />
            <h3 className="text-[22px] font-bold text-[#1F2A37] mb-2">
              Registration Submitted
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your registration is pending verification. Please wait for
              approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorVerify;
