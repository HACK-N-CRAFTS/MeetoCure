import React, { useEffect, useState } from "react";

const banners = [
  {
    text: "Expert Healthcare at Your Fingertips",
    subtext: "Connect with top-rated specialists and get the care you deserve",
    bgGradient: "from-blue-500 to-indigo-600",
    image: "/assets/doctor1.png",
  },
  {
    text: "Quality Care, Anytime, Anywhere",
    subtext: "Book appointments with trusted doctors in just a few clicks",
    bgGradient: "from-purple-500 to-purple-700",
    image: "/assets/doctor2.png",
  },
  {
    text: "Your Health, Our Priority",
    subtext: "Experience personalized medical care from experienced professionals",
    bgGradient: "from-teal-500 to-emerald-600",
    image: "/assets/doctor3.png",
  },
  {
    text: "Modern Healthcare Solutions",
    subtext: "Advanced medical expertise combined with compassionate care",
    bgGradient: "from-rose-500 to-pink-600",
    image: "/assets/doctor4.png",
  },
];

const HeroBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden rounded-xl shadow-lg group">
      {/* Banners */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${banner.bgGradient} transition-all duration-700 transform ${
            index === currentIndex
              ? "opacity-100 translate-x-0 z-10 scale-100"
              : index < currentIndex
              ? "opacity-0 -translate-x-full z-0 scale-95"
              : "opacity-0 translate-x-full z-0 scale-95"
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          {/* Content Container */}
          <div className="relative h-full px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="flex-1 text-white mb-4 sm:mb-0 sm:pr-8 text-center sm:text-left z-20 max-w-lg">
              <div className="transform transition-all duration-700 delay-100">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight drop-shadow-md">
                  {banner.text}
                </h2>
                <p className="text-sm sm:text-base font-normal opacity-90 mb-4 drop-shadow-sm">
                  {banner.subtext}
                </p>
                <button className="bg-white text-gray-800 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-opacity-95 active:scale-95">
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="h-[120px] sm:h-[180px] flex justify-center sm:justify-end items-end z-20">
              <img
                src={banner.image}
                alt={`Doctor ${index + 1}`}
                className="h-full max-h-full object-contain select-none drop-shadow-xl"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-6 h-2 bg-white shadow-md"
                : "w-2 h-2 bg-white/50 hover:bg-white/80 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanners;
