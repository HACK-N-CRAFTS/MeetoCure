const Availability = require("../models/Availability");
const Slot = require("../models/Slot");
const Appointment = require("../models/Appointment"); // <--- new import

const setAvailability = async (req, res) => {
  try {
    const doctorId = req.user.doctorId;
    const { days } = req.body;
    const today = new Date().toISOString().slice(0, 10);
    if (days.some(day => day.date < today)) {
      return res.status(400).json({ message: "Cannot add slots for past dates" });
    }

    // Fetch or create availability
    let availability = await Availability.findOne({ doctor: doctorId });

    if (!availability) {
      availability = await Availability.create({ doctor: doctorId, days });
    } else {
      // Merge or overwrite dates
      days.forEach((newDay) => {
        const existingDay = availability.days.find((d) => d.date === newDay.date);
        if (existingDay) {
          existingDay.slots = newDay.slots;
        } else {
          availability.days.push(newDay);
        }
      });
      await availability.save();
    }

    // 🧹 Clean old slots for this doctor
    await Slot.deleteMany({ doctor: doctorId });

    // 🧱 Build new slot documents
    const slotDocsMap = new Map();

availability.days.forEach(day => {
  if (!slotDocsMap.has(day.date)) {
    slotDocsMap.set(day.date, {
      doctor: doctorId,
      date: day.date,
      availableSlots: [...day.slots]
    });
  } else {
    // If date already added, merge the slots (optional safeguard)
    const existing = slotDocsMap.get(day.date);
    existing.availableSlots.push(...day.slots);
    slotDocsMap.set(day.date, existing);
  }
});

// Convert map to array
const slotDocs = Array.from(slotDocsMap.values());
await Slot.insertMany(slotDocs);

    res.status(200).json({ message: "Availability set and slots synced", availability });
  } catch (err) {
    console.error("Error in setAvailability:", err);
    res.status(500).json({ message: err.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    console.log("Searching availability for doctorId:", doctorId);

    const availability = await Availability.findOne({ doctor: doctorId });
    console.log("Found availability:", availability);

    if (!availability) {
      return res.status(404).json({ message: "No availability set yet" });
    }

    // helper: normalize time strings to "HH:MM" 24-hour for reliable comparison
    const normalizeTime = (s) => {
      if (!s && s !== "") return "";
      const str = String(s).trim();
      // AM/PM
      const ampm = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (ampm) {
        let h = Number(ampm[1]);
        const m = String(ampm[2]).padStart(2, "0");
        const ap = ampm[3].toUpperCase();
        if (ap === "PM" && h < 12) h += 12;
        if (ap === "AM" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${m}`;
      }
      // 24h HH:MM
      const h24 = str.match(/^(\d{1,2}):(\d{2})$/);
      if (h24) {
        return `${String(Number(h24[1])).padStart(2, "0")}:${String(h24[2])}`;
      }
      // fallback: try Date parse and extract time
      const d = new Date(`1970-01-01T${str}`);
      if (!isNaN(d.getTime())) {
        return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      }
      return str;
    };

    // Build filtered days array where each day's slots exclude any slot that is currently booked
    const filteredDays = [];

    // We'll fetch appointments per day (one query per day) and build a set of unavailable times.
    for (const day of availability.days) {
      const dateStr = day.date; // expected yyyy-mm-dd
      // create day range
      const dayStart = new Date(dateStr);
      dayStart.setHours(0,0,0,0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      // Fetch appointments for this doctor and date that should make slots unavailable:
      // - ANY appointment whose status is NOT "patient-cancelled" => considered occupying the slot
      const appointments = await Appointment.find({
        doctor: doctorId,
        appointment_date: { $gte: dayStart, $lt: dayEnd },
        // Exclude patient-cancelled so those slots become available again
        status: { $ne: "patient-cancelled" }
      }).select("appointment_time status");

      // Build set of normalized booked times
      const bookedSet = new Set(appointments.map(a => normalizeTime(a.appointment_time)));

      // Filter original slots: keep only those not present in bookedSet
      const originalSlots = Array.isArray(day.slots) ? day.slots : [];
      const visibleSlots = originalSlots.filter(slot => {
        const norm = normalizeTime(slot);
        // If normalized bookedSet contains it => hide (booked or doctor-cancelled appointment)
        return !bookedSet.has(norm);
      });

      // If there are visible slots, include the day with filtered slots; otherwise include empty slots array.
      filteredDays.push({
        ...day.toObject ? day.toObject() : day,
        slots: visibleSlots
      });
    }

    // Return same shape as before but with days replaced by filteredDays
    const availabilityObj = availability.toObject ? availability.toObject() : { ...availability };
    availabilityObj.days = filteredDays;

    res.status(200).json(availabilityObj);
  } catch (err) {
    console.error("Error in getAvailability:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteAvailabilityDate = async (req, res) => {
  const doctorId = req.user.doctorId;
  const { date } = req.params;

  const availability = await Availability.findOne({ doctor: doctorId });
  if (!availability) return res.status(404).json({ message: "No availability found" });

  availability.days = availability.days.filter((d) => d.date !== date);
  await availability.save();

  // Also delete slots for that date
  await Slot.deleteMany({ doctor: doctorId, date });

  res.json({ message: "Deleted", availability });
};

// New: update slots for a specific date (create if missing)
const updateAvailabilityDate = async (req, res) => {
  try {
    const doctorId = req.user?.doctorId;
    const { date } = req.params;
    const { slots } = req.body;

    if (!date || !Array.isArray(slots)) {
      return res.status(400).json({ message: "Invalid payload. Provide date param and slots array." });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (date < today) {
      return res.status(400).json({ message: "Cannot update slots for past dates" });
    }

    let availability = await Availability.findOne({ doctor: doctorId });
    if (!availability) {
      // create new availability doc with this single day
      availability = await Availability.create({
        doctor: doctorId,
        days: [{ date, slots }],
      });
    } else {
      const existingDay = availability.days.find((d) => d.date === date);
      if (existingDay) {
        existingDay.slots = slots;
      } else {
        availability.days.push({ date, slots });
      }
      await availability.save();
    }

    // Sync Slot collection for this date: remove old, insert new
    await Slot.deleteMany({ doctor: doctorId, date });
    if (slots.length > 0) {
      await Slot.create({
        doctor: doctorId,
        date,
        availableSlots: slots,
      });
    }

    return res.status(200).json({ message: "Availability updated", availability });
  } catch (err) {
    console.error("Error in updateAvailabilityDate:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  setAvailability,
  getAvailability,
  deleteAvailabilityDate,
  updateAvailabilityDate,
};
