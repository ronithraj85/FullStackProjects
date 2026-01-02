import React, { useEffect, useState } from "react";
import type DoctorResponseDto from "../../types/DoctorResponseDto";
import { deleteDoctor, getAllDoctors } from "./doctor.service";
import AddDoctorPage from "./AddDoctor";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<DoctorResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDoctor, setAddDoctor] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const doctors = await getAllDoctors();
      setDoctors(doctors);
    } catch {
      console.log("Failed to get all the doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const removeDoctor = async (id: any) => {
    try {
      console.log("Deleting the doctor with id-", id);
      await deleteDoctor(id);
      setDoctors((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch {
      console.log("Failed to delete doctor");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          List of Doctors
        </h2>{" "}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setAddDoctor(true)}
        >
          Add new Doctor
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          {loading && <p className="text-center">Fetching Doctors List!</p>}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Specialization</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{doctor.name}</td>
                <td className="py-3 px-4">{doctor.specialization}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => removeDoctor(doctor.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addDoctor && <AddDoctorPage onDoctorAdded={fetchDoctors} />}
      </div>
    </div>
  );
};

export default DoctorsPage;
