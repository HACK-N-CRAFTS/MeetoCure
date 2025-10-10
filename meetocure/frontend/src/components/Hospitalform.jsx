/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterpriseInput from './EnterpriseInput';
import EnterpriseButton from './EnterpriseButton';
import EnterpriseCard, { CardHeader, CardBody, CardFooter } from './EnterpriseCard';

const HospitalForm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isManualEntry, setIsManualEntry] = useState(false);

  const navigate = useNavigate();

  // Check if doctor already logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem('doctorInfo');
      const doctor = stored ? JSON.parse(stored) : null;
      const token = localStorage.getItem('doctorToken');

      if (token && doctor && doctor.registrationStatus) {
        if (doctor.registrationStatus === 'verified') {
          navigate('/doctor-dashboard');
        } else if (doctor.registrationStatus === "under review by hospital") {
          navigate('/doctor-verify');
        } else {
          navigate('/doctor-verify');
        }
      }
    } catch (err) {
      console.log('Error checking doctor status:', err);
    }
  }, [navigate]);

  // Fetch hospitals list on component mount
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api1/hospitals/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setHospitals(data.data);
        console.log(`Loaded ${data.data.length} hospitals`);
      } else {
        setError(data.message || 'Failed to fetch hospitals');
      }
    } catch (err) {
      console.error('Error fetching hospitals:', err);

      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        setError('Cannot connect to server. Please ensure the backend is running on localhost:5000');
      } else {
        setError('Failed to load hospitals: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle hospital selection from dropdown
  const handleHospitalSelect = async (hospitalId) => {
    setSelectedHospitalId(hospitalId);
    setError('');

    if (!hospitalId) {
      setHospitalName('');
      setHospitalAddress('');
      setContactNumber('');
      return;
    }

    const selectedHospital = hospitals.find(h => h._id === hospitalId);
    if (selectedHospital) {
      setHospitalName(selectedHospital.hospitalName);
      setHospitalAddress(selectedHospital.address);
      setContactNumber(selectedHospital.contact);

      console.log('🏥 Hospital selected:', {
        id: selectedHospital._id,
        name: selectedHospital.hospitalName,
        address: selectedHospital.address
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hospitalName.trim() || !hospitalAddress.trim() || !contactNumber.trim()) {
      setError('Please fill in all hospital details');
      return;
    }

    const hospitalData = {
      hospitalId: selectedHospitalId,
      hospitalName: hospitalName.trim(),
      hospitalAddress: hospitalAddress.trim(),
      contactNumber: contactNumber.trim(),
      isManualEntry: isManualEntry,
      hospital_hospitalName: hospitalName.trim(),
      hospital_address: hospitalAddress.trim(),
      hospital_contact: contactNumber.trim(),
      hospital_name: hospitalName.trim(),
      selectedAt: new Date().toISOString(),
      validated: true
    };

    try {
      localStorage.setItem('hospitalData', JSON.stringify(hospitalData));
      localStorage.setItem('selectedHospitalId', selectedHospitalId || '');
      localStorage.setItem('selectedHospitalName', hospitalName.trim());

      console.log('🏥 Hospital data stored for verification:', hospitalData);

      const stored = localStorage.getItem('hospitalData');
      if (!stored) {
        throw new Error('Failed to store hospital data');
      }

      navigate('/doctor-verification');

    } catch (storageError) {
      console.error('Error storing hospital data:', storageError);
      setError('Failed to save hospital selection. Please try again.');
    }
  };

  const toggleManualEntry = () => {
    setIsManualEntry(!isManualEntry);
    if (!isManualEntry) {
      setSelectedHospitalId('');
      setHospitalName('');
      setHospitalAddress('');
      setContactNumber('');
    }
    setError('');

    console.log('🔄 Manual entry mode:', !isManualEntry);
  };

  const isFormValid = () => {
    return hospitalName.trim() && hospitalAddress.trim() && contactNumber.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#004B5C] to-[#006B7D] rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Hospital Information</h1>
              <p className="text-slate-600 mt-1">Select or enter your affiliated hospital details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004B5C] to-[#006B7D] text-white flex items-center justify-center font-bold shadow-lg">
              1
            </div>
            <span className="text-sm font-semibold text-[#004B5C]">Hospital Info</span>
          </div>
          <div className="w-16 h-0.5 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-sm font-medium text-slate-500">Verification</span>
          </div>
          <div className="w-16 h-0.5 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-sm font-medium text-slate-500">Complete</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Error Alert */}
          {error && (
            <EnterpriseCard className="mb-6 border-red-200 bg-red-50/50" hoverable={false}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </CardBody>
            </EnterpriseCard>
          )}

          {/* Success Alert */}
          {hospitals.length > 0 && !error && (
            <EnterpriseCard className="mb-6 border-green-200 bg-green-50/50" hoverable={false}>
              <CardBody className="py-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-green-900">
                    {hospitals.length} hospitals loaded successfully
                  </span>
                </div>
              </CardBody>
            </EnterpriseCard>
          )}

          {/* Main Form Card */}
          <EnterpriseCard hoverable={false}>
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-900">Hospital Details</h2>
              <p className="text-sm text-slate-600 mt-1">Please provide accurate hospital information for verification</p>
            </CardHeader>

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Toggle Switch */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={toggleManualEntry}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isManualEntry ? 'bg-[#004B5C]' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${isManualEntry ? 'left-7' : 'left-1'}`}></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {isManualEntry ? 'Manual Entry Mode' : 'Select from List'}
                    </span>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-[#004B5C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown Selection */}
                {!isManualEntry && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#004B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Select Hospital
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {loading ? (
                      <div className="w-full border-2 border-slate-300 px-4 py-3 rounded-xl bg-slate-50 flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#004B5C] border-t-transparent"></div>
                        <span className="text-slate-600">Loading hospitals...</span>
                      </div>
                    ) : (
                      <div className="relative">
                        <select
                          value={selectedHospitalId}
                          onChange={(e) => handleHospitalSelect(e.target.value)}
                          required={!isManualEntry}
                          className="w-full px-4 py-3 pr-10 border-2 border-slate-300 rounded-xl bg-white focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none text-slate-900 transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">Choose a hospital...</option>
                          {hospitals.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital.hospitalName} - {hospital.address}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {hospitals.length === 0 && !loading && (
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        No hospitals available.
                        <button
                          type="button"
                          onClick={fetchHospitals}
                          className="text-[#004B5C] hover:underline font-medium transition-colors duration-200"
                        >
                          Retry
                        </button>
                      </p>
                    )}
                  </div>
                )}

                {/* Hospital Name Input */}
                <EnterpriseInput
                  label={
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#004B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Hospital Name
                      <span className="text-red-500">*</span>
                    </span>
                  }
                  type="text"
                  name="hospitalName"
                  placeholder="e.g., City General Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                  readOnly={!isManualEntry && selectedHospitalId}
                  disabled={!isManualEntry && selectedHospitalId}
                  helperText={!isManualEntry && selectedHospitalId ? "Auto-filled from selection" : "Enter the official hospital name"}
                />

                {/* Hospital Address Input */}
                <EnterpriseInput
                  label={
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#004B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Full Hospital Address
                      <span className="text-red-500">*</span>
                    </span>
                  }
                  type="text"
                  name="hospitalAddress"
                  placeholder="Enter the complete address including city and state"
                  value={hospitalAddress}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                  required
                  readOnly={!isManualEntry && selectedHospitalId}
                  disabled={!isManualEntry && selectedHospitalId}
                  helperText={!isManualEntry && selectedHospitalId ? "Auto-filled from selection" : "Provide the complete physical address"}
                />

                {/* Contact Number Input */}
                <EnterpriseInput
                  label={
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#004B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contact Number
                      <span className="text-red-500">*</span>
                    </span>
                  }
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter hospital phone number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                  readOnly={!isManualEntry && selectedHospitalId}
                  disabled={!isManualEntry && selectedHospitalId}
                  helperText={!isManualEntry && selectedHospitalId ? "Auto-filled from selection" : "Landline or mobile number"}
                />

                {/* Manual Entry Notice */}
                {isManualEntry && isFormValid() && (
                  <EnterpriseCard className="border-blue-200 bg-blue-50/50" hoverable={false}>
                    <CardBody className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-900">Manual Entry Mode</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            You're entering hospital details manually. Please ensure all information is accurate for verification purposes.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </EnterpriseCard>
                )}
              </form>
            </CardBody>

            <CardFooter className="flex justify-between items-center">
              <button
                type="button"
                onClick={fetchHospitals}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-[#004B5C] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh ({hospitals.length})
              </button>

              <EnterpriseButton
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={loading || !isFormValid()}
                loading={loading}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Continue to Verification
              </EnterpriseButton>
            </CardFooter>
          </EnterpriseCard>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200/50">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Your information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalForm;
