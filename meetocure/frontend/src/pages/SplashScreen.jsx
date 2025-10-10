import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaUserMd, FaHeart, FaClock, FaArrowRight } from "react-icons/fa";

const splashFeatures = [
  {
    icon: <FaUserMd className="w-16 h-16" />,
    title: "Connect with Experts",
    description: "Access certified healthcare professionals anytime, anywhere",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaHeart className="w-16 h-16" />,
    title: "Personalized Care",
    description: "Get tailored health recommendations based on your needs",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaClock className="w-16 h-16" />,
    title: "24/7 Availability",
    description: "Book appointments and get support round the clock",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: <FaShieldAlt className="w-16 h-16" />,
    title: "Secure & Private",
    description: "Your health data protected with enterprise-grade security",
    gradient: "from-green-500 to-teal-500"
  }
];

const SplashScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === splashFeatures.length - 1 ? prev : prev + 1
        );
        setFadeIn(true);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentIndex === splashFeatures.length - 1) {
      const redirect = setTimeout(() => {
        navigate("/choose-role");
      }, 3000);
      return () => clearTimeout(redirect);
    }
  }, [currentIndex, navigate]);

  const handleSkip = () => {
    navigate("/choose-role");
  };

  const currentFeature = splashFeatures[currentIndex];

  return (
    <div className="min-h-screen flex font-['Inter','system-ui','sans-serif'] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>

      {/* Skip Button - Enhanced */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-[#004B5C] text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200"
      >
        Skip
        <FaArrowRight className="w-4 h-4" />
      </button>

      {/* Left Panel: Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-[#004B5C] via-[#006B7D] to-[#008B9E] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-white/20">
              <img src="/assets/logo.png" alt="Meetocure Logo" className="w-12 h-12 brightness-0 invert" />
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight">Meetocure</span>
              <p className="text-white/70 text-sm">Healthcare Reimagined</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-lg">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to the Future of Healthcare
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Experience seamless healthcare management with cutting-edge technology and compassionate care.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-white/70 text-sm">Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">50K+</div>
            <div className="text-white/70 text-sm">Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">4.9</div>
            <div className="text-white/70 text-sm">Rating</div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-white/50 text-sm">
          © 2024 Meetocure. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Feature Showcase */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative z-10">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Meetocure" className="w-10 h-10" />
            <span className="text-xl font-bold text-[#004B5C]">Meetocure</span>
          </div>
        </div>

        {/* Feature Content */}
        <div className={`max-w-md w-full text-center space-y-8 transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Icon */}
          <div className="relative inline-block">
            <div className={`w-32 h-32 bg-gradient-to-br ${currentFeature.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl transform transition-all duration-500 hover:scale-110`}>
              {currentFeature.icon}
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${currentFeature.gradient} rounded-3xl blur-2xl opacity-30 animate-pulse`}></div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            {currentFeature.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed">
            {currentFeature.description}
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 pt-8">
            {splashFeatures.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'w-12 bg-[#004B5C]'
                    : index < currentIndex
                    ? 'w-2 bg-[#004B5C]/40'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Get Started Button (appears on last slide) */}
          {currentIndex === splashFeatures.length - 1 && (
            <button
              onClick={handleSkip}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-[#004B5C] to-[#006B7D] hover:from-[#006B7D] hover:to-[#008B9E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Get Started
              <FaArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
