// controllers/DoctorVerificationForm.js
const Doctor = require("../models/DoctorShema");
const DoctorVerification = require("../models/DoctorVerificationShema");
const jwt = require("jsonwebtoken");
const { cloudinary, uploadBufferToCloudinary: cloudinaryUpload } = require('../utils/cloudinary');
const HospitalLogin = require("../models/HospitalLogin");

// helper to upload a buffer to Cloudinary
const uploadBufferToCloudinary = async (buffer, folder, filename) => {
  try {
    // Check if cloudinary is properly configured
    if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
      console.error('Cloudinary configuration missing:', {
        cloud_name: !!cloudinary.config().cloud_name,
        api_key: !!cloudinary.config().api_key,
        api_secret: !!cloudinary.config().api_secret
      });
      throw new Error('Cloudinary configuration is incomplete');
    }

    return new Promise((resolve, reject) => {
      const uploadOptions = { 
        folder, 
        public_id: filename, 
        resource_type: 'image'
      };
           
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result.secure_url);
        }
      );
      
      stream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadBufferToCloudinary:', error);
    throw error;
  }
};

const verifyDoctor = async (req, res) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Process the form data
    const hospitalInfo = {
      hospitalName: req.body.hospital_hospitalName,
      hospitalAddress: req.body.hospital_hospitalAddress,
      contactNumber: req.body.hospital_contactNumber,
    };

    const bankingInfo = {
      bankName: req.body.bank_bankName,
      accountNumber: req.body.bank_accountNumber,
      ifscCode: req.body.bank_ifscCode,
      accountHolderName: req.body.bank_accountHolderName,
      bankBranch: req.body.bank_bankBranch,
    };

    // Create verification document
    // Parse qualifications if it's a string
    let qualifications = [];
    try {
      if (typeof req.body.qualifications === 'string') {
        const parsedQuals = JSON.parse(req.body.qualifications);
        // Ensure each qualification has the required structure
        qualifications = parsedQuals.map(qual => ({
          degree: String(qual.degree || ''),
          universityCollege: String(qual.universityCollege || ''),
          year: String(qual.year || '')
        }));
      } else if (Array.isArray(req.body.qualifications)) {
        qualifications = req.body.qualifications.map(qual => ({
          degree: String(qual.degree || ''),
          universityCollege: String(qual.universityCollege || ''),
          year: String(qual.year || '')
        }));
      }
    } catch (error) {
      console.error('Error parsing qualifications:', error);
      return res.status(400).json({ 
        message: 'Invalid qualifications format. Each qualification must have degree, universityCollege, and year fields.',
        details: error.message 
      });
    }

    const verificationData = {
      doctorId: doctorId,
      fullName: req.body.fullName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      medicalCouncilRegistrationNumber: req.body.medicalCouncilRegistrationNumber,
      medicalCouncilName: req.body.medicalCouncilName,
      yearOfRegistration: req.body.yearOfRegistration,
      primarySpecialization: req.body.primarySpecialization,
      additionalSpecializations: req.body.additionalSpecializations,
      category: req.body.category,
      consultationFee: Number(req.body.consultationFee),
      about: req.body.about,
      qualifications: qualifications,
      experienceYears: req.body.experienceYears,
      location: {
        city: req.body.location?.city,
        state: req.body.location?.state,
      },
      aadhaarNumber: req.body.aadhaarNumber,
      panNumber: req.body.panNumber,
      hospitalInfo: [hospitalInfo],
      bankingInfo: [bankingInfo],
    };

    // Handle file uploads if files are present
    if (req.files) {
      if (req.files.profileImage) {
        const profileImageUrl = await uploadBufferToCloudinary(
          req.files.profileImage[0].buffer,
          'doctor-profiles',
          `profile_${doctorId}`
        );
        verificationData.profileImage = profileImageUrl;
      }

      if (req.files.identityDocument) {
        const identityDocUrl = await uploadBufferToCloudinary(
          req.files.identityDocument[0].buffer,
          'doctor-documents',
          `identity_${doctorId}`
        );
        verificationData.identityDocument = identityDocUrl;
      }

      if (req.files.medicalCouncilCertificate) {
        const councilCertUrl = await uploadBufferToCloudinary(
          req.files.medicalCouncilCertificate[0].buffer,
          'doctor-certificates',
          `council_${doctorId}`
        );
        verificationData.medicalCouncilCertificate = councilCertUrl;
      }

      if (req.files.qualificationCertificates) {
        const qualificationUrls = await Promise.all(
          req.files.qualificationCertificates.map((file, index) =>
            uploadBufferToCloudinary(
              file.buffer,
              'doctor-qualifications',
              `qual_${doctorId}_${index}`
            )
          )
        );
        verificationData.qualificationCertificates = qualificationUrls;
      }
    }

    // Create the verification document
    const verification = await DoctorVerification.create(verificationData);

    // Update doctor with verification details
    console.log('Created verification:', verification);
    doctor.verificationDetails = verification._id;

    if (Object.keys(hospitalInfo).length > 0) {
      doctor.hospitalInfo = hospitalInfo;
    }
    if (Object.keys(bankingInfo).length > 0) {
      doctor.bankingInfo = bankingInfo;
    }
    
    doctor.registrationStatus = "under review by hospital";
    await doctor.save();

    // **REPLACE: const addHosDoct = await HospitalLogin.findOne({}) WITH THIS:**
    
    // Add doctor to hospital's docters array
    let hospitalRegistrationResult = { success: false, message: 'No hospital information provided' };
    
    try {
      // Get hospital identifier from various sources (based on your frontend)
      let hospitalIdentifier = null;
      
      // Priority order for hospital identification
      if (req.body.hospitalId) {
        hospitalIdentifier = req.body.hospitalId;
        console.log('🏥 Using hospitalId from request body:', hospitalIdentifier);
      } else if (req.body.hospital_hospitalName) {
        hospitalIdentifier = req.body.hospital_hospitalName;
        console.log('🏥 Using hospital_hospitalName:', hospitalIdentifier);
      } else if (hospitalInfo.hospitalName) {
        hospitalIdentifier = hospitalInfo.hospitalName;
        console.log('🏥 Using hospitalName from hospitalInfo:', hospitalIdentifier);
      } else if (req.body.hospital_name) {
        hospitalIdentifier = req.body.hospital_name;
        console.log('🏥 Using hospital_name:', hospitalIdentifier);
      }

      if (hospitalIdentifier) {
        let hospital = null;
        
        // Search by ObjectId if valid, otherwise search by name
        if (mongoose.Types.ObjectId.isValid(hospitalIdentifier)) {
          hospital = await HospitalLogin.findById(hospitalIdentifier);
          console.log('🔍 Searching hospital by ID');
        } else {
          // Case-insensitive search by hospital name
          hospital = await HospitalLogin.findOne({
            hospitalName: { $regex: new RegExp(`^${hospitalIdentifier}$`, 'i') }
          });
          console.log('🔍 Searching hospital by name (case-insensitive)');
        }

        if (hospital) {
          console.log(`✅ Hospital found: ${hospital.hospitalName} (ID: ${hospital._id})`);
          
          // Use MongoDB $addToSet to automatically prevent duplicates
          const updatedHospital = await HospitalLogin.findByIdAndUpdate(
            hospital._id,
            { 
              $addToSet: { 
                docters: doctor._id 
              } 
            },
            { 
              new: true,
              runValidators: true 
            }
          );

          if (updatedHospital) {
            console.log(`✅ Doctor ${doctor._id} successfully added to Hospital ${updatedHospital.hospitalName}`);
            console.log(`📊 Hospital now has ${updatedHospital.docters.length} doctors`);
            
            hospitalRegistrationResult = { 
              success: true, 
              message: 'Doctor successfully added to hospital',
              hospitalName: updatedHospital.hospitalName,
              hospitalId: updatedHospital._id,
              totalDoctors: updatedHospital.docters.length
            };
          } else {
            hospitalRegistrationResult = { 
              success: false, 
              message: 'Failed to update hospital document' 
            };
          }
        } else {
          console.log(`❌ Hospital not found with identifier: ${hospitalIdentifier}`);
          hospitalRegistrationResult = { 
            success: false, 
            message: `Hospital not found: ${hospitalIdentifier}` 
          };
        }
      } else {
        console.log('⚠️ No hospital identifier found in request data');
        hospitalRegistrationResult = { 
          success: false, 
          message: 'No hospital identifier provided. Please select a hospital.' 
        };
      }
    } catch (hospitalError) {
      console.error('❌ Error during hospital registration:', hospitalError);
      hospitalRegistrationResult = { 
        success: false, 
        message: 'Failed to add doctor to hospital', 
        error: hospitalError.message 
      };
    }

    console.log('🏥 Hospital registration result:', hospitalRegistrationResult);

    return res.json({
      success: true,
      message: "Verification submitted successfully. Awaiting approval.",
      doctor: {
        _id: doctor._id,
        email: doctor.email,
        registrationStatus: doctor.registrationStatus,
        verificationDetails: doctor.verificationDetails
      },
      hospitalRegistration: hospitalRegistrationResult // Include hospital registration status
    });
  } catch (err) {
    console.error("Doctor Verification Error:", err);
    res.status(500).json({ message: err.message || "Verification failed" });
  }
};

const getVerificationStatus = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const verification = await DoctorVerification.findOne({ doctorId: doctorId });
    
    return res.json({
      success: true,
      doctor: {
        _id: doctor._id,
        email: doctor.email,
        registrationStatus: doctor.registrationStatus,
        verificationDetails: doctor.verificationDetails
      },
      verification: verification || null
    });
  } catch (err) {
    console.error("Get Verification Status Error:", err);
    res.status(500).json({ message: err.message || "Failed to get verification status" });
  }
};

const deleteVerification = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const verification = await DoctorVerification.findOneAndDelete({ doctorId: doctorId });
    
    if (!verification) {
      return res.status(404).json({ message: "No verification found for this doctor" });
    }

    // Update doctor status
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      doctor.verificationDetails = undefined;
      doctor.registrationStatus = "under review by hospital";
      await doctor.save();
    }

    return res.json({
      success: true,
      message: "Verification deleted successfully"
    });
  } catch (err) {
    console.error("Delete Verification Error:", err);
    res.status(500).json({ message: err.message || "Failed to delete verification" });
  }
};

module.exports = { verifyDoctor, getVerificationStatus, deleteVerification };