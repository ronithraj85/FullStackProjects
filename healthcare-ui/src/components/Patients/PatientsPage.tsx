import React, { useEffect, useState } from "react";
import { deletePatient, getPatients, updatePatient } from "./patient.service";
import type { PatientResponseDto } from "../../types/PatientResponseDto";
import AddPatient from "./AddPatient";

const PatientsPage = () => {
  const [addPatient, setAddPatient] = useState(false);
  const [patientEdited, setPatientEdit] = useState("");
  const [patientDeleted, setPatientDeleted] = useState("");
  const [patients, setPatients] = useState<PatientResponseDto>();
  const [loading, setLoading] = useState(true);
  const [editingPatient, setEditingPatient] =
    useState<PatientResponseDto | null>(null);
  const [formData, setFormData] = useState<Partial<PatientResponseDto>>({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const pats = await getPatients();
        setPatients(pats);
        setLoading(false);
      } catch (err) {
        console.log("Error in patients main while fetch the patients-", err);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePatient(id);
      setPatients((prev) => prev?.filter((u) => u.id !== id));
      setPatientDeleted("Patient removed successfully");
      setTimeout(() => {
        setPatientDeleted("");
      }, 3000);
    } catch (err) {
      console.log("Error deleting the patient", e);
    }
  };

  const handleEdit = (patient: PatientResponseDto) => {
    setEditingPatient(patient);
    setFormData(patient);
  };

  const handleSave = async () => {
    try {
      await updatePatient(editingPatient?.id!, formData);
      setPatients(
        patients?.map((p) =>
          p.id === editingPatient?.id ? { ...p, ...formData } : p
        )
      );
      setPatientEdit("Patient updated successfully!");
      setEditingPatient(null);
      setTimeout(() => setPatientEdit(""), 3000);
    } catch (err) {
      console.log("Error updating patient:", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Patients</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setAddPatient(true)}
        >
          New Patient
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {" "}
        {patientDeleted && (
          <div className="mb-4 p-3 bg-orange-100 text-orange-600 rounded">
            {patientDeleted}
          </div>
        )}
        {patientEdited && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {patientEdited}
          </div>
        )}
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          {loading && <p className="text-center">Fetching Patients List!</p>}
          <tbody>
            {patients?.filter((patient) => patient.active).length === 0 ? (
              <tr>
                {" "}
                <td colSpan={5} className="text-center py-4 text-gray-600">
                  {" "}
                  No patients found{" "}
                </td>{" "}
              </tr>
            ) : (
              patients
                ?.filter((patient) => patient.active)
                .map((patient, idx) => (
                  <tr
                    key={patient.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.email}</td>
                    <td className="py-3 px-4">{patient.mobile}</td>
                    <td className="py-3 px-4">{patient.dateOfBirth}</td>

                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        {addPatient && <AddPatient />}
        {editingPatient && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Edit Patient</h3>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              className="border p-2 mr-2"
            />
            <input
              type="text"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="border p-2 mr-2"
            />
            <input
              type="text"
              value={formData.mobile || ""}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              placeholder="Mobile"
              className="border p-2 mr-2"
            />
            <input
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingPatient(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
