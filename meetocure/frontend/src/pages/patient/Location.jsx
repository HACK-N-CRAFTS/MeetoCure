import React, { useCallback, useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCrosshairs, FaArrowLeft, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [location, setLocation] = useState("Vijayawada");
  const [coords, setCoords] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [source, setSource] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const GOOGLE_API_KEY = import.meta?.env?.VITE_GOOGLE_MAPS_API_KEY || null;

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedCity");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const getCityFromGoogle = async (lat, lng) => {
    if (!GOOGLE_API_KEY) return null;
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK" && data.results?.length > 0) {
        const comp = data.results[0].address_components || [];
        const city =
          comp.find((c) => c.types.includes("locality"))?.long_name ||
          comp.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
          comp.find((c) => c.types.includes("administrative_area_level_1"))?.long_name ||
          data.results[0].formatted_address;
        return { place: city, formatted: data.results[0].formatted_address, provider: "google" };
      }
    } catch (err) {
      console.warn("Google Geocoding failed:", err);
    }
    return null;
  };

  const getCityFromNominatim = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "User-Agent": "LocationApp/1.0" } }
      );
      const data = await res.json();
      if (data?.address) {
        const addr = data.address;
        const city = addr.city || addr.town || addr.village || addr.county || data.display_name;
        return { place: city, formatted: data.display_name, provider: "nominatim" };
      }
    } catch (err) {
      console.warn("Nominatim reverse geocode failed:", err);
    }
    return null;
  };

  const getCityFromBigDataCloud = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await res.json();
      const city = data.locality || data.city || data.principalSubdivision || data.countryName;
      return city ? { place: city, formatted: city, provider: "bigdatacloud" } : null;
    } catch (err) {
      console.warn("BigDataCloud reverse geocode failed:", err);
      return null;
    }
  };

  const reverseGeocode = async (lat, lng) => {
    const providers = GOOGLE_API_KEY 
      ? [getCityFromGoogle, getCityFromNominatim, getCityFromBigDataCloud]
      : [getCityFromNominatim, getCityFromBigDataCloud];

    for (const provider of providers) {
      try {
        const result = await provider(lat, lng);
        if (result?.place) return result;
      } catch (e) {
        console.warn("Reverse geocode error:", e);
      }
    }
    return null;
  };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Detecting location...", { duration: 30000 });

    const timeoutId = setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.error("Location detection timed out. Please try again.");
      setLoading(false);
    }, 30000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude, accuracy: acc } = position.coords;
        
        setCoords({ lat: latitude, lng: longitude });
        setAccuracy(acc);

        const result = await reverseGeocode(latitude, longitude);
        
        if (result) {
          setLocation(result.place);
          setSource(result.provider);
          localStorage.setItem("selectedCity", result.place);
          toast.success(`Location detected: ${result.place}`);
          setTimeout(() => navigate("/patient-dashboard"), 1000);
        } else {
          setSource("coordinates");
          toast.error("Could not determine city from location");
        }

        setLoading(false);
        toast.dismiss(loadingToast);
      },
      async (error) => {
        clearTimeout(timeoutId);
        console.warn("Geolocation error:", error);
        
        let errorMessage = "Failed to get location";
        let fallbackAttempted = false;

        switch (error.code) {
          case 1:
            errorMessage = "Location access denied. Trying IP detection...";
            fallbackAttempted = true;
            break;
          case 2:
            errorMessage = "Location unavailable";
            break;
          case 3:
            errorMessage = "Location request timed out";
            break;
        }

        if (fallbackAttempted) {
          try {
            const ipRes = await fetch("https://ipapi.co/json/");
            const data = await ipRes.json();
            const city = data.city || data.region || data.country_name;
            
            if (city) {
              setLocation(city);
              setSource("ip");
              localStorage.setItem("selectedCity", city);
              toast.success(`Location set to ${city} (via IP)`);
              setTimeout(() => navigate("/patient-dashboard"), 1000);
              setLoading(false);
              toast.dismiss(loadingToast);
              return;
            }
          } catch (e) {
            console.warn("IP fallback failed", e);
          }
        }

        toast.error(errorMessage);
        setLoading(false);
        toast.dismiss(loadingToast);
      },
      {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 300000,
      }
    );
  };

  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  const handleCitySearch = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
          )}&count=8&language=en`
        );
        const data = await res.json();
        
        if (data?.results) {
          const cities = data.results.map((city) => ({
            name: city.name,
            country: city.country,
            admin1: city.admin1,
            displayName: `${city.name}${city.admin1 ? `, ${city.admin1}` : ""}${
              city.country ? `, ${city.country}` : ""
            }`,
          }));
          setSearchResults(cities);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("City search failed:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300),
    []
  );

  const handleSelectCity = (city) => {
    const cityName = typeof city === "string" ? city : city.name;
    setLocation(cityName);
    localStorage.setItem("selectedCity", cityName);
    setSearch("");
    setSearchResults([]);
    setSelectedIndex(-1);
    toast.success(`Location set to ${cityName}`);
    setTimeout(() => navigate("/patient-dashboard"), 800);
  };

  const handleKeyDown = (e) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectCity(searchResults[selectedIndex]);
        } else if (searchResults.length > 0) {
          handleSelectCity(searchResults[0]);
        }
        break;
      case "Escape":
        setSearch("");
        setSearchResults([]);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Go back"
            disabled={loading}
          >
            <FaArrowLeft className="text-muted-foreground text-sm" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Location Selection</h1>
          <div className="w-10"></div>
        </div>

        {/* Current Location Display */}
        <div className="mb-6 p-4 border border-border bg-muted rounded-md">
          <div className="flex items-center gap-3 mb-2">
            <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />
            <span className="font-medium text-foreground">
              {loading ? "Detecting location..." : location}
            </span>
          </div>
          
          {(coords || source) && (
            <div className="text-xs text-muted-foreground pl-6">
              {coords && (
                <div className="font-mono">
                  {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                  {accuracy && ` • ${Math.round(accuracy)}m accuracy`}
                </div>
              )}
              {source && <div>Source: {source}</div>}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="location-search" className="block text-sm font-medium text-foreground mb-2">
            Search for a location
          </label>
          <div className="relative">
            <input
              id="location-search"
              type="text"
              placeholder="Enter city name..."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                setSelectedIndex(-1);
                handleCitySearch(value);
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
              disabled={loading}
              autoComplete="off"
            />
            
            {searchLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSpinner className="animate-spin text-primary text-sm" />
              </div>
            )}
          </div>
        </div>

        {/* GPS Location Button */}
        <button
          onClick={handleCurrentLocation}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors mb-6 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaCrosshairs />
          )}
          <span>{loading ? "Detecting..." : "Use Current Location"}</span>
        </button>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border border-border rounded-md overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {searchResults.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors ${
                    idx === selectedIndex
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground bg-background text-foreground"
                  }`}
                >
                  <FaMapMarkerAlt 
                    className={`flex-shrink-0 ${
                      idx === selectedIndex ? "text-primary-foreground" : "text-primary"
                    }`} 
                  />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    {city.admin1 && (
                      <div className={`text-sm ${
                        idx === selectedIndex ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {city.admin1}{city.country && `, ${city.country}`}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {search && searchResults.length === 0 && !searchLoading && (
          <div className="border border-border rounded-md p-8 text-center bg-muted">
            <FaMapMarkerAlt className="text-muted-foreground text-2xl mb-3 mx-auto" />
            <p className="text-foreground font-medium">No locations found</p>
            <p className="text-muted-foreground text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-secondary rounded-md border border-border">
          <p className="text-secondary-foreground text-sm">
            <strong>Tip:</strong> Use the search field above or click "Use Current Location" 
            to automatically detect your position.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Location;
