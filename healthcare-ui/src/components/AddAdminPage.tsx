import { useState } from "react";
import { register } from "../services/Auth.service";

export default function AddAdminPage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: "",
  });
  const [adminaddedMessage, setAdminaddedMessage] = useState("");

  const rolesList = ["admin", "user", "facilities"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(
        form.name,
        form.username,
        form.email,
        form.password,
        form.roles
      );
      setAdminaddedMessage(`User added successfully with role-${form.role}`);
      setTimeout(() => {
        setAdminaddedMessage("");
        window.location.reload();
      }, 3000);
    } catch {
      console.log("Adding user failed. Please try again after sometime!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      {adminaddedMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {adminaddedMessage}
        </div>
      )}
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Add Admin</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <div>
          <label className="block font-semibold mb-2">Select Role:</label>
          {rolesList.map((roleOption) => (
            <label
              key={roleOption}
              className="flex items-center space-x-2 mb-2"
            >
              <input
                type="radio"
                name="role"
                value={roleOption}
                checked={form.roles === roleOption}
                onChange={handleChange}
                required
              />
              <span>{roleOption}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-amber-200 to-green-500 text-white font-semibold px-4 py-2 rounded w-full hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
