import React, { useEffect, useState } from "react";
import { getPatients } from "../../services/Auth.service";

const PatientsMain = () => {
  const [addPatient, setAddPatient] = useState(false);
  const [patientAdded, setPatientAdded] = useState("");
  const [patientEdited, setPatientEdit] = useState("");
  const [patientDeleted, setPatientDeleted] = useState("");
  const [patients, setPatients] = useState<PatientResponseDto>();
  const [loading, setLoading] = useState(true);

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
        {patientAdded && (
          <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
            {" "}
            {patientAdded}{" "}
          </div>
        )}
        {patientDeleted && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
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
            {patients.map((patient, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{patient.name}</td>
                <td className="py-3 px-4">{patient.email}</td>
                <td className="py-3 px-4">{patient.mobile}</td>
                <td className="py-3 px-4">{patient.dateOfBirth}</td>

                <td className="py-3 px-4 space-x-2">
                  <button
                    // onClick={() => handleDelete(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    // onClick={() => handleEdit(user)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {addUser && <AddAdminPage />}
        {editingUser && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Edit Existing User</h3>
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
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="UserName"
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
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PatientsMain;
