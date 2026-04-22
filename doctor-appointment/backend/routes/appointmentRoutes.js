const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getUserAppointments,
  getAllAppointments,
  updateStatus
} = require("../controllers/appointmentController");

const auth = require("../middleware/authMiddleware");

// 🔐 Protected Routes
router.post("/", auth, bookAppointment);
router.get("/user/:userId", auth, getUserAppointments);
router.get("/", auth, getAllAppointments);
router.patch("/:id", auth, updateStatus);

module.exports = router;