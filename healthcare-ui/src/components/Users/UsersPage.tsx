import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "./user.service";
import type UserResponseDto from "../../types/UserResponseDto";
import AddAdminPage from "./AddAdminPage";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editingUser, setEditingUser] = useState<UserResponseDto | null>(null);
  const [formData, setFormData] = useState<Partial<UserResponseDto>>({});
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers();
        setUsers(users);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeleteMessage("User deleted successfully!");
      setTimeout(() => setDeleteMessage(""), 3000); // auto-hide after 3s
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user: UserResponseDto) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const updated = await updateUser(editingUser.id, formData);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? updated : u))
      );
      setEditingUser(null);
      setEditMessage("User updated successfully!");
      setTimeout(() => setEditMessage(""), 3000); // auto-hide banner
    } catch {
      setError("Failed to update user");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setAddUser(true)}
        >
          New User
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {deleteMessage && (
          <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
            {" "}
            {deleteMessage}{" "}
          </div>
        )}
        {editMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {editMessage}
          </div>
        )}

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Roles</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  {user.roles && user.roles.length > 0
                    ? user.roles.join(", ")
                    : "No roles"}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addUser && <AddAdminPage />}
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
        )}
      </div>
    </div>
  );
};

export default UsersPage;
