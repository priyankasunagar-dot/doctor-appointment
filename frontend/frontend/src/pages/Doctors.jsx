import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(res => setDoctors(res.data));
  }, []);

  const book = async (doctorId) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/appointments",
      {
        doctorId,
        date: "2026-04-25"
      },
      {
        headers: { Authorization: token }
      }
    );

    alert("Appointment booked!");
  };

  return (
    <div>
      <h2>Doctors</h2>
      {doctors.map(doc => (
        <div key={doc._id}>
          <p>{doc.name} - {doc.specialization}</p>
          <button onClick={() => book(doc._id)}>Book</button>
        </div>
      ))}
    </div>
  );
}

export default Doctors;