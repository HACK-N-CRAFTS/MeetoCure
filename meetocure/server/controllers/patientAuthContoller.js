const jwt = require("jsonwebtoken");
// const twilio = require("twilio"); // Commented out for dev mode
const Patient = require("../models/Patient");
const Otp = require("../models/Otp"); // Make sure you have this model
require("dotenv").config();

const { JWT_SECRET } = process.env;
// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const signToken = (patient) =>
  jwt.sign({ id: patient._id, role: "patient" }, JWT_SECRET, { expiresIn: "7d" });

// Format phone → Indian numbers
const normalizePhone = (p) => {
  const digits = (p || "").replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("+")) return digits;
  throw new Error("Invalid phone number");
};

// ========== GENERATE 6-DIGIT OTP ==========
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ========== SEND OTP (DEVELOPMENT MODE) ==========
exports.sendOtp = async (req, res) => {
  console.log("working sending");
  try {
    const phone = normalizePhone(req.body.phone);

    // Generate mock OTP
    const otpCode = generateOTP();
    
    // Save OTP to database with 5-minute expiry
    await Otp.findOneAndUpdate(
      { phone },
      { 
        phone, 
        otp: otpCode, 
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000) // 5 minutes
      },
      { upsert: true, new: true }
    );

    // ⭐ LOG OTP TO CONSOLE FOR DEVELOPMENT
    console.log("═══════════════════════════════════");
    console.log("📱 PATIENT - DEVELOPMENT MODE OTP");
    console.log("Phone:", phone);
    console.log("OTP Code:", otpCode);
    console.log("Expires:", new Date(Date.now() + 2 * 60 * 1000).toLocaleString());
    console.log("═══════════════════════════════════");

    res.json({ 
      success: true, 
      message: "OTP sent",
      // Remove this line in production:
      devOtp: otpCode // Only for development testing
    });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// ========== VERIFY OTP (DEVELOPMENT MODE) ==========
exports.verifyOtp = async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    const code = req.body.otp;

    if (!phone || !code) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone and OTP required" 
      });
    }

    // Find OTP from database
    const otpRecord = await Otp.findOne({ phone });

    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP not found. Please request a new one." 
      });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ phone });
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired. Please request a new one." 
      });
    }

    // Verify OTP
    if (otpRecord.otp !== code) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ phone });

    console.log("✅ Patient OTP Verified Successfully for:", phone);

    // Find or create patient
    let patient = await Patient.findOne({ phone });
    if (!patient) {
      patient = await Patient.create({ phone, notifications: [] });
      console.log("🆕 New patient created:", patient._id);
    }

    const token = signToken(patient);

    res.json({ success: true, token, patient });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};
