const Appointment = require("../models/Appointment");

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const appointment = new Appointment({
      userId: req.user.id, // 🔥 auto from token
      doctorId,
      date
    });

    await appointment.save();

    res.json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ userId })
      .populate("doctorId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId")
      .populate("doctorId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Appointment.findByIdAndUpdate(id, { status });

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};