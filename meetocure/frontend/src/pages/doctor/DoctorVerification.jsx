import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { specializations } from "../../utils/category";
import EnterpriseButton from "../../components/EnterpriseButton";
import EnterpriseInput, { EnterpriseTextarea } from "../../components/EnterpriseInput";
import EnterpriseCard, { CardBody, CardHeader } from "../../components/EnterpriseCard";
import { FaUser, FaIdCard, FaCertificate, FaHospital, FaImage, FaPlus, FaTrash, FaShieldAlt } from "react-icons/fa";

export const DoctorVerification = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [hospitalData, setHospitalData] = useState(null);

  // Check for hospital data (single check)
  useEffect(() => {
    // If already logged in, redirect appropriately
    try {
      const stored = localStorage.getItem('doctorInfo');
      const doctor = stored ? JSON.parse(stored) : null;
      const token = localStorage.getItem('doctorToken');
      if (token && doctor && doctor.registrationStatus) {
        if (doctor.registrationStatus === 'verified') {
          navigate('/doctor-dashboard');
          return;
        } else {
          navigate('/doctor-verify');
          return;
        }
      }
    } catch (err) {
      console.log(err)
    }

    const storedHospitalData = localStorage.getItem("hospitalData");
    if (!storedHospitalData) {
      toast.error("Please fill hospital information first");
      navigate("/hospital-form");
      return;
    }
    setHospitalData(JSON.parse(storedHospitalData));
  }, [navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    medicalCouncilRegistrationNumber: "", // Required, unique
    medicalCouncilName: "",
    yearOfRegistration: "",
    primarySpecialization: "",
    additionalSpecializations: "",
    category: "General",
    qualifications: [{ degree: "", universityCollege: "", year: "" }],
    experienceYears: "",
    location: {
      city: "",
      state: ""
    },
    aadhaarNumber: "", // Unique with validation
    panNumber: "", // Unique with validation
    // these will be filled by backend after file upload
    identityDocument: "",
    medicalCouncilCertificate: "",
    qualificationCertificates: [],
    profileImage: "",
    consultationFee: "",
    about: "",
    languages: []
  });

  // Local file state (images only)
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [identityDocumentFile, setIdentityDocumentFile] = useState(null); // Aadhaar image
  const [medicalCouncilCertificateFile, setMedicalCouncilCertificateFile] =
    useState(null);
  const [qualificationCertificateFiles, setQualificationCertificateFiles] =
    useState([]);

  // Removed duplicate hospital data check to avoid repeated toasts/navigation

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special validation for Aadhaar and PAN
    if (name === 'aadhaarNumber') {
      // Allow only numbers and limit to 12 digits
      const cleanedValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      return;
    }
    
    if (name === 'panNumber') {
      // Convert to uppercase and limit to 10 characters
      const cleanedValue = value.toUpperCase().slice(0, 10);
      // Only allow letters and numbers
      if (/^[A-Z0-9]*$/.test(cleanedValue)) {
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setter, multiple = false) => {
    if (multiple) {
      const files = Array.from(e.target.files);
      setQualificationCertificateFiles(files);
    } else {
      const file = e.target.files[0];
      setter(file);
    }
  };

  // qualifications handlers unchanged...
  const handleQualificationChange = (index, field, value) => {
    setFormData((prev) => {
      const quals = [...prev.qualifications];
      quals[index] = { ...quals[index], [field]: value };
      return { ...prev, qualifications: quals };
    });
  };
  const addQualification = () =>
    setFormData((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { degree: "", universityCollege: "", year: "" },
      ],
    }));
  const removeQualification = (index) =>
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));

  // handle location changes
  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  // Submit and proceed to banking information
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side checks for required fields
    if (!formData.location.city || !formData.location.state) {
      return toast.error("Both city and state are required in location details");
    }
    
    // Client-side checks for required files
    if (!profileImageFile) return toast.error("Profile image is required");
    if (!identityDocumentFile) return toast.error("Aadhaar image is required");
    if (!medicalCouncilCertificateFile)
      return toast.error("Medical council certificate image is required");
    if (qualificationCertificateFiles.length === 0)
      return toast.error(
        "At least one qualification certificate image is required"
      );
    
    // Check if consultation fee is provided
    if (!formData.consultationFee) {
      return toast.error("Consultation fee is required");
    }

    // Check if about section is filled
    if (!formData.about || formData.about.trim() === '') {
      return toast.error("Please provide information in the About section");
    }
    
    // Validate Aadhaar number format if provided
    if (formData.aadhaarNumber && formData.aadhaarNumber.trim() !== '') {
      const aadhaarRegex = /^\d{12}$/;
      if (!aadhaarRegex.test(formData.aadhaarNumber.trim())) {
        return toast.error("Invalid Aadhaar number format. Should be exactly 12 digits");
      }
    }

    // Validate PAN number format only if provided (optional field)
    if (formData.panNumber && formData.panNumber.trim() !== '') {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      if (!panRegex.test(formData.panNumber.trim())) {
        toast.error("If providing PAN, format should be ABCDE1234F. You can also leave it empty.");
        return;
      }
    }

    // Remove empty PAN and Aadhaar numbers before submission
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.panNumber || dataToSubmit.panNumber.trim() === '') {
      delete dataToSubmit.panNumber;
    }
    if (!dataToSubmit.aadhaarNumber || dataToSubmit.aadhaarNumber.trim() === '') {
      delete dataToSubmit.aadhaarNumber;
    }

    // Convert consultation fee to number
    dataToSubmit.consultationFee = Number(formData.consultationFee);

    // Save doctor data and files to localStorage
    const doctorData = {
      ...dataToSubmit,
      files: {
        profileImage: profileImageFile,
        identityDocument: identityDocumentFile,
        medicalCouncilCertificate: medicalCouncilCertificateFile,
        qualificationCertificates: qualificationCertificateFiles,
      },
    };

    localStorage.setItem("doctorData", JSON.stringify(doctorData));

    // Navigate to banking information page with files in state
    navigate("/banking-information", {
      state: {
        files: {
          profileImage: profileImageFile,
          identityDocument: identityDocumentFile,
          medicalCouncilCertificate: medicalCouncilCertificateFile,
          qualificationCertificates: qualificationCertificateFiles,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-[Poppins] px-4 sm:px-6 lg:px-8 pt-8 pb-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#004B5C] to-[#006B7D] rounded-2xl shadow-lg">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#004B5C] to-[#006B7D] bg-clip-text text-transparent">
              Professional Verification
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Complete your professional profile to provide quality healthcare services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <FaUser className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                  <p className="text-sm text-slate-500">Your basic details</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <EnterpriseInput
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Dr. Your Full Name"
                icon={<FaUser />}
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <EnterpriseInput
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardBody>
          </EnterpriseCard>

          {/* Medical Council Details */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                  <FaIdCard className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Medical Council Registration</h2>
                  <p className="text-sm text-slate-500">Professional credentials</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <EnterpriseInput
                label="Medical Council Registration Number"
                type="text"
                name="medicalCouncilRegistrationNumber"
                placeholder="Enter registration number"
                icon={<FaIdCard />}
                value={formData.medicalCouncilRegistrationNumber}
                onChange={handleChange}
                required
                helperText="Your unique medical council registration number"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <EnterpriseInput
                  label="Medical Council Name"
                  type="text"
                  name="medicalCouncilName"
                  placeholder="e.g., Andhra Pradesh Medical Council"
                  value={formData.medicalCouncilName}
                  onChange={handleChange}
                  required
                />

                <EnterpriseInput
                  label="Year of Registration"
                  type="number"
                  name="yearOfRegistration"
                  placeholder="e.g., 2015"
                  value={formData.yearOfRegistration}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardBody>
          </EnterpriseCard>

          {/* Specialization & Experience */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <FaCertificate className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Specialization & Experience</h2>
                  <p className="text-sm text-slate-500">Your medical expertise</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200"
                >
                  <option value="">Select Category</option>
                  {specializations?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <EnterpriseInput
                label="Primary Specialization"
                type="text"
                name="primarySpecialization"
                placeholder="e.g., General Physician"
                value={formData.primarySpecialization}
                onChange={handleChange}
                required
              />

              <EnterpriseInput
                label="Additional Specializations"
                type="text"
                name="additionalSpecializations"
                placeholder="e.g., Diabetes, Hypertension (comma separated)"
                value={formData.additionalSpecializations}
                onChange={handleChange}
                helperText="Add multiple specializations separated by commas"
              />

              <EnterpriseInput
                label="Years of Experience"
                type="number"
                name="experienceYears"
                placeholder="e.g., 10"
                value={formData.experienceYears}
                onChange={handleChange}
                required
                helperText="Total years of medical practice"
              />
            </CardBody>
          </EnterpriseCard>

          {/* Qualifications */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                    <FaCertificate className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Qualifications</h2>
                    <p className="text-sm text-slate-500">Your educational background</p>
                  </div>
                </div>
                <EnterpriseButton
                  type="button"
                  onClick={addQualification}
                  variant="secondary"
                  size="sm"
                  icon={<FaPlus />}
                >
                  Add More
                </EnterpriseButton>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {formData.qualifications.map((q, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border-2 border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-700">Qualification {idx + 1}</h3>
                    {formData.qualifications.length > 1 && (
                      <EnterpriseButton
                        type="button"
                        onClick={() => removeQualification(idx)}
                        variant="danger"
                        size="sm"
                        icon={<FaTrash />}
                      >
                        Remove
                      </EnterpriseButton>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <EnterpriseInput
                      label="Degree"
                      type="text"
                      placeholder="e.g., MBBS"
                      value={q.degree}
                      onChange={(e) => handleQualificationChange(idx, "degree", e.target.value)}
                      required
                    />
                    <EnterpriseInput
                      label="University / College"
                      type="text"
                      placeholder="e.g., AIIMS Delhi"
                      value={q.universityCollege}
                      onChange={(e) => handleQualificationChange(idx, "universityCollege", e.target.value)}
                    />
                    <EnterpriseInput
                      label="Year"
                      type="text"
                      placeholder="e.g., 2010"
                      value={q.year}
                      onChange={(e) => handleQualificationChange(idx, "year", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </EnterpriseCard>

          {/* Identity & Documents */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <FaIdCard className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Identity & Tax Information</h2>
                  <p className="text-sm text-slate-500">Verification documents (optional)</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <EnterpriseInput
                  label="Aadhaar Number (Optional)"
                  type="text"
                  name="aadhaarNumber"
                  placeholder="12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  helperText="Used for identity verification"
                />
                <EnterpriseInput
                  label="PAN Number (Optional)"
                  type="text"
                  name="panNumber"
                  placeholder="e.g., ABCDE1234F"
                  value={formData.panNumber}
                  onChange={handleChange}
                  helperText="Required for tax compliance"
                />
              </div>
            </CardBody>
          </EnterpriseCard>

          {/* Upload Documents */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                  <FaImage className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Upload Documents</h2>
                  <p className="text-sm text-slate-500">Required certificates and images</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Profile Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setProfileImageFile)}
                  required
                  className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#004B5C] file:text-white file:cursor-pointer"
                />
                <p className="text-sm text-slate-500">Professional headshot (JPG, PNG, GIF)</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Aadhaar Card Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setIdentityDocumentFile)}
                  required
                  className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#004B5C] file:text-white file:cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Medical Council Certificate *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setMedicalCouncilCertificateFile)}
                  required
                  className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#004B5C] file:text-white file:cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Qualification Certificates * (Multiple)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, null, true)}
                  required
                  className="w-full px-4 py-3 border-2 rounded-xl border-slate-300 focus:border-[#004B5C] focus:ring-4 focus:ring-[#004B5C]/10 outline-none bg-white text-slate-900 text-base transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#004B5C] file:text-white file:cursor-pointer"
                />
                <p className="text-sm text-slate-500">Upload all degree certificates</p>
              </div>
            </CardBody>
          </EnterpriseCard>

          {/* Practice Information */}
          <EnterpriseCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <FaHospital className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Practice Information</h2>
                  <p className="text-sm text-slate-500">Location and consultation details</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <EnterpriseInput
                  label="City"
                  type="text"
                  placeholder="e.g., Hyderabad"
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  required
                />
                <EnterpriseInput
                  label="State"
                  type="text"
                  placeholder="e.g., Telangana"
                  value={formData.location.state}
                  onChange={(e) => handleLocationChange('state', e.target.value)}
                  required
                />
              </div>

              <EnterpriseInput
                label="Consultation Fee (₹)"
                type="number"
                name="consultationFee"
                placeholder="e.g., 500"
                value={formData.consultationFee}
                onChange={handleChange}
                required
                min="0"
                helperText="Your standard consultation fee"
              />

              <EnterpriseTextarea
                label="About Your Practice"
                name="about"
                placeholder="Describe your medical practice, expertise, and approach to patient care..."
                value={formData.about}
                onChange={handleChange}
                rows={5}
                helperText="Share your professional background and patient care philosophy"
              />
            </CardBody>
          </EnterpriseCard>

          {/* Submit Button */}
          <div className="pt-4">
            <EnterpriseButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<FaShieldAlt />}
            >
              Submit for Professional Verification
            </EnterpriseButton>
          </div>
        </form>
      </div>
    </div>
  );
};
